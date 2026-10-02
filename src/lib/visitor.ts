/**
 * src/lib/visitor.ts
 * Client-side Visitor Intelligence Layer
 * - Fetches visitor data from /api/visitor on first load
 * - Persists session to localStorage
 * - Provides geo greeting, theme, last-page resume, preferences
 */

export interface VisitorGeo {
  country: string;
  city: string;
  timezone: string;
  currency: string;
  latitude: number;
  longitude: number;
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
}

const STORAGE_KEY = "ir_visitor";
const PREFS_KEY = "ir_prefs";

// ── Geo-aware greeting ─────────────────────────────────────────────────────
export function getGeoGreeting(timezone?: string): string {
  const tz = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: tz }));
  const hour = now.getHours();

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
