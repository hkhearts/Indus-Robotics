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
  getSessionId,
  initTheme,
  trackSectionView,
  type VisitorData,
} from "@/lib/visitor";

interface IntelligenceCtx {
  visitor: VisitorData | null;
  sessionId: string;
  trackSection: (section: string) => void;
}

const Ctx = createContext<IntelligenceCtx>({
  visitor: null,
  sessionId: "",
  trackSection: () => {},
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

  // Fetch visitor data once
  useEffect(() => {
    fetchVisitorData().then((data) => {
      if (data) setVisitor(data);
    });
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
  };

  return (
    <Ctx.Provider value={{ visitor, sessionId, trackSection }}>
      {children}
    </Ctx.Provider>
  );
}
