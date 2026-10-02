/**
 * #1 Reverse IP Firmographic Intelligence (ABM)
 * Swaps hero copy + prioritises industry application before first click.
 */
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModals } from "@/components/modals/ModalContext";
import { getIndustryAdaptation } from "@/lib/intelligence";
import { useIntelligence } from "./IntelligenceProvider";

export function AdaptiveHero({ defaultTitle, defaultSub, heroImage }: { defaultTitle: string; defaultSub: string; heroImage: string }) {
  const { visitor } = useIntelligence();
  const { openModal } = useModals();
  const industry = visitor?.firmographic?.industry;
  const adapted = getIndustryAdaptation(industry)!;
  const isAdapted = !!industry && industry !== "general";
  const title = isAdapted ? adapted.headline : defaultTitle;
  const sub = isAdapted ? adapted.sub : defaultSub;
  const priorityApp = (adapted.priorityApp || "") as "automotive" | "electronics" | "manufacturing" | "warehousing" | "logistics" | "food-packaging";

  return (
    <section className="relative flex min-h-[760px] items-end overflow-hidden bg-black pt-20 text-white lg:min-h-[860px]">
      <img src={heroImage} alt="Industrial robotic arm" width={1600} height={1008} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[68%_center]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.06_0.006_240)_0%,color-mix(in_oklab,oklch(0.06_0.006_240)_90%,transparent)_40%,color-mix(in_oklab,oklch(0.06_0.006_240)_30%,transparent)_75%,color-mix(in_oklab,oklch(0.06_0.006_240)_55%,transparent)_100%)]" />
      <div className="technical-grid absolute inset-0 opacity-20" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[oklch(0.08_0.005_240)] to-transparent" />
      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-16 lg:px-10 lg:pb-24">
        <div className="max-w-3xl">
          {isAdapted && (
            <p className="mb-3 inline-block border border-signal/50 bg-signal/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.2em] text-signal">
              Personalised for {visitor?.firmographic?.companyName} · {industry}
            </p>
          )}
          <p className="animate-rise text-xs font-bold uppercase tracking-[.24em] text-signal">Industrial Robotics · Precision Motion · Automation</p>
          <h1 className="animate-rise-delay mt-6 font-display text-6xl font-bold uppercase leading-[.85] sm:text-7xl lg:text-[104px] text-white">{title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{sub}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild className="h-12 rounded-none bg-signal px-7 text-xs font-bold uppercase text-signal-foreground hover:bg-signal/90 pulse-blue">
              {isAdapted && priorityApp ? <Link to="/applications/$applicationId" params={{ applicationId: priorityApp }}>Explore {adapted.ctaIndustry} Solutions <ArrowRight size={14} className="ml-1" /></Link> : <Link to="/products">Explore Products <ArrowRight size={14} className="ml-1" /></Link>}
            </Button>
            <Button variant="outline" className="h-12 rounded-none border-signal/40 bg-transparent px-7 text-xs font-bold uppercase text-white hover:bg-signal/10 hover:border-signal hover:text-signal" onClick={() => openModal("engineer")}>Talk to an Engineer</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
