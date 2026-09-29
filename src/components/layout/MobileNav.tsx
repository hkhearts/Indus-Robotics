import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, Minus, ArrowRight, MessageSquare, Search, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigationData } from "@/data/navigation";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";
import { trackDigitalPresence } from "@/trackDigitalPresence";

export function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { openModal } = useModals();

  if (!isOpen) return null;

  const toggle = (key: string) => {
    const next = expandedSection === key ? null : key;
    setExpandedSection(next);
    if (next) {
      trackDigitalPresence("navigation", `Mobile Menu - ${key}`, `Expanded mobile ${key}`);
    }
  };

  const handleWhatsApp = () => {
    onClose();
    trackDigitalPresence("contact", "Mobile WhatsApp", "Opened WhatsApp chat");
    window.open(companyConfig.getWhatsAppUrl({ type: "general" }), "_blank", "noopener,noreferrer");
  };

  const handleQuote = () => {
    onClose();
    trackDigitalPresence("cta_click", "Mobile Request Quote", "Opened Quote Modal");
    openModal("quote");
  };

  const handleSearch = () => {
    onClose();
    trackDigitalPresence("click", "Mobile Search Button", "Opened Search Modal");
    openModal("search");
  };

  return (
    <div className="fixed inset-x-0 top-20 bottom-0 z-50 overflow-y-auto border-t border-border/40 bg-surface-dark px-5 py-6 text-surface-foreground lg:hidden animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="space-y-1">
        {/* PRODUCTS ACCORDION */}
        <div className="border-b border-border/20 py-2">
          <button
            onClick={() => toggle("products")}
            className="flex w-full items-center justify-between py-2 text-left font-display text-lg uppercase tracking-wide text-surface-foreground"
          >
            <span>Products</span>
            <span className="text-signal">
              {expandedSection === "products" ? <Minus size={18} /> : <Plus size={18} />}
            </span>
          </button>
          {expandedSection === "products" && (
            <div className="mt-2 space-y-4 pb-3 pl-3 animate-in fade-in duration-150">
              <Link
                to="/products"
                onClick={onClose}
                className="block text-xs font-bold uppercase tracking-wider text-signal"
              >
                View All Products Portfolio →
              </Link>
              {navigationData.products.groups?.map((group) => (
                <div key={group.slug} className="space-y-1.5">
                  <Link
                    to={group.href}
                    onClick={onClose}
                    className="block text-xs font-bold uppercase tracking-wider text-surface-foreground hover:text-signal"
                  >
                    {group.name}
                  </Link>
                  <div className="grid grid-cols-2 gap-1.5 pl-2">
                    {group.items.map((sub) => (
                      <Link
                        key={sub.href}
                        to={sub.href}
                        onClick={onClose}
                        className="text-[11px] text-surface-foreground/75 hover:text-signal"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SOLUTIONS ACCORDION */}
        <div className="border-b border-border/20 py-2">
          <button
            onClick={() => toggle("solutions")}
            className="flex w-full items-center justify-between py-2 text-left font-display text-lg uppercase tracking-wide text-surface-foreground"
          >
            <span>Solutions</span>
            <span className="text-signal">
              {expandedSection === "solutions" ? <Minus size={18} /> : <Plus size={18} />}
            </span>
          </button>
          {expandedSection === "solutions" && (
            <div className="mt-2 space-y-2 pb-3 pl-3 animate-in fade-in duration-150">
              <Link
                to="/solutions"
                onClick={onClose}
                className="block text-xs font-bold uppercase tracking-wider text-signal"
              >
                View All Solutions →
              </Link>
              {navigationData.solutions.items?.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className="block text-xs text-surface-foreground/75 hover:text-signal"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* APPLICATIONS ACCORDION */}
        <div className="border-b border-border/20 py-2">
          <button
            onClick={() => toggle("applications")}
            className="flex w-full items-center justify-between py-2 text-left font-display text-lg uppercase tracking-wide text-surface-foreground"
          >
            <span>Applications</span>
            <span className="text-signal">
              {expandedSection === "applications" ? <Minus size={18} /> : <Plus size={18} />}
            </span>
          </button>
          {expandedSection === "applications" && (
            <div className="mt-2 space-y-2 pb-3 pl-3 animate-in fade-in duration-150">
              <Link
                to="/applications"
                onClick={onClose}
                className="block text-xs font-bold uppercase tracking-wider text-signal"
              >
                View All Applications →
              </Link>
              {navigationData.applications.items?.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className="block text-xs text-surface-foreground/75 hover:text-signal"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* TECHNOLOGY ACCORDION */}
        <div className="border-b border-border/20 py-2">
          <button
            onClick={() => toggle("technology")}
            className="flex w-full items-center justify-between py-2 text-left font-display text-lg uppercase tracking-wide text-surface-foreground"
          >
            <span>Technology</span>
            <span className="text-signal">
              {expandedSection === "technology" ? <Minus size={18} /> : <Plus size={18} />}
            </span>
          </button>
          {expandedSection === "technology" && (
            <div className="mt-2 space-y-2 pb-3 pl-3 animate-in fade-in duration-150">
              <Link
                to="/technology"
                onClick={onClose}
                className="block text-xs font-bold uppercase tracking-wider text-signal"
              >
                View Technology Stack →
              </Link>
              {navigationData.technology.items?.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className="block text-xs text-surface-foreground/75 hover:text-signal"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* RESOURCES ACCORDION */}
        <div className="border-b border-border/20 py-2">
          <button
            onClick={() => toggle("resources")}
            className="flex w-full items-center justify-between py-2 text-left font-display text-lg uppercase tracking-wide text-surface-foreground"
          >
            <span>Resources</span>
            <span className="text-signal">
              {expandedSection === "resources" ? <Minus size={18} /> : <Plus size={18} />}
            </span>
          </button>
          {expandedSection === "resources" && (
            <div className="mt-2 space-y-2 pb-3 pl-3 animate-in fade-in duration-150">
              <Link
                to="/resources"
                onClick={onClose}
                className="block text-xs font-bold uppercase tracking-wider text-signal"
              >
                Visit Resource Center →
              </Link>
              {navigationData.resources.items?.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className="block text-xs text-surface-foreground/75 hover:text-signal"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/resources/faqs"
                onClick={onClose}
                className="block text-xs text-surface-foreground/75 hover:text-signal"
              >
                Knowledge Center & FAQs
              </Link>
            </div>
          )}
        </div>

        {/* ABOUT ACCORDION */}
        <div className="border-b border-border/20 py-2">
          <button
            onClick={() => toggle("about")}
            className="flex w-full items-center justify-between py-2 text-left font-display text-lg uppercase tracking-wide text-surface-foreground"
          >
            <span>About</span>
            <span className="text-signal">
              {expandedSection === "about" ? <Minus size={18} /> : <Plus size={18} />}
            </span>
          </button>
          {expandedSection === "about" && (
            <div className="mt-2 space-y-2 pb-3 pl-3 animate-in fade-in duration-150">
              {navigationData.about.items?.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className="block text-xs text-surface-foreground/75 hover:text-signal"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* CAREERS LINK */}
        <div className="border-b border-border/20 py-3">
          <Link
            to="/careers"
            onClick={onClose}
            className="flex items-center justify-between font-display text-lg uppercase tracking-wide text-surface-foreground hover:text-signal"
          >
            <span className="flex items-center gap-2">
              <Briefcase size={18} className="text-signal" />
              Careers & Profiles
            </span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* DIRECT CONTACT LINK */}
        <div className="border-b border-border/20 py-3">
          <Link
            to="/contact"
            onClick={onClose}
            className="block font-display text-lg uppercase tracking-wide text-surface-foreground hover:text-signal"
          >
            Contact Hub
          </Link>
        </div>
      </div>

      {/* SEARCH BUTTON IN DRAWER */}
      <div className="mt-6">
        <button
          onClick={handleSearch}
          className="flex h-12 w-full items-center justify-between border border-border/40 bg-surface-elevated px-4 text-xs font-bold uppercase tracking-wider text-surface-foreground"
        >
          <span className="flex items-center gap-2">
            <Search size={16} className="text-signal" />
            Search Platform
          </span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* MOBILE CTAs */}
      <div className="mt-6 space-y-3 pb-8">
        <Button
          onClick={handleQuote}
          className="h-12 w-full rounded-none bg-signal font-bold uppercase tracking-wider text-signal-foreground hover:bg-signal/90"
        >
          Request a Quote <ArrowRight size={14} className="ml-1.5" />
        </Button>
        <Button
          variant="outline"
          onClick={handleWhatsApp}
          className="h-12 w-full rounded-none border-surface-foreground/30 bg-transparent font-bold uppercase tracking-wider text-surface-foreground hover:bg-surface-elevated hover:text-signal"
        >
          <MessageSquare size={16} className="mr-2 text-signal" />
          Chat on WhatsApp
        </Button>
      </div>
    </div>
  );
}
