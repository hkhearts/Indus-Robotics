import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, MessageSquare, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { technologiesData } from "@/data/technologies";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";

export const Route = createFileRoute("/technology/")({
  head: () => ({
    meta: [
      { title: "Technology Stack | INDUS Industrial Robotics" },
      {
        name: "description",
        content:
          "Explore the core engineering technologies behind INDUS robotics: mechanics, motion control, servo technology, industrial automation, sensors & feedback, AI robotics, and Industry 4.0.",
      },
    ],
  }),
  component: TechnologyIndexPage,
});

export function TechnologyIndexPage() {
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
            Engineering Pillars & Architecture
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[.92] sm:text-6xl lg:text-7xl">
            Robotics Technology Stack
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-surface-foreground/75 sm:text-lg">
            Mechanical kinematics, electrical power regulation, deterministic real-time trajectory
            generation, high-resolution sensing, and edge telemetry operating as one synchronized
            engineering architecture.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              className="h-12 rounded-none bg-signal px-7 font-bold uppercase text-signal-foreground hover:bg-signal/90"
              onClick={() => openModal("engineer")}
            >
              <Wrench size={15} className="mr-2" />
              Consult an Application Engineer
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

      {/* Technology Layers Grid */}
      <section className="px-5 py-20 lg:px-10 lg:py-28 bg-background">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {technologiesData.map((tech, idx) => (
              <div
                key={tech.id}
                className="group flex flex-col justify-between border border-border bg-card p-8 transition-all hover:border-signal hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <span className="text-xs font-bold uppercase tracking-[.2em] text-signal">
                      Pillar 0{idx + 1}
                    </span>
                    <Cpu
                      size={18}
                      className="text-muted-foreground group-hover:text-signal transition-colors"
                    />
                  </div>

                  <h2 className="mt-5 font-display text-3xl uppercase tracking-wide text-foreground group-hover:text-signal transition-colors">
                    {tech.title}
                  </h2>

                  <p className="mt-3 text-xs font-semibold text-signal leading-5">
                    {tech.heroSubtitle}
                  </p>

                  <p className="mt-4 text-xs leading-6 text-muted-foreground">
                    {tech.shortDescription}
                  </p>

                  <div className="mt-6 space-y-2 border-t border-border/30 pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Key Mechanical & Electronic Elements
                    </span>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {tech.mainComponents.slice(0, 3).map((item) => (
                        <li key={item.name} className="flex items-center gap-2">
                          <span className="size-1 rounded-full bg-signal" />
                          <span>{item.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-4">
                  <Link
                    to={`/technology/${tech.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-signal hover:underline"
                  >
                    Explore Technical Deep-Dive <ArrowRight size={13} className="ml-1" />
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
