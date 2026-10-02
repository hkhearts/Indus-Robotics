/**
 * IntelligenceProvider.tsx
 * Root-level provider that:
 * - Fetches visitor data on mount
 * - Tracks page views + sends to Airtable
 * - Updates last page/section
 * - Initialises theme
 * - Exposes visitor context to all children
 */
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  fetchVisitorData,
  updateVisitorPage,
  calculateIntentScore,
  getSessionId,
  initTheme,
  trackSectionView,
  type VisitorData,
} from "@/lib/visitor";

interface IntelligenceCtx {
  visitor: VisitorData | null;
  sessionId: string;
  trackSection: (section: string) => void;
  trackDownload: (title: string, category?: string) => void;
}

const Ctx = createContext<IntelligenceCtx>({
  visitor: null,
  sessionId: "",
  trackSection: () => {},
  trackDownload: () => {},
});

export const useIntelligence = () => useContext(Ctx);

function sendTrackEvent(event: string, page: string, details?: string, extra?: Record<string, string>) {
  const sessionId = getSessionId();
  const device = /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
  const referrer = document.referrer || "Direct";
  const screen = `${window.screen.width}x${window.screen.height}`;
  const url = window.location.href;

  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      page,
      url,
      session: sessionId,
      device,
      screen,
      referrer,
      details: details || page,
      ...extra,
    }),
  }).catch(() => {});
}

export function IntelligenceProvider({ children }: { children: React.ReactNode }) {
  const [visitor, setVisitor] = useState<VisitorData | null>(null);
  const sessionId = getSessionId();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const prevPath = useRef<string>("");

  // Init theme on mount
  useEffect(() => {
    initTheme();
  }, []);

  // Fetch visitor data once + enrich with collaborative/maintenance
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await fetchVisitorData();
      if (!data || cancelled) return;
      let enriched: VisitorData = { ...data, intent: calculateIntentScore(data) };

      // Account Collaborative Intelligence (#2): fetch company co-visitors
      try {
        const r = await fetch("/api/collaborative");
        if (r.ok) {
          const c = await r.json();
          enriched = { ...enriched, collaborative: { companyVisitorCount: c.companyVisitorCount ?? 1, stakeholders: c.stakeholders ?? [], hasWorkspace: !!c.hasWorkspace, workspaceId: c.workspaceId } };
        }
      } catch { /* offline-safe */ }

      // Predictive Maintenance (#12): fetch alerts for returning customers
      try {
        if (enriched.recordId) {
          const r = await fetch(`/api/predictive-maintenance?recordId=${encodeURIComponent(enriched.recordId)}`);
          if (r.ok) {
            const pm = await r.json();
            if (pm?.alerts?.length) {
              enriched = {
                ...enriched,
                purchaseHistory: {
                  products: pm.alerts.map((a: Record<string, unknown>) => ({ productId: "", productName: String(a["productName"]), category: String(a["productCategory"]), purchaseDate: String(a["purchaseDate"]), quantity: 1, maintenanceIntervalHours: 10000, hoursSincePurchase: 0, nextMaintenanceDue: "" })),
                  totalOrders: pm.totalProducts ?? pm.alerts.length,
                  lastOrderDate: "",
                },
              };
            }
          }
        }
      } catch { /* offline-safe */ }

      enriched = { ...enriched, intent: calculateIntentScore(enriched) };
      if (!cancelled) setVisitor(enriched);

      // Buying Journey Intent Scoring (#8): persist + Jira alert at 90
      try {
        if (enriched.recordId && enriched.intent.score >= 50) {
          fetch("/api/visitor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ recordId: enriched.recordId, intentScore: enriched.intent.score, intentStage: enriched.intent.stage }) }).catch(() => {});
        }
        if (enriched.intent.score >= 90 && enriched.recordId) {
          const key = `ir_jira_alert_${enriched.recordId}`;
          if (!sessionStorage.getItem(key)) {
            sessionStorage.setItem(key, "1");
            fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event: "intent_buying", page: window.location.pathname, details: `Intent ${enriched.intent.score} — fast-track`, session: sessionId }) }).catch(() => {});
          }
        }
      } catch { /* noop */ }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (currentPath === prevPath.current) return;
    prevPath.current = currentPath;

    // Send page view to Airtable
    sendTrackEvent("page_view", currentPath, document.title, {
      browser: navigator.userAgent.split(" ").at(-1) || "",
    });

    // Send to Google Sheets
    fetch("/api/sheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "page_view",
        page: currentPath,
        timestamp: new Date().toISOString(),
        session: sessionId,
        country: visitor?.geo?.country || "",
        city: visitor?.geo?.city || "",
      }),
    }).catch(() => {});

    // Update Airtable visitor last page
    if (visitor?.recordId) {
      updateVisitorPage(visitor.recordId, currentPath);
    }
  }, [currentPath, visitor?.recordId]);

  // Update visitor last page when component has visitor data and path has changed
  useEffect(() => {
    if (visitor?.recordId && currentPath) {
      updateVisitorPage(visitor.recordId, currentPath);
    }
  }, [visitor?.recordId, currentPath]);

  // Track scroll position for the current path
  useEffect(() => {
    let timeoutId: number;
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        // Debounce slightly for performance
        cancelAnimationFrame(timeoutId);
        timeoutId = requestAnimationFrame(() => {
          localStorage.setItem(`ir_scroll_${currentPath}`, window.scrollY.toString());
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPath]);

  const trackSection = (section: string) => {
    trackSectionView(section);
    sendTrackEvent("engagement", currentPath, section, { element: section });
    // Update Airtable last section
    if (visitor?.recordId) {
      fetch("/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId: visitor.recordId, lastSection: section }),
      }).catch(() => {});
    }
    setVisitor((v) => (v ? { ...v, lastSection: section, readingBehavior: { ...v.readingBehavior, sectionsRead: [...v.readingBehavior.sectionsRead, section] } } : v));
  };

  // Document Contextual Intelligence (#10): remember downloads for chatbot nudge
  const trackDownload = (title: string, category?: string) => {
    setVisitor((v) => (v ? { ...v, documentContext: { lastDownloaded: title, lastDownloadedCategory: category ?? null, interestedTopics: [...v.documentContext.interestedTopics, title] }, intent: calculateIntentScore({ ...v, documentContext: { lastDownloaded: title, lastDownloadedCategory: category ?? null, interestedTopics: [] } }) } : v));
    if (visitor?.recordId) {
      fetch("/api/visitor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ recordId: visitor.recordId, lastDownload: title }) }).catch(() => {});
    }
    sendTrackEvent("download", currentPath, title);
  };

  return (
    <Ctx.Provider value={{ visitor, sessionId, trackSection, trackDownload }}>
      {children}
    </Ctx.Provider>
  );
}
