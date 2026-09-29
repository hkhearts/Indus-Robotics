import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  MessageSquare,
  Wrench,
  FileText,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTechnology, technologiesData } from "@/data/technologies";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";
import { RelatedContent } from "@/components/common/RelatedContent";

export const Route = createFileRoute("/technology/$techId")({
  loader: ({ params }) => {
    const technology = getTechnology(params.techId);
    if (!technology) {
      throw notFound();
    }
    return { technology };
  },
  head: ({ loaderData }) => {
    const technology = loaderData?.technology;
    return {
      meta: [
        { title: `${technology?.title || "Technology"} | INDUS Industrial Robotics` },
        { name: "description", content: technology?.heroSubtitle || technology?.whatIsIt || "" },
      ],
    };
  },
  component: TechnologyDetailPage,
});

export function TechnologyDetailPage() {
  const { technology } = Route.useLoaderData();
  const { openModal } = useModals();

  const handleWhatsApp = () => {
    window.open(companyConfig.getWhatsAppUrl({ type: "general" }), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen">
      {/* 1. HERO (Section 22) */}
      <section className="technical-grid border-b border-border/40 bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center gap-2">
            <Link
              to="/technology"
              className="text-xs font-bold uppercase tracking-[.2em] text-signal hover:underline"
            >
              Technology Stack
            </Link>
            <span className="text-surface-foreground/40">/</span>
            <span className="text-xs uppercase tracking-wider text-surface-foreground/60">
              Engineering Architecture
            </span>
          </div>

          <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[.92] sm:text-6xl lg:text-7xl">
            {technology.title}
          </h1>

          <p className="mt-4 font-display text-xl uppercase tracking-wide text-signal sm:text-2xl">
            {technology.heroSubtitle}
          </p>

          <p className="mt-6 max-w-3xl text-base leading-8 text-surface-foreground/75 sm:text-lg">
            {technology.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              className="h-12 rounded-none bg-signal px-7 font-bold uppercase text-signal-foreground hover:bg-signal/90"
              onClick={() =>
                openModal("engineer", { categoryName: `${technology.title} Technology` })
              }
            >
              <Wrench size={15} className="mr-2" />
              Consult an Application Engineer
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-none border-surface-foreground/30 bg-transparent px-6 font-bold uppercase text-surface-foreground hover:bg-surface-elevated hover:text-signal"
              onClick={() => openModal("quote", { productName: `${technology.title} Hardware` })}
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

      {/* 2. WHAT IS IT & WHY IT MATTERS (Section 22) */}
      <section className="px-5 py-20 lg:px-10 lg:py-24 bg-background">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* What Is It */}
            <div className="border border-border bg-card p-8">
              <span className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Core Definition
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                What Is {technology.title}?
              </h2>
              <p className="mt-4 text-xs leading-7 text-muted-foreground sm:text-sm">
                {technology.whatIsIt}
              </p>
            </div>

            {/* Why It Matters */}
            <div className="border border-signal/40 bg-surface-elevated/30 p-8">
              <span className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Engineering Rationale
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                Why It Matters
              </h2>
              <p className="mt-4 text-xs leading-7 text-foreground sm:text-sm">
                {technology.whyItMatters}
              </p>
            </div>
          </div>

          {/* How It Works Full Width */}
          <div className="mt-12 border border-border bg-card p-8 sm:p-10">
            <span className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
              Operating Principles
            </span>
            <h3 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
              How It Works: Kinematics, Dynamics & Regulation Loops
            </h3>
            <p className="mt-4 text-sm leading-8 text-muted-foreground sm:text-base">
              {technology.howItWorks}
            </p>
          </div>
        </div>
      </section>

      {/* 3. MAIN COMPONENTS (Section 22) */}
      <section className="border-t border-border/40 bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
              Subsystems
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
              Main Components & Physical Hardware
            </h2>
            <p className="mt-3 text-xs leading-6 text-surface-foreground/65 sm:text-sm">
              Critical mechanical linkages, motor windings, power stages, and feedback transducers
              comprising this technology domain.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {technology.mainComponents.map((comp) => (
              <div
                key={comp.name}
                className="border border-surface-foreground/15 bg-surface-elevated p-6 transition-colors hover:border-signal"
              >
                <Cpu className="text-signal mb-4" size={20} />
                <h3 className="font-display text-xl uppercase tracking-wide text-surface-foreground">
                  {comp.name}
                </h3>
                <p className="mt-2 text-xs leading-5 text-surface-foreground/60">
                  {comp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INDUSTRIAL APPLICATIONS & INTEGRATION */}
      <section className="border-t border-border/40 bg-background px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Industrial Applications */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Deployment Areas
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold uppercase">
                Industrial Applications
              </h3>
              <ul className="mt-6 space-y-3">
                {technology.industrialApplications.map((app) => (
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

            {/* Integration & Control */}
            <div className="border border-border bg-card p-8">
              <span className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Interoperability
              </span>
              <h3 className="mt-2 font-display text-3xl font-bold uppercase">System Integration</h3>
              <p className="mt-4 text-xs leading-7 text-muted-foreground sm:text-sm">
                {technology.integration}
              </p>

              {/* Related Products List */}
              <div className="mt-8 border-t border-border pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                  Hardware Implementing {technology.title}
                </h4>
                <div className="space-y-2">
                  {technology.relatedProducts.map((prod) => (
                    <Link
                      key={prod.name}
                      to={prod.href}
                      className="group flex items-center justify-between border border-border bg-background p-3 text-xs transition-colors hover:border-signal"
                    >
                      <span className="font-display text-base uppercase text-foreground group-hover:text-signal">
                        {prod.name}
                      </span>
                      <span className="text-[10px] uppercase text-muted-foreground">
                        {prod.category}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TECHNOLOGY SPECIFIC FAQS (Section 22) */}
      <section className="border-t border-border/40 bg-card px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
              Engineering Reference
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold uppercase">
              Frequently Asked Questions: {technology.title}
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {technology.faqs.map((faq) => (
              <div key={faq.question} className="border border-border bg-background p-6">
                <div className="flex items-start gap-2.5">
                  <HelpCircle size={18} className="mt-0.5 shrink-0 text-signal" />
                  <div>
                    <h4 className="font-display text-lg uppercase text-foreground">
                      {faq.question}
                    </h4>
                    <p className="mt-3 text-xs leading-6 text-muted-foreground sm:text-sm border-t border-border/40 pt-3">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTEXTUAL RELATED CONTENT */}
      <RelatedContent
        title={`Other Technology Disciplines`}
        items={[
          {
            sectionTitle: "Complementary Technologies",
            links: technologiesData
              .filter((t) => t.id !== technology.id)
              .slice(0, 3)
              .map((t) => ({
                title: t.title,
                description: t.shortDescription,
                href: `/technology/${t.id}`,
              })),
          },
          {
            sectionTitle: "Turnkey Solutions",
            links: [
              {
                title: "Motion Control Solutions",
                description: "Multi-axis deterministic electronic camming.",
                href: "/solutions/motion-control",
              },
              {
                title: "Robotic Automation",
                description: "Articulated industrial robot cell design.",
                href: "/solutions/robotic-automation",
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
