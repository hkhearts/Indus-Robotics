/**
 * ExitIntentPopup.tsx — Detects user is about to leave and shows a save popup
 */
import React, { useEffect, useState } from "react";
import { X, MessageSquare, ArrowRight } from "lucide-react";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { openModal } = useModals();

  useEffect(() => {
    // Only intercept tab close if they haven't dismissed it
    if (sessionStorage.getItem("ir_exit_shown")) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Show native browser tab close dialog
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave?";
      
      // We can also show our custom popup underneath so if they cancel, they see it
      setVisible(true);
      sessionStorage.setItem("ir_exit_shown", "1");
      return "Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  const handleWhatsApp = () => {
    dismiss();
    window.open(companyConfig.getWhatsAppUrl({ type: "general" }), "_blank", "noopener,noreferrer");
  };

  const handleQuote = () => {
    dismiss();
    openModal("quote");
  };

  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Exit confirmation"
    >
      <div className="relative w-full max-w-lg border border-signal/40 bg-surface-dark p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Blue accent line */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-signal to-transparent" />

        {/* Content */}
        <p className="text-[10px] font-bold uppercase tracking-[.22em] text-signal">
          Wait — Before You Go
        </p>
        <h2 className="mt-3 font-display text-3xl uppercase leading-tight text-foreground">
          Are you sure you want to leave?
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Our engineering team can help you find the right robotic solution. Get a free technical
          consultation or drop a quick WhatsApp message — no commitment needed.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleQuote}
            id="exit-intent-quote-btn"
            className="flex flex-1 items-center justify-center gap-2 border border-signal bg-signal/10 px-4 py-3 text-xs font-bold uppercase tracking-wider text-signal transition-colors hover:bg-signal hover:text-signal-foreground"
          >
            Request Free Quote <ArrowRight size={14} />
          </button>
          <button
            onClick={handleWhatsApp}
            id="exit-intent-whatsapp-btn"
            className="flex flex-1 items-center justify-center gap-2 border border-border bg-transparent px-4 py-3 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:border-signal hover:text-signal"
          >
            <MessageSquare size={14} />
            Chat on WhatsApp
          </button>
        </div>

        {/* Dismiss */}
        <button
          onClick={dismiss}
          className="mt-4 w-full text-center text-[10px] text-muted-foreground hover:text-foreground"
        >
          No thanks, I'll leave
        </button>
      </div>
    </div>
  );
}
