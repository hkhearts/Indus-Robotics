/**
 * #2 Account Collaborative Intelligence
 * Detects 3+ stakeholders from same company → Shared Company Workspace prompt.
 */
import { useState } from "react";
import { Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntelligence } from "./IntelligenceProvider";

export function SharedWorkspacePrompt() {
  const { visitor } = useIntelligence();
  const [dismissed, setDismissed] = useState(false);
  const [created, setCreated] = useState(false);
  const count = visitor?.collaborative?.companyVisitorCount ?? 0;
  if (dismissed || created || count < 3) return null;

  return (
    <div className="border-b border-signal/40 bg-surface-dark px-5 py-3 text-surface-foreground">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-3">
        <Users size={16} className="text-signal" />
        <p className="text-xs">
          <strong className="uppercase tracking-wider">Team detected:</strong> {count} colleagues from {visitor?.firmographic?.companyName ?? "your company"} are evaluating robotics.{" "}
          Create a <strong>Shared Company Workspace</strong> to collaborate on one BOM / quote.
        </p>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="rounded-none bg-signal text-[11px] font-bold uppercase text-signal-foreground" onClick={() => setCreated(true)}>Create Workspace</Button>
          <button aria-label="Dismiss" onClick={() => setDismissed(true)} className="text-surface-foreground/60 hover:text-signal"><X size={14} /></button>
        </div>
      </div>
      {created && <p className="mx-auto mt-1 max-w-[1440px] text-[11px] text-signal">Workspace ready — add products to the shared BOM from any product page.</p>}
    </div>
  );
}
