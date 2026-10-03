import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Mail,
  Phone,
  MessageSquare,
  Wrench,
  Clock,
  FileSpreadsheet,
  CheckCircle2,
  Globe,
  ShieldCheck,
  Zap,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";

export const Route = createFileRoute("/contact/")(
  {
    head: () => ({
      meta: [
        {
          title:
            "Contact INDUS Industrial Robotics | Engineering Enquiries & Quotations",
        },
        {
          name: "description",
          content:
            "Connect with INDUS Industrial Robotics for technical consultations, quotation requests, application engineering support, and direct WhatsApp communication. Mon–Fri 08:00–18:00.",
        },
      ],
    }),
    component: ContactIndexPage,
  },
);

export function ContactIndexPage() {
  const { openModal } = useModals();

  const handleWhatsApp = () => {
    window.open(
      companyConfig.getWhatsAppUrl({ type: "general" }),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="min-h-screen">

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="technical-grid border-b border-border/40 bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
            Engineering Consultation & Support
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[.92] sm:text-6xl lg:text-7xl">
            Contact INDUS Robotics
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-surface-foreground/75 sm:text-lg">
            Connect directly with our application engineers. Whether you need
            component sizing verification, a formal commercial quotation, or
            custom OEM joint development — we are ready to assist.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="h-12 rounded-none bg-signal px-7 font-bold uppercase text-signal-foreground hover:bg-signal/90"
            >
              <Link to="/contact/engineering-enquiry">
                Submit Engineering Form <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-none border-surface-foreground/30 bg-transparent px-6 font-bold uppercase text-surface-foreground hover:bg-surface-elevated hover:text-signal"
              onClick={handleWhatsApp}
            >
              <MessageSquare size={14} className="mr-1.5 text-signal" />
              Chat on WhatsApp
            </Button>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-surface-foreground/15 pt-8">
            {[
              { icon: Clock, text: "Mon – Fri · 08:00 – 18:00 (EST)" },
              { icon: Zap, text: "Technical reply within 1 business day" },
              { icon: ShieldCheck, text: "Pre-sales engineering at no cost" },
              { icon: Globe, text: "Serving manufacturers globally" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-surface-foreground/55">
                <Icon size={13} className="text-signal" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT CHANNELS ─────────────────────────────────────── */}
      <section className="bg-background px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
              How to Reach Us
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
              Choose Your Channel
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Engineering Consultation */}
            <div className="group flex flex-col justify-between border border-border bg-card p-8 transition-colors hover:border-signal/40">
              <div>
                <div className="flex items-center justify-between">
                  <Wrench className="text-signal" size={28} />
                  <span className="border border-signal/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-signal">
                    Recommended
                  </span>
                </div>
                <h2 className="mt-6 font-display text-2xl uppercase tracking-wide text-foreground group-hover:text-signal transition-colors">
                  Technical Sizing Support
                </h2>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  Speak directly with an automation engineer to discuss dynamic
                  inertia calculations, duty cycle thermals, or custom kinematic
                  layouts.
                </p>

                <div className="mt-6 space-y-2 border-t border-border/40 pt-4 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Mail size={14} className="text-signal shrink-0" />
                    <span>{companyConfig.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={14} className="text-signal shrink-0" />
                    <span>{companyConfig.supportHours}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-signal shrink-0" />
                    <span>Application engineering included</span>
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Button
                  className="w-full rounded-none bg-signal text-xs font-bold uppercase text-signal-foreground hover:bg-signal/90"
                  onClick={() => openModal("engineer")}
                >
                  Consult an Engineer
                </Button>
              </div>
            </div>

            {/* Commercial RFQ */}
            <div className="group flex flex-col justify-between border border-border bg-card p-8 transition-colors hover:border-signal/40">
              <div>
                <FileSpreadsheet className="text-signal mb-6" size={28} />
                <h2 className="font-display text-2xl uppercase tracking-wide text-foreground group-hover:text-signal transition-colors">
                  Commercial Quotations
                </h2>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  Submit itemized BOMs, quantities, and delivery schedules for
                  formal commercial pricing, volume discounts, and shipping
                  estimates.
                </p>

                <div className="mt-6 space-y-2 border-t border-border/40 pt-4 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Mail size={14} className="text-signal shrink-0" />
                    <span>{companyConfig.salesEmail}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-signal shrink-0" />
                    <span>Volume pricing available</span>
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Button
                  variant="outline"
                  className="w-full rounded-none border-border text-xs font-bold uppercase hover:border-signal/50"
                  onClick={() => openModal("quote")}
                >
                  Request a Quote
                </Button>
              </div>
            </div>

            {/* Direct WhatsApp Channel */}
            <div className="group flex flex-col justify-between border border-border bg-card p-8 transition-colors hover:border-signal/40">
              <div>
                <MessageSquare className="text-signal mb-6" size={28} />
                <h2 className="font-display text-2xl uppercase tracking-wide text-foreground group-hover:text-signal transition-colors">
                  WhatsApp Direct
                </h2>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  Need quick technical confirmation or component lead times?
                  Reach our engineering desk on WhatsApp with pre-filled
                  inquiries for fast response.
                </p>

                <div className="mt-6 space-y-2 border-t border-border/40 pt-4 text-xs text-muted-foreground">

                  <p className="flex items-center gap-2">
                    <Clock size={14} className="text-signal shrink-0" />
                    <span>Fast response during business hours</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-signal shrink-0" />
                    <span>Pre-filled message templates</span>
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Button
                  variant="outline"
                  className="w-full rounded-none border-signal/50 text-xs font-bold uppercase text-foreground hover:bg-signal hover:text-signal-foreground hover:border-signal"
                  onClick={handleWhatsApp}
                >
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Trust signals grid */}
          <div className="mt-12 grid gap-4 border border-border bg-card p-6 sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
            {[
              {
                icon: Users,
                title: "Dedicated Engineers",
                desc: "Each enquiry is handled by an application engineer, not a sales team.",
              },
              {
                icon: Zap,
                title: "Fast Response",
                desc: "Technical enquiries acknowledged within 1 business day.",
              },
              {
                icon: ShieldCheck,
                title: "No Obligation",
                desc: "Pre-sales engineering and sizing support at no cost or commitment.",
              },
              {
                icon: Globe,
                title: "Global Coverage",
                desc: "Supporting customers across manufacturing regions worldwide.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center bg-signal/10 text-signal">
                  <Icon size={15} />
                </span>
                <div>
                  <h4 className="font-display text-sm uppercase tracking-wide text-foreground">
                    {title}
                  </h4>
                  <p className="mt-1 text-[11px] leading-4 text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Long Form Banner */}
          <div className="mt-10 border border-signal/40 bg-surface-dark p-8 sm:p-12 text-surface-foreground">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                  Comprehensive Engineering RFQ
                </span>
                <h3 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
                  Have a Detailed Engineering Requirement?
                </h3>
                <p className="mt-2 max-w-xl text-xs leading-6 text-surface-foreground/70 sm:text-sm">
                  Complete our multi-section engineering form to specify payload,
                  torque, reach, duty cycle, operating environment, and upload
                  CAD references or drawings.
                </p>
              </div>
              <Button
                asChild
                className="h-12 shrink-0 rounded-none bg-signal px-8 font-bold uppercase text-signal-foreground hover:bg-signal/90"
              >
                <Link to="/contact/engineering-enquiry">
                  Open Full Engineering Form <ArrowRight size={14} className="ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
