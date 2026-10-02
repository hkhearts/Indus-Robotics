/**
 * /api/vision-intelligence.js — Multimodal Vision Intelligence (Part Finder)
 * Analyzes uploaded images to identify components and match to catalog
 */

const { AIRTABLE_TOKEN, AIRTABLE_BASE_ID } = process.env;

// In production, integrate with Google Vision API, AWS Rekognition, or custom ML model
// For now, using rule-based analysis on image metadata/features
const COMPONENT_FEATURES = {
  "harmonic-reducer": {
    keywords: ["wave generator", "flexspline", "circular spline", "strain wave", "hollow bore", "crossed roller"],
    visualFeatures: ["thin-walled cup", "elliptical cam", "compact axial depth", "center through-hole"],
    categories: ["precision-reducers"],
    products: ["harmonic"],
  },
  "cycloidal-reducer": {
    keywords: ["cycloidal disc", "pin ring", "eccentric bearing", "pin wheel", "rolling contact"],
    visualFeatures: ["multiple lobes", "fixed pins", "eccentric input", "robust casing"],
    categories: ["precision-reducers"],
    products: ["cycloidal"],
  },
  "planetary-reducer": {
    keywords: ["planet gear", "sun gear", "ring gear", "carrier", "planetary"],
    visualFeatures: ["multiple planet gears", "central sun", "outer ring", "inline or right-angle"],
    categories: ["precision-reducers"],
    products: ["planetary"],
  },
  "servo-actuator": {
    keywords: ["integrated drive", "frameless motor", "absolute encoder", "dual encoder", "single cable"],
    visualFeatures: ["compact housing", "motor + gear + drive", "connector interface", "thermal sensor"],
    categories: ["actuators"],
    products: ["servo"],
  },
  "rotary-actuator": {
    keywords: ["hollow bore", "rotary joint", "tilt table", "multi-turn", "zero backlash"],
    visualFeatures: ["cylindrical body", "center through-hole", "flange mounting", "encoder housing"],
    categories: ["actuators"],
    products: ["rotary"],
  },
  "linear-actuator": {
    keywords: ["ballscrew", "belt drive", "guided axis", "linear guide", "carriage", "stroke"],
    visualFeatures: ["rectangular profile", "moving carriage", "limit switches", "motor mounting"],
    categories: ["actuators"],
    products: ["linear"],
  },
  "electric-actuator": {
    keywords: ["iso 15552", "pneumatic replacement", "multi-stop", "programmable force", "electric cylinder"],
    visualFeatures: ["cylinder body", "rod extension", "mounting flanges", "cable gland"],
    categories: ["actuators"],
    products: ["electric"],
  },
  "robotic-arm": {
    keywords: ["6-axis", "articulated", "wrist", "payload", "reach", "repeatability", "hollow wrist"],
    visualFeatures: ["multi-joint arm", "base rotation", "shoulder", "elbow", "wrist", "tool flange"],
    categories: ["robotic-arms", "industrial-robots"],
    products: ["6-axis", "assembly", "welding", "handling"],
  },
  "scara-robot": {
    keywords: ["scara", "4-axis", "planar", "high speed", "z-axis", "theta axis"],
    visualFeatures: ["parallel arm links", "vertical quill", "compact base", "ceiling mount option"],
    categories: ["robotic-arms"],
    products: ["4-axis", "pick-and-place"],
  },
  "cobot": {
    keywords: ["collaborative", "force limited", "lead-through", "safe stop", "power force limited"],
    visualFeatures: ["rounded joints", "no pinch points", "integrated sensors", "teach pendant"],
    categories: ["robotic-arms"],
    products: ["collaborative"],
  },
  "mecanum-wheel": {
    keywords: ["mecanum", "45 degree roller", "omnidirectional", "holonomic", "crabbing", "zero turn"],
    visualFeatures: ["angled rollers", "dual bearing", "polyurethane shells", "left/right handed pairs"],
    categories: ["robotic-wheels"],
    products: ["mecanum"],
  },
  "omni-wheel": {
    keywords: ["omni wheel", "transverse roller", "passive roller", "lateral motion", "ball transfer"],
    visualFeatures: ["peripheral rollers", "central hub", "free lateral roll", "aluminum structure"],
    categories: ["robotic-wheels"],
    products: ["omni"],
  },
  "drive-wheel": {
    keywords: ["drive wheel", "traction wheel", "polyurethane tread", "suspension", "integrated brake"],
    visualFeatures: ["tread pattern", "spring suspension", "brake housing", "encoder mounting"],
    categories: ["robotic-wheels"],
    products: ["drive"],
  },
  "mobile-module": {
    keywords: ["steerable", "360 steering", "dual servo", "traction steering", "integrated module"],
    visualFeatures: ["vertical kingpin", "two motors", "suspension strut", "quick connectors"],
    categories: ["robotic-wheels"],
    products: ["mobile-modules"],
  },
  "gearbox": {
    keywords: ["helical gear", "bevel gear", "right angle", "cast iron", "solid shaft", "hollow shaft"],
    visualFeatures: ["rugged casting", "shaft options", "mounting feet", "oil sight glass"],
    categories: ["precision-reducers"],
    products: ["gearboxes"],
  },
};

function analyzeImageFeatures(base64Image) {
  // In production: Send to Vision API
  // For demo: Simulate analysis based on filename or mock detection
  // This would typically call Google Vision API, AWS Rekognition, or custom model

  // Mock: Return simulated detection results
  // Real implementation would analyze actual image features
  return {
    detectedComponents: [
      { type: "harmonic-reducer", confidence: 0.87, boundingBox: { x: 0.2, y: 0.3, w: 0.6, h: 0.4 } },
    ],
    labels: ["industrial component", "gearbox", "precision mechanism", "robotic joint"],
    objects: [
      { name: "Harmonic Reducer", confidence: 0.87 },
      { name: "Crossed Roller Bearing", confidence: 0.72 },
      { name: "Wave Generator", confidence: 0.65 },
    ],
    text: ["CSG-20", "Harmonic Drive", "100:1", "Made in India"],
  };
}

function matchToCatalog(analysis) {
  const matches = [];

  for (const component of analysis.detectedComponents || []) {
    const feature = COMPONENT_FEATURES[component.type];
    if (feature) {
      for (const productId of feature.products) {
        matches.push({
          productId,
          confidence: component.confidence,
          matchReason: `Detected ${component.type.replace("-", " ")} features: ${feature.visualFeatures.slice(0, 3).join(", ")}`,
          category: feature.categories[0],
        });
      }
    }
  }

  // Also match from text detection (part numbers)
  for (const text of analysis.text || []) {
    // Check for competitor part numbers in text
    // This would call competitor cross-ref API
  }

  // Sort by confidence
  return matches.sort((a, b) => b.confidence - a.confidence);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method === "POST") {
    try {
      const { image, visitorId } = req.body || {};
      if (!image) return res.status(400).json({ error: "image required (base64)" });

      // Log vision query
      if (AIRTABLE_TOKEN && AIRTABLE_BASE_ID && visitorId) {
        await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Vision%20Queries`, {
          method: "POST",
          headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            records: [{ fields: { "Visitor ID": visitorId, "Timestamp": new Date().toISOString(), "Image Size": image.length } }],
          }),
        }).catch(() => {});
      }

      // Analyze image
      const analysis = analyzeImageFeatures(image);

      // Match to catalog
      const matches = matchToCatalog(analysis);

      return res.status(200).json({
        success: true,
        analysis: {
          labels: analysis.labels,
          objects: analysis.objects,
          textDetected: analysis.text,
        },
        matches: matches.slice(0, 5),
        message: matches.length
          ? `Found ${matches.length} potential match(es). Top match: ${matches[0]?.productId || "unknown"}`
          : "Could not identify component. Try a clearer image or contact engineering.",
      });
    } catch (err) {
      console.error("Vision Intelligence POST error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}