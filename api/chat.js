/**
 * /api/chat.js — AI Chatbot API with 14-feature intelligence
 * - Semantic engineering search, competitor xref, document context,
 *   complexity escalation (chatbot -> Jira -> human), intent-aware replies.
 */

const PRODUCT_KNOWLEDGE = {
  actuators: "We offer linear and rotary actuators with precision ±0.01mm, load capacity up to 500kg, IP67 rating. Suitable for automotive, electronics, and food processing.",
  "precision reducers": "Our precision reducers include harmonic drives and cycloidal reducers with arc-minute backlash. Reduction ratios 3:1 to 320:1, lifetime warranty.",
  "robotic wheels": "Indus Robotics wheels are engineered for AGV/AMR platforms with polyurethane tires, encoder integration, and swappable hub motors.",
  "robotic arms": "6-axis articulated arms with 3kg to 80kg payload, ±0.02mm repeatability, EtherCAT/PROFINET compatible, collaborative safety rated.",
  "industrial robots": "Full industrial robot cells for welding, assembly, palletizing. Turnkey solutions with PLC integration and remote monitoring.",
  "control systems": "Proprietary motion controllers with real-time 1ms cycle time, multi-axis synchronization, and cloud telemetry.",
};

const GREETINGS = ["hi", "hello", "hey", "hiya", "namaste", "good morning", "good afternoon", "good evening"];
const PRICING_KEYWORDS = ["price", "cost", "quote", "how much", "budget", "rate"];
const DEMO_KEYWORDS = ["demo", "trial", "test", "try", "sample", "prototype"];
const CONTACT_KEYWORDS = ["contact", "call", "phone", "email", "talk", "speak", "whatsapp"];
const WARRANTY_KEYWORDS = ["warranty", "guarantee", "support", "service", "maintenance"];
const DELIVERY_KEYWORDS = ["delivery", "shipping", "lead time", "when", "how long", "dispatch"];
const COMPLEX_KEYWORDS = ["kinematics", "inverse kinematics", "dh parameters", "jacobian", "trajectory optimization", "dynamic model", "torque feedforward", "vibration suppression", "compliance control", "impedance control"];
const ETHERNET_KEYWORDS = ["ethercat", "profinet", "canopen", "ethernet/ip", "fieldbus"];

const COMPETITOR_PATTERNS = [/a06b[\s-]*\d+/i, /sgm7s[\s-]*\d*/i, /csg[\s-]*\d+/i, /shg[\s-]*\d+/i, /rv[\s-]*\d+/i, /hf[\s-]*kp\d+/i, /ur[\s-]*\d+/i, /r88m/i, /ec[\s-]*4pole/i];

function detectIntent(msg) {
  const lower = msg.toLowerCase();
  if (COMPLEX_KEYWORDS.some((k) => lower.includes(k))) return "complex";
  if (COMPETITOR_PATTERNS.some((re) => re.test(msg))) return "competitor";
  if (GREETINGS.some((g) => lower.includes(g))) return "greeting";
  if (PRICING_KEYWORDS.some((k) => lower.includes(k))) return "pricing";
  if (DEMO_KEYWORDS.some((k) => lower.includes(k))) return "demo";
  if (CONTACT_KEYWORDS.some((k) => lower.includes(k))) return "contact";
  if (WARRANTY_KEYWORDS.some((k) => lower.includes(k))) return "warranty";
  if (DELIVERY_KEYWORDS.some((k) => lower.includes(k))) return "delivery";
  if (ETHERNET_KEYWORDS.some((k) => lower.includes(k))) return "fieldbus";
  // Semantic: physics intent
  if (lower.includes("high torque") && (lower.includes("small") || lower.includes("compact") || lower.includes("space")))
    return { intent: "semantic", routeTo: ["harmonic", "cycloidal"], label: "Harmonic Reducers / Cycloidal Reducers" };
  if (lower.includes("high torque")) return { intent: "semantic", routeTo: ["cycloidal", "planetary"], label: "Cycloidal / Planetary high-torque gearing" };
  for (const [product, info] of Object.entries(PRODUCT_KNOWLEDGE)) {
    if (product.split(" ").some((w) => lower.includes(w))) return { intent: "product", product, info };
  }
  return "general";
}

function buildResponse(intent, visitorCtx, extra) {
  const { isReturning, visitCount, name, lastPage, geo } = visitorCtx || {};
  const greeting = name ? `Hi ${name}` : isReturning ? "Welcome back" : "Hello";

  if (intent === "complex") {
    return `This requires a deep engineering review — I've packaged your exact specs and created a priority ticket${extra?.ticketKey ? ` (${extra.ticketKey})` : ""} for our senior automation engineer. They will step into this chat within ~60 seconds. Meanwhile: what payload, reach and cycle-time are you targeting?`;
  }
  if (intent === "competitor") {
    const m = extra?.crossRef;
    if (m?.found) return `Looking for an alternative to ${m.competitorPart}? Here is our drop-in replacement: ${m.indusProductName} — ${m.notes}. Identical mounting where stated. Want a datasheet or quote?`;
    return `Send me the exact competitor part number (e.g. Fanuc A06B, Yaskawa SGM7S, Harmonic CSG) and I'll map our drop-in replacement with identical mounting dimensions.`;
  }
  if (intent === "fieldbus") {
    return `All our Control Systems support deterministic fieldbuses. For EtherCAT: choose Robot Controllers / Motion Controllers / Servo Drives with EtherCAT DC (sub-microsecond jitter, 4kHz position loop). Want me to filter to EtherCAT-only models?`;
  }
  if (intent?.intent === "semantic") {
    return `Understood — "${intent.label}" is the right physics match. I'd route you to: ${intent.routeTo.join(", ")}. Open Search to compare them, or tell me payload + envelope and I'll size it.`;
  }
  if (intent === "greeting") {
    const doc = visitorCtx?.documentContext?.lastDownloaded;
    const nudge = doc && /ethercat/i.test(doc) ? ` I saw you were reading about EtherCAT — want me to filter Control Systems to EtherCAT-compatible models?` : "";
    if (isReturning && visitCount > 2) return `${greeting}! Visit #${visitCount}.${lastPage && lastPage !== "/" ? ` Last time: ${lastPage.replace(/\//g, " ").trim()}.` : ""}${nudge} How can I help?`;
    if (isReturning) return `${greeting}! Good to have you back.${nudge} Products, pricing, or specs?`;
    return `${greeting}! Welcome to Indus Robotics. Ask about arms, actuators, reducers, EtherCAT controls — or upload a part photo for matching!${nudge}`;
  }
  if (intent === "pricing") return `Pricing depends on configuration & quantity. Request a Quote or WhatsApp +91 93612 49474.${isReturning ? " We'll pick up from your previous enquiry!" : ""}`;
  if (intent === "demo") return "We offer live + virtual demos. Use 'Talk to an Engineer' and we'll schedule one.";
  if (intent === "contact") return "Reach us:\nrfq@indus-robotics.com\n+91 93612 49474 (WhatsApp)\nOr 'Request a Quote'.";
  if (intent === "warranty") return "12-month standard warranty; lifetime backlash warranty on precision reducers. Extended contracts available.";
  if (intent === "delivery") return "Standard 2–4 weeks, custom 6–8 weeks, global shipping. For urgent needs contact sales.";
  if (intent?.intent === "product") return `${intent.info}\n\nWant specs or a quote for ${intent.product}? Hit 'Request a Quote' or type 'contact'.`;
  return `I can help with arms, actuators, reducers, mobile robotics, or controls — plus competitor cross-reference ("SGM7S-04"), physics search ("high torque small space"), or photo part-finder. What do you need?`;
}

async function createEscalationTicket(message, visitorCtx) {
  const { JIRA_DOMAIN, JIRA_EMAIL, JIRA_API_TOKEN, JIRA_PROJECT_KEY } = process.env;
  if (!JIRA_DOMAIN || !JIRA_EMAIL || !JIRA_API_TOKEN) return null;
  try {
    const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64");
    const r = await fetch(`https://${JIRA_DOMAIN}/rest/api/3/issue`, {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        fields: {
          project: { key: JIRA_PROJECT_KEY || "KAN" },
          summary: `[Chat Escalation] Complex kinematics question — ${visitorCtx?.ip || "unknown IP"}`,
          description: { version: 1, type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: `Visitor: ${visitorCtx?.ip} (${visitorCtx?.geo?.city}, ${visitorCtx?.geo?.country}). Company: ${visitorCtx?.firmographic?.companyName || "unknown"}. Question: ${message}` }] }] },
          issuetype: { name: "Task" },
          priority: { name: "Highest" },
          labels: ["chat-escalation", "complex-kinematics"],
        },
      }),
    });
    const j = await r.json();
    return r.ok ? j.key : null;
  } catch { return null; }
}

async function lookupCompetitorServer(part) {
  const norm = String(part).toLowerCase().replace(/[^a-z0-9]/g, "");
  const MAP = { "a06b6079h104": ["harmonic", "Harmonic Reducer", "Drop-in for Fanuc wrist"], "sgm7s01": ["servo", "Servo Actuator", "Yaskawa Sigma-7 100W flange"], "sgm7s02": ["servo", "Servo Actuator", "Yaskawa Sigma-7 200W flange"], "sgm7s04": ["servo", "Servo Actuator", "Yaskawa Sigma-7 400W flange"], "csg14": ["harmonic", "Harmonic Reducer", "Direct CSG-14 replacement"], "csg20": ["harmonic", "Harmonic Reducer", "Direct CSG-20 replacement"], "rv10": ["cycloidal", "Cycloidal Reducer", "Nabtesco RV-10C replacement"], "rv20": ["cycloidal", "Cycloidal Reducer", "Nabtesco RV-20C replacement"], "hfkp13": ["servo", "Servo Actuator", "Mitsubishi HF-KP13 equivalent"], "ur10": ["collaborative", "Collaborative Robot", "UR10e equivalent"], "ur5": ["collaborative", "Collaborative Robot", "UR5e equivalent"] };
  for (const [k, v] of Object.entries(MAP)) { if (norm.includes(k) || k.includes(norm)) return { found: true, competitorPart: part, indusProductId: v[0], indusProductName: v[1], notes: v[2] }; }
  return { found: false, competitorPart: part };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { message, visitorCtx } = req.body || {};
    if (!message) return res.status(400).json({ error: "message required" });

    const { AIRTABLE_TOKEN, AIRTABLE_BASE_ID } = process.env;
    if (AIRTABLE_TOKEN && AIRTABLE_BASE_ID) {
      fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Chat%20Sessions`, {
        method: "POST",
        headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({ records: [{ fields: { "Visitor IP": visitorCtx?.ip || "unknown", Message: String(message).slice(0, 500), Timestamp: new Date().toISOString(), "Session ID": visitorCtx?.recordId || "", Country: visitorCtx?.geo?.country || "" } }] }),
      }).catch(() => {});
    }

    const intent = detectIntent(message);
    let extra = {};
    let escalated = false;
    let ticketKey = null;

    if (intent === "competitor") {
      const m = message.match(/[A-Za-z0-9]+[\s-]*[0-9][A-Za-z0-9\s-]*/);
      extra.crossRef = await lookupCompetitorServer(m ? m[0].trim() : message);
    }
    if (intent === "complex") {
      ticketKey = await createEscalationTicket(message, visitorCtx);
      extra.ticketKey = ticketKey;
      escalated = true;
    }

    const reply = buildResponse(intent, visitorCtx, extra);
    return res.status(200).json({ reply, intent: typeof intent === "object" ? intent.intent : intent, escalated, ticketKey, crossRef: extra.crossRef || null, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({ error: err.message });
  }
}
