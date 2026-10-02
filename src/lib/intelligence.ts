/**
 * src/lib/intelligence.ts
 * Central client-side intelligence engine covering all 14 features.
 * No external deps — deterministic, offline-safe, Airtable/Jira-backed via /api/*.
 */

import type { VisitorData } from "./visitor";

// ── 1. Reverse-IP Firmographic → Hero / Industry adaptation ───────────────
export const INDUSTRY_HERO: Record<string, { headline: string; sub: string; ctaIndustry: string; priorityApp: string }> = {
  automotive: {
    headline: "Automation for Automotive Assembly Lines",
    sub: "Welding, powertrain & EV battery-pack cells engineered for takt-time reliability.",
    ctaIndustry: "Automotive",
    priorityApp: "automotive",
  },
  electronics: {
    headline: "Micro-Precision for Electronics & Semiconductors",
    sub: "Cleanroom-ready handling, micro-placement & PCB testing motion.",
    ctaIndustry: "Electronics",
    priorityApp: "electronics",
  },
  manufacturing: {
    headline: "CNC Tending & Heavy-Duty Manufacturing Cells",
    sub: "Machine tending, stamping & finishing with 24/7 duty cycles.",
    ctaIndustry: "Manufacturing",
    priorityApp: "manufacturing",
  },
  logistics: {
    headline: "Intralogistics Fleets That Never Stop",
    sub: "AGV/AMR traction, ASRS picking & cross-dock transport.",
    ctaIndustry: "Logistics",
    priorityApp: "logistics",
  },
  food: {
    headline: "Hygienic Automation for Food & Packaging",
    sub: "Washdown-safe pick-and-place, bagging & palletizing.",
    ctaIndustry: "Food & Packaging",
    priorityApp: "food-packaging",
  },
  aerospace: {
    headline: "High-Rigidity Motion for Aerospace Assembly",
    sub: "Heavy-moment joints & metrology-grade inspection paths.",
    ctaIndustry: "Manufacturing",
    priorityApp: "manufacturing",
  },
  medical: {
    headline: "Precision Motion for Medical & Pharma",
    sub: "Repeatable, traceable assembly & lab handling.",
    ctaIndustry: "Electronics",
    priorityApp: "electronics",
  },
  energy: {
    headline: "Rugged Automation for Energy & Heavy Plant",
    sub: "Shock-tolerant reducers & sealed actuators for harsh sites.",
    ctaIndustry: "Manufacturing",
    priorityApp: "manufacturing",
  },
  general: {
    headline: "Powering the future of industrial robotics",
    sub: "Advanced robotic components, precision reducers, and multi-axis control systems engineered for repeatable, high-reliability industrial automation.",
    ctaIndustry: "",
    priorityApp: "",
  },
};

export function getIndustryAdaptation(industry?: string) {
  if (!industry) return INDUSTRY_HERO["general"];
  return INDUSTRY_HERO[industry.toLowerCase()] ?? INDUSTRY_HERO["general"];
}

// ── 3. Geo-Compliance ─────────────────────────────────────────────────────
export function getComplianceForCountry(countryCode: string): { standards: string[]; voltage: string; note: string } {
  const code = (countryCode || "").toUpperCase().slice(0, 2);
  const EU = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","GB","CH","NO"];
  const US = ["US","CA","MX"];
  if (EU.includes(code)) return { standards: ["CE","RoHS","REACH"], voltage: "230V / 50Hz", note: "Datasheets default to 230V/50Hz. CE + RoHS highlighted." };
  if (US.includes(code)) return { standards: ["UL","CSA","FCC"], voltage: "120V / 60Hz", note: "Datasheets default to 120V/60Hz. UL highlighted." };
  if (code === "CN") return { standards: ["CCC","RoHS China"], voltage: "220V / 50Hz", note: "CCC compliance highlighted." };
  if (code === "JP") return { standards: ["PSE","VCCI"], voltage: "100V / 50-60Hz", note: "PSE compliance highlighted." };
  if (code === "IN") return { standards: ["BIS","CE","RoHS"], voltage: "230V / 50Hz", note: "BIS + CE highlighted. 230V/50Hz default." };
  return { standards: ["CE","RoHS"], voltage: "230V / 50Hz", note: "International defaults applied." };
}

// ── 4. Smart BOM ──────────────────────────────────────────────────────────
export const SMART_BOM: Record<string, { needs: string[]; why: string }> = {
  "6-axis": { needs: ["servo-drives", "harmonic", "sensors-feedback"], why: "To power this 6-axis arm you need 400W-class servo drives, zero-backlash harmonic wrist gearing and absolute encoders." },
  "assembly": { needs: ["servo-drives", "harmonic", "robot-controllers"], why: "Assembly cells need servo drives + harmonic gearing + a robot controller for coordinated paths." },
  "welding": { needs: ["servo-drives", "cycloidal", "robot-controllers"], why: "Welding robots need high-stiffness cycloidal base axes + servo drives + seam-tracking controller." },
  "handling": { needs: ["servo-drives", "cycloidal", "plc-automation"], why: "Heavy handling needs cycloidal shock-tolerant gearing + servo drives + PLC cell sequencing." },
  servo: { needs: ["servo-drives", "harmonic", "motion-controllers"], why: "Servo actuators pair with matched servo drives and EtherCAT motion controllers." },
  rotary: { needs: ["servo-drives", "harmonic"], why: "Rotary joints need matched servo drives and zero-backlash gearing." },
  linear: { needs: ["servo-drives", "motion-controllers"], why: "Linear axes need servo drives + motion controllers for S-curve profiling." },
  harmonic: { needs: ["rotary", "servo-drives"], why: "Harmonic reducers mount directly to servo motors / rotary joint housings." },
  cycloidal: { needs: ["handling", "servo-drives"], why: "Cycloidal reducers suit heavy base/shoulder joints — pair with high-torque servo drives." },
  planetary: { needs: ["linear", "servo-drives"], why: "Planetary gearheads clamp to standard servo motors for feed axes." },
  drive: { needs: ["mobile-modules", "servo-drives"], why: "Drive wheels need coordinated DC servo drives and fleet controllers." },
  mecanum: { needs: ["servo-drives", "motion-controllers"], why: "Mecanum fleets need 4 independent servo axes + vector kinematics." },
  "robot-controllers": { needs: ["servo-drives", "sensors-feedback"], why: "Controllers need matched servo drives + BiSS-C/EnDat feedback." },
  "motion-controllers": { needs: ["servo-drives", "plc-automation"], why: "Motion controllers sync drives over EtherCAT and sequence via PLC." },
};

export function getSmartBOM(productId: string) {
  return SMART_BOM[productId] ?? null;
}

// ── 5+7. Competitor + Semantic search (client fallback) ───────────────────
export const COMPETITOR_MAP: Record<string, { indusId: string; indusName: string; note: string }> = {
  "a06b-6079-h104": { indusId: "harmonic", indusName: "Harmonic Reducer", note: "Drop-in for Fanuc wrist joint" },
  "sgm7s-01": { indusId: "servo", indusName: "Servo Actuator", note: "Identical flange to Yaskawa Sigma-7 100W" },
  "sgm7s-02": { indusId: "servo", indusName: "Servo Actuator", note: "Identical flange to Yaskawa Sigma-7 200W" },
  "sgm7s-04": { indusId: "servo", indusName: "Servo Actuator", note: "Identical flange to Yaskawa Sigma-7 400W" },
  "csg-14": { indusId: "harmonic", indusName: "Harmonic Reducer", note: "Direct CSG-14 replacement, identical dims" },
  "csg-20": { indusId: "harmonic", indusName: "Harmonic Reducer", note: "Direct CSG-20 replacement, identical dims" },
  "rv-10": { indusId: "cycloidal", indusName: "Cycloidal Reducer", note: "Nabtesco RV-10C direct replacement" },
  "rv-20": { indusId: "cycloidal", indusName: "Cycloidal Reducer", note: "Nabtesco RV-20C direct replacement" },
  "hf-kp13": { indusId: "servo", indusName: "Servo Actuator", note: "Mitsubishi HF-KP13 equivalent" },
  "ur-10": { indusId: "collaborative", indusName: "Collaborative Robot", note: "UR10e equivalent payload/reach" },
  "ur-5": { indusId: "collaborative", indusName: "Collaborative Robot", note: "UR5e equivalent payload/reach" },
};

export async function lookupCompetitor(partNumber: string) {
  const norm = partNumber.toLowerCase().replace(/[^a-z0-9]/g, "");
  const keys = Object.keys(COMPETITOR_MAP);
  const exact = keys.find((k) => k.replace(/[^a-z0-9]/g, "") === norm);
  if (exact) return { found: true, competitorPart: partNumber, ...COMPETITOR_MAP[exact], matchType: "exact" as const };
  try {
    const r = await fetch(`/api/competitor-crossref?partNumber=${encodeURIComponent(partNumber)}`);
    if (r.ok) {
      const j = await r.json();
      if (j.found) return j;
    }
  } catch { /* offline fallback below */ }
  const fuzzy = keys.find((k) => k.includes(norm) || norm.includes(k.replace(/[^a-z0-9]/g, "")));
  if (fuzzy) return { found: true, competitorPart: partNumber, ...COMPETITOR_MAP[fuzzy], matchType: "fuzzy" as const };
  return { found: false, competitorPart: partNumber };
}

export const SEMANTIC_MAP: Array<{ triggers: string[]; routeTo: string[]; label: string }> = [
  { triggers: ["high torque small space", "high torque compact", "torque density", "zero backlash compact"], routeTo: ["harmonic", "cycloidal"], label: "Harmonic Reducers / Cycloidal Reducers" },
  { triggers: ["high torque", "heavy payload", "shock load"], routeTo: ["cycloidal", "handling", "planetary"], label: "Cycloidal Reducers / Heavy Handling" },
  { triggers: ["small space", "compact design", "tight envelope"], routeTo: ["harmonic", "servo", "rotary"], label: "Harmonic Reducers / Servo Actuators" },
  { triggers: ["high speed", "fast cycle", "rapid pick"], routeTo: ["4-axis", "pick-and-place", "linear"], label: "4-Axis / Pick-and-Place / Linear" },
  { triggers: ["precise", "precision", "repeatability", "accurate"], routeTo: ["harmonic", "servo", "rotary"], label: "Harmonic / Servo / Rotary precision" },
  { triggers: ["mobile", "agv", "amr", "warehouse", "omnidirectional"], routeTo: ["drive", "mecanum", "omni", "mobile-modules"], label: "Drive Wheels / Mecanum / Mobile Modules" },
  { triggers: ["weld"], routeTo: ["welding", "6-axis"], label: "Welding Robots / 6-Axis Arms" },
  { triggers: ["palletiz", "palletis", "stacking", "box stacking"], routeTo: ["palletizing", "4-axis"], label: "Palletizing Robots" },
  { triggers: ["ethercat", "profinet", "canopen", "fieldbus", "controller"], routeTo: ["robot-controllers", "motion-controllers", "servo-drives"], label: "Control Systems (EtherCAT-ready)" },
  { triggers: ["collaborative", "cobot", "safe", "work alongside"], routeTo: ["collaborative"], label: "Collaborative Robots" },
  { triggers: ["linear", "slide", "gantry", "cartesian", "stroke"], routeTo: ["linear", "electric"], label: "Linear / Electric Actuators" },
  { triggers: ["rotary", "joint", "indexing", "turntable"], routeTo: ["rotary", "harmonic", "cycloidal"], label: "Rotary Actuators / Reducers" },
];

export function semanticRoute(query: string): { routeTo: string[]; label: string } | null {
  const q = query.toLowerCase();
  for (const m of SEMANTIC_MAP) {
    if (m.triggers.some((t) => q.includes(t))) return { routeTo: m.routeTo, label: m.label };
  }
  return null;
}

// ── 8. Intent scoring → CTA ───────────────────────────────────────────────
export function getIntentCTA(intent?: VisitorData["intent"]): { title: string; action: "catalog" | "engineer" | "quote" | "fast-quote"; detail: string } {
  const score = intent?.score ?? 0;
  if (score >= 90) return { title: "Fast-Track Quote", action: "fast-quote", detail: "High buying intent — sales alerted via Jira." };
  if (score >= 50) return { title: "Talk to an Engineer", action: "engineer", detail: "Evaluating — offer deep technical consult." };
  return { title: "Download Catalog", action: "catalog", detail: "Researching — low friction catalog CTA." };
}

// ── 9. Dynamic friction ───────────────────────────────────────────────────
export function shouldMinimizeForm(visitor: VisitorData | null): boolean {
  if (!visitor) return false;
  return visitor.isReturning && visitor.visitCount >= 2;
}

// ── 10. Document context ──────────────────────────────────────────────────
export function getDocumentNudge(doc: VisitorData["documentContext"]): string | null {
  if (!doc?.lastDownloaded) return null;
  const t = `${doc.lastDownloaded} ${doc.lastDownloadedCategory ?? ""}`.toLowerCase();
  if (t.includes("ethercat")) return "I saw you were reading about EtherCAT. Want me to filter Control Systems to only EtherCAT-compatible models?";
  if (t.includes("harmonic") || t.includes("reducer")) return "I saw you reading reducer docs. Want a backlash / torque comparison across Harmonic vs Cycloidal vs Planetary?";
  if (t.includes("safety") || t.includes("cobot") || t.includes("collaborative")) return "I saw you reading collaborative safety docs. Want to see only force-limited cobots?";
  if (t.includes("agv") || t.includes("amr") || t.includes("wheel") || t.includes("mecanum")) return "I saw you reading mobile-robotics docs. Want to filter drive modules by payload and voltage?";
  return `I saw you were reading "${doc.lastDownloaded}". Want me to narrow products to that topic?`;
}

// ── 12. Predictive maintenance copy ───────────────────────────────────────
export function maintenanceUrgencyCopy(percentUsed: number): string {
  if (percentUsed >= 100) return "Overdue — order seals & lubrication now";
  if (percentUsed >= 90) return "Critical — approaching 10,000-hour interval";
  return "Upcoming — plan spares for next shutdown";
}
