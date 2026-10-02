/**
 * /api/predictive-maintenance.js — Predictive Maintenance Intelligence
 * Checks purchase history against maintenance intervals
 */

const { AIRTABLE_TOKEN, AIRTABLE_BASE_ID } = process.env;

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

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method === "GET") {
    try {
      const { recordId } = req.query;
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

        // Estimate hours based on time elapsed (assuming 8h/day, 5d/week = ~2000h/year)
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
    } catch (err) {
      console.error("Predictive Maintenance GET error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}