/**
 * /api/chat.js — AI Chatbot API
 * Uses visitor data + product knowledge to answer questions in NLP style.
 * No external AI API needed — uses rule-based NLP with smart pattern matching.
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
const PRODUCT_KEYWORDS = ["actuator", "reducer", "wheel", "arm", "robot", "control"];
const DEMO_KEYWORDS = ["demo", "trial", "test", "try", "sample", "prototype"];
const CONTACT_KEYWORDS = ["contact", "call", "phone", "email", "talk", "speak", "whatsapp"];
const WARRANTY_KEYWORDS = ["warranty", "guarantee", "support", "service", "maintenance"];
const DELIVERY_KEYWORDS = ["delivery", "shipping", "lead time", "when", "how long", "dispatch"];

function detectIntent(msg) {
  const lower = msg.toLowerCase();
  if (GREETINGS.some((g) => lower.includes(g))) return "greeting";
  if (PRICING_KEYWORDS.some((k) => lower.includes(k))) return "pricing";
  if (DEMO_KEYWORDS.some((k) => lower.includes(k))) return "demo";
  if (CONTACT_KEYWORDS.some((k) => lower.includes(k))) return "contact";
  if (WARRANTY_KEYWORDS.some((k) => lower.includes(k))) return "warranty";
  if (DELIVERY_KEYWORDS.some((k) => lower.includes(k))) return "delivery";
  for (const [product, info] of Object.entries(PRODUCT_KNOWLEDGE)) {
    if (product.split(" ").some((w) => lower.includes(w))) return { intent: "product", product, info };
  }
  return "general";
}

function buildResponse(intent, visitorCtx) {
  const { isReturning, visitCount, name, lastPage, geo } = visitorCtx || {};
  const greeting = name ? `Hi ${name}` : isReturning ? "Welcome back" : "Hello";
  const location = geo?.city ? ` from ${geo.city}` : "";

  if (intent === "greeting") {
    if (isReturning && visitCount > 2) {
      return `${greeting}${location}! Great to see you again — this is your visit #${visitCount}. ${lastPage && lastPage !== "/" ? `You were last exploring our ${lastPage.replace("/", "").replace(/-/g, " ")} section.` : ""} How can I help you today?`;
    }
    if (isReturning) {
      return `${greeting}! Good to have you back${location}. Looking for something specific today? I can help with products, pricing, or technical specs.`;
    }
    return `${greeting}! Welcome to Indus Robotics${location}. I'm your technical assistant. Ask me about our robotic arms, actuators, precision reducers, or request a quote!`;
  }

  if (intent === "pricing") {
    return `Pricing depends on the specific configuration and quantity. For an accurate quote tailored to your requirements, I'd suggest filling our quote form or chatting with an engineer via WhatsApp (+91 93612 49474). ${isReturning ? "Since you've visited before, our team can pick up right from your previous enquiry!" : ""}`;
  }

  if (intent === "demo") {
    return "We offer live demonstrations at our facility and virtual demos via video call. Would you like me to arrange one? You can also request a technical consultation using the 'Talk to an Engineer' button.";
  }

  if (intent === "contact") {
    return "You can reach us at:\n📧 rfq@indus-robotics.com\n📞 +91 93612 49474 (WhatsApp available)\nOr use the 'Request a Quote' button for a formal enquiry.";
  }

  if (intent === "warranty") {
    return "All Indus Robotics products come with a standard 12-month warranty covering manufacturing defects. Precision reducers carry a lifetime warranty on backlash specification. Extended service contracts are available.";
  }

  if (intent === "delivery") {
    return "Standard delivery lead time is 2–4 weeks for standard products, 6–8 weeks for custom configurations. We ship globally. For urgent requirements, please contact our sales team directly.";
  }

  if (intent?.intent === "product") {
    return `${intent.info}\n\nWant detailed specifications or a quote for ${intent.product}? Use the 'Request a Quote' button or type 'contact' to reach our team.`;
  }

  // General fallback
  return `That's a great question! I can help you with information about our robotic arms, actuators, precision reducers, mobile robotics, or control systems. You can also ask about pricing, delivery, or request a demo. What would you like to know?`;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message, visitorCtx, sessionHistory = [] } = req.body || {};
    if (!message) return res.status(400).json({ error: "message required" });

    // Log chat to Airtable
    const { AIRTABLE_TOKEN, AIRTABLE_BASE_ID } = process.env;
    if (AIRTABLE_TOKEN && AIRTABLE_BASE_ID) {
      fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Chat%20Sessions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            "Visitor IP": visitorCtx?.ip || "unknown",
            Message: message,
            Timestamp: new Date().toISOString(),
            "Session ID": visitorCtx?.recordId || "",
            Country: visitorCtx?.geo?.country || "",
          },
        }),
      }).catch(() => {});
    }

    const intent = detectIntent(message);
    const reply = buildResponse(intent, visitorCtx);

    // Typing delay simulation via response metadata
    return res.status(200).json({
      reply,
      intent: typeof intent === "object" ? intent.intent : intent,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({ error: err.message });
  }
}
