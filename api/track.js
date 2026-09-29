const TABLE_IDS = {
  page_view: "Page Views",
  click: "Clicks",
  cta_click: "CTA Interactions",
  lead: "Leads",
  form_submit: "Form Submissions",
  download: "Downloads",
  search: "Search Activity",
  navigation: "Navigation",
  whatsapp_click: "WhatsApp Enquiries",
  product_view: "Product Interest",
  product_action: "Product Interest",
  utm_visit: "UTM Campaigns",
  error: "Errors",
  scroll: "Scroll & Engagement",
  engagement: "Scroll & Engagement",
  session_start: "Website Sessions",
};

// Standardize device for select fields
function getSimpleDevice(deviceStr = "") {
  const str = String(deviceStr).toLowerCase();
  if (str.includes("mobile") || str.includes("iphone") || str.includes("android")) return "Mobile";
  if (str.includes("tablet") || str.includes("ipad")) return "Tablet";
  return "Desktop";
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const {
      AIRTABLE_TOKEN,
      AIRTABLE_BASE_ID,
      AIRTABLE_TABLE_ID,
    } = process.env;

    if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
      return res.status(500).json({
        success: false,
        error: "Airtable environment variables missing",
      });
    }

    const p = req.method === "POST"
      ? req.body || {}
      : req.query || {};

    const event = p.event || "page_view";
    const timestamp = new Date().toISOString();
    const sessionId = p.session || p.sessionId || `sess_${Date.now()}`;
    const page = p.page || "/";
    const url = p.url || "";
    const rawDevice = p.device || "Desktop";
    const simpleDevice = getSimpleDevice(rawDevice);
    const screen = p.screen || p.screen_resolution || "";
    const referrer = p.referrer || "Direct";
    const element = p.element || "";
    const details = p.details || "";

    // 1. Try to record into event-specific table
    const targetTableName = TABLE_IDS[event] || "Website Activity";
    let fields = {};

    if (targetTableName === "Page Views") {
      fields = {
        "Session ID": sessionId,
        Page: page,
        "Page Title": details || page,
        URL: url,
        Referrer: referrer,
        Device: rawDevice,
        "Screen Size": screen,
        Timestamp: timestamp,
      };
      if (p.browser) fields.Browser = p.browser;
      if (p.source) fields["UTM Source"] = p.source;
      if (p.medium) fields["UTM Medium"] = p.medium;
      if (p.campaign) fields["UTM Campaign"] = p.campaign;
    } else if (targetTableName === "Form Submissions") {
      fields = {
        "Session ID": sessionId,
        "Form Name": p.form || element || "Contact Form",
        Page: page,
        URL: url,
        "Submission Status": "Success",
        Device: rawDevice,
        Timestamp: timestamp,
      };
      if (p.name) fields.Name = p.name;
      if (p.email) fields.Email = p.email;
      if (p.phone) fields.Phone = p.phone;
      if (p.company) fields.Company = p.company;
      if (p.product) fields.Product = p.product;
      if (details) fields.Requirement = details;
    } else if (targetTableName === "Downloads") {
      fields = {
        "Session ID": sessionId,
        "File Name": p.file || element || "Spec Sheet",
        "File Type": "PDF",
        Page: page,
        URL: url,
        Device: rawDevice,
        Timestamp: timestamp,
      };
      if (p.product) fields.Product = p.product;
    } else if (targetTableName === "WhatsApp Enquiries") {
      fields = {
        "Session ID": sessionId,
        Page: page,
        "Button Name": element || "WhatsApp Chat",
        Device: rawDevice,
        Referrer: referrer,
        Timestamp: timestamp,
      };
      if (p.cta || details) fields.CTA = p.cta || details;
      if (p.product) fields.Product = p.product;
    } else if (targetTableName === "Clicks") {
      fields = {
        "Session ID": sessionId,
        Page: page,
        URL: url,
        Element: element,
        "Element Text": details,
        "Click Type": event,
        Details: details,
        Device: rawDevice,
        "Screen Size": screen,
        Timestamp: timestamp,
      };
    } else {
      // Default: Website Activity
      fields = {
        Name: `${event} - ${page}`,
        "Activity Type": event,
        Timestamp: timestamp,
        Page: page,
        URL: url,
        Device: simpleDevice,
        "Screen Size": screen,
        "Session ID": sessionId,
        Referrer: referrer,
        Details: details,
        Element: element,
      };
    }

    // Call Airtable API for target table
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(targetTableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.warn(`Airtable write to "${targetTableName}" failed (${response.status}), falling back to "Website Activity"...`, data);

      // Fallback: Always write to Website Activity table (tbl6BUkalN1cSOAny)
      const fallbackFields = {
        Name: `${event} - ${page}`,
        "Activity Type": event,
        Timestamp: timestamp,
        Page: page,
        URL: url,
        Device: simpleDevice,
        "Screen Size": screen,
        "Session ID": sessionId,
        Referrer: referrer,
        Details: details,
        Element: element,
      };

      const fallbackTable = AIRTABLE_TABLE_ID || "tbl6BUkalN1cSOAny";
      const fallbackResponse = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(fallbackTable)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fields: fallbackFields }),
        }
      );

      const fallbackData = await fallbackResponse.json();
      if (!fallbackResponse.ok) {
        console.error("Airtable fallback error:", fallbackData);
        return res.status(fallbackResponse.status).json({
          success: false,
          error: fallbackData,
        });
      }

      return res.status(200).json({
        success: true,
        event,
        table: fallbackTable,
        recordId: fallbackData.id,
      });
    }

    return res.status(200).json({
      success: true,
      event,
      table: targetTableName,
      recordId: data.id,
    });
  } catch (error) {
    console.error("Tracking handler error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
