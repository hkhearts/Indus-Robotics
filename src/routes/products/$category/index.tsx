import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  MessageSquare,
  Wrench,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategory, categories } from "@/data/robotics";
import { resourcesData } from "@/data/resources";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";
import { RelatedContent } from "@/components/common/RelatedContent";

export const Route = createFileRoute("/products/$category/")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) {
      throw notFound();
    }
    return { category };
  },
  head: ({ loaderData }) => {
    const category = loaderData?.category;
    return {
      meta: [
        { title: `${category?.title || "Robotics"} | INDUS Industrial Robotics` },
        { name: "description", content: category?.seoDescription || category?.intro || "" },
      ],
    };
  },
  component: CategoryPage,
});

export function CategoryPage() {
  const { category } = Route.useLoaderData();
  const { openModal } = useModals();

  const handleWhatsApp = () => {
    window.open(
      companyConfig.getWhatsAppUrl({ type: "product", name: category.title }),
      "_blank",
      "noopener,noreferrer",
    );
  };

  const relatedDocs = resourcesData
    .filter(
      (r) =>
        r.productCategory?.toLowerCase() === category.title.toLowerCase() ||
        r.category === "Products",
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* 1. HERO (Section 16) */}
      <section className="technical-grid border-b border-border/40 bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
            Robotics Technology Category
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[.9] sm:text-6xl lg:text-7xl">
            {category.title}
          </h1>
          <p className="mt-4 font-display text-xl uppercase tracking-wide text-signal sm:text-2xl">
            {category.positioning}
          </p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-surface-foreground/75 sm:text-lg">
            {category.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              className="h-12 rounded-none bg-signal px-7 font-bold uppercase text-signal-foreground hover:bg-signal/90"
              onClick={() =>
                openModal("quote", { productName: category.title, categoryName: category.title })
              }
            >
              Request a Quote <ArrowRight size={14} className="ml-1.5" />
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-none border-surface-foreground/30 bg-transparent px-6 font-bold uppercase text-surface-foreground hover:bg-surface-elevated hover:text-signal"
              onClick={() => openModal("engineer", { categoryName: category.title })}
            >
              <Wrench size={14} className="mr-1.5" />
              Talk to an Engineer
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

      {/* 2. PRODUCT FAMILIES CARDS (Section 16) */}
      <section className="px-5 py-20 lg:px-10 lg:py-24 bg-background">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
              Configured Families
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
              {category.title} Product Families
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Select a specialized technology family to inspect mechanical sizing, CAD geometries,
              and technical parameters.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {category.subFamilies.map((sub) => (
              <div
                key={sub.slug}
                className="group flex flex-col justify-between border border-border bg-card p-6 transition-all hover:border-signal"
              >
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-foreground group-hover:text-signal">
                    {sub.name}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{sub.description}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/40 pt-4">
                    {sub.specsPreview.map((spec) => (
                      <span
                        key={spec}
                        className="border border-border bg-muted/30 px-2 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2 pt-2">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-none text-xs font-bold uppercase"
                  >
                    <Link to={`/products/${category.slug}/${sub.slug}`}>
                      Explore {sub.name} <ArrowRight size={13} className="ml-1" />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    className="w-full rounded-none bg-signal text-xs font-bold uppercase text-signal-foreground hover:bg-signal/90"
                    onClick={() =>
                      openModal("quick", { productName: `${category.title} - ${sub.name}` })
                    }
                  >
                    Quick Enquiry
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. KEY SELECTION FACTORS (Section 16) */}
      <section className="border-t border-border/40 bg-card px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Engineering Criteria
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                Key Selection Factors for {category.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Specifying the appropriate drivetrain components requires holistic evaluation of
                peak dynamic loads, thermal duty cycles, stiffness constraints, and fieldbus
                communication latencies.
              </p>

              <ul className="mt-6 space-y-3">
                {category.selectionFactors.map((factor) => (
                  <li key={factor} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-1 shrink-0 text-signal" />
                    <span className="text-xs font-semibold text-foreground sm:text-sm">
                      {factor}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications & Capabilities */}
            <div className="border border-border bg-background p-8">
              <h3 className="font-display text-2xl uppercase tracking-wider text-signal border-b border-border pb-4">
                Primary Industrial Applications
              </h3>
              <ul className="mt-6 space-y-3 text-xs sm:text-sm text-muted-foreground">
                {(
                  category.applications || [
                    "Automotive",
                    "Electronics",
                    "Packaging",
                    "Material Handling",
                  ]
                ).map((app) => (
                  <li key={app} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-signal" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>

              <h4 className="mt-8 font-display text-lg uppercase tracking-wider text-foreground border-b border-border pb-3">
                System Integration Considerations
              </h4>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                {category.considerations.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <span className="mt-1 text-signal">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECHNICAL RESOURCES & RELATED TECHNOLOGIES (Section 16) */}
      <section className="border-t border-border/40 bg-background px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Technical Resources */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Downloads & Documentation
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold uppercase">
                Technical Resources for {category.title}
              </h3>
              <div className="mt-6 space-y-3">
                {relatedDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between border border-border bg-card p-4"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-signal" />
                      <div>
                        <p className="font-display text-base uppercase text-foreground">
                          {doc.title}
                        </p>
                        <span className="text-[10px] uppercase text-muted-foreground">
                          {doc.documentType} · {doc.fileFormat}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-none text-xs font-bold uppercase"
                      onClick={() => openModal("engineer", { productName: doc.title })}
                    >
                      Request Copy
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  to="/resources"
                  className="text-xs font-bold uppercase tracking-wider text-signal hover:underline"
                >
                  Browse All Engineering Resources →
                </Link>
              </div>
            </div>

            {/* Related Technologies */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Coordinated Technologies
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold uppercase">
                Related Drivetrain Technologies
              </h3>
              <div className="mt-6 space-y-3">
                {category.relatedTechnologies.map((tech) => (
                  <Link
                    key={tech.name}
                    to={tech.href}
                    className="group block border border-border bg-card p-4 transition-all hover:border-signal"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-display text-lg uppercase text-foreground group-hover:text-signal">
                        {tech.name}
                      </p>
                      <ArrowRight
                        size={14}
                        className="text-signal opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{tech.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA STRIP */}
      <section className="border-t border-border/40 bg-surface-dark px-5 py-16 text-surface-foreground lg:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h3 className="font-display text-3xl font-bold uppercase sm:text-4xl">
              Need assistance sizing {category.title}?
            </h3>
            <p className="mt-2 text-xs text-surface-foreground/65 sm:text-sm">
              Our application engineers can verify inertia ratios, motor torque curves, and duty
              cycle thermals for your project.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              className="rounded-none bg-signal font-bold uppercase text-signal-foreground hover:bg-signal/90"
              onClick={() => openModal("engineer", { categoryName: category.title })}
            >
              Talk to an Engineer
            </Button>
            <Button
              variant="outline"
              className="rounded-none border-surface-foreground/30 bg-transparent font-bold uppercase text-surface-foreground hover:bg-surface-elevated hover:text-signal"
              onClick={() => openModal("quote", { productName: category.title })}
            >
              Request Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
