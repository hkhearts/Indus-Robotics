/**
 * #11 Reading & Scroll-Velocity Intelligence
 * Fast skim → bullets/specs · slow deep read → Explain / 3D exploded view.
 */
import { BookOpen, Boxes } from "lucide-react";
import { useScrollVelocity } from "@/hooks/use-scroll-velocity";

export function ReadingAdapt({ bullets, onExplain }: { bullets: string[]; onExplain?: () => void }) {
  const { velocity, hoverDeep } = useScrollVelocity();
  if (velocity === "fast") {
    return (
      <div className="mt-4 border border-border bg-muted/30 p-4">
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-signal">Skim mode — key specs</p>
        <ul className="mt-2 list-disc pl-5 text-xs leading-6 text-foreground">
          {bullets.slice(0, 5).map((b) => <li key={b}>{b}</li>)}
        </ul>
      </div>
    );
  }
  if (velocity === "slow" || hoverDeep) {
    return (
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={onExplain} className="inline-flex items-center gap-1.5 border border-signal/50 bg-signal/5 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-signal hover:bg-signal/10">
          <BookOpen size={13} /> Explain this concept
        </button>
        <span className="inline-flex items-center gap-1.5 border border-border px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          <Boxes size={13} /> View 3D exploded view
        </span>
      </div>
    );
  }
  return null;
}
