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
 */

var SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

// ── Ensure all sheets exist ───────────────────────────────────────────────
function ensureSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tabs = ["Page Views", "Visitors", "Form Submissions", "Traffic Summary", "Chat Sessions"];
  var headers = {
    "Page Views": ["Timestamp", "Page", "Session ID", "Country", "City", "Device", "Referrer"],
    "Visitors": ["Timestamp", "IP", "Country", "City", "Visit Count", "Last Page"],
    "Form Submissions": ["Timestamp", "Form Type", "Name", "Email", "Company", "Product", "Requirements"],
    "Traffic Summary": ["Date", "Total Views", "Unique Sessions", "Countries", "Top Page"],
    "Chat Sessions": ["Timestamp", "Session ID", "Message", "Intent", "Country"],
  };
  
  tabs.forEach(function(name) {
    var sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
      var hdr = headers[name];
      if (hdr) {
        sheet.getRange(1, 1, 1, hdr.length).setValues([hdr]);
        sheet.getRange(1, 1, 1, hdr.length).setFontWeight("bold")
          .setBackground("#1a1a2e").setFontColor("#4d9fff");
        sheet.setFrozenRows(1);
      }
    }
  });
}

// ── POST handler from website ────────────────────────────────────────────
function doPost(e) {
  try {
    ensureSheets();
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);
    var type = data.type || "page_view";
    var ts = data.serverTimestamp || new Date().toISOString();

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
    
    return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: err.message})).setMimeType(ContentService.MimeType.JSON);
  }
}

// ── GET handler — returns quick stats ────────────────────────────────────
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var pvSheet = ss.getSheetByName("Page Views");
    var totalRows = pvSheet ? pvSheet.getLastRow() - 1 : 0;
    return ContentService.createTextOutput(JSON.stringify({totalPageViews: totalRows, status: "ok"})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({error: err.message})).setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Daily summary rollup ─────────────────────────────────────────────────
function updateDailySummary(ss, ts, page, session) {
  var sumSheet = ss.getSheetByName("Traffic Summary");
  if (!sumSheet) return;
  var today = ts.split("T")[0];
  var lastRow = sumSheet.getLastRow();
  
  // Find today's row or create it
  for (var i = 2; i <= lastRow; i++) {
    if (sumSheet.getRange(i, 1).getValue() === today) {
      var views = sumSheet.getRange(i, 2).getValue() || 0;
      sumSheet.getRange(i, 2).setValue(views + 1);
      return;
    }
  }
  // New day
  sumSheet.appendRow([today, 1, 1, "", page]);
}

// ── Auto-format on sheet open ────────────────────────────────────────────
function onOpen() {
  ensureSheets();
}
