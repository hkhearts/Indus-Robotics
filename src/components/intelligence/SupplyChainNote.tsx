/**
 * #13 Intelligent Supply-Chain Routing
 * Out-of-stock / long lead → swap to in-stock alternative meeting specs.
 */
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Truck } from "lucide-react";

export function SupplyChainNote({ productId, categorySlug }: { productId: string; categorySlug: string }) {
  const [data, setData] = useState<{ inStock: boolean; leadTimeWeeks: number; recommendation: string; alternative?: { altId: string; altName: string; reason: string; specsMatch: string } } | null>(null);

  useEffect(() => {
    fetch(`/api/supply-chain?productId=${encodeURIComponent(productId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (j) setData(j); })
      .catch(() => {});
  }, [productId]);

  if (!data || (data.inStock && data.leadTimeWeeks <= 4 && !data.alternative)) return null;
  return (
    <div className="mt-6 border border-border bg-card p-5">
      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-signal"><Truck size={14} /> Supply-chain intelligence</p>
      <p className="mt-2 text-sm text-muted-foreground">{data.recommendation} {data.inStock ? `Lead time: ${data.leadTimeWeeks} weeks.` : "Currently out of stock."}</p>
      {data.alternative && (
        <Link to="/products/$category/$id" params={{ category: categorySlug, id: data.alternative.altId }} className="mt-3 inline-block border border-signal/50 bg-signal/5 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-signal hover:bg-signal/10">
          View in-stock alternative: {data.alternative.altName} →
        </Link>
      )}
    </div>
  );
}
