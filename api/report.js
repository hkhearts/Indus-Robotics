/**
 * Vercel Serverless Function: /api/report.js
 *
 * Sends dashboard analytics email reports to the configured email.
 * Supports: daily, weekly, monthly report types.
 * Includes unsubscribe token mechanism.
 *
 * Triggered by Vercel Cron (vercel.json) or manual POST.
 *
 * POST body:
 *   { "type": "daily" | "weekly" | "monthly", "token": "<admin_token>" }
 *
 * Unsubscribe:
 *   GET /api/report?action=unsubscribe&token=<unsub_token>&type=daily|weekly|monthly
 *   GET /api/report?action=resubscribe&token=<unsub_token>&type=daily|weekly|monthly
 */

import crypto from "node:crypto";

const REPORT_EMAIL = process.env.REPORT_EMAIL || "harikrishnan.int2027g3@gmail.com";
const SHEETS_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
const ADMIN_TOKEN = process.env.REPORT_ADMIN_TOKEN || "indus-report-2027";

// ── Simple unsubscribe token (deterministic, no DB needed) ─────────────────
function makeUnsubToken(type) {
  return crypto
    .createHmac("sha256", ADMIN_TOKEN)
    .update(`unsub-${type}-${REPORT_EMAIL}`)
    .digest("hex")
    .slice(0, 24);
}

function verifyUnsubToken(type, token) {
  return makeUnsubToken(type) === token;
}

// ── Fetch stats from Google Sheets ────────────────────────────────────────
async function fetchStats() {
  if (!SHEETS_WEBHOOK) return null;
  try {
    const res = await fetch(SHEETS_WEBHOOK, { signal: AbortSignal.timeout(5000) });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Sheets fetch failed:", e.message);
  }
  return null;
}

// ── Build HTML Email ─────────────────────────────────────────────────────
function buildEmailHTML({ type, stats, generatedAt, unsubToken }) {
  const periodLabel = type === "daily" ? "Today" : type === "weekly" ? "This Week" : "This Month";
  const pageViews = stats?.totalPageViews ?? "—";

  const unsubUrl = `https://indusrobotics.vercel.app/api/report?action=unsubscribe&token=${unsubToken}&type=${type}`;
  const resubUrl = `https://indusrobotics.vercel.app/api/report?action=resubscribe&token=${unsubToken}&type=${type}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Indus Robotics — ${periodLabel} Report</title>
<style>
  body { margin:0; padding:0; background:#0f0f1a; font-family:'Segoe UI',Arial,sans-serif; color:#e0e0e0; }
  .wrapper { max-width:640px; margin:0 auto; padding:24px 16px; }
  .card { background:#1a1a2e; border:1px solid #2a2a4e; border-radius:8px; padding:32px; margin-bottom:20px; }
  .header { text-align:center; padding-bottom:24px; border-bottom:1px solid #2a2a4e; margin-bottom:24px; }
  .logo { font-size:22px; font-weight:700; color:#4d9fff; letter-spacing:2px; }
  .logo span { color:#ff6b35; }
  h1 { font-size:20px; color:#fff; margin:12px 0 4px; }
  .period { font-size:13px; color:#8888aa; }
  .kpi-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:24px 0; }
  .kpi { background:#12122a; border:1px solid #2a2a4e; border-radius:6px; padding:16px; text-align:center; }
  .kpi-value { font-size:28px; font-weight:700; color:#4d9fff; }
  .kpi-label { font-size:11px; color:#8888aa; text-transform:uppercase; letter-spacing:1px; margin-top:4px; }
  .section-title { font-size:13px; font-weight:600; color:#4d9fff; text-transform:uppercase; letter-spacing:1px; margin:20px 0 10px; }
  .table { width:100%; border-collapse:collapse; font-size:13px; }
  .table th { background:#12122a; color:#8888aa; text-align:left; padding:8px 12px; font-weight:600; font-size:11px; text-transform:uppercase; }
  .table td { padding:8px 12px; border-top:1px solid #2a2a4e; color:#ccc; }
  .table tr:hover td { background:#1f1f3a; }
  .badge { display:inline-block; padding:2px 8px; border-radius:3px; font-size:11px; font-weight:600; }
  .badge-high { background:#ff6b3522; color:#ff6b35; border:1px solid #ff6b3540; }
  .badge-med { background:#4d9fff22; color:#4d9fff; border:1px solid #4d9fff40; }
  .badge-new { background:#2dca7222; color:#2dca72; border:1px solid #2dca7240; }
  .btn { display:inline-block; background:#4d9fff; color:#fff; padding:10px 24px; border-radius:4px; text-decoration:none; font-weight:600; font-size:13px; }
  .btn-danger { background:#ff4444; }
  .btn-success { background:#2dca72; }
  .footer { text-align:center; font-size:11px; color:#555577; padding:16px; }
  .footer a { color:#4d9fff; text-decoration:none; }
  .divider { border:0; border-top:1px solid #2a2a4e; margin:20px 0; }
  .insight-box { background:#0d1a2e; border-left:3px solid #4d9fff; padding:12px 16px; border-radius:0 4px 4px 0; margin:8px 0; font-size:13px; color:#ccc; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="card">
    <div class="header">
      <div class="logo">INDUS <span>ROBOTICS</span></div>
      <h1>${periodLabel} Analytics Report</h1>
      <div class="period">Generated: ${generatedAt} IST</div>
    </div>

    <!-- KPI Grid -->
    <div class="kpi-grid">
      <div class="kpi">
        <div class="kpi-value">${pageViews}</div>
        <div class="kpi-label">Page Views</div>
      </div>
      <div class="kpi">
        <div class="kpi-value" style="color:#ff6b35">Active</div>
        <div class="kpi-label">Status</div>
      </div>
      <div class="kpi">
        <div class="kpi-value" style="color:#2dca72">DI</div>
        <div class="kpi-label">Jira Space</div>
      </div>
      <div class="kpi">
        <div class="kpi-value" style="color:#9b59b6">IN</div>
        <div class="kpi-label">Primary Market</div>
      </div>
    </div>

    <hr class="divider"/>

    <!-- Insights -->
    <div class="section-title">📊 Key Insights</div>
    <div class="insight-box">🤖 Microsoft Clarity is active — session recordings and heatmaps are being collected at clarity.ms/tag/yru44ykfxv</div>
    <div class="insight-box">🔥 Google Trends radar is scanning daily for robotics keyword trends in India (IN)</div>
    <div class="insight-box">📋 New leads are automatically created in Jira DealFlow_INT2027G3 (DI project)</div>

    <hr class="divider"/>

    <!-- Actions -->
    <div class="section-title">🚀 Quick Actions</div>
    <table class="table">
      <tr>
        <th>Action</th>
        <th>Link</th>
      </tr>
      <tr>
        <td>View Clarity Heatmaps</td>
        <td><a href="https://clarity.microsoft.com/projects/view/yru44ykfxv" style="color:#4d9fff">Open Clarity →</a></td>
      </tr>
      <tr>
        <td>View Jira Board (DI)</td>
        <td><a href="https://trustworkz.atlassian.net/jira/software/projects/DI/boards" style="color:#4d9fff">Open Jira →</a></td>
      </tr>
      <tr>
        <td>View Google Sheets Dashboard</td>
        <td><a href="https://docs.google.com/spreadsheets" style="color:#4d9fff">Open Sheets →</a></td>
      </tr>
      <tr>
        <td>Trigger Trend Scan Now</td>
        <td><a href="https://indusrobotics.vercel.app/api/trends" style="color:#4d9fff">Run Scan →</a></td>
      </tr>
    </table>

    <hr class="divider"/>

    <!-- Report Schedule -->
    <div class="section-title">📅 Your Report Schedule</div>
    <table class="table">
      <tr>
        <th>Report</th>
        <th>Frequency</th>
        <th>Status</th>
      </tr>
      <tr>
        <td>Daily Summary</td>
        <td>Every day at 8 AM IST</td>
        <td><span class="badge badge-new">Active</span></td>
      </tr>
      <tr>
        <td>Weekly Digest</td>
        <td>Monday at 8 AM IST</td>
        <td><span class="badge badge-new">Active</span></td>
      </tr>
      <tr>
        <td>Monthly Report</td>
        <td>1st of month at 8 AM IST</td>
        <td><span class="badge badge-new">Active</span></td>
      </tr>
      <tr>
        <td>Trend Alerts (Jira)</td>
        <td>Daily automated scan</td>
        <td><span class="badge badge-high">Live</span></td>
      </tr>
    </table>

    <hr class="divider"/>

    <!-- Unsubscribe -->
    <div style="text-align:center; margin-top:16px;">
      <p style="font-size:12px; color:#8888aa; margin-bottom:12px;">
        You're receiving this <strong>${type}</strong> report at <strong>${REPORT_EMAIL}</strong>
      </p>
      <a href="${unsubUrl}" class="btn btn-danger" style="font-size:12px; padding:8px 18px; margin-right:8px;">
        Unsubscribe from ${type} reports
      </a>
      <a href="${resubUrl}" class="btn btn-success" style="font-size:12px; padding:8px 18px;">
        Re-subscribe
      </a>
    </div>
  </div>

  <div class="footer">
    <p>Indus Robotics — Digital Presence Platform</p>
    <p>
      <a href="https://indusrobotics.vercel.app">indusrobotics.vercel.app</a> ·
      <a href="${unsubUrl}">Unsubscribe</a>
    </p>
  </div>
</div>
</body>
</html>`;
}

// ── Send email via Google Apps Script relay (or direct SMTP) ─────────────
// Since Vercel serverless can't send email natively without a service,
// we relay through the Google Sheets webhook which calls MailApp.sendEmail
async function sendEmailViaSheets({ to, subject, html, type }) {
  if (!SHEETS_WEBHOOK) {
    console.warn("No SHEETS_WEBHOOK configured — cannot send email");
    return false;
  }
  try {
    const res = await fetch(SHEETS_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "send_email", to, subject, html, reportType: type }),
      signal: AbortSignal.timeout(10000),
    });
    return res.ok;
  } catch (e) {
    console.error("Email relay failed:", e.message);
    return false;
  }
}

// ── Main handler ──────────────────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();

  // ── UNSUBSCRIBE / RESUBSCRIBE via GET ──────────────────────────────────
  if (req.method === "GET") {
    const { action, token, type } = req.query || {};
    if (action === "unsubscribe" && type && token) {
      if (verifyUnsubToken(type, token)) {
        // Notify Sheets to flag this type as unsubscribed
        await sendEmailViaSheets({
          to: REPORT_EMAIL,
          subject: `[Indus] Unsubscribed from ${type} reports`,
          html: `<p>You have been <strong>unsubscribed</strong> from <strong>${type}</strong> Indus Robotics reports.</p>
                 <p>To re-subscribe: <a href="https://indusrobotics.vercel.app/api/report?action=resubscribe&token=${token}&type=${type}">Click here</a></p>`,
          type: `unsubscribe_${type}`,
        });
        return res.status(200).send(`
          <html><body style="font-family:sans-serif;text-align:center;padding:60px;background:#0f0f1a;color:#eee">
            <h1 style="color:#ff4444">✅ Unsubscribed</h1>
            <p>You have been unsubscribed from <strong>${type}</strong> Indus Robotics reports.</p>
            <p><a href="/api/report?action=resubscribe&token=${token}&type=${type}" style="color:#4d9fff">Re-subscribe</a></p>
          </body></html>
        `);
      }
      return res.status(403).send("Invalid unsubscribe token.");
    }

    if (action === "resubscribe" && type && token) {
      if (verifyUnsubToken(type, token)) {
        return res.status(200).send(`
          <html><body style="font-family:sans-serif;text-align:center;padding:60px;background:#0f0f1a;color:#eee">
            <h1 style="color:#2dca72">✅ Re-subscribed!</h1>
            <p>You will now receive <strong>${type}</strong> Indus Robotics reports again.</p>
          </body></html>
        `);
      }
      return res.status(403).send("Invalid token.");
    }

    // Default GET — return status page
    return res.status(200).json({
      service: "Indus Robotics Report Engine",
      email: REPORT_EMAIL,
      schedules: {
        daily: "08:00 IST every day",
        weekly: "08:00 IST every Monday",
        monthly: "08:00 IST on the 1st of each month",
      },
      unsubscribeLinks: {
        daily: `/api/report?action=unsubscribe&token=${makeUnsubToken("daily")}&type=daily`,
        weekly: `/api/report?action=unsubscribe&token=${makeUnsubToken("weekly")}&type=weekly`,
        monthly: `/api/report?action=unsubscribe&token=${makeUnsubToken("monthly")}&type=monthly`,
      },
    });
  }

  // ── SEND REPORT via POST ───────────────────────────────────────────────
  if (req.method === "POST") {
    const { type = "daily", token } = req.body || req.query || {};

    // Validate admin token for manual triggers
    if (token && token !== ADMIN_TOKEN) {
      return res.status(403).json({ success: false, error: "Invalid admin token" });
    }

    const validTypes = ["daily", "weekly", "monthly"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ success: false, error: "type must be daily, weekly, or monthly" });
    }

    // Fetch current stats
    const stats = await fetchStats();

    const generatedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const periodLabel = type === "daily" ? "Daily" : type === "weekly" ? "Weekly" : "Monthly";
    const unsubToken = makeUnsubToken(type);

    const html = buildEmailHTML({ type, stats, generatedAt, unsubToken });

    const subject = `📊 Indus Robotics — ${periodLabel} Analytics Report | ${new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}`;

    const sent = await sendEmailViaSheets({ to: REPORT_EMAIL, subject, html, type });

    return res.status(200).json({
      success: sent,
      reportType: type,
      sentTo: REPORT_EMAIL,
      generatedAt,
      message: sent ? `${periodLabel} report sent successfully` : "Email relay failed — check GOOGLE_SHEETS_WEBHOOK_URL",
    });
  }

  return res.status(405).json({ success: false, error: "Method not allowed" });
}
