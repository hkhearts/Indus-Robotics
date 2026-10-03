/**
 * Vercel Serverless Function: /api/trends.js
 *
 * Fetches Google Trends daily trending searches for India,
 * filters for keywords relevant to Indus Robotics products,
 * creates Jira tasks in DI space for hot trends, and
 * logs findings to Google Sheets.
 *
 * Called by: Vercel Cron (vercel.json) or manually via POST /api/trends
 */

// ── Robotics / automation keyword categories ──────────────────────────────
const KEYWORD_CATEGORIES = {
  motion_control: ["servo motor", "servo drive", "motion control", "stepper motor", "brushless motor", "bldc motor"],
  reducers: ["harmonic drive", "cycloidal reducer", "planetary gearbox", "strain wave", "gear reducer", "speed reducer"],
  actuators: ["linear actuator", "electric actuator", "hydraulic actuator", "robotic arm", "end effector"],
  automation: ["industrial automation", "factory automation", "industry 4.0", "smart manufacturing", "plc", "scada", "cobot", "collaborative robot"],
  robotics_general: ["robotics", "robot", "autonomous robot", "mobile robot", "agv", "amr"],
  supply_chain: ["supply chain automation", "warehouse automation", "pick and place", "conveyor system"],
};

const ALL_KEYWORDS = Object.values(KEYWORD_CATEGORIES).flat();

// ── Fetch Google Trends RSS (India) ──────────────────────────────────────
async function fetchTrendingSearches() {
  const url = "https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN";
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; IndusRobotics/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Trends RSS fetch failed: ${res.status}`);
    const xml = await res.text();
    return parseTrendsRSS(xml);
  } catch (err) {
    console.error("Google Trends fetch error:", err.message);
    return [];
  }
}

// ── Parse RSS XML → array of { title, traffic, pubDate } ─────────────────
function parseTrendsRSS(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = extractTag(block, "title");
    const traffic = extractTag(block, "ht:approx_traffic") || extractTag(block, "approx_traffic");
    const pubDate = extractTag(block, "pubDate");
    if (title) items.push({ title, traffic: traffic || "N/A", pubDate: pubDate || new Date().toISOString() });
  }
  return items;
}

function extractTag(text, tag) {
  const m = text.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`) );
  if (m) return m[1].trim();
  const m2 = text.match(new RegExp(`<${tag}[^>]*>([^<]*)<\\/${tag}>`));
  if (m2) return m2[1].trim();
  return null;
}

// ── Match trends against our product keywords ─────────────────────────────
function matchTrends(trends) {
  const matched = [];
  for (const trend of trends) {
    const tl = trend.title.toLowerCase();
    for (const [category, keywords] of Object.entries(KEYWORD_CATEGORIES)) {
      const hit = keywords.find((kw) => tl.includes(kw));
      if (hit) {
        matched.push({ ...trend, category, matchedKeyword: hit });
        break;
      }
    }
    // Also check if any general keyword appears
    if (!matched.find((m) => m.title === trend.title)) {
      const hit = ALL_KEYWORDS.find((kw) => tl.includes(kw));
      if (hit) matched.push({ ...trend, category: "general", matchedKeyword: hit });
    }
  }
  return matched;
}

// ── Create Jira task for a matched trend ─────────────────────────────────
async function createJiraTrendTask(trend, auth, baseUrl, projectKey) {
  const payload = {
    fields: {
      project: { key: projectKey },
      summary: `[Trend Alert] "${trend.title}" trending in India — ${trend.traffic} searches`,
      description: {
        version: 1,
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "🔥 Google Trends Alert" }],
          },
          {
            type: "table",
            attrs: { isNumberColumnEnabled: false, layout: "default" },
            content: [
              makeTableRow("Trending Term", trend.title),
              makeTableRow("Approx. Traffic", trend.traffic),
              makeTableRow("Category", trend.category),
              makeTableRow("Matched Keyword", trend.matchedKeyword),
              makeTableRow("Published", trend.pubDate),
              makeTableRow("Region", "India (IN)"),
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Recommended Actions" }],
          },
          {
            type: "bulletList",
            content: [
              makeBullet("Review product pages related to: " + trend.matchedKeyword),
              makeBullet("Consider targeted content / blog post on this trending topic"),
              makeBullet("Run Google Ads for keyword: " + trend.title),
              makeBullet("Cross-reference with lead form submissions for similar keywords"),
            ],
          },
          {
            type: "paragraph",
            content: [{
              type: "text",
              text: `Auto-generated by Indus Robotics Trend Radar — ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
              marks: [{ type: "em" }],
            }],
          },
        ],
      },
      issuetype: { name: "Task" },
      priority: { name: "High" },
      labels: ["trend-alert", "google-trends", "digital-marketing", trend.category],
    },
  };

  const res = await fetch(`${baseUrl}/issue`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data.errors || data.errorMessages));
  return data.key;
}

function makeTableRow(label, value) {
  return {
    type: "tableRow",
    content: [
      { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: label, marks: [{ type: "strong" }] }] }] },
      { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: String(value || "—") }] }] },
    ],
  };
}

function makeBullet(text) {
  return { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text }] }] };
}

// ── Push results to Google Sheets ─────────────────────────────────────────
async function pushToSheets(matched, sheetsWebhookUrl) {
  if (!sheetsWebhookUrl) return;
  try {
    await fetch(sheetsWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "trend_data",
        trends: matched,
        fetchedAt: new Date().toISOString(),
      }),
    });
  } catch (e) {
    console.warn("Sheets push failed:", e.message);
  }
}

// ── Main handler ──────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(204).end();

  // Allow GET (cron trigger) and POST (manual trigger / webhook)
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  // Read Jira credentials
  const domain = process.env.JIRA_DOMAIN;
  const email = process.env.JIRA_EMAIL;
  const token = process.env.JIRA_API_TOKEN;
  const projectKey = process.env.JIRA_PROJECT_KEY || "DI";
  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();

  if (!domain || !email || !token) {
    return res.status(500).json({ success: false, error: "Jira env vars missing" });
  }

  const auth = Buffer.from(`${email}:${token}`).toString("base64");
  const baseUrl = `https://${domain}/rest/api/3`;

  // 1. Fetch Google Trends
  const trends = await fetchTrendingSearches();
  if (!trends.length) {
    return res.status(200).json({ success: true, message: "No trends fetched (API may be rate-limited)", jiraTasksCreated: 0 });
  }

  // 2. Filter for robotics-relevant trends
  const matched = matchTrends(trends);

  // 3. Push all to Sheets for the Trends tab
  await pushToSheets(matched, sheetsUrl);

  // 4. Create Jira tasks for top 3 matches (avoid spam)
  const topMatches = matched.slice(0, 3);
  const jiraKeys = [];

  for (const trend of topMatches) {
    try {
      const key = await createJiraTrendTask(trend, auth, baseUrl, projectKey);
      jiraKeys.push(key);
      console.log(`Created Jira trend task: ${key} — "${trend.title}"`);
    } catch (err) {
      console.error(`Jira task failed for "${trend.title}":`, err.message);
    }
  }

  return res.status(200).json({
    success: true,
    trendsAnalyzed: trends.length,
    roboticsRelevant: matched.length,
    jiraTasksCreated: jiraKeys.length,
    jiraKeys,
    topTrends: matched.slice(0, 5).map((t) => ({
      title: t.title,
      traffic: t.traffic,
      category: t.category,
      matchedKeyword: t.matchedKeyword,
    })),
  });
}
