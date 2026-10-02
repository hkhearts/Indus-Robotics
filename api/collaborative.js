/**
 * /api/collaborative.js — Account Collaborative Intelligence
 * Detects multiple IPs from same company network
 * Creates shared workspace for stakeholders
 */

const { AIRTABLE_TOKEN, AIRTABLE_BASE_ID } = process.env;

async function getCompanyVisitors(companyName) {
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) return [];

  const filterFormula = encodeURIComponent(`{Company Name} = "${companyName}"`);
  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Visitors?filterByFormula=${filterFormula}&maxRecords=20`,
    { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
  );
  const data = res.ok ? await res.json() : { records: [] };
  return data.records || [];
}

async function getOrCreateWorkspace(companyName) {
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) return null;

  // Check existing workspace
  const filterFormula = encodeURIComponent(`{Company Name} = "${companyName}"`);
  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Workspaces?filterByFormula=${filterFormula}&maxRecords=1`,
    { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
  );
  const data = res.ok ? await res.json() : { records: [] };

  if (data.records?.length) return data.records[0].id;

  // Create new workspace
  const createRes = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Workspaces`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          "Company Name": companyName,
          "Created At": new Date().toISOString(),
          "Status": "Active",
          "Stakeholder Count": 0,
          "BOM Items": "[]",
        },
      }),
    }
  );
  const createData = createRes.ok ? await createRes.json() : {};
  return createData.id || null;
}

function inferRole(pagePath, visitCount) {
  const path = pagePath.toLowerCase();
  if (path.includes("/products/") || path.includes("/technology/") || path.includes("/datasheet")) {
    return "engineer";
  }
  if (path.includes("/solutions/") || path.includes("/applications/") || path.includes("/case-study")) {
    return "manager";
  }
  if (path.includes("/pricing") || path.includes("/quote") || path.includes("/procurement") || path.includes("/purchase")) {
    return "procurement";
  }
  if (path.includes("/about") || path.includes("/leadership") || visitCount > 10) {
    return "executive";
  }
  return "unknown";
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method === "GET") {
    try {
      const forwarded = req.headers["x-forwarded-for"];
      const ip = (forwarded ? forwarded.split(",")[0] : req.socket?.remoteAddress || "unknown").trim();

      // Get current visitor's firmographic data
      const firmRes = await fetch(`${req.headers.origin || "http://localhost:3000"}/api/firmographic`);
      const firmData = firmRes.ok ? await firmRes.json() : null;

      if (!firmData?.companyName || firmData.companyName === "Unknown Visitor") {
        return res.status(200).json({
          companyVisitorCount: 1,
          stakeholders: [{ ip, role: "unknown", pagesVisited: ["/"], lastActive: new Date().toISOString() }],
          hasWorkspace: false,
        });
      }

      const companyVisitors = await getCompanyVisitors(firmData.companyName);
      const stakeholders = companyVisitors.map((v) => ({
        ip: v.fields["IP Address"],
        role: inferRole(v.fields["Last Page"] || "/", v.fields["Visit Count"] || 1),
        pagesVisited: [v.fields["Last Page"] || "/"],
        lastActive: v.fields["Last Seen"] || new Date().toISOString(),
      }));

      const workspaceId = await getOrCreateWorkspace(firmData.companyName);

      return res.status(200).json({
        companyVisitorCount: companyVisitors.length,
        stakeholders,
        hasWorkspace: !!workspaceId,
        workspaceId,
        companyName: firmData.companyName,
      });
    } catch (err) {
      console.error("Collaborative GET error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  // POST: Add item to shared workspace BOM
  if (req.method === "POST") {
    try {
      const { workspaceId, item } = req.body || {};
      if (!workspaceId || !item) return res.status(400).json({ error: "workspaceId and item required" });

      // Update workspace BOM
      const getRes = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Workspaces/${workspaceId}`,
        { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
      );
      const getData = getRes.ok ? await getRes.json() : {};
      const currentBOM = getData.fields?.["BOM Items"] ? JSON.parse(getData.fields["BOM Items"]) : [];

      currentBOM.push({ ...item, addedAt: new Date().toISOString(), addedBy: req.headers["x-forwarded-for"] });

      await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Workspaces/${workspaceId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fields: { "BOM Items": JSON.stringify(currentBOM), "Stakeholder Count": currentBOM.length } }),
        }
      );

      return res.status(200).json({ success: true, bom: currentBOM });
    } catch (err) {
      console.error("Collaborative POST error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}