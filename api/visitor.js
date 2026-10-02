/**
 * /api/visitor.js — Visitor Intelligence API
 * Handles: IP lookup, geo data, returning visitor check, session storage in Airtable
 * Also syncs to Google Sheets via Apps Script webhook
 */

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  const { AIRTABLE_TOKEN, AIRTABLE_BASE_ID, GOOGLE_SHEETS_WEBHOOK_URL } = process.env;

  // ── GET: look up visitor by IP ──────────────────────────────────────────
  if (req.method === "GET") {
    try {
      // Get real IP
      const forwarded = req.headers["x-forwarded-for"];
      const ip = (forwarded ? forwarded.split(",")[0] : req.socket?.remoteAddress || "unknown").trim();

      // Geo lookup via ipapi.co (free, no key needed)
      let geo = {};
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, {
          headers: { "User-Agent": "IndusRobotics/1.0" },
        });
        if (geoRes.ok) geo = await geoRes.json();
      } catch (_) {
        // silently fail geo lookup
      }

      // Look up in Airtable Visitors table
      const filterFormula = encodeURIComponent(`{IP Address} = "${ip}"`);
      const atRes = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Visitors?filterByFormula=${filterFormula}&maxRecords=1`,
        { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
      );
      const atData = atRes.ok ? await atRes.json() : { records: [] };
      const existing = atData.records?.[0];

      if (existing) {
        // Returning visitor — update visit count and last seen
        const visitCount = (existing.fields["Visit Count"] || 1) + 1;
        const lastPage = existing.fields["Last Page"] || "/";
        const lastSection = existing.fields["Last Section"] || "";
        const preferences = existing.fields["Preferences"] || "{}";

        await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Visitors/${existing.id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${AIRTABLE_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fields: {
                "Visit Count": visitCount,
                "Last Seen": new Date().toISOString(),
                Country: geo.country_name || existing.fields["Country"] || "",
                City: geo.city || existing.fields["City"] || "",
                Timezone: geo.timezone || existing.fields["Timezone"] || "",
              },
            }),
          }
        );

        return res.status(200).json({
          isReturning: true,
          visitCount,
          lastPage,
          lastSection,
          preferences: safeJSON(preferences),
          ip,
          geo: {
            country: geo.country_name || "",
            city: geo.city || "",
            timezone: geo.timezone || "",
            currency: geo.currency || "",
            latitude: geo.latitude || 0,
            longitude: geo.longitude || 0,
          },
          recordId: existing.id,
          name: existing.fields["Name"] || "",
        });
      } else {
        // New visitor — create record
        const createRes = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Visitors`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${AIRTABLE_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fields: {
                "IP Address": ip,
                "First Seen": new Date().toISOString(),
                "Last Seen": new Date().toISOString(),
                "Visit Count": 1,
                Country: geo.country_name || "",
                City: geo.city || "",
                Timezone: geo.timezone || "",
                Preferences: "{}",
                "Last Page": "/",
                "Last Section": "",
                Name: "",
              },
            }),
          }
        );
        const createData = createRes.ok ? await createRes.json() : {};

        return res.status(200).json({
          isReturning: false,
          visitCount: 1,
          lastPage: "/",
          lastSection: "",
          preferences: {},
          ip,
          geo: {
            country: geo.country_name || "",
            city: geo.city || "",
            timezone: geo.timezone || "",
            currency: geo.currency || "",
            latitude: geo.latitude || 0,
            longitude: geo.longitude || 0,
          },
          recordId: createData.id || "",
          name: "",
        });
      }
    } catch (err) {
      console.error("Visitor GET error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  // ── POST: update visitor state (last page, section, preferences) ────────
  if (req.method === "POST") {
    try {
      const { recordId, lastPage, lastSection, preferences, name, sessionData } = req.body || {};
      if (!recordId) return res.status(400).json({ error: "recordId required" });

      const fields = {};
      if (lastPage !== undefined) fields["Last Page"] = lastPage;
      if (lastSection !== undefined) fields["Last Section"] = lastSection;
      if (preferences !== undefined) fields["Preferences"] = JSON.stringify(preferences);
      if (name) fields["Name"] = name;
      if (sessionData) fields["Session Data"] = JSON.stringify(sessionData);

      await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Visitors/${recordId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fields }),
        }
      );

      // Forward to Google Sheets webhook if configured
      if (GOOGLE_SHEETS_WEBHOOK_URL && lastPage) {
        fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "visitor_update", recordId, lastPage, lastSection, timestamp: new Date().toISOString() }),
        }).catch(() => {});
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Visitor POST error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

function safeJSON(str) {
  try { return JSON.parse(str); } catch { return {}; }
}
