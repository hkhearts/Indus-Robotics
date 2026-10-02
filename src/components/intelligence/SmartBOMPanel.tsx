/**
 * #4 Ecosystem Compatibility Intelligence (Smart BOM)
 * "To power this arm you need a 400W servo drive + absolute encoders."
 */
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Puzzle } from "lucide-react";
import { getSmartBOM } from "@/lib/intelligence";

export function SmartBOMPanel({ productId, categorySlug }: { productId: string; categorySlug: string }) {
  const [companions, setCompanions] = useState<string[]>([]);
  const [why, setWhy] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const local = getSmartBOM(productId);
      try {
        const r = await fetch(`/api/smart-bom?productId=${encodeURIComponent(productId)}`);
        if (r.ok) {
          const j = await r.json();
          if (!cancelled && j.companions?.length) { setCompanions(j.companions); setWhy(j.why); return; }
        }
      } catch { /* fallback to local */ }
      if (!cancelled && local) { setCompanions(local.needs); setWhy(local.why); }
    })();
    return () => { cancelled = true; };
  }, [productId]);

  if (!companions.length) return null;
  return (
    <div className="mt-6 border border-signal/30 bg-signal/5 p-5">
      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-signal"><Puzzle size={14} /> Smart BOM — matched companions</p>
      <p className="mt-2 text-sm leading-6 text-foreground">{why}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {companions.map((c) => (
          <Link key={c} to={`/products/$category/$id`} params={{ category: categorySlug, id: c }} className="border border-border bg-card px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider hover:border-signal hover:text-signal">
            + {c.replace(/-/g, " ")}
          </Link>
        ))}
      </div>
    </div>
  );
}
