/**
 * #6 Multimodal Vision Intelligence (Part Finder)
 * Factory-floor photo upload → closest catalog match.
 */
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Camera, Loader2 } from "lucide-react";
import { useIntelligence } from "./IntelligenceProvider";

export function VisionPartFinder({ compact = false }: { compact?: boolean }) {
  const { visitor } = useIntelligence();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ matches: Array<{ productId: string; confidence: number; matchReason: string }>; message: string } | null>(null);

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    setLoading(true);
    try {
      const b64 = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result).split(",")[1] || "");
        r.onerror = reject;
        r.readAsDataURL(f);
      });
      const res = await fetch("/api/vision-intelligence", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: b64.slice(0, 500000), visitorId: visitor?.recordId || "" }) });
      const j = await res.json();
      setResult(j);
    } catch {
      setResult({ matches: [], message: "Upload failed. Try again or contact engineering." });
    } finally { setLoading(false); }
  };

  return (
    <div className={`border border-dashed border-signal/40 bg-signal/5 ${compact ? "p-3" : "p-4"}`}>
      <label className="flex cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-wider text-signal">
        <Camera size={15} /> {loading ? "Analyzing part…" : "Upload broken-part photo"}
        <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
        {loading && <Loader2 size={13} className="animate-spin" />}
      </label>
      {!compact && <p className="mt-1 text-[11px] text-muted-foreground">Gear, actuator or motor photo → closest catalog match.</p>}
      {result && (
        <div className="mt-2 text-xs">
          <p className="text-muted-foreground">{result.message}</p>
          {result.matches.slice(0, 2).map((m) => (
            <Link key={m.productId} to="/products/$category/$id" params={{ category: "precision-reducers", id: m.productId }} className="mt-1 block font-bold text-signal hover:underline">
              {m.productId.replace(/-/g, " ")} · {Math.round(m.confidence * 100)}% — {m.matchReason}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
