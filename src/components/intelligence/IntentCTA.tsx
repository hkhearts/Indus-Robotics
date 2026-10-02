/**
 * #8 Buying Journey Intent Scoring
 * 10 Researching → Download Catalog · 50 Evaluating → Talk to Engineer · 90 Buying → Fast-Track Quote + Jira alert
 */
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useModals } from "@/components/modals/ModalContext";
import { getIntentCTA } from "@/lib/intelligence";
import { useIntelligence } from "./IntelligenceProvider";

export function IntentCTA() {
  const { visitor } = useIntelligence();
  const { openModal } = useModals();
  const cta = getIntentCTA(visitor?.intent);
  const score = visitor?.intent?.score ?? 10;

  return (
    <section className="border-y border-border bg-card px-5 py-10 lg:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">Intent-aware next step · score {score}</p>
          <h2 className="mt-1 font-display text-3xl font-bold uppercase">{cta.title}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{cta.detail}</p>
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          {cta.action === "catalog" && <Button asChild className="rounded-none bg-signal font-bold uppercase text-signal-foreground"><a href="/resources">Download Catalog <ArrowRight size={14} className="ml-1 inline" /></a></Button>}
          {cta.action === "engineer" && <Button className="rounded-none bg-signal font-bold uppercase text-signal-foreground" onClick={() => openModal("engineer")}>Talk to an Engineer</Button>}
          {(cta.action === "quote" || cta.action === "fast-quote") && <Button className="rounded-none bg-signal font-bold uppercase text-signal-foreground" onClick={() => openModal("quote")}>{cta.title} <ArrowRight size={14} className="ml-1" /></Button>}
        </div>
      </div>
    </section>
  );
}
