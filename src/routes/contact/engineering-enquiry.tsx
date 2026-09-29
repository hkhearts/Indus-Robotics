import { createFileRoute, Link } from "@tanstack/react-router";
import { EngineeringEnquiryForm } from "@/components/forms/EngineeringEnquiryForm";
import { companyConfig } from "@/data/config";
import { ArrowLeft, Phone, Mail, MessageSquare, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact/engineering-enquiry")({
  head: () => ({
    meta: [
      { title: "Detailed Engineering Enquiry & Project Specification | INDUS Industrial Robotics" },
      {
        name: "description",
        content:
          "Submit your mechanical constraints, cycle time targets, payload specifications, and communication protocol requirements for review by INDUS application engineers.",
      },
    ],
  }),
  component: EngineeringEnquiryPage,
});

export function EngineeringEnquiryPage() {
  const handleWhatsApp = () => {
    window.open(companyConfig.getWhatsAppUrl({ type: "general" }), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <section className="technical-grid border-b border-border/40 bg-surface-dark px-5 py-12 text-surface-foreground lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-surface-foreground/60 hover:text-signal"
            >
              <ArrowLeft size={13} />
              Contact Hub
            </Link>
            <span className="text-surface-foreground/40">/</span>
            <span className="text-xs uppercase tracking-wider text-signal font-bold">
              Engineering Specification
            </span>
          </div>

          <p className="mt-4 text-[10px] font-bold uppercase tracking-[.24em] text-signal">
            B2B Technical Requirements Intake
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-[.95] sm:text-5xl lg:text-6xl">
            Tell Us What You're Building
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-surface-foreground/75 sm:text-base">
            Submit your kinematic requirements, payload ratings, environment parameters, and
            fieldbus standards. Our application engineering team will review your specifications,
            perform sizing calculations, and return a tailored hardware proposal.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-surface-foreground/70">
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-signal" />
              <span>Initial engineering response within 24-48 business hours</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-signal" />
              <span>Non-disclosure & proprietary data protection guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Side Quick-Contact */}
      <section className="px-5 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-[1440px] grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Form Container */}
          <div>
            <EngineeringEnquiryForm />
          </div>

          {/* Side Support Sidebar */}
          <div className="space-y-6">
            <div className="border border-border bg-card p-6">
              <h3 className="font-display text-lg font-bold uppercase tracking-wider text-foreground">
                Need Immediate Consultation?
              </h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                If you have an urgent line-down situation, tender deadline, or need live sizing
                assistance, reach our application engineers directly.
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href={`tel:${companyConfig.phone}`}
                  className="flex items-center gap-3 border border-border p-3 text-xs transition-colors hover:border-signal hover:bg-muted/50"
                >
                  <div className="flex h-9 w-9 items-center justify-center bg-muted text-foreground">
                    <Phone size={15} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Direct Line
                    </span>
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {companyConfig.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${companyConfig.salesEmail}`}
                  className="flex items-center gap-3 border border-border p-3 text-xs transition-colors hover:border-signal hover:bg-muted/50"
                >
                  <div className="flex h-9 w-9 items-center justify-center bg-muted text-foreground">
                    <Mail size={15} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Direct Sales Email
                    </span>
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {companyConfig.salesEmail}
                    </span>
                  </div>
                </a>

                <Button
                  onClick={handleWhatsApp}
                  className="w-full h-11 rounded-none bg-signal font-bold uppercase text-signal-foreground hover:bg-signal/90"
                >
                  <MessageSquare size={14} className="mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>
            </div>

            <div className="border border-border bg-muted/30 p-6">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                What Happens Next?
              </h4>
              <ol className="mt-4 space-y-3 text-xs text-muted-foreground">
                <li className="flex gap-2.5">
                  <span className="font-mono font-bold text-signal">01</span>
                  <span>
                    <strong>Kinematic Review:</strong> We analyze your payload, reach, velocity, and
                    cycle times against CAD models.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-mono font-bold text-signal">02</span>
                  <span>
                    <strong>Component Matching:</strong> We select optimal reducers, motors, drives,
                    and fieldbus interfaces.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-mono font-bold text-signal">03</span>
                  <span>
                    <strong>Technical Proposal:</strong> You receive 3D envelope diagrams, sizing
                    reports, and commercial quotes.
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
