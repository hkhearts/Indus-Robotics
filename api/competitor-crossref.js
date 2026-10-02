/**
 * /api/competitor-crossref.js — Competitor Cross-Reference Intelligence
 * Maps competitor part numbers to Indus drop-in replacements
 */

const COMPETITOR_XREF = {
  // Fanuc
  "a06b-6079-h104": { indusProductId: "harmonic", indusProductName: "Harmonic Reducer", matchConfidence: 95, notes: "Direct mount replacement for Fanuc R-2000iB wrist joints" },
  "a06b-6093-h104": { indusProductId: "cycloidal", indusProductName: "Cycloidal Reducer", matchConfidence: 92, notes: "Drop-in for Fanuc M-900iB base axis" },
  "a06b-6114-h104": { indusProductId: "planetary", indusProductName: "Planetary Reducer", matchConfidence: 88, notes: "Compatible with Fanuc LR Mate series" },

  // Yaskawa
  "sgm7s-01": { indusProductId: "servo", indusProductName: "Servo Actuator", matchConfidence: 94, notes: "Identical flange/mounting to Sigma-7 100W" },
  "sgm7s-02": { indusProductId: "servo", indusProductName: "Servo Actuator", matchConfidence: 94, notes: "Identical flange/mounting to Sigma-7 200W" },
  "sgm7s-04": { indusProductId: "servo", indusProductName: "Servo Actuator", matchConfidence: 94, notes: "Identical flange/mounting to Sigma-7 400W" },
  "sgm7s-08": { indusProductId: "servo", indusProductName: "Servo Actuator", matchConfidence: 94, notes: "Identical flange/mounting to Sigma-7 750W" },
  "sgm7s-15": { indusProductId: "servo", indusProductName: "Servo Actuator", matchConfidence: 94, notes: "Identical flange/mounting to Sigma-7 1.5kW" },
  "srd-10": { indusProductId: "harmonic", indusProductName: "Harmonic Reducer", matchConfidence: 90, notes: "Replaces Yaskawa harmonic drive units" },

  // ABB
  "3hra001": { indusProductId: "harmonic", indusProductName: "Harmonic Reducer", matchConfidence: 93, notes: "ABB IRB 6700 wrist replacement" },
  "3hra002": { indusProductId: "cycloidal", indusProductName: "Cycloidal Reducer", matchConfidence: 91, notes: "ABB IRB 6600 base axis replacement" },

  // KUKA
  "00-123-456": { indusProductId: "cycloidal", indusProductName: "Cycloidal Reducer", matchConfidence: 89, notes: "KUKA KR QUANTEC base joint" },
  "00-123-457": { indusProductId: "harmonic", indusProductName: "Harmonic Reducer", matchConfidence: 89, notes: "KUKA KR AGILUS wrist joint" },

  // Universal Robots
  "ur-10": { indusProductId: "collaborative", indusProductName: "Collaborative Robot", matchConfidence: 85, notes: "UR10e equivalent payload/reach" },
  "ur-5": { indusProductId: "collaborative", indusProductName: "Collaborative Robot", matchConfidence: 85, notes: "UR5e equivalent payload/reach" },
  "ur-3": { indusProductId: "collaborative", indusProductName: "Collaborative Robot", matchConfidence: 85, notes: "UR3e equivalent payload/reach" },

  // Mitsubishi
  "hf-kp13": { indusProductId: "servo", indusProductName: "Servo Actuator", matchConfidence: 92, notes: "Mitsubishi HF-KP13 equivalent" },
  "hf-kp23": { indusProductId: "servo", indusProductName: "Servo Actuator", matchConfidence: 92, notes: "Mitsubishi HF-KP23 equivalent" },
  "hf-kp43": { indusProductId: "servo", indusProductName: "Servo Actuator", matchConfidence: 92, notes: "Mitsubishi HF-KP43 equivalent" },

  // Omron
  "r88m-1m": { indusProductId: "servo", indusProductName: "Servo Actuator", matchConfidence: 90, notes: "Omron 1S series equivalent" },

  // Harmonic Drive LLC
  "csg-14": { indusProductId: "harmonic", indusProductName: "Harmonic Reducer", matchConfidence: 98, notes: "Direct CSG-14 replacement, identical dimensions" },
  "csg-20": { indusProductId: "harmonic", indusProductName: "Harmonic Reducer", matchConfidence: 98, notes: "Direct CSG-20 replacement, identical dimensions" },
  "csg-32": { indusProductId: "harmonic", indusProductName: "Harmonic Reducer", matchConfidence: 98, notes: "Direct CSG-32 replacement, identical dimensions" },
  "shg-14": { indusProductId: "harmonic", indusProductName: "Harmonic Reducer", matchConfidence: 98, notes: "Direct SHG-14 replacement, identical dimensions" },
  "shg-20": { indusProductId: "harmonic", indusProductName: "Harmonic Reducer", matchConfidence: 98, notes: "Direct SHG-20 replacement, identical dimensions" },

  // Nabtesco
  "rv-10": { indusProductId: "cycloidal", indusProductName: "Cycloidal Reducer", matchConfidence: 96, notes: "Nabtesco RV-10C direct replacement" },
  "rv-20": { indusProductId: "cycloidal", indusProductName: "Cycloidal Reducer", matchConfidence: 96, notes: "Nabtesco RV-20C direct replacement" },
  "rv-40": { indusProductId: "cycloidal", indusProductName: "Cycloidal Reducer", matchConfidence: 96, notes: "Nabtesco RV-40C direct replacement" },

  // Maxon
  "ec-4pole-22": { indusProductId: "servo", indusProductName: "Servo Actuator", matchConfidence: 88, notes: "Maxon EC-4pole 22mm equivalent" },
  "ec-4pole-32": { indusProductId: "servo", indusProductName: "Servo Actuator", matchConfidence: 88, notes: "Maxon EC-4pole 32mm equivalent" },

  // Thomson
  "b100": { indusProductId: "linear", indusProductName: "Linear Actuator", matchConfidence: 85, notes: "Thomson B100 ball screw equivalent" },
  "b200": { indusProductId: "linear", indusProductName: "Linear Actuator", matchConfidence: 85, notes: "Thomson B200 ball screw equivalent" },
};

function normalizePartNumber(pn) {
  return pn.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method === "GET") {
    try {
      const { partNumber } = req.query;
      if (!partNumber) return res.status(400).json({ error: "partNumber required" });

      const normalized = normalizePartNumber(partNumber);

      // Exact match
      if (COMPETITOR_XREF[normalized]) {
        const match = COMPETITOR_XREF[normalized];
        return res.status(200).json({
          found: true,
          competitorPart: partNumber,
          indusProductId: match.indusProductId,
          indusProductName: match.indusProductName,
          matchConfidence: match.matchConfidence,
          notes: match.notes,
          matchType: "exact",
        });
      }

      // Fuzzy match - check if any key contains the query or vice versa
      for (const [key, match] of Object.entries(COMPETITOR_XREF)) {
        if (key.includes(normalized) || normalized.includes(key)) {
          return res.status(200).json({
            found: true,
            competitorPart: partNumber,
            indusProductId: match.indusProductId,
            indusProductName: match.indusProductName,
            matchConfidence: match.matchConfidence - 10, // Reduce confidence for fuzzy
            notes: match.notes + " (Partial match)",
            matchType: "fuzzy",
          });
        }
      }

      return res.status(200).json({
        found: false,
        competitorPart: partNumber,
        message: "No direct cross-reference found. Contact our engineers for custom matching.",
      });
    } catch (err) {
      console.error("Competitor CrossRef GET error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}