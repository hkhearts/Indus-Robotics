import React from "react";
import { useRouterState } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { companyConfig } from "@/data/config";

export function WhatsAppButton() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const handleClick = () => {
    let type: "product" | "application" | "solution" | "general" = "general";
    let name: string | undefined;

    const parts = pathname.split("/").filter(Boolean);
    if (parts.length > 0) {
      const last = (parts[parts.length - 1] ?? "").replace(/-/g, " ");
      if (pathname.startsWith("/products")) {
        type = "product";
        name = last || undefined;
      } else if (pathname.startsWith("/applications")) {
        type = "application";
        name = last || undefined;
      } else if (pathname.startsWith("/solutions")) {
        type = "solution";
        name = last || undefined;
      }
    }

    const url = companyConfig.getWhatsAppUrl(
      name ? { type, name } : { type }
    );
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Chat on WhatsApp with Indus Robotics"
      className="fixed bottom-20 left-4 z-40 flex h-11 items-center gap-2 border border-signal/40 bg-surface-dark/95 px-3.5 text-xs font-bold uppercase tracking-wider text-surface-foreground shadow-2xl backdrop-blur-md transition-all hover:scale-105 hover:border-signal hover:text-signal md:bottom-6 md:left-6"
    >
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-signal" />
      </span>
      <MessageSquare size={16} className="text-signal" />
      <span className="hidden sm:inline">WhatsApp</span>
      <span className="sm:hidden">WhatsApp</span>
    </button>
  );
}
