/**
 * /api/intel.js — Combined Intelligence Endpoint (Hobby Plan Optimization)
 * Routes: smart-bom, supply-chain, predictive-maintenance
 */

const { AIRTABLE_TOKEN, AIRTABLE_BASE_ID } = process.env;

// --- SMART BOM DATA ---
const COMPAT = {
  "6-axis": { needs: ["servo-drives", "harmonic", "sensors-feedback"], why: "To power this 6-axis arm you will need 400W-class servo drives and absolute encoders." },
  assembly: { needs: ["servo-drives", "harmonic", "robot-controllers"], why: "Assembly cells need servo drives + harmonic gearing + robot controller." },
  welding: { needs: ["servo-drives", "cycloidal", "robot-controllers"], why: "Welding needs cycloidal base axes + servo drives + seam-tracking controller." },
  handling: { needs: ["servo-drives", "cycloidal", "plc-automation"], why: "Heavy handling needs cycloidal gearing + servo drives + PLC sequencing." },
  servo: { needs: ["servo-drives", "harmonic", "motion-controllers"], why: "Servo actuators pair with matched drives + EtherCAT controllers." },
  rotary: { needs: ["servo-drives", "harmonic"], why: "Rotary joints need matched drives + zero-backlash gearing." },
  linear: { needs: ["servo-drives", "motion-controllers"], why: "Linear axes need drives + motion controllers." },
  harmonic: { needs: ["rotary", "servo-drives"], why: "Harmonic reducers mount to servo motors / joint housings." },
  cycloidal: { needs: ["handling", "servo-drives"], why: "Cycloidal suits base/shoulder joints + high-torque drives." },
  planetary: { needs: ["linear", "servo-drives"], why: "Planetary heads clamp to standard servo motors." },
  drive: { needs: ["servo-drives", "motion-controllers"], why: "Drive wheels need coordinated DC drives." },
  mecanum: { needs: ["servo-drives", "motion-controllers"], why: "Mecanum needs 4 independent axes + vector kinematics." },
  "robot-controllers": { needs: ["servo-drives", "sensors-feedback"], why: "Controllers need matched drives + BiSS-C/EnDat feedback." },
  "motion-controllers": { needs: ["servo-drives", "plc-automation"], why: "Motion controllers sync drives over EtherCAT." },
};

// --- SUPPLY CHAIN DATA ---
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

// --- PREDICTIVE MAINTENANCE DATA ---
const MAINTENANCE_INTERVALS = {
  "robotic-arms": 10000,
  "industrial-robots": 10000,
  "actuators": 5000,
  "precision-reducers": 20000,
  "robotic-wheels": 8000,
  "control-systems": 15000,
};

const MAINTENANCE_PARTS = {
  "robotic-arms": ["Lubrication Kit", "Seal Kit", "Cable Pack", "Brake Assembly"],
  "industrial-robots": ["Lubrication Kit", "Seal Kit", "Cable Pack", "Filter Set"],
  "actuators": ["Lubrication Grease", "Seal Kit", "Wiper Kit"],
  "precision-reducers": ["High-Performance Gear Oil", "Seal Kit", "Bearing Set"],
  "robotic-wheels": ["Polyurethane Tire", "Bearing Set", "Brake Pad Kit"],
  "control-systems": ["Fan Filter", "Battery Backup", "Capacitor Bank"],
};

async function getPurchaseHistory(recordId) {
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) return null;
  const filterFormula = encodeURIComponent(`{Visitor Record ID} = "${recordId}"`);
  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Purchase%20History?filterByFormula=${filterFormula}&maxRecords=50`,
    { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
  );
  const data = res.ok ? await res.json() : { records: [] };
  return data.records || [];
}

// --- MAIN HANDLER ---
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  const { type, productId, recordId } = req.query || {};

  try {
    if (type === "smart-bom") {
      if (!productId) return res.status(400).json({ error: "productId required" });
      const key = String(productId).toLowerCase();
      const found = COMPAT[key] || null;
      if (!found) return res.status(200).json({ productId, companions: [], why: null });
      return res.status(200).json({ productId, companions: found.needs, why: found.why });
    }

    if (type === "supply-chain") {
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
    }

    if (type === "predictive-maintenance") {
      if (!recordId) return res.status(400).json({ error: "recordId required" });
      const purchases = await getPurchaseHistory(recordId);
      const now = new Date();
      const maintenanceAlerts = [];
      for (const purchase of purchases) {
        const fields = purchase.fields;
        const productCategory = fields["Product Category"] || "";
        const purchaseDate = new Date(fields["Purchase Date"]);
        const quantity = fields["Quantity"] || 1;
        const intervalHours = MAINTENANCE_INTERVALS[productCategory] || 10000;
        const daysSincePurchase = Math.floor((now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
        const estimatedHours = Math.floor(daysSincePurchase * 8); // 8 hours per day assumption
        const hoursUntilMaintenance = intervalHours - estimatedHours;
        const percentUsed = (estimatedHours / intervalHours) * 100;
        if (percentUsed >= 80) {
          maintenanceAlerts.push({
            productName: fields["Product Name"],
            productCategory,
            purchaseDate: fields["Purchase Date"],
            quantity,
            maintenanceIntervalHours: intervalHours,
            estimatedHoursUsed: estimatedHours,
            hoursUntilMaintenance: Math.max(0, hoursUntilMaintenance),
            percentUsed: Math.min(100, percentUsed),
            recommendedParts: MAINTENANCE_PARTS[productCategory] || [],
            urgency: percentUsed >= 100 ? "overdue" : percentUsed >= 90 ? "critical" : "upcoming",
          });
        }
      }
      return res.status(200).json({
        hasAlerts: maintenanceAlerts.length > 0,
        alerts: maintenanceAlerts,
        totalProducts: purchases.length,
      });
    }

    return res.status(400).json({ error: "Invalid or missing 'type' query parameter" });
  } catch (err) {
    console.error("Intel API Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
