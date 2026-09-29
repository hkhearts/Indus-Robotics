import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Layers, MessageSquare, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { solutionsData } from "@/data/solutions";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Industrial Automation Solutions | INDUS Industrial Robotics" },
      {
        name: "description",
        content:
          "Discover INDUS turnkey industrial solutions: factory automation, robotic cells, motion control synchronization, mobile robotics, smart manufacturing, and custom robotics.",
      },
    ],
  }),
  component: SolutionsIndexPage,
});

export function SolutionsIndexPage() {
  const { openModal } = useModals();

  const handleWhatsApp = () => {
    window.open(companyConfig.getWhatsAppUrl({ type: "general" }), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="technical-grid border-b border-border/40 bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
            Turnkey Systems & Engineering
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[.92] sm:text-6xl lg:text-7xl">
            Industrial Automation Solutions
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-surface-foreground/75 sm:text-lg">
            We integrate precision robotics, motion control architectures, and intelligent sensing
            into turnkey manufacturing solutions that optimize throughput, eliminate defect
            variances, and elevate industrial productivity.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              className="h-12 rounded-none bg-signal px-7 font-bold uppercase text-signal-foreground hover:bg-signal/90"
              onClick={() => openModal("engineer")}
            >
              <Wrench size={15} className="mr-2" />
              Discuss Automation Requirements
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-none border-surface-foreground/30 bg-transparent px-5 font-bold uppercase text-surface-foreground hover:border-signal hover:text-signal"
              onClick={handleWhatsApp}
            >
              <MessageSquare size={15} className="mr-2 text-signal" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions Cards Grid */}
      <section className="px-5 py-20 lg:px-10 lg:py-28 bg-background">
        <div className="mx-auto max-w-[1440px] space-y-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {solutionsData.map((sol, idx) => (
              <div
                key={sol.id}
                className="group flex flex-col justify-between border border-border bg-card p-8 transition-all hover:border-signal hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <span className="text-xs font-bold uppercase tracking-[.2em] text-signal">
                      Solution 0{idx + 1}
                    </span>
                    <Layers
                      size={18}
                      className="text-muted-foreground group-hover:text-signal transition-colors"
                    />
                  </div>

                  <h2 className="mt-5 font-display text-3xl uppercase tracking-wide text-foreground group-hover:text-signal transition-colors">
                    {sol.title}
                  </h2>

                  <p className="mt-3 text-xs font-semibold text-signal leading-5">
                    {sol.heroSubtitle}
                  </p>

                  <p className="mt-4 text-xs leading-6 text-muted-foreground">
                    {sol.shortDescription}
                  </p>

                  <div className="mt-6 space-y-2 border-t border-border/30 pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Key Capabilities
                    </span>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {sol.benefits.slice(0, 2).map((b) => (
                        <li key={b.title} className="flex items-start gap-2">
                          <span className="text-signal">•</span>
                          <span>
                            <strong className="text-foreground">{b.title}:</strong> {b.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-4">
                  <Link
                    to={`/solutions/${sol.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-signal hover:underline"
                  >
                    View Architecture & System Design <ArrowRight size={13} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
