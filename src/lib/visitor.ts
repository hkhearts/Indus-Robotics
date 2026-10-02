/**
 * src/lib/visitor.ts
 * Client-side Visitor Intelligence Layer
 * - Fetches visitor data from /api/visitor on first load
 * - Persists session to localStorage
 * - Provides geo greeting, theme, last-page resume, preferences
 * - Extended with 14 Intelligence Features
 */

export interface VisitorGeo {
  country: string;
  city: string;
  timezone: string;
  currency: string;
  latitude: number;
  longitude: number;
  region: string;
  electricalStandard: "230V_50Hz" | "120V_60Hz" | "100V_50Hz" | "100V_60Hz" | "unknown";
  complianceStandards: string[];
}

export interface FirmographicData {
  companyName: string;
  industry: string;
  employeeCount: string;
  revenueRange: string;
  technologyStack: string[];
  domain: string;
  isTargetAccount: boolean;
  accountTier: "strategic" | "target" | "general" | "unknown";
}

export interface CollaborativeIntelligence {
  companyVisitorCount: number;
  stakeholders: Array<{
    ip: string;
    role: "engineer" | "manager" | "procurement" | "executive" | "unknown";
    pagesVisited: string[];
    lastActive: string;
  }>;
  hasWorkspace: boolean;
  workspaceId?: string;
}

export interface IntentScore {
  score: number;
  stage: "researching" | "evaluating" | "buying";
  signals: string[];
  lastUpdated: string;
  triggeredAlerts: string[];
}

export interface PurchaseHistory {
  products: Array<{
    productId: string;
    productName: string;
    category: string;
    purchaseDate: string;
    quantity: number;
    maintenanceIntervalHours: number;
    hoursSincePurchase: number;
    nextMaintenanceDue: string;
  }>;
  totalOrders: number;
  lastOrderDate: string;
}

export interface SupplyChainStatus {
  productId: string;
  inStock: boolean;
  leadTimeWeeks: number;
  alternativeProductId?: string;
  alternativeReason?: string;
}

export interface VisitorData {
  isReturning: boolean;
  visitCount: number;
  lastPage: string;
  lastSection: string;
  preferences: Record<string, unknown>;
  ip: string;
  geo: VisitorGeo;
  recordId: string;
  name: string;
  firmographic: FirmographicData | null;
  collaborative: CollaborativeIntelligence | null;
  intent: IntentScore;
  purchaseHistory: PurchaseHistory | null;
  supplyChain: SupplyChainStatus[];
  readingBehavior: {
    scrollVelocity: "fast" | "normal" | "slow";
    hoverDepth: number;
    timeOnPage: number;
    sectionsRead: string[];
  };
  documentContext: {
    lastDownloaded: string | null;
    lastDownloadedCategory: string | null;
    interestedTopics: string[];
  };
  escalation: {
    needsHumanReview: boolean;
    ticketId?: string;
    complexityScore: number;
  };
}

const STORAGE_KEY = "ir_visitor";
const PREFS_KEY = "ir_prefs";

// ── Geo-aware greeting ─────────────────────────────────────────────────────
export function getGeoGreeting(): string {
  if (typeof window === "undefined") return "Good morning";
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 21) return "Good evening";
  return "Good night";
}

// ── Fetch visitor data ────────────────────────────────────────────────────
export async function fetchVisitorData(): Promise<VisitorData | null> {
  if (typeof window === "undefined") return null;
  // Check localStorage cache (valid for 30 minutes)
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) {
    const { data, ts } = JSON.parse(cached);
    if (Date.now() - ts < 30 * 60 * 1000) return data as VisitorData;
  }

  try {
    const res = await fetch("/api/visitor");
    if (!res.ok) return null;
    const data: VisitorData = await res.json();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, ts: Date.now() }));
    return data;
  } catch {
    return null;
  }
}

// ── Update last page/section ──────────────────────────────────────────────
export async function updateVisitorPage(
  recordId: string,
  lastPage: string,
  lastSection?: string
): Promise<void> {
  if (!recordId) return;
  try {
    await fetch("/api/visitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recordId, lastPage, lastSection }),
    });
    // Update cache too
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        data.lastPage = lastPage;
        if (lastSection) data.lastSection = lastSection;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, ts }));
      }
    }
  } catch {
    // silently fail
  }
}

// ── Preferences ───────────────────────────────────────────────────────────
export function getPreferences(): Record<string, unknown> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY) || "{}");
  } catch {
    return {};
  }
}

export function setPreference(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  const prefs = getPreferences();
  prefs[key] = value;
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

// ── Track most viewed section ─────────────────────────────────────────────
export function trackSectionView(section: string): void {
  const prefs = getPreferences();
  const views = (prefs["sectionViews"] as Record<string, number>) || {};
  views[section] = (views[section] || 0) + 1;
  setPreference("sectionViews", views);
}

export function getMostViewedSection(): string | null {
  const prefs = getPreferences();
  const views = (prefs["sectionViews"] as Record<string, number>) || {};
  if (!Object.keys(views).length) return null;
  return Object.entries(views).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

// ── Intent Scoring ────────────────────────────────────────────────────────
export function calculateIntentScore(visitor: VisitorData): IntentScore {
  let score = 0;
  const signals: string[] = [];

  // Page depth signals
  if (visitor.lastPage.includes("/products/")) {
    score += 15;
    signals.push("product_page_view");
  }
  if (visitor.lastPage.includes("/solutions/")) {
    score += 10;
    signals.push("solutions_page_view");
  }
  if (visitor.lastPage.includes("/pricing") || visitor.lastPage.includes("/quote")) {
    score += 25;
    signals.push("pricing_page_view");
  }
  if (visitor.lastPage.includes("/technology/")) {
    score += 10;
    signals.push("technology_page_view");
  }

  // Visit frequency
  if (visitor.visitCount >= 3) {
    score += 20;
    signals.push("repeat_visitor");
  }
  if (visitor.visitCount >= 5) {
    score += 15;
    signals.push("high_engagement");
  }

  // Section engagement
  const sectionViews = (visitor.preferences.sectionViews as Record<string, number>) || {};
  const totalSectionViews = Object.values(sectionViews).reduce((a, b) => a + b, 0);
  if (totalSectionViews >= 5) {
    score += 10;
    signals.push("deep_section_engagement");
  }

  // Document downloads
  if (visitor.documentContext.lastDownloaded) {
    score += 15;
    signals.push("document_download");
  }

  // Time on page (if available)
  if (visitor.readingBehavior.timeOnPage > 120000) { // 2 minutes
    score += 10;
    signals.push("extended_dwell_time");
  }

  // Collaborative signals
  if (visitor.collaborative?.companyVisitorCount && visitor.collaborative.companyVisitorCount >= 3) {
    score += 20;
    signals.push("multi_stakeholder_engagement");
  }

  // Firmographic signals
  if (visitor.firmographic?.isTargetAccount) {
    score += 15;
    signals.push("target_account");
  }
  if (visitor.firmographic?.accountTier === "strategic") {
    score += 10;
    signals.push("strategic_account");
  }

  // Purchase history
  if (visitor.purchaseHistory && visitor.purchaseHistory.totalOrders > 0) {
    score += 20;
    signals.push("existing_customer");
  }

  // Determine stage
  let stage: IntentScore["stage"] = "researching";
  if (score >= 90) stage = "buying";
  else if (score >= 50) stage = "evaluating";

  return {
    score: Math.min(score, 100),
    stage,
    signals,
    lastUpdated: new Date().toISOString(),
    triggeredAlerts: [],
  };
}

// ── Electrical Standards by Region ────────────────────────────────────────
export function getElectricalStandard(country: string): VisitorGeo["electricalStandard"] {
  const euCountries = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"];
  const usCountries = ["US", "CA", "MX"];
  const jpCountries = ["JP"];

  const code = country.toUpperCase().slice(0, 2);

  if (euCountries.includes(code)) return "230V_50Hz";
  if (usCountries.includes(code)) return "120V_60Hz";
  if (jpCountries.includes(code)) return "100V_50Hz"; // Japan has both 50/60Hz
  return "unknown";
}

export function getComplianceStandards(country: string): string[] {
  const code = country.toUpperCase().slice(0, 2);
  const standards: string[] = [];

  const euCountries = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "CH", "NO"];
  const usCountries = ["US", "CA"];
  const cnCountries = ["CN"];

  if (euCountries.includes(code)) {
    standards.push("CE", "RoHS", "REACH", "WEEE");
  }
  if (usCountries.includes(code)) {
    standards.push("UL", "CSA", "FCC", "NEC");
  }
  if (cnCountries.includes(code)) {
    standards.push("CCC", "RoHS China");
  }
  if (code === "IN") {
    standards.push("BIS", "CE", "RoHS");
  }

  return standards;
}

// ── Theme ─────────────────────────────────────────────────────────────────
export type Theme = "dark" | "light" | "system";

export function getTheme(): Theme {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem("ir_theme") as Theme) || "system";
}

export function setTheme(theme: Theme): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("ir_theme", theme);
  }
  applyTheme(theme);
}

export function applyTheme(theme: Theme): void {
  if (typeof window === "undefined") return;
  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark-theme", isDark);
  document.documentElement.classList.toggle("light-theme", !isDark);
}

export function initTheme(): void {
  if (typeof window === "undefined") return;
  const theme = getTheme();
  applyTheme(theme);
  // Watch system preference changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (getTheme() === "system") applyTheme("system");
  });
}

// ── Session tracking ─────────────────────────────────────────────────────
export function getSessionId(): string {
  if (typeof window === "undefined") return "ssr-session";
  let sid = sessionStorage.getItem("ir_sid");
  if (!sid) {
    sid = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem("ir_sid", sid);
  }
  return sid;
}

// ── Traffic ping ─────────────────────────────────────────────────────────
export async function getTrafficStats(): Promise<{ activeUsers: number; todayViews: number }> {
  try {
    const res = await fetch("/api/sheets");
    if (res.ok) return res.json();
  } catch {}
  return { activeUsers: 0, todayViews: 0 };
}
