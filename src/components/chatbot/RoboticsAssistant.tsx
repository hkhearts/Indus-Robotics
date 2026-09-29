import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bot, X, ArrowRight, RefreshCw, MessageSquare, Wrench, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, categories, type Product } from "@/data/robotics";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";

export function RoboticsAssistant() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { openModal } = useModals();

  const stepQuestions = [
    {
      title: "What are you building?",
      key: "building",
      options: [
        "Articulated Robotic Arm",
        "Autonomous Mobile Robot (AMR / AGV)",
        "Industrial Automation Workcell",
        "Multi-Axis Gantry / Cartesian System",
        "Precision Rotary Indexing Station",
        "Special Machine / OEM Mechanism",
      ],
    },
    {
      title: "What type of movement is primary?",
      key: "movement",
      options: [
        "Rotary Joint Articulation",
        "Linear Guided Travel",
        "Omnidirectional Mobile Traction",
        "Multi-Axis Spatial Interpolation",
        "High-Speed Planar Pick-and-Place",
      ],
    },
    {
      title: "What engineering factor matters most?",
      key: "priority",
      options: [
        "Zero Backlash & Positioning Repeatability",
        "High Torque Density in Compact Envelope",
        "High Linear Speed & Rapid Cycle Time",
        "Heavy Structural Payload Capacity",
        "Safe Collaborative Shared Workspace",
      ],
    },
    {
      title: "What industry will this deploy in?",
      key: "industry",
      options: [
        "Automotive & EV Assembly",
        "Electronics & Semiconductor",
        "General Manufacturing & CNC Tending",
        "Warehousing & Intralogistics",
        "Food, Packaging & Pharmaceuticals",
      ],
    },
  ];

  const handleSelectOption = (key: string, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    setStep(step + 1);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
  };

  // Determine matched recommendation based on answers
  const recommendedProducts: Product[] = React.useMemo(() => {
    if (step < 5) return [];

    const building = answers.building || "";
    const movement = answers.movement || "";
    const priority = answers.priority || "";

    if (building.includes("Mobile") || movement.includes("Mobile")) {
      return products.filter((p) => p.categorySlug === "robotic-wheels").slice(0, 2);
    }
    if (priority.includes("Backlash") || building.includes("Rotary")) {
      return products
        .filter((p) => p.categorySlug === "precision-reducers" || p.slug === "rotary")
        .slice(0, 2);
    }
    if (movement.includes("Linear") || building.includes("Cartesian")) {
      return products.filter((p) => p.categorySlug === "actuators").slice(0, 2);
    }
    if (building.includes("Arm") || building.includes("Workcell")) {
      return products
        .filter((p) => p.categorySlug === "robotic-arms" || p.categorySlug === "industrial-robots")
        .slice(0, 2);
    }

    return products.slice(0, 2);
  }, [step, answers]);

  const handleWhatsApp = () => {
    window.open(companyConfig.getWhatsAppUrl({ type: "general" }), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Persistent Assistant Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-4 z-40 flex h-12 items-center gap-2 border border-signal/40 bg-surface-dark px-4 text-xs font-bold uppercase tracking-wider text-surface-foreground shadow-2xl transition-transform hover:-translate-y-0.5 hover:border-signal hover:text-signal md:bottom-6 md:right-6"
        aria-label="Open Robotics Assistant"
      >
        <span className="grid size-6 place-items-center bg-signal text-signal-foreground">
          <Bot size={16} />
        </span>
        <span className="hidden sm:inline">Robotics Assistant</span>
      </button>

      {/* Assistant Modal Window */}
      {open && (
        <aside
          className="fixed bottom-36 right-4 z-40 w-[calc(100%-2rem)] max-w-md border border-border bg-card shadow-2xl md:bottom-20 md:right-6 animate-in fade-in slide-in-from-bottom-2 duration-150"
          aria-label="Robotics Technical Assistant"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/40 bg-surface-dark p-4 text-surface-foreground">
            <span className="flex items-center gap-2.5 font-display text-base uppercase tracking-wider">
              <Bot className="text-signal" size={18} />
              Robotics Assistant
            </span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="size-8 text-surface-foreground/75 hover:bg-surface-elevated hover:text-surface-foreground"
            >
              <X size={16} />
            </Button>
          </div>

          {/* Content Area */}
          <div className="max-h-[60vh] overflow-y-auto p-5 text-left">
            {step === 0 && (
              <div className="space-y-4">
                <p className="text-xs leading-5 text-muted-foreground">
                  Welcome to INDUS Industrial Robotics. I can help guide your component sizing,
                  compare suitable technologies, or connect you directly with an application
                  engineer.
                </p>

                <div className="grid gap-2 pt-2">
                  <Button
                    variant="outline"
                    className="h-auto justify-between rounded-none py-3 text-left font-display text-sm uppercase tracking-wide hover:border-signal"
                    onClick={() => setStep(1)}
                  >
                    <span>Guided Product Finder (4 Steps)</span>
                    <ArrowRight size={14} className="text-signal" />
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto justify-between rounded-none py-3 text-left font-display text-sm uppercase tracking-wide hover:border-signal"
                    onClick={() => {
                      setOpen(false);
                      openModal("search");
                    }}
                  >
                    <span>Search Products & Catalogues</span>
                    <ArrowRight size={14} className="text-signal" />
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto justify-between rounded-none py-3 text-left font-display text-sm uppercase tracking-wide hover:border-signal"
                    onClick={() => {
                      setOpen(false);
                      openModal("quote");
                    }}
                  >
                    <span>Request a Commercial Quote</span>
                    <ArrowRight size={14} className="text-signal" />
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto justify-between rounded-none py-3 text-left font-display text-sm uppercase tracking-wide hover:border-signal"
                    onClick={() => {
                      setOpen(false);
                      openModal("engineer");
                    }}
                  >
                    <span>Talk to an Engineer</span>
                    <ArrowRight size={14} className="text-signal" />
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto justify-between rounded-none py-3 text-left font-display text-sm uppercase tracking-wide hover:border-signal"
                    onClick={handleWhatsApp}
                  >
                    <span className="flex items-center gap-1.5">
                      <MessageSquare size={14} className="text-signal" />
                      Continue on WhatsApp
                    </span>
                    <ArrowRight size={14} className="text-signal" />
                  </Button>
                </div>
              </div>
            )}

            {step >= 1 && step <= 4 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-signal">
                    Step {step} of 4
                  </span>
                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-1 text-[10px] uppercase text-muted-foreground hover:text-signal"
                  >
                    <RefreshCw size={10} /> Reset
                  </button>
                </div>

                <h4 className="font-display text-lg uppercase tracking-wide text-foreground">
                  {stepQuestions[step - 1].title}
                </h4>

                <div className="grid gap-2 pt-1">
                  {stepQuestions[step - 1].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelectOption(stepQuestions[step - 1].key, option)}
                      className="group flex w-full items-center justify-between border border-border bg-background p-3 text-left text-xs font-semibold text-foreground transition-all hover:border-signal hover:bg-surface-elevated/40"
                    >
                      <span>{option}</span>
                      <ArrowRight
                        size={13}
                        className="text-signal opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step >= 5 && (
              <div className="space-y-4">
                <div className="border border-signal/30 bg-surface-elevated/30 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-signal">
                    Engineering Sizing Analysis
                  </p>
                  <h4 className="mt-1 font-display text-lg uppercase">
                    Potential Matches for Your Application
                  </h4>
                </div>

                <div className="space-y-3">
                  {recommendedProducts.map((p) => (
                    <div key={p.id} className="border border-border bg-background p-3">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-signal">
                        {p.category}
                      </span>
                      <h5 className="font-display text-base uppercase text-foreground">{p.name}</h5>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {p.overview}
                      </p>

                      <div className="mt-3 flex gap-2">
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="flex-1 rounded-none text-xs font-bold uppercase"
                          onClick={() => setOpen(false)}
                        >
                          <Link to={`/products/${p.categorySlug}/${p.slug}`}>View Product</Link>
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 rounded-none bg-signal text-xs font-bold uppercase text-signal-foreground hover:bg-signal/90"
                          onClick={() => {
                            setOpen(false);
                            openModal("quote", { productName: p.name });
                          }}
                        >
                          Quote
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Technical Validation Disclaimer (Section 31) */}
                <div className="flex items-start gap-2 border border-border/40 bg-muted/30 p-3 text-[11px] leading-4 text-muted-foreground">
                  <ShieldAlert size={16} className="shrink-0 text-signal mt-0.5" />
                  <p>
                    These suggestions are based on the parameters provided and should be validated
                    against detailed mechanical inertia, continuous duty cycle, and fieldbus
                    requirements before final specification.
                  </p>
                </div>

                {/* Human Handoff (Section 32) */}
                <div className="flex flex-col gap-2 pt-1">
                  <Button
                    onClick={() => {
                      setOpen(false);
                      openModal("engineer", {
                        categoryName: answers.building || "Custom System",
                      });
                    }}
                    className="w-full rounded-none bg-signal font-bold uppercase text-xs text-signal-foreground hover:bg-signal/90"
                  >
                    <Wrench size={13} className="mr-1.5" />
                    Review Requirements with an Engineer
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleWhatsApp}
                    className="w-full rounded-none border-border font-bold uppercase text-xs"
                  >
                    <MessageSquare size={13} className="mr-1.5 text-signal" />
                    Continue on WhatsApp
                  </Button>

                  <button
                    onClick={handleRestart}
                    className="mt-1 text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-signal"
                  >
                    Start Over with Different Parameters
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      )}
    </>
  );
}
