import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  ArrowRight,
  FileText,
  Search,
  Download,
  Filter,
  MessageSquare,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resourcesData, type DocumentType } from "@/data/resources";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";

export const Route = createFileRoute("/resources/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      type: (search.type as string) || "all",
      category: (search.category as string) || "all",
    };
  },
  head: () => ({
    meta: [
      { title: "Engineering Resource Center | INDUS Industrial Robotics" },
      {
        name: "description",
        content:
          "Access technical specifications, datasheets, product catalogues, application notes, case studies, and engineering whitepapers for industrial robotics.",
      },
    ],
  }),
  component: ResourcesIndexPage,
});

export function ResourcesIndexPage() {
  const searchParams = Route.useSearch();
  const { openModal } = useModals();

  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>(searchParams.type || "all");
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.category || "all");
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>("all");

  const documentTypes = [
    { label: "All Documents", value: "all" },
    { label: "Datasheets", value: "datasheet" },
    { label: "Catalogues", value: "catalogue" },
    { label: "Application Notes", value: "app-note" },
    { label: "Case Studies", value: "case-study" },
    { label: "Technical Articles", value: "article" },
    { label: "Documentation", value: "tech-doc" },
  ];

  const categoriesList = ["all", "Products", "Applications", "Technology"];
  const productCategoriesList = [
    "all",
    "Actuators",
    "Precision Reducers",
    "Robotic Wheels",
    "Robotic Arms",
    "Industrial Robots",
    "Control Systems",
  ];

  const filteredResources = useMemo(() => {
    return resourcesData.filter((item) => {
      const matchesType = selectedType === "all" || item.documentType === selectedType;
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesProductCat =
        selectedProductCategory === "all" || item.productCategory === selectedProductCategory;
      const matchesQuery =
        !query.trim() ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase());

      return matchesType && matchesCategory && matchesProductCat && matchesQuery;
    });
  }, [selectedType, selectedCategory, selectedProductCategory, query]);

  const handleWhatsApp = () => {
    window.open(companyConfig.getWhatsAppUrl({ type: "general" }), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="technical-grid border-b border-border/40 bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
            Technical Knowledge Base
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[.92] sm:text-6xl lg:text-7xl">
            Engineering Resource Center
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-surface-foreground/75 sm:text-lg">
            Access verified mechanical specifications, torque curves, electrical pinouts,
            application sizing notes, and case studies for industrial robotics and motion
            automation.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-none border-surface-foreground/30 bg-transparent px-6 font-bold uppercase text-surface-foreground hover:bg-surface-elevated hover:text-signal"
            >
              <Link to="/resources/faqs">View FAQ Knowledge Base →</Link>
            </Button>
            <Button
              className="h-12 rounded-none bg-signal px-7 font-bold uppercase text-signal-foreground hover:bg-signal/90"
              onClick={() => openModal("engineer")}
            >
              <Wrench size={15} className="mr-2" />
              Request Custom Sizing Report
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-none border-surface-foreground/30 bg-transparent px-5 font-bold uppercase text-surface-foreground hover:border-signal hover:text-signal"
              onClick={handleWhatsApp}
            >
              <MessageSquare size={15} className="mr-2 text-signal" />
              WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Filter Toolbar (Section 23) */}
      <section className="border-b border-border bg-card px-5 py-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr_1fr] items-center">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources by keyword..."
                className="h-11 rounded-none border-input bg-background pl-10 text-sm"
              />
            </div>

            {/* Document Type Filter */}
            <label className="block">
              <span className="sr-only">Document Type</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="h-11 w-full rounded-none border border-input bg-background px-3 text-xs font-bold uppercase tracking-wider text-foreground focus:border-signal"
              >
                {documentTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>

            {/* Category Filter */}
            <label className="block">
              <span className="sr-only">Discipline Category</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-11 w-full rounded-none border border-input bg-background px-3 text-xs font-bold uppercase tracking-wider text-foreground focus:border-signal"
              >
                {categoriesList.map((c) => (
                  <option key={c} value={c}>
                    {c === "all" ? "All Categories" : c}
                  </option>
                ))}
              </select>
            </label>

            {/* Product Category Filter */}
            <label className="block">
              <span className="sr-only">Product Family</span>
              <select
                value={selectedProductCategory}
                onChange={(e) => setSelectedProductCategory(e.target.value)}
                className="h-11 w-full rounded-none border border-input bg-background px-3 text-xs font-bold uppercase tracking-wider text-foreground focus:border-signal"
              >
                {productCategoriesList.map((p) => (
                  <option key={p} value={p}>
                    {p === "all" ? "All Product Lines" : p}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      {/* Resource Cards Grid */}
      <section className="px-5 py-16 lg:px-10 lg:py-24 bg-background">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing {filteredResources.length} engineering documents</span>
            {(selectedType !== "all" ||
              selectedCategory !== "all" ||
              selectedProductCategory !== "all" ||
              query) && (
              <button
                onClick={() => {
                  setSelectedType("all");
                  setSelectedCategory("all");
                  setSelectedProductCategory("all");
                  setQuery("");
                }}
                className="font-bold uppercase tracking-wider text-signal hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          {filteredResources.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col justify-between border border-border bg-card p-6 transition-all hover:border-signal hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-border/40 pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-signal">
                        {item.documentType}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {item.fileFormat} {item.fileSizeBytes ? `· ${item.fileSizeBytes}` : ""}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl uppercase tracking-wide text-foreground">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {item.description}
                    </p>

                    {item.productCategory && (
                      <span className="mt-4 inline-block border border-border bg-muted/20 px-2 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
                        {item.productCategory}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
                    <span className="text-[10px] text-muted-foreground">
                      Updated: {item.dateAdded}
                    </span>

                    {/* Action button: Section 23 specifies: If file is not actually available, do not create a fake download */}
                    {item.availableOnRequest ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-none text-xs font-bold uppercase"
                        onClick={() => openModal("engineer", { productName: item.title })}
                      >
                        Request Copy
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-none text-xs font-bold uppercase"
                        onClick={() => openModal("quick", { productName: item.title })}
                      >
                        View Details
                      </Button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-border bg-card p-12 text-center">
              <FileText size={32} className="mx-auto text-muted-foreground" />
              <h3 className="mt-4 font-display text-2xl uppercase">No Matching Documents Found</h3>
              <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground">
                We couldn't find resources matching your exact filter combination. Contact our
                engineering team and we will provide customized documentation directly.
              </p>
              <Button
                className="mt-6 rounded-none bg-signal font-bold uppercase text-xs text-signal-foreground hover:bg-signal/90"
                onClick={() => openModal("engineer")}
              >
                Request Custom Technical Documentation
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
