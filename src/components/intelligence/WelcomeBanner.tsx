/**
 * WelcomeBanner.tsx — Personalized greeting + continue where you left off
 */
import React, { useEffect, useState } from "react";
import { X, ArrowRight, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  fetchVisitorData,
  getGeoGreeting,
  type VisitorData,
} from "@/lib/visitor";

export function WelcomeBanner() {
  const [visitor, setVisitor] = useState<VisitorData | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Only show on homepage, not on every page
    if (window.location.pathname !== "/") return;
    const alreadyDismissed = sessionStorage.getItem("ir_banner_dismissed");
    if (alreadyDismissed) return;

    fetchVisitorData().then((data) => {
      if (!data) return;
      setVisitor(data);
      // Show banner after 1.5s
      setTimeout(() => setVisible(true), 1500);
      // Auto-vanish after 50s (50000ms)
      setTimeout(() => setVisible(false), 51500);
    });
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("ir_banner_dismissed", "1");
  };

  if (!visible || dismissed || !visitor) return null;

  const greeting = getGeoGreeting(visitor.geo?.timezone);
  const isNewUser = !visitor.isReturning;
  const lastPageName = visitor.lastPage
    ? visitor.lastPage.replace(/^\//, "").replace(/-/g, " ") || "home"
    : "home";

  if (isNewUser) return null; // Only show for returning visitors

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (visitor.lastPage && visitor.lastPage !== "/") {
      return (
        <Link
          to={visitor.lastPage as "/"}
          onClick={dismiss}
          className="block border border-signal/40 bg-surface-dark/98 p-4 shadow-[0_0_40px_oklch(0.65_0.22_250_/_0.15)] backdrop-blur-xl transition-transform hover:scale-105 hover:border-signal/60 cursor-pointer"
        >
          {children}
        </Link>
      );
    }
    return (
      <div
        onClick={dismiss}
        className="block border border-signal/40 bg-surface-dark/98 p-4 shadow-[0_0_40px_oklch(0.65_0.22_250_/_0.15)] backdrop-blur-xl transition-transform hover:scale-105 hover:border-signal/60 cursor-pointer"
      >
        {children}
      </div>
    );
  };

  return (
    <div
      className="fixed bottom-6 left-4 z-50 w-80 animate-in slide-in-from-bottom-4 fade-in duration-500 md:left-6 md:w-96"
      role="status"
      aria-live="polite"
    >
      <CardWrapper>
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-signal" />
            </span>
            <p className="text-[9px] font-bold uppercase tracking-[.2em] text-signal">
              {greeting}
            </p>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); dismiss(); }}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>

        {/* Message */}
        <p className="mt-2 font-display text-lg uppercase text-white">
          {visitor.visitCount > 5
            ? "Great to see you again!"
            : visitor.visitCount > 2
              ? "Welcome back!"
              : "Good to have you back!"}
        </p>
        <p className="mt-1 text-xs text-white/70">
          {visitor.visitCount > 1
            ? `Visit #${visitor.visitCount} · `
            : ""}
          {visitor.lastPage && visitor.lastPage !== "/"
            ? `Continue where you left off (${lastPageName}).`
            : "Pick up where you left off."}
        </p>

        {/* Indicator */}
        {visitor.lastPage && visitor.lastPage !== "/" && (
          <div className="mt-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-signal">
            <Clock size={10} />
            <span>Click to resume</span>
            <ArrowRight size={10} className="ml-1" />
          </div>
        )}
      </CardWrapper>
    </div>
  );
}
