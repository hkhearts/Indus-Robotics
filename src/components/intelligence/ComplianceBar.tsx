/**
 * #3 Geo-Compliance & Certification Intelligence
 * EU → CE/RoHS + 230V/50Hz · US → UL + 120V/60Hz. Dynamic datasheet defaults.
 */
import { ShieldCheck, PlugZap } from "lucide-react";
import { getComplianceForCountry } from "@/lib/intelligence";
import { useIntelligence } from "./IntelligenceProvider";

export function ComplianceBar({ compact = false }: { compact?: boolean }) {
  const { visitor } = useIntelligence();
  const code = visitor?.geo?.country?.slice(0, 2) || visitor?.geo?.country || "";
  const c = getComplianceForCountry(code || "IN");
  return (
    <div className={`flex flex-wrap items-center gap-2 ${compact ? "text-[11px]" : "text-xs"} text-muted-foreground`}>
      <span className="inline-flex items-center gap-1.5 border border-signal/30 bg-signal/5 px-2 py-1 font-bold uppercase tracking-wider text-signal">
        <ShieldCheck size={13} /> {c.standards.join(" · ")}
      </span>
      <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1">
        <PlugZap size={13} className="text-signal" /> Datasheet default: {c.voltage}
      </span>
      {!compact && <span className="text-[11px]">{c.note}</span>}
    </div>
  );
}
