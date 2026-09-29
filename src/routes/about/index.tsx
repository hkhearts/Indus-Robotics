import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Move3d,
  ShieldCheck,
  Gauge,
  CircuitBoard,
  Settings2,
  Wrench,
  MessageSquare,
  Cpu,
  Factory,
  Bot,
  Layers,
  Zap,
  CheckCircle2,
  Globe,
  Clock,
  Users,
  Target,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";
import heroImage from "@/assets/robotics-hero.jpg";
import componentsImage from "@/assets/robotic-components.jpg";

export const Route = createFileRoute("/about/")(
  {
    head: () => ({
      meta: [
        {
          title:
            "About INDUS Industrial Robotics | Precision Motion & Automation Technology",
        },
        {
          name: "description",
          content:
            "INDUS Industrial Robotics builds precision motion components, zero-backlash reducers, servo actuators, and multi-axis control systems for manufacturers, OEMs, and system integrators worldwide.",
        },
        {
          property: "og:title",
          content: "About INDUS Industrial Robotics",
        },
        {
          property: "og:description",
          content:
            "Engineering precision motion and intelligent automation technology for modern industrial manufacturing.",
        },
      ],
    }),
    component: AboutPage,
  },
);

const industries = [
  {
    icon: Factory,
    name: "Automotive",
    desc: "Body welding, EV battery assembly, powertrain, and sub-assembly cells.",
    href: "/applications/automotive",
  },
  {
    icon: CircuitBoard,
    name: "Electronics",
    desc: "Micro-placement, cleanroom handling, PCB test, and precision dispensing.",
    href: "/applications/electronics",
  },
  {
    icon: Wrench,
    name: "Manufacturing",
    desc: "CNC machine tending, stamping, casting, and robotic finishing lines.",
    href: "/applications/manufacturing",
  },
  {
    icon: Bot,
    name: "Logistics & Warehousing",
    desc: "AMR fleets, ASRS, case picking, sorting, and intralogistics transport.",
    href: "/applications/warehousing",
  },
  {
    icon: Layers,
    name: "Food & Packaging",
    desc: "Hygienic pick-and-place, primary bagging, and palletizing systems.",
    href: "/applications/food-packaging",
  },
  {
    icon: Zap,
    name: "Energy & Infrastructure",
    desc: "Inspection robotics, panel handling, and utility maintenance automation.",
    href: "/applications/energy",
  },
];

const differentiators = [
  {
    num: "01",
    title: "Actuation Chain Expertise",
    body: "We engineer the full actuation chain — from zero-backlash strain wave gears to high-power brushless servo motors — giving our customers optimized mechanical-electrical harmony that off-the-shelf catalogs cannot provide.",
    link: { label: "Explore Products", href: "/products" },
  },
  {
    num: "02",
    title: "Application Engineering Support",
    body: "Before any component is specified, our engineers validate inertia ratios, thermal duty cycles, and fieldbus timing requirements. This pre-sales engineering saves months of integration rework.",
    link: { label: "Talk to an Engineer", href: "/contact" },
  },
  {
    num: "03",
    title: "Open Integration Architecture",
    body: "Standardized ISO mechanical flanges, EtherCAT / PROFINET compatibility, and open SDKs ensure our components integrate cleanly into any machine builder's existing control architecture.",
    link: { label: "View Technology", href: "/technology" },
  },
  {
    num: "04",
    title: "Industrial Reliability Standards",
    body: "IP67/IP69K sealed housings, rigorous thermal cycling validation, and fail-safe holding brakes designed for continuous 24/7 multi-shift factory duty — not prototyping environments.",
    link: { label: "Engineering Approach", href: "/about/engineering" },
  },
];

const technologyLayers = [
  {
    icon: Gauge,
    name: "Precision Mechanics",
    sub: "Zero-backlash gearing, sub-arcminute accuracy",
    href: "/technology/robotics",
  },
  {
    icon: Zap,
    name: "Servo Systems",
    sub: "High-torque brushless motors, precision drives",
    href: "/technology/servo",
  },
  {
    icon: Cpu,
    name: "Motion Control",
    sub: "Multi-axis controllers, real-time fieldbuses",
    href: "/technology/motion-control",
  },
  {
    icon: CircuitBoard,
    name: "Sensing & Feedback",
    sub: "Encoders, torque sensors, vision systems",
    href: "/technology/sensors",
  },
];

const audiences = [
  {
    icon: Wrench,
    title: "Mechanical & Automation Engineers",
    desc: "Designing custom production equipment with validated joint kinematics and servo sizing.",
  },
  {
    icon: Settings2,
    title: "System Integrators",
    desc: "Delivering complete turnkey automated cells with standardized, pre-validated components.",
  },
  {
    icon: Factory,
    title: "OEM Manufacturers",
    desc: "Integrating specialized robotic joints into commercial product lines with consistent supply.",
  },
  {
    icon: BarChart3,
    title: "Manufacturing Decision Makers",
    desc: "Upgrading production line throughput, OEE, and quality with proven automation technology.",
  },
];

export function AboutPage() {
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

      {/* ─── 1. HERO ──────────────────────────────────────────────── */}
      <section className="technical-grid relative overflow-hidden border-b border-border/40 bg-surface-dark text-surface-foreground">
        {/* Background image with overlay */}
        <img
          src={heroImage}
          alt="Industrial robotic arm in precision manufacturing cell"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-20"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-surface-dark)_50%,transparent_100%)]" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-24 lg:px-10 lg:py-32">
          <div className="max-w-3xl">
            <p className="animate-rise text-[10px] font-bold uppercase tracking-[.24em] text-signal">
              Company Overview
            </p>
            <h1 className="animate-rise-delay mt-4 font-display text-5xl font-bold uppercase leading-[.9] sm:text-6xl lg:text-7xl">
              Engineering Precision in Industrial Robotics
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-surface-foreground/75 sm:text-lg">
              INDUS Industrial Robotics develops precision motion components,
              zero-backlash reducers, autonomous mobile drive units, and
              multi-axis controllers for machine builders, system integrators,
              and industrial manufacturers worldwide.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="h-12 rounded-none bg-signal px-7 font-bold uppercase text-signal-foreground hover:bg-signal/90"
              >
                <Link to="/about/engineering">
                  Our Engineering Approach <ArrowRight size={14} className="ml-1.5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-none border-surface-foreground/30 bg-transparent px-6 font-bold uppercase text-surface-foreground hover:bg-surface-elevated hover:text-signal"
                onClick={() => openModal("engineer")}
              >
                Talk to an Engineer
              </Button>
            </div>

            {/* Quick facts strip */}
            <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-surface-foreground/15 pt-8">
              {[
                { val: "6+", label: "Product Families" },
                { val: "100+", label: "Component Models" },
                { val: "6", label: "Industry Sectors" },
                { val: "24/7", label: "Industrial Duty" },
              ].map((fact) => (
                <div key={fact.label}>
                  <p className="font-display text-3xl font-bold text-signal leading-none">
                    {fact.val}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[.16em] text-surface-foreground/55">
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. WHO IS INDUS ──────────────────────────────────────── */}
      <section className="bg-background px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Our Engineering Mandate
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-[.92] tracking-tight sm:text-5xl">
                Precision Motion · Intelligent Control · Industrial Reliability
              </h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                We believe modern automation hinges on the deterministic harmony
                between mechanical stiffness, dynamic torque generation, and
                sub-millisecond digital feedback. Rather than treating robotics
                as isolated black boxes, INDUS approaches robotic design from
                foundational physical first principles.
              </p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Our portfolio spans the complete actuation chain — from
                zero-backlash strain wave gears and high-power brushless servo
                actuators to autonomous mobile wheel modules and complete
                six-axis articulated arms — engineered to work as one coherent
                system.
              </p>
              <div className="mt-8">
                <Link
                  to="/about/engineering"
                  className="inline-flex items-center gap-2 font-display text-base font-bold uppercase tracking-wider text-signal hover:underline"
                >
                  Explore Engineering Architecture <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Who we serve */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Who We Serve
              </p>
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
                The Engineering Ecosystem
              </h3>
              <div className="mt-4 space-y-3">
                {audiences.map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 border border-border bg-card p-5 transition-colors hover:border-signal/40"
                  >
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center bg-signal/10 text-signal">
                      <Icon size={16} />
                    </span>
                    <div>
                      <h4 className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                        {title}
                      </h4>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. CORE ENGINEERING PILLARS ─────────────────────────── */}
      <section className="border-y border-border/40 bg-card px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
              Design Principles
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-[.92] tracking-tight sm:text-5xl">
              Engineered for Industrial Performance
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Gauge,
                title: "Precision",
                desc: "Sub-micron encoder resolution, sub-arcminute lost motion, and stiff mechanical joint architectures that eliminate dynamic overshoot.",
                detail: "< 1 arcmin backlash",
              },
              {
                icon: ShieldCheck,
                title: "Reliability",
                desc: "Rigorous thermal testing, sealed IP67/IP69K housings, and fail-safe holding brakes designed for continuous 24/7 multi-shift factory duty.",
                detail: "IP67 / IP69K rated",
              },
              {
                icon: CircuitBoard,
                title: "Integration",
                desc: "Standardized ISO bolt patterns, open fieldbuses (EtherCAT, PROFINET), and modular connectors simplifying machine assembly.",
                detail: "EtherCAT · PROFINET",
              },
              {
                icon: Settings2,
                title: "Scalability",
                desc: "Modular building blocks allowing machine builders to scale from single-axis slides to coordinated 64-axis synchronous automation lines.",
                detail: "1 → 64+ axes",
              },
            ].map(({ icon: Icon, title, desc, detail }) => (
              <div
                key={title}
                className="group border border-border bg-background p-8 transition-colors hover:border-signal/50"
              >
                <div className="flex items-start justify-between">
                  <Icon className="text-signal" size={28} />
                  <span className="border border-signal/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-signal">
                    {detail}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl uppercase tracking-wide text-foreground group-hover:text-signal transition-colors">
                  {title}
                </h3>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. TECHNOLOGY ADVANTAGE ─────────────────────────────── */}
      <section className="technical-grid bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Technology Platform
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-[.92] sm:text-5xl">
                From Mechanical Foundation to Intelligent Automation
              </h2>
              <p className="mt-6 text-base leading-8 text-surface-foreground/75">
                High-precision industrial robotics requires seamless physical
                harmony across mechanical stiffness, electromagnetic torque
                regulation, high-resolution optical feedback, and
                microsecond-level deterministic software execution.
              </p>
              <p className="mt-4 text-sm leading-7 text-surface-foreground/65">
                INDUS delivers the critical technologies underpinning these
                systems — whether deployed as standalone joint modules or
                integrated within complete automation architectures.
              </p>
              <div className="mt-8">
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-none border-surface-foreground/30 bg-transparent px-6 font-bold uppercase text-surface-foreground hover:border-signal hover:text-signal"
                >
                  <Link to="/technology">
                    Explore Technology Stack <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {technologyLayers.map(({ icon: Icon, name, sub, href }) => (
                <Link
                  key={name}
                  to={href}
                  className="group border border-surface-foreground/15 bg-surface-elevated p-6 transition-all hover:border-signal hover:bg-surface-elevated/80"
                >
                  <Icon className="text-signal" size={24} />
                  <h3 className="mt-5 font-display text-xl uppercase tracking-wide group-hover:text-signal transition-colors">
                    {name}
                  </h3>
                  <p className="mt-1 text-xs text-surface-foreground/55">{sub}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase text-signal opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. WHY INDUS — DIFFERENTIATORS ─────────────────────── */}
      <section className="bg-background px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
              Why Customers Choose INDUS
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-[.92] tracking-tight sm:text-5xl">
              What Makes INDUS Different
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {differentiators.map((d) => (
              <div
                key={d.num}
                className="group border border-border bg-card p-8 transition-colors hover:border-signal/40"
              >
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-display text-5xl font-bold leading-none text-signal/20 group-hover:text-signal/40 transition-colors">
                    {d.num}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-foreground group-hover:text-signal transition-colors">
                  {d.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{d.body}</p>
                <div className="mt-6">
                  <Link
                    to={d.link.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-signal hover:underline"
                  >
                    {d.link.label} <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. INDUSTRIES WE SERVE ──────────────────────────────── */}
      <section className="border-t border-border/40 bg-card px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Industry Sectors
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-[.92] tracking-tight sm:text-5xl">
                Industries We Serve
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="h-11 shrink-0 rounded-none border-border font-bold uppercase text-xs"
            >
              <Link to="/applications">
                All Applications <ArrowRight size={13} className="ml-1.5" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map(({ icon: Icon, name, desc, href }) => (
              <Link
                key={name}
                to={href}
                className="group flex items-start gap-4 border border-border bg-background p-6 transition-all hover:border-signal/50 hover:bg-muted/30"
              >
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center bg-signal/10 text-signal transition-colors group-hover:bg-signal group-hover:text-signal-foreground">
                  <Icon size={18} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg uppercase tracking-wide text-foreground group-hover:text-signal transition-colors">
                      {name}
                    </h3>
                    <ArrowRight
                      size={14}
                      className="shrink-0 text-signal opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. TRUST SIGNALS ────────────────────────────────────── */}
      <section className="bg-background px-5 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-4 border border-border bg-card p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
            {[
              {
                icon: Globe,
                title: "Global Engineering",
                desc: "Components shipped and integrated into automated production lines across manufacturing regions worldwide.",
              },
              {
                icon: Clock,
                title: "Responsive Support",
                desc: "Application engineers available Mon–Fri 08:00–18:00 for technical sizing, integration, and fieldbus support.",
              },
              {
                icon: ShieldCheck,
                title: "Quality Validated",
                desc: "Every product family tested to IP67/IP69K, thermal cycling, and continuous duty standards before release.",
              },
              {
                icon: Users,
                title: "Engineering Partnership",
                desc: "We work as co-development partners, not catalog suppliers, with pre-sales engineering included at no extra cost.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-4">
                <span className="grid size-10 place-items-center bg-signal/10 text-signal">
                  <Icon size={18} />
                </span>
                <div>
                  <h3 className="font-display text-lg uppercase tracking-wide text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. HOW TO WORK WITH INDUS ───────────────────────────── */}
      <section className="border-t border-border/40 bg-card px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                How We Work
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-[.92] tracking-tight sm:text-5xl">
                From Requirement to Integration
              </h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                Whether you bring us a fully specified component BOM or an
                early-concept automation problem, our team engages at your
                required depth of technical detail.
              </p>

              <div className="mt-8 space-y-0">
                {[
                  {
                    step: "01",
                    title: "Share Your Requirement",
                    body: "Submit application parameters via our engineering form, WhatsApp, or directly by email. Include load, speed, duty cycle, environment, and mounting constraints.",
                  },
                  {
                    step: "02",
                    title: "Application Engineering Review",
                    body: "Our engineers validate sizing against dynamic inertia ratios, thermal duty, and fieldbus timing. We identify risks before they become integration problems.",
                  },
                  {
                    step: "03",
                    title: "Component Selection & Quotation",
                    body: "We recommend optimized product configurations with formal commercial pricing, lead time estimates, and volume discount structures.",
                  },
                  {
                    step: "04",
                    title: "Integration & Ongoing Support",
                    body: "Post-delivery, our engineering team remains available for commissioning support, parameter tuning, and system expansion planning.",
                  },
                ].map((s, i) => (
                  <div
                    key={s.step}
                    className={`flex gap-5 py-6 ${i < 3 ? "border-b border-border/50" : ""}`}
                  >
                    <span className="mt-0.5 font-display text-3xl font-bold leading-none text-signal/30">
                      {s.step}
                    </span>
                    <div>
                      <h4 className="font-display text-lg uppercase tracking-wide text-foreground">
                        {s.title}
                      </h4>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links sidebar */}
            <div className="space-y-4 lg:sticky lg:top-24">
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Explore Further
              </p>

              {[
                {
                  icon: Cpu,
                  label: "Browse All Products",
                  sub: "Actuators, reducers, controllers, robots",
                  href: "/products",
                },
                {
                  icon: Target,
                  label: "View Solutions",
                  sub: "Application-matched automation solutions",
                  href: "/solutions",
                },
                {
                  icon: Layers,
                  label: "Technology Platform",
                  sub: "Engineering stack from mechanics to AI",
                  href: "/technology",
                },
                {
                  icon: Factory,
                  label: "Industry Applications",
                  sub: "Automotive, electronics, logistics & more",
                  href: "/applications",
                },
                {
                  icon: Wrench,
                  label: "Engineering Approach",
                  sub: "Physical principles behind our design",
                  href: "/about/engineering",
                },
              ].map(({ icon: Icon, label, sub, href }) => (
                <Link
                  key={label}
                  to={href}
                  className="group flex items-center gap-4 border border-border bg-background p-4 transition-all hover:border-signal/40"
                >
                  <span className="grid size-9 shrink-0 place-items-center bg-signal/10 text-signal">
                    <Icon size={16} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm uppercase tracking-wide text-foreground group-hover:text-signal transition-colors">
                      {label}
                    </h4>
                    <p className="text-[10px] text-muted-foreground">{sub}</p>
                  </div>
                  <ArrowRight
                    size={13}
                    className="shrink-0 text-signal opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. FINAL CTA ────────────────────────────────────────── */}
      <section className="bg-signal px-5 py-20 text-signal-foreground lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em]">
                Engineering Consultation
              </p>
              <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[.9] sm:text-6xl lg:text-7xl">
                Ready to Build with INDUS?
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7">
                Tell us what you're building. Whether it's a single robotic
                joint, a full AMR platform, or a complete automation cell — our
                application engineers will help you get it right.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="h-12 rounded-none border-signal-foreground bg-transparent px-7 font-bold uppercase text-signal-foreground hover:bg-signal-foreground hover:text-signal"
                  onClick={() => openModal("engineer")}
                >
                  <Wrench size={14} className="mr-1.5" />
                  Talk to an Engineer
                </Button>
                <Button
                  className="h-12 rounded-none bg-surface-dark px-7 font-bold uppercase text-surface-foreground hover:bg-surface-elevated"
                  onClick={() => openModal("quote")}
                >
                  Request a Quote <ArrowRight size={14} className="ml-1" />
                </Button>
              </div>

              <Button
                variant="ghost"
                className="h-10 rounded-none px-4 font-bold uppercase text-signal-foreground/70 hover:bg-transparent hover:text-signal-foreground"
                onClick={handleWhatsApp}
              >
                <MessageSquare size={14} className="mr-1.5" />
                Chat on WhatsApp
              </Button>

              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.16em] text-signal-foreground/60">
                <CheckCircle2 size={12} />
                <span>Pre-sales engineering included</span>
                <span className="opacity-40">·</span>
                <CheckCircle2 size={12} />
                <span>No commitment required</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
