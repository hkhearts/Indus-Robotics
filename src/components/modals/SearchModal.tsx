import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X, ArrowRight, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchItems } from "@/data/robotics";
import { companyConfig } from "@/data/config";
import { useModals } from "./ModalContext";

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const { openModal } = useModals();
  const navigate = useNavigate();

  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return searchItems.slice(0, 8); // show popular default suggestions
    }
    const q = query.toLowerCase();
    return searchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.detail.toLowerCase().includes(q),
    );
  }, [query]);

  const handleSelect = (href: string) => {
    onClose();
    navigate({ to: href as any });
  };

  const handleWhatsApp = () => {
    onClose();
    window.open(companyConfig.getWhatsAppUrl({ type: "general" }), "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] max-w-2xl rounded-none border border-border bg-card p-0 shadow-2xl">
        <DialogHeader className="border-b border-border bg-surface-dark p-6 text-surface-foreground">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="font-display text-2xl uppercase tracking-wider text-surface-foreground sm:text-3xl">
                Search Engineering Platform
              </DialogTitle>
              <DialogDescription className="mt-1 text-xs text-surface-foreground/70">
                Search across products, solutions, applications, technologies, resources, and
                technical FAQs.
              </DialogDescription>
            </div>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. 'Harmonic Reducer', 'EtherCAT', 'Automotive', 'Traction'..."
              className="h-12 rounded-none border-border bg-surface-elevated pl-10 text-sm text-surface-foreground placeholder:text-surface-foreground/40 focus-visible:ring-signal"
            />
          </div>
        </DialogHeader>

        <div className="max-h-[50vh] overflow-y-auto px-6 py-4">
          {filteredItems.length > 0 ? (
            <div className="divide-y divide-border">
              {filteredItems.map((item, idx) => (
                <button
                  key={`${item.href}-${idx}`}
                  onClick={() => handleSelect(item.href)}
                  className="group flex w-full items-center justify-between py-3.5 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="pr-4">
                    <span className="font-display text-base font-bold uppercase tracking-wide text-foreground group-hover:text-signal">
                      {item.title}
                    </span>
                    <p className="line-clamp-1 text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="border border-border bg-muted/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                      {item.type}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-signal opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="font-display text-xl uppercase tracking-wide text-foreground">
                No exact match found
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Can't find what you're looking for? Our application engineers can identify the right
                components or solution for your specific requirements.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button
                  className="rounded-none bg-signal text-signal-foreground hover:bg-signal/90"
                  onClick={() => {
                    onClose();
                    openModal("engineer");
                  }}
                >
                  Talk to an Engineer
                </Button>
                <Button variant="outline" className="rounded-none" onClick={handleWhatsApp}>
                  <MessageSquare size={14} className="mr-1.5" />
                  WhatsApp Us
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-muted/40 px-6 py-3 text-[11px] text-muted-foreground">
          <span>Press ESC to close</span>
          <Link
            to="/search"
            onClick={onClose}
            className="font-bold uppercase tracking-wider text-signal hover:underline"
          >
            Open Full Search Page →
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
