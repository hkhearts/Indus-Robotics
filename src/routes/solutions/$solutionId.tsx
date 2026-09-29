import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  AlertOctagon,
  Layers,
  MessageSquare,
  Wrench,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSolution, solutionsData } from "@/data/solutions";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";
import { RelatedContent } from "@/components/common/RelatedContent";

export const Route = createFileRoute("/solutions/$solutionId")({
  loader: ({ params }) => {
    const solution = getSolution(params.solutionId);
    if (!solution) {
      throw notFound();
    }
    return { solution };
  },
  head: ({ loaderData }) => {
    const solution = loaderData?.solution;
    return {
      meta: [
        { title: `${solution?.title || "Solution"} | INDUS Industrial Robotics` },
        {
          name: "description",
          content: solution?.heroSubtitle || solution?.shortDescription || "",
        },
      ],
    };
  },
  component: SolutionDetailPage,
});

export function SolutionDetailPage() {
  const { solution } = Route.useLoaderData();
  const { openModal } = useModals();

  const handleWhatsApp = () => {
    window.open(
      companyConfig.getWhatsAppUrl({ type: "solution", name: solution.title }),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="min-h-screen">
      {/* 1. HERO (Section 20) */}
      <section className="technical-grid border-b border-border/40 bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center gap-2">
            <Link
              to="/solutions"
              className="text-xs font-bold uppercase tracking-[.2em] text-signal hover:underline"
            >
              Solutions
            </Link>
            <span className="text-surface-foreground/40">/</span>
            <span className="text-xs uppercase tracking-wider text-surface-foreground/60">
              Turnkey System Engineering
            </span>
          </div>

          <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[.92] sm:text-6xl lg:text-7xl">
            {solution.title}
          </h1>

          <p className="mt-4 font-display text-xl uppercase tracking-wide text-signal sm:text-2xl">
            {solution.heroSubtitle}
          </p>

          <p className="mt-6 max-w-3xl text-base leading-8 text-surface-foreground/75 sm:text-lg">
            {solution.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              className="h-12 rounded-none bg-signal px-7 font-bold uppercase text-signal-foreground hover:bg-signal/90"
              onClick={() => openModal("engineer", { categoryName: solution.title })}
            >
              <Wrench size={15} className="mr-2" />
              Discuss Your Automation Requirement
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-none border-surface-foreground/30 bg-transparent px-6 font-bold uppercase text-surface-foreground hover:bg-surface-elevated hover:text-signal"
              onClick={() => openModal("quote", { productName: solution.title })}
            >
              Request Solution RFQ
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-none border-surface-foreground/30 bg-transparent px-5 font-bold uppercase text-surface-foreground hover:border-signal hover:text-signal"
              onClick={handleWhatsApp}
            >
              <MessageSquare size={14} className="mr-1.5 text-signal" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>

      {/* 2. THE CHALLENGE & OUR APPROACH (Section 20) */}
      <section className="px-5 py-20 lg:px-10 lg:py-24 bg-background">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* The Challenge */}
            <div className="border border-border bg-card p-8">
              <div className="flex items-center gap-2 text-destructive">
                <AlertOctagon size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-destructive">
                  Industrial Pain Points
                </span>
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                {solution.challenge.title}
              </h2>
              <p className="mt-4 text-xs leading-6 text-muted-foreground sm:text-sm">
                {solution.challenge.description}
              </p>
              <ul className="mt-6 space-y-3">
                {solution.challenge.bulletPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-xs text-muted-foreground sm:text-sm"
                  >
                    <span className="text-destructive font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Approach */}
            <div className="border border-signal/40 bg-surface-elevated/30 p-8">
              <div className="flex items-center gap-2 text-signal">
                <CheckCircle2 size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-signal">
                  Engineering Methodology
                </span>
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                {solution.approach.title}
              </h2>
              <p className="mt-4 text-xs leading-6 text-muted-foreground sm:text-sm">
                {solution.approach.description}
              </p>
              <ul className="mt-6 space-y-3">
                {solution.approach.bulletPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-xs text-foreground sm:text-sm"
                  >
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-signal" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technologies Used Badges */}
          <div className="mt-12 border-t border-border pt-8">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-3">
              Core Technologies Deployed in this Solution
            </span>
            <div className="flex flex-wrap gap-2">
              {solution.technologiesUsed.map((tech) => (
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

      {/* 3. SYSTEM ARCHITECTURE (Section 20) */}
      <section className="border-t border-border/40 bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
              Process Topology
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
              System Architecture & Execution Flow
            </h2>
            <p className="mt-3 text-xs leading-6 text-surface-foreground/65 sm:text-sm">
              How INDUS coordinates mechanical kinematics, real-time sensing, and closed-loop
              control from raw infeed to final discharge.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solution.systemArchitecture.map((step) => (
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

      {/* 4. TYPICAL APPLICATIONS & QUANTIFIABLE BENEFITS (Section 20) */}
      <section className="border-t border-border/40 bg-background px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Applications */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Deployment Scenarios
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                Typical Industrial Applications
              </h2>
              <ul className="mt-6 space-y-3">
                {solution.typicalApplications.map((app) => (
                  <li
                    key={app}
                    className="flex items-center gap-3 border border-border bg-card p-4"
                  >
                    <span className="size-2 rounded-full bg-signal" />
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground sm:text-sm">
                      {app}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Engineering ROI
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                Key Quantifiable Benefits
              </h2>
              <div className="mt-6 space-y-4">
                {solution.benefits.map((b) => (
                  <div key={b.title} className="border border-border bg-card p-6">
                    <h3 className="font-display text-xl uppercase text-signal">{b.title}</h3>
                    <p className="mt-2 text-xs leading-6 text-muted-foreground sm:text-sm">
                      {b.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RELATED PRODUCTS & RESOURCES */}
      <section className="border-t border-border/40 bg-card px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl uppercase tracking-wider text-foreground border-b border-border pb-4">
                Relevant Robotic Hardware
              </h3>
              <div className="mt-6 space-y-3">
                {solution.relatedProducts.map((p) => (
                  <Link
                    key={p.name}
                    to={p.href}
                    className="group flex items-center justify-between border border-border bg-background p-4 transition-all hover:border-signal"
                  >
                    <div>
                      <p className="font-display text-lg uppercase text-foreground group-hover:text-signal">
                        {p.name}
                      </p>
                      <span className="text-[10px] uppercase text-muted-foreground">
                        {p.category}
                      </span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-signal opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl uppercase tracking-wider text-foreground border-b border-border pb-4">
                Technical Documentation
              </h3>
              <div className="mt-6 space-y-3">
                {solution.resources.map((r) => (
                  <div
                    key={r.title}
                    className="flex items-center justify-between border border-border bg-background p-4"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-signal" />
                      <div>
                        <p className="font-display text-base uppercase text-foreground">
                          {r.title}
                        </p>
                        <span className="text-[10px] uppercase text-muted-foreground">
                          {r.type}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-none text-xs font-bold uppercase"
                      onClick={() => openModal("engineer", { productName: r.title })}
                    >
                      Request Copy
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTEXTUAL RELATED CONTENT */}
      <RelatedContent
        title={`Other Turnkey Solutions`}
        items={[
          {
            sectionTitle: "Complementary Solutions",
            links: solutionsData
              .filter((s) => s.id !== solution.id)
              .slice(0, 3)
              .map((s) => ({
                title: s.title,
                description: s.shortDescription,
                href: `/solutions/${s.id}`,
              })),
          },
          {
            sectionTitle: "Industry Verticals",
            links: [
              {
                title: "Automotive Robotics",
                description: "Body welding and powertrain assembly cells.",
                href: "/applications/automotive",
              },
              {
                title: "Electronics Automation",
                description: "Cleanroom micro-placement and testing.",
                href: "/applications/electronics",
              },
              {
                title: "Warehousing Logistics",
                description: "High-density tote handling and AGV fleets.",
                href: "/applications/warehousing",
              },
            ],
          },
        ]}
      />
    </div>
  );
}
