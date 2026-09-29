import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Search as SearchIcon,
  ArrowRight,
  Boxes,
  Cpu,
  FileText,
  HelpCircle,
  Factory,
  Layers,
  SlidersHorizontal,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { productFamilies, categories } from "@/data/robotics";
import { solutionsData } from "@/data/solutions";
import { applicationsData } from "@/data/applications";
import { technologiesData } from "@/data/technologies";
import { resourcesData } from "@/data/resources";
import { extendedFaqs } from "@/data/faqs";
import { useModals } from "@/components/modals/ModalContext";
import { companyConfig } from "@/data/config";

interface SearchParams {
  q?: string;
  tab?: string;
}

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : "",
    tab: typeof search.tab === "string" ? search.tab : "all",
  }),
  head: () => ({
    meta: [
      { title: "Search Engineering Architecture & Products | INDUS Industrial Robotics" },
      {
        name: "description",
        content:
          "Search across INDUS robotics hardware, integrated actuators, precision strain wave gearing, mobile robot drive wheels, turn-key automation solutions, and technical resources.",
      },
    ],
  }),
  component: SearchPage,
});

export function SearchPage() {
  const searchParams = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const { openModal } = useModals();

  const [inputQuery, setInputQuery] = useState(searchParams.q || "");
  const currentTab = searchParams.tab || "all";
  const query = (searchParams.q || "").trim().toLowerCase();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      search: (prev) => ({
        ...prev,
        q: inputQuery.trim(),
      }),
    });
  };

  const handleTabChange = (tabId: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        tab: tabId,
      }),
    });
  };

  // Perform search across all domains
  const results = useMemo(() => {
    if (!query) {
      return {
        products: [],
        solutions: [],
        applications: [],
        technology: [],
        resources: [],
        faqs: [],
        total: 0,
      };
    }

    // 1. Products
    const matchedProducts = productFamilies.filter((item) => {
      const matchName = item.name.toLowerCase().includes(query);
      const matchDesc = item.description?.toLowerCase().includes(query) || false;
      const matchShort = item.shortDescription?.toLowerCase().includes(query) || false;
      const matchCat = item.category?.toLowerCase().includes(query) || false;
      const matchApps = item.keyApplications?.some((a) => a.toLowerCase().includes(query)) || false;
      const matchSpecs = Object.values(item.specifications || {}).some((s) =>
        s.toLowerCase().includes(query),
      );
      return matchName || matchDesc || matchShort || matchCat || matchApps || matchSpecs;
    });

    // 2. Solutions
    const matchedSolutions = solutionsData.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.shortDescription.toLowerCase().includes(query) ||
        item.challenge.toLowerCase().includes(query) ||
        item.approach.toLowerCase().includes(query) ||
        item.benefits.some(
          (b) =>
            b.title.toLowerCase().includes(query) || b.description.toLowerCase().includes(query),
        )
      );
    });

    // 3. Applications
    const matchedApplications = applicationsData.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.marketOverview.toLowerCase().includes(query) ||
        item.typicalPayload.toLowerCase().includes(query) ||
        item.challenges.some(
          (c) =>
            c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query),
        )
      );
    });

    // 4. Technology
    const matchedTechnology = technologiesData.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.shortDescription.toLowerCase().includes(query) ||
        item.whatIsIt.toLowerCase().includes(query) ||
        item.whyItMatters.toLowerCase().includes(query) ||
        item.howItWorks.toLowerCase().includes(query)
      );
    });

    // 5. Resources
    const matchedResources = resourcesData.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.documentType.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    });

    // 6. FAQs
    const matchedFaqs = extendedFaqs.filter((item) => {
      return (
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    });

    const total =
      matchedProducts.length +
      matchedSolutions.length +
      matchedApplications.length +
      matchedTechnology.length +
      matchedResources.length +
      matchedFaqs.length;

    return {
      products: matchedProducts,
      solutions: matchedSolutions,
      applications: matchedApplications,
      technology: matchedTechnology,
      resources: matchedResources,
      faqs: matchedFaqs,
      total,
    };
  }, [query]);

  const tabs = [
    { id: "all", label: "All Results", count: results.total },
    { id: "products", label: "Products", count: results.products.length, icon: Boxes },
    { id: "solutions", label: "Solutions", count: results.solutions.length, icon: Layers },
    {
      id: "applications",
      label: "Applications",
      count: results.applications.length,
      icon: Factory,
    },
    { id: "technology", label: "Technology", count: results.technology.length, icon: Cpu },
    { id: "resources", label: "Resources", count: results.resources.length, icon: FileText },
    { id: "faqs", label: "FAQs", count: results.faqs.length, icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <section className="technical-grid border-b border-border/40 bg-surface-dark px-5 py-12 text-surface-foreground lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
            Engineering Knowledge & Product Finder
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
            Search Platform
          </h1>
          <p className="mt-3 text-sm text-surface-foreground/70">
            Query across technical specifications, motion control components, industry vertical
            architectures, and engineering datasheets.
          </p>

          {/* Search Bar Input */}
          <form onSubmit={handleSearchSubmit} className="mt-8 flex max-w-3xl gap-2">
            <div className="relative flex-1">
              <SearchIcon
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-foreground/50"
              />
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Search by keyword, product name, specification (e.g. EtherCAT, Harmonic, AGV, Palletizing)..."
                className="h-12 w-full border border-surface-foreground/20 bg-surface-elevated pl-12 pr-4 text-sm text-surface-foreground placeholder:text-surface-foreground/40 focus:border-signal focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              className="h-12 rounded-none bg-signal px-7 font-bold uppercase text-signal-foreground hover:bg-signal/90"
            >
              Search
            </Button>
          </form>

          {/* Quick Filter Queries */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-surface-foreground/60">
            <span className="font-bold uppercase tracking-wider text-surface-foreground/40">
              Popular:
            </span>
            {[
              "Harmonic Reducer",
              "Servo Actuator",
              "EtherCAT",
              "Palletizing",
              "AGV Drive Wheel",
              "IP67",
            ].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => {
                  setInputQuery(term);
                  navigate({ search: { q: term, tab: "all" } });
                }}
                className="rounded border border-surface-foreground/15 bg-surface-elevated/50 px-2.5 py-1 text-[11px] transition-colors hover:border-signal hover:text-signal"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Content Area */}
      <section className="px-5 py-10 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-[1200px]">
          {/* Query Summary & Tab Filter Bar */}
          {query && (
            <div className="mb-8 border-b border-border pb-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Search Results for <span className="text-foreground font-bold">"{query}"</span>
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Found {results.total} matching engineering record(s)
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-1.5">
                  {tabs.map((tab) => {
                    const isActive = currentTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleTabChange(tab.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                          isActive
                            ? "bg-foreground text-background"
                            : "border border-border bg-card text-muted-foreground hover:border-signal/50 hover:text-foreground"
                        }`}
                      >
                        {tab.label}
                        <span
                          className={`text-[10px] px-1 py-0.2 rounded ${isActive ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"}`}
                        >
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* If no query was typed yet */}
          {!query && (
            <div className="border border-dashed border-border p-12 text-center">
              <SearchIcon size={36} className="mx-auto text-muted-foreground/50" />
              <h3 className="mt-4 font-display text-2xl font-bold uppercase text-foreground">
                Enter an Engineering Search Query
              </h3>
              <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-muted-foreground">
                Use the search input above to query technical parameters, motor frames, reducer
                ratios, industrial automation systems, or technical whitepapers.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 max-w-3xl mx-auto text-left">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to="/products/$category"
                    params={{ category: cat.slug }}
                    className="border border-border bg-card p-4 transition-colors hover:border-signal group"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-signal">
                      Category
                    </span>
                    <h4 className="mt-1 font-display text-base font-bold uppercase text-foreground group-hover:text-signal">
                      {cat.name}
                    </h4>
                    <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">
                      {cat.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Results Display */}
          {query && results.total === 0 && (
            <div className="border border-border bg-card p-12 text-center">
              <HelpCircle size={40} className="mx-auto text-signal" />
              <h3 className="mt-4 font-display text-2xl font-bold uppercase text-foreground">
                No Exact Matches Found for "{query}"
              </h3>
              <p className="mx-auto mt-2 max-w-lg text-xs leading-6 text-muted-foreground">
                We couldn't locate any items matching your exact search terms. Our engineering team
                can provide customized sizing, CAD drawings, or recommend equivalent alternatives.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button
                  onClick={() => openModal("engineer")}
                  className="rounded-none bg-signal px-6 font-bold uppercase text-signal-foreground hover:bg-signal/90"
                >
                  Consult an Application Engineer
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(companyConfig.getWhatsAppUrl({ type: "general" }), "_blank")
                  }
                  className="rounded-none border-border"
                >
                  <MessageSquare size={14} className="mr-2 text-signal" />
                  Ask via WhatsApp
                </Button>
                <Button variant="outline" asChild className="rounded-none border-border">
                  <Link to="/contact/engineering-enquiry">Submit Project Requirements</Link>
                </Button>
              </div>
            </div>
          )}

          {/* Matched Content Sections */}
          {query && results.total > 0 && (
            <div className="space-y-12">
              {/* Products Section */}
              {(currentTab === "all" || currentTab === "products") &&
                results.products.length > 0 && (
                  <div>
                    <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
                      <h3 className="flex items-center gap-2 font-display text-xl font-bold uppercase text-foreground">
                        <Boxes size={18} className="text-signal" />
                        Products ({results.products.length})
                      </h3>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {results.products.map((item) => (
                        <Link
                          key={item.id}
                          to="/products/$category/$id"
                          params={{ category: item.categorySlug, id: item.id }}
                          className="group flex flex-col justify-between border border-border bg-card p-5 transition-all hover:border-signal hover:shadow-md"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-signal">
                                {item.category}
                              </span>
                              <ArrowRight
                                size={14}
                                className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-signal"
                              />
                            </div>
                            <h4 className="mt-2 font-display text-lg font-bold uppercase text-foreground group-hover:text-signal">
                              {item.name}
                            </h4>
                            <p className="mt-2 text-xs leading-5 text-muted-foreground line-clamp-2">
                              {item.shortDescription || item.description}
                            </p>

                            {/* Quick Specs */}
                            {item.specifications && (
                              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border/60 pt-3">
                                {Object.entries(item.specifications)
                                  .slice(0, 2)
                                  .map(([key, val]) => (
                                    <div key={key}>
                                      <span className="block text-[9px] uppercase tracking-wider text-muted-foreground">
                                        {key}
                                      </span>
                                      <span className="font-mono text-xs font-bold text-foreground">
                                        {val}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              {/* Solutions Section */}
              {(currentTab === "all" || currentTab === "solutions") &&
                results.solutions.length > 0 && (
                  <div>
                    <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
                      <h3 className="flex items-center gap-2 font-display text-xl font-bold uppercase text-foreground">
                        <Layers size={18} className="text-signal" />
                        Turn-Key Automation Solutions ({results.solutions.length})
                      </h3>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {results.solutions.map((sol) => (
                        <Link
                          key={sol.id}
                          to="/solutions/$solutionId"
                          params={{ solutionId: sol.slug }}
                          className="group border border-border bg-card p-5 transition-all hover:border-signal"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider text-signal">
                            Integrated Solution
                          </span>
                          <h4 className="mt-1 font-display text-lg font-bold uppercase text-foreground group-hover:text-signal">
                            {sol.title}
                          </h4>
                          <p className="mt-2 text-xs leading-5 text-muted-foreground line-clamp-2">
                            {sol.shortDescription}
                          </p>
                          <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-wider text-signal">
                            View Architecture{" "}
                            <ArrowRight
                              size={13}
                              className="ml-1 transition-transform group-hover:translate-x-1"
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              {/* Applications Section */}
              {(currentTab === "all" || currentTab === "applications") &&
                results.applications.length > 0 && (
                  <div>
                    <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
                      <h3 className="flex items-center gap-2 font-display text-xl font-bold uppercase text-foreground">
                        <Factory size={18} className="text-signal" />
                        Industry Applications ({results.applications.length})
                      </h3>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {results.applications.map((app) => (
                        <Link
                          key={app.id}
                          to="/applications/$applicationId"
                          params={{ applicationId: app.slug }}
                          className="group border border-border bg-card p-5 transition-all hover:border-signal"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-signal">
                              Industry Vertical
                            </span>
                            <span className="font-mono text-[10px] text-muted-foreground">
                              {app.typicalPayload}
                            </span>
                          </div>
                          <h4 className="mt-1 font-display text-lg font-bold uppercase text-foreground group-hover:text-signal">
                            {app.title}
                          </h4>
                          <p className="mt-2 text-xs leading-5 text-muted-foreground line-clamp-2">
                            {app.description}
                          </p>
                          <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-wider text-signal">
                            Read Case Study & Architecture{" "}
                            <ArrowRight
                              size={13}
                              className="ml-1 transition-transform group-hover:translate-x-1"
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              {/* Technology Section */}
              {(currentTab === "all" || currentTab === "technology") &&
                results.technology.length > 0 && (
                  <div>
                    <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
                      <h3 className="flex items-center gap-2 font-display text-xl font-bold uppercase text-foreground">
                        <Cpu size={18} className="text-signal" />
                        Technology & Physics Pillars ({results.technology.length})
                      </h3>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {results.technology.map((tech) => (
                        <Link
                          key={tech.id}
                          to="/technology/$techId"
                          params={{ techId: tech.id }}
                          className="group border border-border bg-card p-5 transition-all hover:border-signal"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider text-signal">
                            Core Engineering Discipline
                          </span>
                          <h4 className="mt-1 font-display text-lg font-bold uppercase text-foreground group-hover:text-signal">
                            {tech.title}
                          </h4>
                          <p className="mt-2 text-xs leading-5 text-muted-foreground line-clamp-2">
                            {tech.shortDescription}
                          </p>
                          <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-wider text-signal">
                            Explore Physical Principles{" "}
                            <ArrowRight
                              size={13}
                              className="ml-1 transition-transform group-hover:translate-x-1"
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              {/* Resources Section */}
              {(currentTab === "all" || currentTab === "resources") &&
                results.resources.length > 0 && (
                  <div>
                    <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
                      <h3 className="flex items-center gap-2 font-display text-xl font-bold uppercase text-foreground">
                        <FileText size={18} className="text-signal" />
                        Technical Resources & Datasheets ({results.resources.length})
                      </h3>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {results.resources.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex flex-col justify-between border border-border bg-card p-4"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] uppercase font-bold text-foreground">
                                {doc.fileFormat} {doc.fileSizeBytes ? `• ${doc.fileSizeBytes}` : ""}
                              </span>
                              <span className="text-[10px] uppercase tracking-wider text-signal font-bold">
                                {doc.documentType}
                              </span>
                            </div>
                            <h4 className="mt-2 font-display text-base font-bold uppercase text-foreground">
                              {doc.title}
                            </h4>
                            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                              {doc.description}
                            </p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                            <Link
                              to="/resources"
                              className="text-xs font-semibold text-signal hover:underline"
                            >
                              Resource Center
                            </Link>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 rounded-none border-border text-xs"
                              onClick={() => openModal("engineer", { productName: doc.title })}
                            >
                              Request Document
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* FAQs Section */}
              {(currentTab === "all" || currentTab === "faqs") && results.faqs.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
                    <h3 className="flex items-center gap-2 font-display text-xl font-bold uppercase text-foreground">
                      <HelpCircle size={18} className="text-signal" />
                      Frequently Asked Questions ({results.faqs.length})
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {results.faqs.map((faq) => (
                      <div key={faq.id} className="border border-border bg-card p-5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-signal">
                            {faq.category}
                          </span>
                        </div>
                        <h4 className="mt-1 font-display text-base font-bold uppercase text-foreground">
                          {faq.question}
                        </h4>
                        <p className="mt-2 text-xs leading-6 text-muted-foreground">{faq.answer}</p>
                        {faq.relatedProductSlug && (
                          <div className="mt-3 pt-2 border-t border-border/50">
                            <Link
                              to={faq.relatedProductSlug as any}
                              className="text-xs font-bold text-signal hover:underline inline-flex items-center gap-1"
                            >
                              Related Hardware: {faq.relatedProductName} <ArrowRight size={12} />
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
