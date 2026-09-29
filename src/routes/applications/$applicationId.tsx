import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  AlertOctagon,
  MessageSquare,
  Wrench,
  FileText,
  Factory,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getApplication, applicationsData } from "@/data/applications";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";
import { RelatedContent } from "@/components/common/RelatedContent";

export const Route = createFileRoute("/applications/$applicationId")({
  loader: ({ params }) => {
    const application = getApplication(params.applicationId);
    if (!application) {
      throw notFound();
    }
    return { application };
  },
  head: ({ loaderData }) => {
    const application = loaderData?.application;
    return {
      meta: [
        { title: `${application?.title || "Applications"} | INDUS Industrial Robotics` },
        {
          name: "description",
          content: application?.heroSubtitle || application?.shortDescription || "",
        },
      ],
    };
  },
  component: ApplicationDetailPage,
});

export function ApplicationDetailPage() {
  const { application } = Route.useLoaderData();
  const { openModal } = useModals();

  const handleWhatsApp = () => {
    window.open(
      companyConfig.getWhatsAppUrl({ type: "application", name: application.title }),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="min-h-screen">
      {/* 1. HERO (Section 21) */}
      <section className="technical-grid border-b border-border/40 bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center gap-2">
            <Link
              to="/applications"
              className="text-xs font-bold uppercase tracking-[.2em] text-signal hover:underline"
            >
              Applications
            </Link>
            <span className="text-surface-foreground/40">/</span>
            <span className="text-xs uppercase tracking-wider text-surface-foreground/60">
              Industry Sector Automation
            </span>
          </div>

          <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[.92] sm:text-6xl lg:text-7xl">
            {application.title}
          </h1>

          <p className="mt-4 font-display text-xl uppercase tracking-wide text-signal sm:text-2xl">
            {application.heroSubtitle}
          </p>

          <p className="mt-6 max-w-3xl text-base leading-8 text-surface-foreground/75 sm:text-lg">
            {application.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              className="h-12 rounded-none bg-signal px-7 font-bold uppercase text-signal-foreground hover:bg-signal/90"
              onClick={() =>
                openModal("engineer", { categoryName: `${application.title} Application` })
              }
            >
              <Wrench size={15} className="mr-2" />
              Discuss {application.title} Automation
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-none border-surface-foreground/30 bg-transparent px-6 font-bold uppercase text-surface-foreground hover:bg-surface-elevated hover:text-signal"
              onClick={() => openModal("quote", { productName: `${application.title} Systems` })}
            >
              Request Quote
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-none border-surface-foreground/30 bg-transparent px-5 font-bold uppercase text-surface-foreground hover:border-signal hover:text-signal"
              onClick={handleWhatsApp}
            >
              <MessageSquare size={14} className="mr-1.5 text-signal" />
              WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* 2. INDUSTRY OVERVIEW */}
      <section className="border-b border-border bg-card px-5 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1360px]">
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
            Market Context
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
            Industry Manufacturing Overview
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-8 text-muted-foreground sm:text-base">
            {application.industryOverview}
          </p>
        </div>
      </section>

      {/* 3. CHALLENGES & ROBOTIC OPPORTUNITIES (Section 21) */}
      <section className="px-5 py-20 lg:px-10 lg:py-24 bg-background">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Challenges */}
            <div className="border border-border bg-card p-8">
              <div className="flex items-center gap-2 text-destructive">
                <AlertOctagon size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-destructive">
                  Industry Bottlenecks
                </span>
              </div>
              <h3 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                {application.automationChallenges.title}
              </h3>
              <p className="mt-4 text-xs leading-6 text-muted-foreground sm:text-sm">
                {application.automationChallenges.description}
              </p>
              <ul className="mt-6 space-y-3">
                {application.automationChallenges.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2.5 text-xs text-muted-foreground sm:text-sm"
                  >
                    <span className="text-destructive font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="border border-signal/40 bg-surface-elevated/30 p-8">
              <div className="flex items-center gap-2 text-signal">
                <CheckCircle2 size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-signal">
                  Robotic Potential
                </span>
              </div>
              <h3 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                {application.roboticOpportunity.title}
              </h3>
              <p className="mt-4 text-xs leading-6 text-muted-foreground sm:text-sm">
                {application.roboticOpportunity.description}
              </p>
              <ul className="mt-6 space-y-3">
                {application.roboticOpportunity.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2.5 text-xs text-foreground sm:text-sm"
                  >
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-signal" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Technologies */}
          <div className="mt-12 border-t border-border pt-8">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-3">
              Recommended Technologies for {application.title}
            </span>
            <div className="flex flex-wrap gap-2">
              {application.recommendedTechnologies.map((tech) => (
                <span
                  key={tech}
                  className="border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SYSTEM ARCHITECTURE & WORKFLOW (Section 21) */}
      <section className="border-t border-border/40 bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
              Process Topology
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
              System Architecture Workflow
            </h2>
            <p className="mt-3 text-xs leading-6 text-surface-foreground/65 sm:text-sm">
              Deterministic handshakes between robotic arms, transfer axes, machine vision, and
              central plant controllers.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {application.systemArchitecture.map((step) => (
              <div
                key={step.step}
                className="border border-surface-foreground/15 bg-surface-elevated p-6 transition-colors hover:border-signal"
              >
                <span className="font-display text-3xl font-bold text-signal">{step.step}</span>
                <h3 className="mt-3 font-display text-xl uppercase tracking-wide text-surface-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-surface-foreground/60">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TYPICAL TASKS & RELEVANT HARDWARE (Section 21) */}
      <section className="border-t border-border/40 bg-card px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Typical Tasks */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Tasks Automated
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold uppercase">
                Typical Automation Tasks in {application.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {application.typicalApplications.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border border-border bg-background p-4"
                  >
                    <span className="size-2 rounded-full bg-signal" />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground sm:text-sm">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Relevant Hardware */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Hardware Catalog
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold uppercase">
                Relevant Robotic Components
              </h3>
              <div className="mt-6 space-y-3">
                {application.relevantProducts.map((p) => (
                  <Link
                    key={p.name}
                    to={p.href}
                    className="group block border border-border bg-background p-4 transition-all hover:border-signal"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-display text-lg uppercase text-foreground group-hover:text-signal">
                        {p.name}
                      </p>
                      <span className="text-[10px] uppercase text-muted-foreground">
                        {p.category}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTEXTUAL RELATED CONTENT */}
      <RelatedContent
        title={`Other Manufacturing Sectors`}
        items={[
          {
            sectionTitle: "Related Applications",
            links: applicationsData
              .filter((a) => a.id !== application.id)
              .slice(0, 3)
              .map((a) => ({
                title: a.title,
                description: a.shortDescription,
                href: `/applications/${a.id}`,
              })),
          },
          {
            sectionTitle: "Turnkey Solutions",
            links: [
              {
                title: "Factory Automation",
                description: "Modular production cells and transfer conveyors.",
                href: "/solutions/factory-automation",
              },
              {
                title: "Mobile Robotics",
                description: "AMR and AGV autonomous material distribution.",
                href: "/solutions/mobile-robotics",
              },
              {
                title: "Smart Manufacturing",
                description: "OPC UA telemetry and predictive analytics.",
                href: "/solutions/smart-manufacturing",
              },
            ],
          },
        ]}
      />
    </div>
  );
}
