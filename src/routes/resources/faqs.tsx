import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ChevronDown, Search, ArrowRight, HelpCircle, MessageSquare, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { extendedFaqs } from "@/data/faqs";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";

export const Route = createFileRoute("/resources/faqs")({
  head: () => ({
    meta: [
      { title: "Technical FAQs & Knowledge Center | INDUS Industrial Robotics" },
      {
        name: "description",
        content:
          "Comprehensive engineering answers to frequently asked questions on industrial robots, servo actuators, precision reducers, AGV wheels, and motion control integration.",
      },
    ],
  }),
  component: FaqPage,
});

export function FaqPage() {
  const { openModal } = useModals();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categoriesList = [
    "All",
    "General Robotics",
    "Actuators & Motion",
    "Gearing & Reducers",
    "Mobile Robotics",
    "Control & Electronics",
    "Integration & Quotation",
  ];

  const filteredFaqs = useMemo(() => {
    return extendedFaqs.filter((faq) => {
      const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
      const matchesQuery =
        !searchQuery.trim() ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const handleWhatsApp = () => {
    window.open(companyConfig.getWhatsAppUrl({ type: "general" }), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="technical-grid border-b border-border/40 bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
            Engineering Knowledge Base
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[.92] sm:text-6xl lg:text-7xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-surface-foreground/75 sm:text-lg">
            Direct, rigorous technical answers to common engineering questions regarding joint
            kinematics, strain wave vs cycloidal gearing, AGV mobility dynamics, and deterministic
            fieldbus integration.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              className="h-12 rounded-none bg-signal px-7 font-bold uppercase text-signal-foreground hover:bg-signal/90"
              onClick={() => openModal("engineer")}
            >
              <Wrench size={15} className="mr-2" />
              Ask an Application Engineer
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

      {/* Filter & Search Toolbar (Section 33) */}
      <section className="border-b border-border bg-card px-5 py-6 lg:px-10">
        <div className="mx-auto max-w-[1440px] space-y-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technical questions or keywords (e.g. 'backlash', 'AMR', 'EtherCAT')..."
              className="h-12 rounded-none border-input bg-background pl-10 text-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeCategory === cat
                    ? "bg-signal text-signal-foreground"
                    : "border border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordions List */}
      <section className="px-5 py-16 lg:px-10 lg:py-24 bg-background">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing {filteredFaqs.length} technical answers</span>
            {(activeCategory !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="font-bold uppercase tracking-wider text-signal hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group border border-border bg-card p-6 transition-colors open:bg-surface-elevated/20"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-display text-xl uppercase tracking-wide list-none text-foreground">
                    <span className="flex items-center gap-3">
                      <HelpCircle size={18} className="shrink-0 text-signal" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      size={20}
                      className="shrink-0 text-signal transition-transform group-open:rotate-180 ml-4"
                    />
                  </summary>

                  <div className="mt-4 border-t border-border/40 pt-4 text-xs leading-7 text-muted-foreground sm:text-sm">
                    <p>{faq.answer}</p>

                    {faq.relatedProductSlug && (
                      <div className="mt-4 flex items-center gap-2 border-t border-border/20 pt-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-signal">
                          Related Engineering Solution:
                        </span>
                        <Link
                          to={faq.relatedProductSlug}
                          className="font-display text-xs uppercase text-foreground hover:text-signal hover:underline"
                        >
                          {faq.relatedProductName || "View Product Line"} →
                        </Link>
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <div className="border border-border bg-card p-12 text-center">
              <HelpCircle size={32} className="mx-auto text-muted-foreground" />
              <h3 className="mt-4 font-display text-2xl uppercase">No Matching FAQs</h3>
              <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground">
                We couldn't find an answer matching your query. Our application engineers are
                available to review your specific question directly.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button
                  className="rounded-none bg-signal font-bold uppercase text-xs text-signal-foreground hover:bg-signal/90"
                  onClick={() => openModal("engineer")}
                >
                  Ask an Engineer
                </Button>
                <Button
                  variant="outline"
                  className="rounded-none border-border"
                  onClick={handleWhatsApp}
                >
                  <MessageSquare size={14} className="mr-1.5 text-signal" />
                  Ask via WhatsApp
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
