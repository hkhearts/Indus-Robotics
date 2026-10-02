/**
 * /api/supply-chain.js — Intelligent Supply-Chain Routing
 * Checks stock/lead time and suggests in-stock alternatives
 */

const { AIRTABLE_TOKEN, AIRTABLE_BASE_ID } = process.env;

const PRODUCT_ALTERNATIVES = {
  "harmonic": { altId: "cycloidal", altName: "Cycloidal Reducer", reason: "Higher shock capacity, in stock", specsMatch: "Meets torque/backlash requirements" },
  "planetary": { altId: "harmonic", altName: "Harmonic Reducer", reason: "Zero backlash, compact", specsMatch: "Exceeds precision requirements" },
  "cycloidal": { altId: "planetary", altName: "Planetary Reducer", reason: "High efficiency, available", specsMatch: "Meets torque requirements" },
  "linear": { altId: "electric", altName: "Electric Actuator", reason: "Programmable force, in stock", specsMatch: "Meets thrust/precision requirements" },
  "rotary": { altId: "servo", altName: "Servo Actuator", reason: "Integrated drive, available", specsMatch: "Exceeds torque/speed specs" },
  "servo": { altId: "rotary", altName: "Rotary Actuator", reason: "Hollow bore, in stock", specsMatch: "Meets torque/precision requirements" },
  "drive": { altId: "mecanum", altName: "Mecanum Wheel", reason: "Omnidirectional, available", specsMatch: "Exceeds payload/traction requirements" },
  "omni": { altId: "mecanum", altName: "Mecanum Wheel", reason: "Higher load capacity, in stock", specsMatch: "Meets mobility requirements" },
  "mecanum": { altId: "drive", altName: "Drive Wheel", reason: "Higher traction, available", specsMatch: "Meets speed/payload requirements" },
  "mobile-modules": { altId: "drive", altName: "Drive Wheel", reason: "Simpler integration, available", specsMatch: "Meets basic mobility requirements" },
  "4-axis": { altId: "6-axis", altName: "6-Axis Robot", reason: "More versatile, in stock", specsMatch: "Exceeds reach/payload requirements" },
  "6-axis": { altId: "collaborative", altName: "Collaborative Robot", reason: "Safe operation, available", specsMatch: "Meets precision/safety requirements" },
  "collaborative": { altId: "6-axis", altName: "6-Axis Robot", reason: "Higher payload, in stock", specsMatch: "Exceeds precision requirements" },
  "pick-and-place": { altId: "4-axis", altName: "4-Axis Robot", reason: "High speed, available", specsMatch: "Meets cycle time requirements" },
  "assembly": { altId: "6-axis", altName: "6-Axis Robot", reason: "Flexible deployment, in stock", specsMatch: "Meets precision/reach requirements" },
  "welding": { altId: "6-axis", altName: "6-Axis Robot", reason: "Hollow wrist available", specsMatch: "Meets welding requirements" },
  "handling": { altId: "6-axis", altName: "6-Axis Robot", reason: "Heavy payload option available", specsMatch: "Exceeds payload requirements" },
  "inspection": { altId: "6-axis", altName: "6-Axis Robot", reason: "Zero vibration option available", specsMatch: "Meets pose stability requirements" },
  "palletizing": { altId: "6-axis", altName: "6-Axis Robot", reason: "High reach available", specsMatch: "Meets payload/reach requirements" },
  "robot-controllers": { altId: "motion-controllers", altName: "Motion Controller", reason: "Multi-axis sync, in stock", specsMatch: "Meets control requirements" },
  "motion-controllers": { altId: "robot-controllers", altName: "Robot Controller", reason: "Integrated kinematics, available", specsMatch: "Exceeds axis count requirements" },
  "servo-drives": { altId: "plc-automation", altName: "PLC & Automation", reason: "Integrated drive control, available", specsMatch: "Meets fieldbus requirements" },
  "plc-automation": { altId: "servo-drives", altName: "Servo Drive", reason: "High bandwidth, in stock", specsMatch: "Meets control loop requirements" },
  "sensors-feedback": { altId: "servo-drives", altName: "Servo Drive", reason: "Integrated feedback, available", specsMatch: "Meets resolution requirements" },
};

async function getProductStock(productId) {
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) return { inStock: true, leadTimeWeeks: 2 };

  const filterFormula = encodeURIComponent(`{Product ID} = "${productId}"`);
  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Inventory?filterByFormula=${filterFormula}&maxRecords=1`,
    { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
  );
  const data = res.ok ? await res.json() : { records: [] };

  if (data.records?.length) {
    const fields = data.records[0].fields;
    return {
      inStock: fields["In Stock"] === true,
      leadTimeWeeks: fields["Lead Time Weeks"] || 4,
      stockLevel: fields["Stock Level"] || 0,
    };
  }

  return { inStock: true, leadTimeWeeks: 2 };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method === "GET") {
    try {
      const { productId } = req.query;
      if (!productId) return res.status(400).json({ error: "productId required" });

      const stock = await getProductStock(productId);

      let alternative = null;
      if (!stock.inStock || stock.leadTimeWeeks > 4) {
        const alt = PRODUCT_ALTERNATIVES[productId];
        if (alt) {
          const altStock = await getProductStock(alt.altId);
          if (altStock.inStock && altStock.leadTimeWeeks <= stock.leadTimeWeeks) {
            alternative = { ...alt, ...altStock };
          }
        }
      }

      return res.status(200).json({
        productId,
        ...stock,
        alternative,
        recommendation: alternative
          ? `Consider ${alternative.altName} — ${alternative.reason}. ${alternative.specsMatch}.`
          : stock.inStock
          ? "Product is in stock with normal lead time."
          : "Product has extended lead time. Contact sales for expedited options.",
      });
    } catch (err) {
      console.error("Supply Chain GET error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}