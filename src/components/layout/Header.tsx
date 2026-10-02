import React, { useState, useEffect, useRef } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Move3d,
  ChevronDown,
  Search,
  ArrowRight,
  MessageSquare,
  Menu,
  X,
  Cpu,
  Factory,
  Wrench,
  Layers,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigationData } from "@/data/navigation";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";
import { MobileNav } from "./MobileNav";
import { trackDigitalPresence } from "@/trackDigitalPresence";
import { ThemeToggle } from "@/components/intelligence/ThemeToggle";

export function Header() {
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = useModals();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const headerRef = useRef<HTMLElement>(null);

  // Close mega menus on route change
  useEffect(() => {
    setOpenMega(null);
    setMobileMenuOpen(false);
  }, [currentPath]);

  // Click outside listener for desktop mega menus
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenMega(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMega = (menu: string) => {
    const nextState = openMega === menu ? null : menu;
    setOpenMega(nextState);
    if (nextState) {
      trackDigitalPresence("navigation", `Header Menu - ${menu}`, `Opened ${menu} menu`);
    }
  };

  const handleWhatsApp = () => {
    trackDigitalPresence("contact", "Header WhatsApp", "Opened WhatsApp chat");
    window.open(companyConfig.getWhatsAppUrl({ type: "general" }), "_blank", "noopener,noreferrer");
  };

  const handleQuoteClick = () => {
    trackDigitalPresence("cta_click", "Header Request Quote", "Opened Quote Modal");
    openModal("quote");
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-border/40 bg-surface-dark/95 text-surface-foreground backdrop-blur-xl transition-all"
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 lg:px-10">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="Indus Robotics Home"
        >
          <span className="grid size-9 place-items-center border border-signal bg-signal/10 text-signal shadow-[0_0_15px_oklch(0.65_0.22_250_/_0.3)]">
            <Move3d size={20} />
          </span>
          <span>
            <b className="block font-display text-xl leading-none tracking-wider text-surface-foreground">
              Indus Robotics
            </b>
          </span>
        </Link>

        {/* Desktop Main Navigation */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Primary navigation">
          {/* Products Mega Trigger */}
          <div className="relative">
            <button
              onClick={() => toggleMega("products")}
              className={`flex items-center gap-1.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                openMega === "products" || currentPath.startsWith("/products")
                  ? "text-signal"
                  : "text-surface-foreground/80 hover:text-signal"
              }`}
              aria-expanded={openMega === "products"}
            >
              Products
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${openMega === "products" ? "rotate-180 text-signal" : ""}`}
              />
            </button>
          </div>

          {/* Solutions Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => toggleMega("solutions")}
              className={`flex items-center gap-1.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                openMega === "solutions" || currentPath.startsWith("/solutions")
                  ? "text-signal"
                  : "text-surface-foreground/80 hover:text-signal"
              }`}
              aria-expanded={openMega === "solutions"}
            >
              Solutions
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${openMega === "solutions" ? "rotate-180 text-signal" : ""}`}
              />
            </button>
          </div>

          {/* Applications Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => toggleMega("applications")}
              className={`flex items-center gap-1.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                openMega === "applications" || currentPath.startsWith("/applications")
                  ? "text-signal"
                  : "text-surface-foreground/80 hover:text-signal"
              }`}
              aria-expanded={openMega === "applications"}
            >
              Applications
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${openMega === "applications" ? "rotate-180 text-signal" : ""}`}
              />
            </button>
          </div>

          {/* Technology Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => toggleMega("technology")}
              className={`flex items-center gap-1.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                openMega === "technology" || currentPath.startsWith("/technology")
                  ? "text-signal"
                  : "text-surface-foreground/80 hover:text-signal"
              }`}
              aria-expanded={openMega === "technology"}
            >
              Technology
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${openMega === "technology" ? "rotate-180 text-signal" : ""}`}
              />
            </button>
          </div>

          {/* Resources Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => toggleMega("resources")}
              className={`flex items-center gap-1.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                openMega === "resources" || currentPath.startsWith("/resources")
                  ? "text-signal"
                  : "text-surface-foreground/80 hover:text-signal"
              }`}
              aria-expanded={openMega === "resources"}
            >
              Resources
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${openMega === "resources" ? "rotate-180 text-signal" : ""}`}
              />
            </button>
          </div>

          {/* About Link */}
          <Link
            to="/about"
            className={`text-xs font-bold uppercase tracking-wider transition-colors ${
              currentPath.startsWith("/about")
                ? "text-signal"
                : "text-surface-foreground/80 hover:text-signal"
            }`}
          >
            About
          </Link>

          {/* Careers Link */}
          <Link
            to="/careers"
            className={`text-xs font-bold uppercase tracking-wider transition-colors ${
              currentPath.startsWith("/careers")
                ? "text-signal"
                : "text-surface-foreground/80 hover:text-signal"
            }`}
          >
            Careers
          </Link>

          {/* Contact Link */}
          <Link
            to="/contact"
            className={`text-xs font-bold uppercase tracking-wider transition-colors ${
              currentPath === "/contact"
                ? "text-signal"
                : "text-surface-foreground/80 hover:text-signal"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <ThemeToggle compact />

          {/* Quick Search Trigger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              trackDigitalPresence("click", "Header Search Button", "Opened Search Modal");
              openModal("search");
            }}
            className="text-surface-foreground hover:bg-surface-elevated hover:text-signal"
            aria-label="Open search"
          >
            <Search size={18} />
          </Button>

          {/* Header WhatsApp Action */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleWhatsApp}
            className="hidden h-10 rounded-none border-surface-foreground/20 bg-transparent px-3 text-xs font-bold uppercase tracking-wider text-surface-foreground hover:border-signal hover:bg-surface-elevated hover:text-signal md:inline-flex"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare size={14} className="mr-1.5 text-signal" />
            WhatsApp
          </Button>

          {/* Primary Request a Quote Button */}
          <Button
            onClick={handleQuoteClick}
            className="hidden h-10 rounded-none bg-signal px-5 text-xs font-bold uppercase tracking-wider text-signal-foreground hover:bg-signal/90 sm:inline-flex"
          >
            Request a Quote <ArrowRight size={14} className="ml-1" />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-surface-foreground hover:bg-surface-elevated lg:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* PRODUCTS SUBMENU - TITLES ONLY */}
      {openMega === "products" && (
        <div className="absolute inset-x-0 top-20 hidden border-b border-border/40 bg-surface-dark/98 shadow-2xl backdrop-blur-2xl lg:block animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="mx-auto max-w-[1440px] px-10 py-6">
            <div className="grid grid-cols-6 gap-6">
              {navigationData.products.groups?.map((group) => (
                <div key={group.slug} className="space-y-2 border-l border-border/20 pl-4 first:border-l-0 first:pl-0">
                  <Link to={group.href} onClick={() => setOpenMega(null)} className="group flex items-center gap-2">
                    <span className="grid size-6 place-items-center rounded bg-signal/10 text-signal">
                      <Cpu size={14} />
                    </span>
                    <p className="font-display text-sm uppercase text-signal transition-colors group-hover:underline">
                      {group.name}
                    </p>
                  </Link>

                  <ul className="space-y-1.5 pt-1">
                    {group.items.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          to={sub.href}
                          onClick={() => setOpenMega(null)}
                          className="flex items-center gap-1.5 text-xs text-surface-foreground/80 transition-colors hover:text-signal"
                        >
                          <span className="size-1 rounded-full bg-signal/50" />
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SOLUTIONS SUBMENU - TITLES ONLY */}
      {openMega === "solutions" && (
        <div className="absolute inset-x-0 top-20 hidden border-b border-border/40 bg-surface-dark/98 shadow-2xl backdrop-blur-2xl lg:block animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="mx-auto max-w-[1440px] px-10 py-6">
            <div className="grid grid-cols-4 gap-3">
              {navigationData.solutions.items?.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpenMega(null)}
                  className="group flex items-center justify-between border border-surface-foreground/10 bg-surface-elevated/40 px-4 py-3 transition-colors hover:border-signal/50 hover:bg-surface-elevated"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-7 place-items-center rounded bg-signal/10 text-signal">
                      <Factory size={15} />
                    </span>
                    <span className="font-display text-sm uppercase text-surface-foreground group-hover:text-signal">
                      {item.name}
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-signal opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* APPLICATIONS SUBMENU - TITLES ONLY */}
      {openMega === "applications" && (
        <div className="absolute inset-x-0 top-20 hidden border-b border-border/40 bg-surface-dark/98 shadow-2xl backdrop-blur-2xl lg:block animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="mx-auto max-w-[1440px] px-10 py-6">
            <div className="grid grid-cols-3 gap-3">
              {navigationData.applications.items?.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpenMega(null)}
                  className="group flex items-center justify-between border border-surface-foreground/10 bg-surface-elevated/40 px-4 py-3 transition-colors hover:border-signal/50 hover:bg-surface-elevated"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-7 place-items-center rounded bg-signal/10 text-signal">
                      <Wrench size={15} />
                    </span>
                    <span className="font-display text-sm uppercase text-surface-foreground group-hover:text-signal">
                      {item.name}
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-signal opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TECHNOLOGY SUBMENU - TITLES ONLY */}
      {openMega === "technology" && (
        <div className="absolute inset-x-0 top-20 hidden border-b border-border/40 bg-surface-dark/98 shadow-2xl backdrop-blur-2xl lg:block animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="mx-auto max-w-[1440px] px-10 py-6">
            <div className="grid grid-cols-4 gap-3">
              {navigationData.technology.items?.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpenMega(null)}
                  className="group flex items-center justify-between border border-surface-foreground/10 bg-surface-elevated/40 px-4 py-3 transition-colors hover:border-signal/50 hover:bg-surface-elevated"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-7 place-items-center rounded bg-signal/10 text-signal">
                      <Layers size={15} />
                    </span>
                    <span className="font-display text-sm uppercase text-surface-foreground group-hover:text-signal">
                      {item.name}
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-signal opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RESOURCES SUBMENU - TITLES ONLY */}
      {openMega === "resources" && (
        <div className="absolute inset-x-0 top-20 hidden border-b border-border/40 bg-surface-dark/98 shadow-2xl backdrop-blur-2xl lg:block animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="mx-auto max-w-[1440px] px-10 py-6">
            <div className="grid grid-cols-3 gap-3">
              {navigationData.resources.items?.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpenMega(null)}
                  className="group flex items-center justify-between border border-surface-foreground/10 bg-surface-elevated/40 px-4 py-3 transition-colors hover:border-signal/50 hover:bg-surface-elevated"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-7 place-items-center rounded bg-signal/10 text-signal">
                      <FileText size={15} />
                    </span>
                    <span className="font-display text-sm uppercase text-surface-foreground group-hover:text-signal">
                      {item.name}
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-signal opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
