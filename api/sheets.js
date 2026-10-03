/**
 * /api/sheets.js — Google Sheets Apps Script Webhook Forwarder
 * Forwards analytics events to the Google Sheets Apps Script Web App URL
 * Also handles traffic counting using Airtable as the data store
 */

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  const {
    GOOGLE_SHEETS_WEBHOOK_URL,
    AIRTABLE_TOKEN,
    AIRTABLE_BASE_ID,
    JIRA_DOMAIN,
    JIRA_EMAIL,
    JIRA_API_TOKEN,
    JIRA_PROJECT_KEY,
  } = process.env;

  // ── GET: return current traffic stats ──────────────────────────────────
  if (req.method === "GET") {
    try {
      if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
        return res.status(200).json({ activeUsers: 0, todayViews: 0 });
      }

      // Count visitors active in last 5 minutes using "Website Sessions"
      const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const filterFormula = encodeURIComponent(`{Timestamp} >= "${fiveMinAgo}"`);
      const sessRes = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Website%20Sessions?filterByFormula=${filterFormula}`,
        { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
      );
      const sessData = sessRes.ok ? await sessRes.json() : { records: [] };
      const activeUsers = sessData.records?.length || 0;

      // Count today's page views
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayFormula = encodeURIComponent(`{Timestamp} >= "${todayStart.toISOString()}"`);
      const pvRes = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Page%20Views?filterByFormula=${todayFormula}`,
        { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
      );
      const pvData = pvRes.ok ? await pvRes.json() : { records: [] };

      // Auto-create Jira scaling suggestion if traffic is high
      if (activeUsers >= 50 && JIRA_DOMAIN && JIRA_EMAIL && JIRA_API_TOKEN) {
        const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64");
        fetch(`https://${JIRA_DOMAIN}/rest/api/3/issue`, {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              project: { key: JIRA_PROJECT_KEY || "DI" },
              summary: `[Traffic Alert] ${activeUsers} concurrent users — Consider scaling`,
              description: {
                version: 1,
                type: "doc",
                content: [{
                  type: "paragraph",
                  content: [{
                    type: "text",
                    text: `High traffic detected: ${activeUsers} active users in the last 5 minutes. Today's page views: ${pvData.records?.length || 0}. Consider reviewing Vercel function limits and CDN configuration. Auto-generated at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST.`
                  }]
                }]
              },
              issuetype: { name: "Task" },
              priority: { name: "High" },
              labels: ["auto-alert", "traffic", "scaling"],
            },
          }),
        }).catch(() => {});
      }

      return res.status(200).json({
        activeUsers,
        todayViews: pvData.records?.length || 0,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Traffic GET error:", err);
      return res.status(200).json({ activeUsers: 0, todayViews: 0 });
    }
  }

  // ── POST: forward event to Google Sheets webhook ────────────────────────
  if (req.method === "POST") {
    const payload = req.body || {};

    // Forward to Apps Script
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            serverTimestamp: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.warn("Google Sheets webhook failed:", err.message);
      }
    }

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
