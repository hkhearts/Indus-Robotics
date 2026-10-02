/**
 * /api/smart-bom.js — Ecosystem Compatibility Intelligence (Smart BOM)
 * GET ?productId=6-axis → matched companion components
 */
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

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  const { productId } = req.query || {};
  if (!productId) return res.status(400).json({ error: "productId required" });
  const key = String(productId).toLowerCase();
  const found = COMPAT[key] || null;
  if (!found) return res.status(200).json({ productId, companions: [], why: null });
  return res.status(200).json({ productId, companions: found.needs, why: found.why });
}
