/**
 * /api/firmographic.js — Reverse IP Firmographic Intelligence
 * Uses Clearbit/6sense-style lookup to identify company from IP
 * Falls back to ipapi.co + domain intelligence
 */

const INDUSTRY_KEYWORDS = {
  automotive: ["automotive", "auto", "car", "vehicle", "ford", "gm", "toyota", "honda", "bmw", "mercedes", "vw", "volkswagen", "tesla", "rivian", "lucid", "stellantis", "hyundai", "kia"],
  electronics: ["electronics", "semiconductor", "chip", "intel", "amd", "nvidia", "qualcomm", "broadcom", "ti", "texas instruments", "microchip", "stmicroelectronics", "nxp", "infineon", "onsemi"],
  manufacturing: ["manufacturing", "industrial", "machinery", "equipment", "caterpillar", "deere", "komatsu", "siemens", "ge", "honeywell", "rockwell", "abb", "schneider", "mitsubishi", "fanuc", "yaskawa"],
  aerospace: ["aerospace", "aviation", "boeing", "airbus", "lockheed", "raytheon", "northrop", "ge aviation", "pratt whitney", "rolls royce", "safran"],
  medical: ["medical", "healthcare", "pharma", "biotech", "medtronic", "johnson", "baxter", "boston scientific", "siemens healthineers", "ge healthcare", "philips healthcare"],
  food: ["food", "beverage", "packaging", "nestle", "pepsi", "coca cola", "kraft", "heinz", "unilever", "danone", "general mills", "kellogg", "tyson", "jbs"],
  logistics: ["logistics", "warehouse", "supply chain", "fedex", "ups", "dhl", "db schenker", "kuehne", "dsv", "xpo", "jb hunt", "schneider national"],
  energy: ["energy", "oil", "gas", "power", "shell", "bp", "exxon", "chevron", "total", "equinor", "eni", "repsol", "siemens energy", "ge power"],
};

const TARGET_ACCOUNTS = [
  "ford motor company", "general motors", "toyota", "honda", "bmw", "mercedes-benz", "volkswagen",
  "tesla", "rivian", "lucid", "stellantis", "hyundai", "kia",
  "intel", "amd", "nvidia", "qualcomm", "broadcom", "texas instruments",
  "siemens", "ge", "honeywell", "rockwell automation", "abb", "schneider electric",
  "mitsubishi electric", "fanuc", "yaskawa", "kawasaki robotics",
  "boeing", "airbus", "lockheed martin", "raytheon technologies",
  "medtronic", "johnson & johnson", "baxter", "boston scientific",
  "nestle", "pepsico", "coca-cola", "unilever",
  "fedex", "ups", "dhl", "db schenker",
  "shell", "bp", "exxonmobil", "chevron",
];

function detectIndustry(companyName, domain) {
  const text = `${companyName} ${domain}`.toLowerCase();
  for (const [industry, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
    if (keywords.some((k) => text.includes(k))) return industry;
  }
  return "general";
}

function isTargetAccount(companyName) {
  const name = companyName.toLowerCase();
  return TARGET_ACCOUNTS.some((target) => name.includes(target.toLowerCase()));
}

function getAccountTier(companyName, employeeCount) {
  if (isTargetAccount(companyName)) return "strategic";
  const emp = parseInt(employeeCount.replace(/[^0-9]/g, ""), 10);
  if (emp > 10000) return "target";
  if (emp > 1000) return "general";
  return "unknown";
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  const { CLEARBIT_API_KEY, SIXSENSE_API_KEY } = process.env;

  if (req.method === "GET") {
    try {
      const forwarded = req.headers["x-forwarded-for"];
      const ip = (forwarded ? forwarded.split(",")[0] : req.socket?.remoteAddress || "unknown").trim();

      // Try Clearbit first if configured
      if (CLEARBIT_API_KEY) {
        try {
          const clearbitRes = await fetch(`https://company.clearbit.com/v2/companies/find?ip=${ip}`, {
            headers: { Authorization: `Bearer ${CLEARBIT_API_KEY}` },
          });
          if (clearbitRes.ok) {
            const data = await clearbitRes.json();
            return res.status(200).json({
              companyName: data.name || "Unknown",
              domain: data.domain || "",
              industry: detectIndustry(data.name || "", data.domain || ""),
              employeeCount: data.metrics?.employees?.toString() || "Unknown",
              revenueRange: data.metrics?.estimatedAnnualRevenue?.toString() || "Unknown",
              technologyStack: data.tech?.map((t) => t.name) || [],
              isTargetAccount: isTargetAccount(data.name || ""),
              accountTier: getAccountTier(data.name || "", data.metrics?.employees?.toString() || "Unknown"),
              source: "clearbit",
            });
          }
        } catch (e) {
          console.warn("Clearbit lookup failed:", e.message);
        }
      }

      // Try 6sense if configured
      if (SIXSENSE_API_KEY) {
        try {
          const sixsenseRes = await fetch(`https://api.6sense.com/v1/companies/ip/${ip}`, {
            headers: { Authorization: `Bearer ${SIXSENSE_API_KEY}` },
          });
          if (sixsenseRes.ok) {
            const data = await sixsenseRes.json();
            return res.status(200).json({
              companyName: data.company_name || "Unknown",
              domain: data.domain || "",
              industry: detectIndustry(data.company_name || "", data.domain || ""),
              employeeCount: data.employee_range || "Unknown",
              revenueRange: data.revenue_range || "Unknown",
              technologyStack: data.technologies || [],
              isTargetAccount: isTargetAccount(data.company_name || ""),
              accountTier: getAccountTier(data.company_name || "", data.employee_range || "Unknown"),
              source: "6sense",
            });
          }
        } catch (e) {
          console.warn("6sense lookup failed:", e.message);
        }
      }

      // Fallback: ipapi.co + domain intelligence
      let geo = {};
      try {
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, {
          headers: { "User-Agent": "IndusRobotics/1.0" },
        });
        if (geoRes.ok) geo = await geoRes.json();
      } catch (_) {}

      // Extract company from organization field or ASN
      const org = geo.org || geo.asn || "";
      const companyName = org.replace(/inc\.?|llc|ltd\.?|corp\.?|gmbh|ag|sa|plc|co\.?/gi, "").trim() || "Unknown Visitor";
      const domain = geo.domain || "";

      return res.status(200).json({
        companyName,
        domain,
        industry: detectIndustry(companyName, domain),
        employeeCount: "Unknown",
        revenueRange: "Unknown",
        technologyStack: [],
        isTargetAccount: isTargetAccount(companyName),
        accountTier: getAccountTier(companyName, "Unknown"),
        source: "ipapi_fallback",
      });
    } catch (err) {
      console.error("Firmographic GET error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}