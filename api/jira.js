/**
 * Vercel Serverless Function: /api/jira.js
 * Creates a Jira Task + subtasks when a form is submitted from the Digital Presence website.
 *
 * Subtasks created:
 *   1. Review & Qualify Lead
 *   2. Technical Feasibility Check
 *   3. Follow Up with Customer
 */

export default async function handler(req, res) {
  // ── CORS ──────────────────────────────────────────────────────────────
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  // ── Read credentials ──────────────────────────────────────────────────
  const domain = process.env.JIRA_DOMAIN;       // e.g. harikrishnanint2027g3.atlassian.net
  const email = process.env.JIRA_EMAIL;          // harikrishnan.int2027g3@gmail.com
  const token = process.env.JIRA_API_TOKEN;
  const projectKey = process.env.JIRA_PROJECT_KEY || "KAN";

  if (!domain || !email || !token) {
    return res.status(500).json({
      success: false,
      error: "Jira environment variables are not configured",
    });
  }

  const auth = Buffer.from(`${email}:${token}`).toString("base64");
  const baseUrl = `https://${domain}/rest/api/3`;

  // ── Parse body ────────────────────────────────────────────────────────
  const {
    name = "Unknown",
    company = "Unknown",
    email: contactEmail = "",
    phone = "",
    product = "",
    quantity = "",
    timeline = "",
    requirements = "",
    formType = "Quote Request",
  } = req.body || {};

  // ── Build ADF (Atlassian Document Format) description ─────────────────
  const makeTextNode = (text) => ({ type: "text", text });

  const makeTableRow = (label, value) => ({
    type: "tableRow",
    content: [
      {
        type: "tableCell",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: label, marks: [{ type: "strong" }] }],
          },
        ],
      },
      {
        type: "tableCell",
        content: [
          {
            type: "paragraph",
            content: [makeTextNode(value || "—")],
          },
        ],
      },
    ],
  });

  const adfDescription = {
    version: 1,
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 2 },
        content: [makeTextNode(`New ${formType} from Website`)],
      },
      {
        type: "table",
        attrs: { isNumberColumnEnabled: false, layout: "default" },
        content: [
          makeTableRow("Field", "Value"),
          makeTableRow("Full Name", name),
          makeTableRow("Company", company),
          makeTableRow("Email", contactEmail),
          makeTableRow("Phone", phone),
          makeTableRow("Product / Domain", product),
          makeTableRow("Target Quantity", quantity),
          makeTableRow("Timeline", timeline),
        ],
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [makeTextNode("Technical Requirements")],
      },
      {
        type: "paragraph",
        content: [makeTextNode(requirements || "No requirements provided.")],
      },
      {
        type: "rule",
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `Submitted via INDUS Digital Presence — ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
            marks: [{ type: "em" }],
          },
        ],
      },
    ],
  };

  // ── 1. Create main Jira Task ──────────────────────────────────────────
  const mainPayload = {
    fields: {
      project: { key: projectKey },
      summary: `[${formType}] ${name} — ${company}`,
      description: adfDescription,
      issuetype: { name: "Task" },
      priority: { name: "Medium" },
      labels: ["digital-presence", "website-lead", formType.toLowerCase().replace(/\s+/g, "-")],
    },
  };

  let mainIssueKey = null;

  try {
    const mainRes = await fetch(`${baseUrl}/issue`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(mainPayload),
    });

    const mainData = await mainRes.json();

    if (!mainRes.ok) {
      console.error("Jira main task error:", JSON.stringify(mainData));
      return res.status(mainRes.status).json({
        success: false,
        error: mainData.errorMessages || mainData.errors || "Failed to create Jira task",
      });
    }

    mainIssueKey = mainData.key;
    console.log("Created Jira main task:", mainIssueKey);
  } catch (err) {
    console.error("Jira main task exception:", err);
    return res.status(500).json({ success: false, error: err.message });
  }

  // ── 2. Create Subtasks ────────────────────────────────────────────────
  const subtasks = [
    {
      summary: `[Lead Review] ${name} from ${company}`,
      description: "Qualify the incoming lead. Verify company details, check domain match, assign priority level, and decide next action.",
    },
    {
      summary: `[Tech Check] Feasibility for ${product || "enquiry"} — ${company}`,
      description: `Review technical requirements:\n\n${requirements}\n\nConfirm product fit, payload/torque specs, and integration possibilities.`,
    },
    {
      summary: `[Follow Up] Contact ${name} at ${contactEmail || phone}`,
      description: `Follow up with ${name} (${company}).\nEmail: ${contactEmail}\nPhone: ${phone}\n\nTimeline expectation: ${timeline || "Not specified"}`,
    },
  ];

  const subtaskResults = [];

  for (const sub of subtasks) {
    const subPayload = {
      fields: {
        project: { key: projectKey },
        summary: sub.summary,
        description: {
          version: 1,
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: sub.description }],
            },
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: `Parent Task: ${mainIssueKey}`,
                  marks: [{ type: "em" }],
                },
              ],
            },
          ],
        },
        issuetype: { name: "Subtask" },
        parent: { key: mainIssueKey },
        priority: { name: "Medium" },
        labels: ["digital-presence", "website-lead"],
      },
    };

    try {
      const subRes = await fetch(`${baseUrl}/issue`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(subPayload),
      });

      const subData = await subRes.json();

      if (subRes.ok) {
        console.log("Created subtask:", subData.key);
        subtaskResults.push({ key: subData.key, summary: sub.summary });
      } else {
        console.warn("Subtask creation failed:", JSON.stringify(subData));
        subtaskResults.push({ key: null, summary: sub.summary, error: subData });
      }
    } catch (err) {
      console.warn("Subtask exception:", err.message);
      subtaskResults.push({ key: null, summary: sub.summary, error: err.message });
    }
  }

  // ── Response ──────────────────────────────────────────────────────────
  return res.status(200).json({
    success: true,
    issueKey: mainIssueKey,
    issueUrl: `https://${domain}/browse/${mainIssueKey}`,
    subtasks: subtaskResults,
  });
}
