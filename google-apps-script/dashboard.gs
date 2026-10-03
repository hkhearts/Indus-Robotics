/**
 * Google Apps Script — Indus Robotics Dashboard
 * Deploy as Web App: Execute as Me, Anyone can access.
 * Paste the deployment URL into GOOGLE_SHEETS_WEBHOOK_URL in Vercel env vars.
 *
 * Tabs this script manages:
 *   1. "Page Views"        - Every page visit
 *   2. "Visitors"          - Unique IP visitor log
 *   3. "Form Submissions"  - Quote/Engineer forms
 *   4. "Traffic Summary"   - Daily rollup
 *   5. "Chat Sessions"     - Chatbot interactions
 *   6. "Trends"            - Google Trends keyword data
 *   7. "Report Settings"   - Email subscription preferences
 *
 * Email Reports:
 *   sendDailyReport()   → runs 08:00 IST daily
 *   sendWeeklyReport()  → runs 08:00 IST every Monday
 *   sendMonthlyReport() → runs 08:00 IST on 1st of month
 *
 * Setup triggers: run setupAllTriggers() once from the Apps Script editor.
 */

var REPORT_EMAIL = "harikrishnan.int2027g3@gmail.com";
var JIRA_DOMAIN  = "trustworkz.atlassian.net";
var JIRA_PROJECT = "DI";
var SHEET_ID     = SpreadsheetApp.getActiveSpreadsheet().getId();

// ── Ensure all sheets exist ───────────────────────────────────────────────
function ensureSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tabs = [
    "Page Views",
    "Visitors",
    "Form Submissions",
    "Traffic Summary",
    "Chat Sessions",
    "Trends",
    "Report Settings",
  ];
  var headers = {
    "Page Views":       ["Timestamp", "Page", "Session ID", "Country", "City", "Device", "Referrer"],
    "Visitors":         ["Timestamp", "IP", "Country", "City", "Visit Count", "Last Page"],
    "Form Submissions": ["Timestamp", "Form Type", "Name", "Email", "Company", "Product", "Requirements"],
    "Traffic Summary":  ["Date", "Total Views", "Unique Sessions", "Countries", "Top Page"],
    "Chat Sessions":    ["Timestamp", "Session ID", "Message", "Intent", "Country"],
    "Trends":           ["Fetched At", "Title", "Traffic", "Category", "Matched Keyword", "Jira Task"],
    "Report Settings":  ["Report Type", "Subscribed", "Last Sent", "Email"],
  };

  tabs.forEach(function(name) {
    var sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
      var hdr = headers[name];
      if (hdr) {
        sheet.getRange(1, 1, 1, hdr.length).setValues([hdr]);
        sheet.getRange(1, 1, 1, hdr.length)
          .setFontWeight("bold")
          .setBackground("#1a1a2e")
          .setFontColor("#4d9fff");
        sheet.setFrozenRows(1);
      }
    }
  });

  // Ensure Report Settings has default rows
  var settingsSheet = ss.getSheetByName("Report Settings");
  if (settingsSheet && settingsSheet.getLastRow() < 2) {
    settingsSheet.getRange(2, 1, 3, 4).setValues([
      ["daily",   "TRUE",  "", REPORT_EMAIL],
      ["weekly",  "TRUE",  "", REPORT_EMAIL],
      ["monthly", "TRUE",  "", REPORT_EMAIL],
    ]);
  }
}

// ── Check subscription status ─────────────────────────────────────────────
function isSubscribed(reportType) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Report Settings");
  if (!sheet) return true; // default to subscribed

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === reportType) {
      return String(data[i][1]).toUpperCase() === "TRUE";
    }
  }
  return true;
}

// ── Update last sent timestamp ─────────────────────────────────────────────
function markReportSent(reportType) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Report Settings");
  if (!sheet) return;
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === reportType) {
      sheet.getRange(i + 1, 3).setValue(new Date().toLocaleString("en-IN", {timeZone: "Asia/Kolkata"}));
      return;
    }
  }
}

// ── Collect stats ─────────────────────────────────────────────────────────
function getStats(daysBack) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var pvSheet = ss.getSheetByName("Page Views");
  var fSheet  = ss.getSheetByName("Form Submissions");
  var cSheet  = ss.getSheetByName("Chat Sessions");
  var tSheet  = ss.getSheetByName("Trends");

  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - daysBack);

  function countRows(sheet) {
    if (!sheet || sheet.getLastRow() < 2) return 0;
    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
    return data.filter(function(row) {
      try { return new Date(row[0]) >= cutoff; } catch(e) { return false; }
    }).length;
  }

  function getRecentRows(sheet, cols, limit) {
    if (!sheet || sheet.getLastRow() < 2) return [];
    var last = sheet.getLastRow();
    var start = Math.max(2, last - limit);
    return sheet.getRange(start, 1, last - start + 1, cols).getValues().reverse();
  }

  return {
    pageViews:       countRows(pvSheet),
    formSubmissions: countRows(fSheet),
    chatSessions:    countRows(cSheet),
    trends:          countRows(tSheet),
    recentForms:     getRecentRows(fSheet, 7, 5),
    recentTrends:    getRecentRows(tSheet, 6, 5),
    totalPageViews:  pvSheet ? pvSheet.getLastRow() - 1 : 0,
    period:          daysBack === 1 ? "today" : daysBack === 7 ? "this week" : "this month",
  };
}

// ── Build rich HTML email ─────────────────────────────────────────────────
function buildEmailHTML(reportType, stats) {
  var label = reportType === "daily" ? "Daily" : reportType === "weekly" ? "Weekly" : "Monthly";
  var ts    = new Date().toLocaleString("en-IN", {timeZone: "Asia/Kolkata"});

  // Build recent form submissions table rows
  var formRows = "";
  if (stats.recentForms.length > 0) {
    stats.recentForms.forEach(function(row) {
      formRows += "<tr>" +
        "<td style='padding:7px 10px;border-top:1px solid #2a2a4e;color:#ccc;font-size:12px'>" + (row[2] || "—") + "</td>" +
        "<td style='padding:7px 10px;border-top:1px solid #2a2a4e;color:#ccc;font-size:12px'>" + (row[4] || "—") + "</td>" +
        "<td style='padding:7px 10px;border-top:1px solid #2a2a4e;color:#ccc;font-size:12px'>" + (row[1] || "—") + "</td>" +
        "<td style='padding:7px 10px;border-top:1px solid #2a2a4e;color:#4d9fff;font-size:12px'>" + (row[3] || "—") + "</td>" +
        "</tr>";
    });
  } else {
    formRows = "<tr><td colspan='4' style='padding:10px;color:#555577;font-size:12px;text-align:center'>No submissions yet</td></tr>";
  }

  // Trend rows
  var trendRows = "";
  if (stats.recentTrends.length > 0) {
    stats.recentTrends.forEach(function(row) {
      trendRows += "<tr>" +
        "<td style='padding:7px 10px;border-top:1px solid #2a2a4e;color:#ccc;font-size:12px'>" + (row[1] || "—") + "</td>" +
        "<td style='padding:7px 10px;border-top:1px solid #2a2a4e;color:#ff6b35;font-size:12px'>" + (row[2] || "—") + "</td>" +
        "<td style='padding:7px 10px;border-top:1px solid #2a2a4e;color:#4d9fff;font-size:12px'>" + (row[3] || "—") + "</td>" +
        "<td style='padding:7px 10px;border-top:1px solid #2a2a4e;color:#2dca72;font-size:12px'>" + (row[5] || "Not created") + "</td>" +
        "</tr>";
    });
  } else {
    trendRows = "<tr><td colspan='4' style='padding:10px;color:#555577;font-size:12px;text-align:center'>No trends captured yet</td></tr>";
  }

  return "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'/>" +
    "<meta name='viewport' content='width=device-width,initial-scale=1'/>" +
    "<title>Indus Robotics " + label + " Report</title></head>" +
    "<body style='margin:0;padding:0;background:#0f0f1a;font-family:Segoe UI,Arial,sans-serif;color:#e0e0e0'>" +
    "<div style='max-width:640px;margin:0 auto;padding:24px 16px'>" +

    // Header card
    "<div style='background:#1a1a2e;border:1px solid #2a2a4e;border-radius:8px;padding:32px;margin-bottom:20px'>" +
    "<div style='text-align:center;padding-bottom:20px;border-bottom:1px solid #2a2a4e;margin-bottom:20px'>" +
    "<div style='font-size:22px;font-weight:700;color:#4d9fff;letter-spacing:2px'>INDUS <span style='color:#ff6b35'>ROBOTICS</span></div>" +
    "<h1 style='font-size:20px;color:#fff;margin:12px 0 4px'>" + label + " Analytics Report</h1>" +
    "<div style='font-size:13px;color:#8888aa'>Generated: " + ts + " IST</div></div>" +

    // KPI grid
    "<div style='display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin:20px 0'>" +
    "<div style='background:#12122a;border:1px solid #2a2a4e;border-radius:6px;padding:16px;text-align:center'>" +
    "<div style='font-size:28px;font-weight:700;color:#4d9fff'>" + stats.pageViews + "</div>" +
    "<div style='font-size:11px;color:#8888aa;text-transform:uppercase;letter-spacing:1px;margin-top:4px'>Page Views</div></div>" +
    "<div style='background:#12122a;border:1px solid #2a2a4e;border-radius:6px;padding:16px;text-align:center'>" +
    "<div style='font-size:28px;font-weight:700;color:#ff6b35'>" + stats.formSubmissions + "</div>" +
    "<div style='font-size:11px;color:#8888aa;text-transform:uppercase;letter-spacing:1px;margin-top:4px'>Leads</div></div>" +
    "<div style='background:#12122a;border:1px solid #2a2a4e;border-radius:6px;padding:16px;text-align:center'>" +
    "<div style='font-size:28px;font-weight:700;color:#2dca72'>" + stats.trends + "</div>" +
    "<div style='font-size:11px;color:#8888aa;text-transform:uppercase;letter-spacing:1px;margin-top:4px'>Trend Hits</div></div>" +
    "</div>" +

    // Recent Leads
    "<div style='font-size:13px;font-weight:600;color:#4d9fff;text-transform:uppercase;letter-spacing:1px;margin:20px 0 10px'>📋 Recent Leads</div>" +
    "<table style='width:100%;border-collapse:collapse'>" +
    "<tr style='background:#12122a'>" +
    "<th style='padding:8px 10px;color:#8888aa;text-align:left;font-size:11px;text-transform:uppercase'>Name</th>" +
    "<th style='padding:8px 10px;color:#8888aa;text-align:left;font-size:11px;text-transform:uppercase'>Company</th>" +
    "<th style='padding:8px 10px;color:#8888aa;text-align:left;font-size:11px;text-transform:uppercase'>Form</th>" +
    "<th style='padding:8px 10px;color:#8888aa;text-align:left;font-size:11px;text-transform:uppercase'>Email</th></tr>" +
    formRows + "</table>" +

    // Trend alerts
    "<div style='font-size:13px;font-weight:600;color:#4d9fff;text-transform:uppercase;letter-spacing:1px;margin:20px 0 10px'>🔥 Google Trends Radar</div>" +
    "<table style='width:100%;border-collapse:collapse'>" +
    "<tr style='background:#12122a'>" +
    "<th style='padding:8px 10px;color:#8888aa;text-align:left;font-size:11px;text-transform:uppercase'>Trend</th>" +
    "<th style='padding:8px 10px;color:#8888aa;text-align:left;font-size:11px;text-transform:uppercase'>Traffic</th>" +
    "<th style='padding:8px 10px;color:#8888aa;text-align:left;font-size:11px;text-transform:uppercase'>Category</th>" +
    "<th style='padding:8px 10px;color:#8888aa;text-align:left;font-size:11px;text-transform:uppercase'>Jira Task</th></tr>" +
    trendRows + "</table>" +

    // Quick links
    "<div style='border-top:1px solid #2a2a4e;margin-top:20px;padding-top:16px;text-align:center'>" +
    "<a href='https://clarity.microsoft.com/projects/view/yru44ykfxv' style='display:inline-block;background:#4d9fff;color:#fff;padding:8px 16px;border-radius:4px;text-decoration:none;font-size:12px;font-weight:600;margin:4px'>📊 Clarity</a>" +
    "<a href='https://trustworkz.atlassian.net/jira/software/projects/DI/boards' style='display:inline-block;background:#0052cc;color:#fff;padding:8px 16px;border-radius:4px;text-decoration:none;font-size:12px;font-weight:600;margin:4px'>🎯 Jira DI</a>" +
    "<a href='https://script.google.com' style='display:inline-block;background:#34a853;color:#fff;padding:8px 16px;border-radius:4px;text-decoration:none;font-size:12px;font-weight:600;margin:4px'>📋 Sheets</a>" +
    "</div></div>" +

    // Footer
    "<div style='text-align:center;font-size:11px;color:#555577;padding:16px'>" +
    "<p>Indus Robotics Digital Presence · Auto-generated " + label + " Report</p>" +
    "<p>To unsubscribe from <strong>" + reportType + "</strong> reports, reply with UNSUBSCRIBE or update " +
    "<a href='https://script.google.com' style='color:#4d9fff'>Report Settings</a> tab in your Google Sheet.</p>" +
    "</div>" +
    "</div></body></html>";
}

// ── Send Daily Report ─────────────────────────────────────────────────────
function sendDailyReport() {
  if (!isSubscribed("daily")) {
    Logger.log("Daily report unsubscribed — skipping");
    return;
  }
  var stats = getStats(1);
  var html  = buildEmailHTML("daily", stats);
  MailApp.sendEmail({
    to:       REPORT_EMAIL,
    subject:  "📊 Indus Daily Report — " + new Date().toLocaleDateString("en-IN"),
    htmlBody: html,
    name:     "Indus Robotics Analytics",
  });
  markReportSent("daily");
  Logger.log("Daily report sent to " + REPORT_EMAIL);
}

// ── Send Weekly Report ────────────────────────────────────────────────────
function sendWeeklyReport() {
  if (!isSubscribed("weekly")) {
    Logger.log("Weekly report unsubscribed — skipping");
    return;
  }
  var stats = getStats(7);
  var html  = buildEmailHTML("weekly", stats);
  MailApp.sendEmail({
    to:       REPORT_EMAIL,
    subject:  "📊 Indus Weekly Report — Week of " + new Date().toLocaleDateString("en-IN"),
    htmlBody: html,
    name:     "Indus Robotics Analytics",
  });
  markReportSent("weekly");
  Logger.log("Weekly report sent to " + REPORT_EMAIL);
}

// ── Send Monthly Report ───────────────────────────────────────────────────
function sendMonthlyReport() {
  if (!isSubscribed("monthly")) {
    Logger.log("Monthly report unsubscribed — skipping");
    return;
  }
  var stats = getStats(30);
  var html  = buildEmailHTML("monthly", stats);
  var month = new Date().toLocaleString("en-IN", {month: "long", year: "numeric", timeZone: "Asia/Kolkata"});
  MailApp.sendEmail({
    to:       REPORT_EMAIL,
    subject:  "📊 Indus Monthly Report — " + month,
    htmlBody: html,
    name:     "Indus Robotics Analytics",
  });
  markReportSent("monthly");
  Logger.log("Monthly report sent to " + REPORT_EMAIL);
}

// ── Setup all time-driven triggers ───────────────────────────────────────
// !! RUN THIS FUNCTION ONCE FROM THE APPS SCRIPT EDITOR !!
function setupAllTriggers() {
  // Delete existing triggers first to avoid duplicates
  ScriptApp.getProjectTriggers().forEach(function(t) {
    ScriptApp.deleteTrigger(t);
  });

  // Daily report — 08:00 IST every day
  ScriptApp.newTrigger("sendDailyReport")
    .timeBased()
    .everyDays(1)
    .atHour(2) // 2 UTC = 7:30 IST ≈ 08:00 IST
    .create();

  // Weekly report — Monday 08:00 IST
  ScriptApp.newTrigger("sendWeeklyReport")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(2)
    .create();

  // Monthly report — 1st of month 08:00 IST
  ScriptApp.newTrigger("sendMonthlyReport")
    .timeBased()
    .onMonthDay(1)
    .atHour(2)
    .create();

  // Google Trends scan — daily at 06:00 IST (midnight UTC)
  ScriptApp.newTrigger("fetchAndLogTrends")
    .timeBased()
    .everyDays(1)
    .atHour(0) // midnight UTC = 05:30 IST
    .create();

  Logger.log("✅ All triggers created successfully!");
  Logger.log("Daily report: Every day at ~08:00 IST");
  Logger.log("Weekly report: Monday at ~08:00 IST");
  Logger.log("Monthly report: 1st of month at ~08:00 IST");
  Logger.log("Trend scan: Daily at ~05:30 IST");
}

// ── Fetch Google Trends and log to Trends sheet ────────────────────────────
function fetchAndLogTrends() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Trends");
  if (!sheet) { ensureSheets(); sheet = ss.getSheetByName("Trends"); }

  var url = "https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN";
  var keywords = [
    "servo motor", "servo drive", "harmonic drive", "cycloidal", "planetary gearbox",
    "linear actuator", "industrial automation", "factory automation", "industry 4.0",
    "robotics", "robot", "motion control", "cobot", "collaborative robot",
    "electric actuator", "speed reducer", "gear reducer", "scada", "plc",
  ];

  try {
    var response = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
    var xml      = response.getContentText();
    var doc      = XmlService.parse(xml);
    var root     = doc.getRootElement();
    var channel  = root.getChild("channel");
    var items    = channel.getChildren("item");
    var ts       = new Date().toISOString();
    var matched  = [];

    items.forEach(function(item) {
      var title = item.getChildText("title") || "";
      var tl    = title.toLowerCase();
      var hit   = keywords.find(function(kw) { return tl.indexOf(kw) !== -1; });
      var traffic = "";
      try {
        var htNs  = XmlService.getNamespace("ht", "https://trends.google.com/trends/trendingsearches/daily");
        traffic   = item.getChildText("approx_traffic", htNs) || "";
      } catch(e) {}

      if (hit) {
        matched.push([ts, title, traffic, "robotics_match", hit, ""]);
        sheet.appendRow([ts, title, traffic, "robotics_match", hit, "Pending"]);
      }
    });

    Logger.log("Trends fetched: " + items.length + " total, " + matched.length + " matched");

    // Create Jira tasks for top 2 matched trends
    matched.slice(0, 2).forEach(function(row) {
      try {
        createJiraTrendTask_GAS(row[1], row[2], row[4]);
      } catch(e) {
        Logger.log("Jira task failed: " + e.message);
      }
    });

  } catch(e) {
    Logger.log("Trends fetch error: " + e.message);
  }
}

// ── Create Jira task from GAS ──────────────────────────────────────────────
function createJiraTrendTask_GAS(title, traffic, keyword) {
  var props  = PropertiesService.getScriptProperties();
  var domain = props.getProperty("JIRA_DOMAIN")  || JIRA_DOMAIN;
  var email  = props.getProperty("JIRA_EMAIL")   || REPORT_EMAIL;
  var token  = props.getProperty("JIRA_API_TOKEN");

  if (!token) {
    Logger.log("JIRA_API_TOKEN not set in Script Properties — skipping Jira task");
    return null;
  }

  var auth     = Utilities.base64Encode(email + ":" + token);
  var endpoint = "https://" + domain + "/rest/api/3/issue";
  var payload  = {
    fields: {
      project:     {key: JIRA_PROJECT},
      summary:     "[Trend Alert] \"" + title + "\" trending in India — " + traffic + " searches",
      description: {
        version: 1, type: "doc",
        content: [{
          type: "paragraph",
          content: [{
            type: "text",
            text: "Google Trends radar detected: \"" + title + "\" (keyword: " + keyword + ") trending in India with ~" + traffic + " searches. Review product positioning and content strategy. Auto-generated by Indus GAS Trend Radar."
          }]
        }]
      },
      issuetype: {name: "Task"},
      priority:  {name: "High"},
      labels:    ["trend-alert", "google-trends", "digital-marketing"],
    }
  };

  var options  = {
    method:             "post",
    contentType:        "application/json",
    headers:            {Authorization: "Basic " + auth},
    payload:            JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  var res  = UrlFetchApp.fetch(endpoint, options);
  var data = JSON.parse(res.getContentText());

  if (res.getResponseCode() === 201) {
    Logger.log("Jira task created: " + data.key + " — " + title);
    return data.key;
  } else {
    Logger.log("Jira error: " + res.getContentText());
    return null;
  }
}

// ── POST handler from website ────────────────────────────────────────────
function doPost(e) {
  try {
    ensureSheets();
    var ss   = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);
    var type = data.type || "page_view";
    var ts   = data.serverTimestamp || new Date().toISOString();

    if (type === "page_view") {
      var pvSheet = ss.getSheetByName("Page Views");
      pvSheet.appendRow([ts, data.page || "/", data.session || "", data.country || "", data.city || "", data.device || "Desktop", data.referrer || "Direct"]);
      updateDailySummary(ss, ts, data.page || "/", data.session || "");
    }

    else if (type === "visitor_update") {
      var vSheet = ss.getSheetByName("Visitors");
      vSheet.appendRow([ts, data.recordId || "", "", "", 1, data.lastPage || "/"]);
    }

    else if (type === "form_submit") {
      var fSheet = ss.getSheetByName("Form Submissions");
      fSheet.appendRow([ts, data.formType || "Unknown", data.name || "", data.email || "", data.company || "", data.product || "", data.requirements || ""]);
    }

    else if (type === "chat") {
      var cSheet = ss.getSheetByName("Chat Sessions");
      cSheet.appendRow([ts, data.session || "", data.message || "", data.intent || "", data.country || ""]);
    }

    else if (type === "trend_data") {
      // Trend data pushed from /api/trends.js
      var tSheet = ss.getSheetByName("Trends");
      if (tSheet && data.trends && data.trends.length) {
        var fetchedAt = data.fetchedAt || ts;
        data.trends.forEach(function(t) {
          tSheet.appendRow([fetchedAt, t.title || "", t.traffic || "", t.category || "", t.matchedKeyword || "", ""]);
        });
      }
    }

    else if (type === "send_email") {
      // Email relay from /api/report.js
      if (data.to && data.subject && data.html) {
        // Handle unsubscribe flag
        if (data.reportType && data.reportType.startsWith("unsubscribe_")) {
          var rType = data.reportType.replace("unsubscribe_", "");
          setSubscribed(rType, false);
        }
        MailApp.sendEmail({
          to:       data.to,
          subject:  data.subject,
          htmlBody: data.html,
          name:     "Indus Robotics Analytics",
        });
      }
    }

    return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: err.message})).setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Toggle subscription ────────────────────────────────────────────────────
function setSubscribed(reportType, value) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Report Settings");
  if (!sheet) return;
  var data  = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === reportType) {
      sheet.getRange(i + 1, 2).setValue(value ? "TRUE" : "FALSE");
      return;
    }
  }
}

// ── GET handler — returns quick stats ────────────────────────────────────
function doGet(e) {
  try {
    var ss       = SpreadsheetApp.getActiveSpreadsheet();
    var pvSheet  = ss.getSheetByName("Page Views");
    var totalRows = pvSheet ? pvSheet.getLastRow() - 1 : 0;
    return ContentService
      .createTextOutput(JSON.stringify({totalPageViews: totalRows, status: "ok"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({error: err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Daily summary rollup ─────────────────────────────────────────────────
function updateDailySummary(ss, ts, page, session) {
  var sumSheet = ss.getSheetByName("Traffic Summary");
  if (!sumSheet) return;
  var today    = ts.split("T")[0];
  var lastRow  = sumSheet.getLastRow();

  for (var i = 2; i <= lastRow; i++) {
    if (sumSheet.getRange(i, 1).getValue() === today) {
      var views = sumSheet.getRange(i, 2).getValue() || 0;
      sumSheet.getRange(i, 2).setValue(views + 1);
      return;
    }
  }
  sumSheet.appendRow([today, 1, 1, "", page]);
}

// ── Auto-format on sheet open ────────────────────────────────────────────
function onOpen() {
  ensureSheets();
}
