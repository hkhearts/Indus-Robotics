import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bot,
  Box,
  ChevronDown,
  CircuitBoard,
  Cpu,
  FileText,
  Gauge,
  MessageSquare,
  Move3d,
  Search,
  Settings2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, faqs, productFamilies, products, type Product } from "@/data/robotics";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";
import heroImage from "@/assets/robotics-hero-new.png";
import componentsImage from "@/assets/robotic-components-new.png";
import armImage from "@/assets/robotic-arm-cell.jpg";
import mobileImage from "@/assets/mobile-robotics-new.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Indus Robotics — Precision Motion & Automation Technology" },
      {
        name: "description",
        content:
          "Indus Robotics delivers robotic components, precision reducers, actuators, motion control, and connected industrial automation technology engineered for manufacturing performance.",
      },
      {
        property: "og:title",
        content: "Indus Robotics — Precision Motion & Automation Technology",
      },
      {
        property: "og:description",
        content:
          "High-precision robotic components, kinematics, and intelligent automation for modern manufacturing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const images = { components: componentsImage, arm: armImage, mobile: mobileImage };

const applicationCards = [
  {
    title: "Automotive",
    desc: "Body welding, sub-assembly, powertrain, and EV battery pack lines.",
    img: armImage,
    slug: "automotive",
  },
  {
    title: "Electronics",
    desc: "Micro-placement, cleanroom handling, PCB testing, and micro-dispensing.",
    img: componentsImage,
    slug: "electronics",
  },
  {
    title: "Manufacturing",
    desc: "CNC machine tending, stamping, casting, and robotic finishing.",
    img: componentsImage,
    slug: "manufacturing",
  },
  {
    title: "Warehousing",
    desc: "Automated storage and retrieval (ASRS), case picking, and sorting.",
    img: mobileImage,
    slug: "warehousing",
  },
  {
    title: "Logistics",
    desc: "Intralogistics mobile fleets, AGVs, AMRs, and cross-docking transports.",
    img: mobileImage,
    slug: "logistics",
  },
  {
    title: "Food & Packaging",
    desc: "Hygienic pick-and-place, primary bagging, and carton palletizing.",
    img: armImage,
    slug: "food-packaging",
  },
] as const;

function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[.24em] text-signal">{eyebrow}</p>
      <h2
        className={`font-display text-4xl font-bold uppercase leading-[.92] sm:text-5xl lg:text-6xl ${
          dark ? "text-surface-foreground" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p
          className={`mt-5 max-w-2xl text-sm leading-7 sm:text-base ${dark ? "text-surface-foreground/65" : "text-muted-foreground"}`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

function ProductFinder() {
  const { openModal } = useModals();
  const [category, setCategory] = useState("All");
  const [application, setApplication] = useState("All");
  const [requirement, setRequirement] = useState("All");

  const matched = useMemo(() => {
    return products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (application === "All" || p.applications.includes(application)) &&
        (requirement === "All" || p.requirements.includes(requirement)),
    );
  }, [category, application, requirement]);

  const handleWhatsApp = () => {
    window.open(companyConfig.getWhatsAppUrl({ type: "general" }), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="finder" className="bg-background px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1360px]">
        <SectionHeading
          eyebrow="Interactive Engineering Tool"
          title="Find the right technology for your application"
          text="Filter component families by technology discipline, industrial task, and engineering priority. Matched items link directly to full technical specifications."
        />

        <div className="grid gap-4 border-y border-border py-6 md:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground">
              Product Category
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 w-full rounded-none border border-input bg-card px-3 text-sm focus:border-signal"
            >
              <option>All</option>
              {[...new Set(products.map((p) => p.category))].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground">
              Application Task
            </span>
            <select
              value={application}
              onChange={(e) => setApplication(e.target.value)}
              className="h-12 w-full rounded-none border border-input bg-card px-3 text-sm focus:border-signal"
            >
              <option>All</option>
              {[
                "Assembly",
                "Welding",
                "Material Handling",
                "Inspection",
                "Pick & Place",
                "Mobile Robotics",
                "Warehousing",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground">
              Engineering Priority
            </span>
            <select
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              className="h-12 w-full rounded-none border border-input bg-card px-3 text-sm focus:border-signal"
            >
              <option>All</option>
              {[
                "High Torque",
                "High Speed",
                "High Precision",
                "High Payload",
                "Compact Design",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Results Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {matched.length ? (
            matched.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col border border-border bg-card transition-colors hover:border-signal/50"
              >
                <div className="aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={images[product.image]}
                    alt={`${product.name} industrial robotics component`}
                    loading="lazy"
                    width={800}
                    height={450}
                    className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[10px] font-bold uppercase tracking-[.2em] text-signal">
                    {product.category}
                  </span>
                  <h3 className="mt-2 font-display text-2xl uppercase tracking-wide text-foreground">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
                    {product.overview}
                  </p>

                  <div className="my-5 flex flex-wrap gap-1.5">
                    {product.specs.map((s) => (
                      <span
                        key={s}
                        className="border border-border bg-muted/30 px-2 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-2 pt-2">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 rounded-none text-xs font-bold uppercase"
                    >
                      <Link to={`/products/${product.categorySlug}/${product.slug}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button
                      className="flex-1 rounded-none bg-signal text-xs font-bold uppercase text-signal-foreground hover:bg-signal/90"
                      onClick={() => openModal("quote", { productName: product.name })}
                    >
                      Request Quote
                    </Button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            // Section 19 Empty State
            <div className="col-span-full border border-border bg-card p-10 text-center sm:p-14">
              <p className="font-display text-2xl uppercase tracking-wide text-foreground">
                Can't find the right configuration?
              </p>
              <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
                Tell us about your application and our engineering team can help identify the
                appropriate technology.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button
                  className="rounded-none bg-signal font-bold uppercase text-signal-foreground hover:bg-signal/90"
                  onClick={() => openModal("engineer")}
                >
                  Talk to an Engineer
                </Button>
                <Button
                  variant="outline"
                  className="rounded-none border-border"
                  onClick={handleWhatsApp}
                >
                  <MessageSquare size={14} className="mr-1.5 text-signal" />
                  WhatsApp Us
                </Button>
                <Button
                  variant="outline"
                  className="rounded-none border-border"
                  onClick={() => openModal("quote")}
                >
                  Request Quote
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const { openModal } = useModals();

  const handleWhatsApp = () => {
    window.open(companyConfig.getWhatsAppUrl({ type: "general" }), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[760px] items-end overflow-hidden bg-surface-dark pt-20 text-surface-foreground lg:min-h-[860px]">
        <img
          src={heroImage}
          alt="Industrial robotic arm operating in a precision manufacturing cell"
          width={1600}
          height={1008}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.06_0.006_240)_0%,color-mix(in_oklab,oklch(0.06_0.006_240)_90%,transparent)_40%,color-mix(in_oklab,oklch(0.06_0.006_240)_30%,transparent)_75%,color-mix(in_oklab,oklch(0.06_0.006_240)_55%,transparent)_100%)]" />
        <div className="technical-grid absolute inset-0 opacity-20" />
        {/* Blue bottom gradient edge */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[oklch(0.08_0.005_240)] to-transparent" />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-16 lg:px-10 lg:pb-24">
          <div className="max-w-3xl">
            <p className="animate-rise text-xs font-bold uppercase tracking-[.24em] text-signal">
              Industrial Robotics · Precision Motion · Automation
            </p>
            <h1 className="animate-rise-delay mt-6 font-display text-6xl font-bold uppercase leading-[.85] sm:text-7xl lg:text-[104px]">
              Powering the future of industrial robotics
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-surface-foreground/75 sm:text-lg">
              Advanced robotic components, precision reducers, and multi-axis control systems
              engineered for repeatable, high-reliability industrial automation.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="h-12 rounded-none bg-signal px-7 text-xs font-bold uppercase text-signal-foreground hover:bg-signal/90 pulse-blue"
              >
                <Link to="/products">
                  Explore Products <ArrowRight size={14} className="ml-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="h-12 rounded-none border-signal/40 bg-transparent px-7 text-xs font-bold uppercase text-surface-foreground hover:bg-signal/10 hover:border-signal hover:text-signal"
                onClick={() => openModal("engineer")}
              >
                Talk to an Engineer
              </Button>
            </div>

            <button
              onClick={handleWhatsApp}
              className="mt-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.14em] text-surface-foreground/50 transition-colors hover:text-signal"
            >
              <MessageSquare size={13} className="text-signal" />
              Chat on WhatsApp — +91 93612 49474
            </button>

            <p className="mt-8 text-[10px] font-bold uppercase tracking-[.2em] text-surface-foreground/40">
              {companyConfig.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* STATS STRIP — no empty space */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 sm:grid-cols-4">
          {[
            { value: "500+", label: "Components Deployed", icon: Box },
            { value: "99.8%", label: "Uptime Reliability", icon: ShieldCheck },
            { value: "6-Axis", label: "Robot Architecture", icon: Move3d },
            { value: "24/7", label: "Engineering Support", icon: Gauge },
          ].map(({ value, label, icon: Icon }, i) => (
            <div
              key={label}
              className={`flex items-center gap-4 px-6 py-5 ${
                i < 3 ? "border-b sm:border-b-0 sm:border-r border-border" : ""
              }`}
            >
              <span className="flex size-10 items-center justify-center border border-signal/30 bg-signal/5 text-signal">
                <Icon size={18} />
              </span>
              <div>
                <p className="font-display text-2xl font-bold text-signal">{value}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. VALUE PILLARS (Section 13 - Clickable to /about/engineering) */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Gauge,
              title: "Precision",
              text: "Sub-millimeter path following and sub-arcminute lost motion.",
            },
            {
              icon: ShieldCheck,
              title: "Reliability",
              text: "Engineered for 24/7 continuous duty cycles in harsh factory environments.",
            },
            {
              icon: CircuitBoard,
              title: "Integration",
              text: "Standardized mechanical flanges and deterministic fieldbus compatibility.",
            },
            {
              icon: Settings2,
              title: "Scalability",
              text: "From individual joint modules to synchronized factory automation cells.",
            },
          ].map(({ icon: Icon, title, text }, i) => (
            <Link
              key={title}
              to="/about/engineering"
              className={`group p-6 lg:p-8 transition-colors hover:bg-muted/40 ${
                i < 3 ? "border-b sm:border-r lg:border-b-0" : ""
              }`}
            >
              <Icon
                className="mb-4 text-signal transition-transform group-hover:scale-110"
                size={24}
              />
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl uppercase tracking-wide group-hover:text-signal transition-colors">
                  {title}
                </h2>
                <ArrowRight
                  size={13}
                  className="text-signal opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{text}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. INTRODUCTION SECTION (Section 14 - Links to /about/engineering) */}
      <section className="border-b border-border bg-background px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1360px]">
          <div className="max-w-4xl">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.24em] text-signal">
              Core Architecture
            </p>
            <h2 className="font-display text-3xl font-bold uppercase leading-tight sm:text-4xl lg:text-5xl">
              Engineering the Technologies Behind Automation
            </h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
              Modern industrial automation relies on the deterministic coordination of mechanical
              dynamics and real-time electronic architectures. Achieving micro-scale repeatability
              and long-term durability requires harmonious interaction between precision actuators,
              zero-backlash gearing, dynamic sensing, and multi-axis kinematic control. We deliver
              the critical technologies underpinning these systems—whether deployed as standalone
              joint modules or integrated within complete automation architectures.
            </p>
            <div className="mt-8">
              <Link
                to="/about/engineering"
                className="inline-flex items-center gap-2 font-display text-base font-bold uppercase tracking-wider text-signal hover:underline"
              >
                Explore Our Engineering Approach <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT PORTFOLIO (Section 15 - 6 Category Cards) */}
      <section id="products" className="px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1360px]">
          <SectionHeading
            eyebrow="Our Portfolio"
            title="Explore our robotics technology"
            text="Discover the technologies behind modern robotic systems — from individual motion components to complete industrial automation platforms."
          />

          <div className="grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => {
              const icons = [Zap, Settings2, Move3d, Bot, Box, Cpu];
              const Icon = icons[i % icons.length] as React.ElementType;

              return (
                <article
                  key={category.slug}
                  className="group relative flex flex-col justify-between border-b border-r border-border bg-card p-8 transition-colors hover:bg-surface-dark hover:text-surface-foreground"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-muted-foreground group-hover:text-signal">
                        0{i + 1}
                      </span>
                      <Icon className="text-signal" size={24} />
                    </div>

                    <div className="mt-8">
                      <Link to={`/products/${category.slug}`} className="block">
                        <h3 className="font-display text-3xl uppercase tracking-wide group-hover:text-surface-foreground">
                          {category.title}
                        </h3>
                      </Link>
                      <p className="mt-2 text-xs font-semibold text-signal">
                        {category.positioning}
                      </p>
                      <p className="mt-3 text-xs leading-5 text-muted-foreground group-hover:text-surface-foreground/60">
                        {category.card}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border/20 pt-4">
                    <Link
                      to={`/products/${category.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-signal hover:underline"
                    >
                      Explore →
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal("quote", { productName: category.title })}
                        className="text-[11px] font-bold uppercase text-muted-foreground hover:text-signal group-hover:text-surface-foreground/80"
                      >
                        Request Quote
                      </button>
                      <span className="text-muted-foreground/40">·</span>
                      <button
                        onClick={() =>
                          window.open(
                            companyConfig.getWhatsAppUrl({ type: "product", name: category.title }),
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                        className="text-[11px] font-bold uppercase text-muted-foreground hover:text-signal group-hover:text-surface-foreground/80"
                      >
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. PRODUCT FINDER */}
      <ProductFinder />

      {/* 6. ROBOTICS ECOSYSTEM (Section 35 - Clickable Nodes) */}
      <section
        id="technology"
        className="technical-grid bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-[1360px]">
          <SectionHeading
            dark
            eyebrow="Robotics Ecosystem"
            title="One ecosystem. Every movement."
            text="A modern robot is an interconnected system of power, motion, control, sensing, and intelligence. Every layer must interoperate deterministically."
          />

          <div className="grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]">
            {[
              {
                icon: Zap,
                title: "Power",
                text: "Motors & servo technology",
                href: "/technology/servo",
              },
              {
                icon: Move3d,
                title: "Motion",
                text: "Actuators & precision reducers",
                href: "/technology/motion-control",
              },
              {
                icon: Cpu,
                title: "Control",
                text: "Controllers & fieldbuses",
                href: "/products/control-systems",
              },
              {
                icon: Gauge,
                title: "Feedback",
                text: "Sensors & encoders",
                href: "/technology/sensors",
              },
              {
                icon: Bot,
                title: "Automation",
                text: "Complete robotic systems",
                href: "/products/industrial-robots",
              },
            ].map(({ icon: Icon, title, text, href }, i) => (
              <div className="contents" key={title}>
                <Link
                  to={href}
                  className="group block border border-surface-foreground/15 bg-surface-elevated p-6 transition-all hover:border-signal hover:bg-surface-elevated/80"
                >
                  <Icon
                    className="text-signal transition-transform group-hover:scale-110"
                    size={24}
                  />
                  <p className="mt-8 font-display text-2xl uppercase group-hover:text-signal transition-colors">
                    {title}
                  </p>
                  <p className="mt-1 text-xs text-surface-foreground/50">{text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase text-signal opacity-0 transition-opacity group-hover:opacity-100">
                    Explore Layer →
                  </span>
                </Link>
                {i < 4 && (
                  <div className="hidden items-center justify-center lg:flex">
                    <div className="signal-line h-px w-8" />
                    <ArrowRight size={14} className="text-signal" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. APPLICATIONS (Section 34 - Clickable Application Cards) */}
      <section id="applications" className="bg-card px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1360px]">
          <SectionHeading
            eyebrow="Industry Sectors"
            title="Built for the real world"
            text="Robotics technologies designed around real industrial manufacturing requirements across global manufacturing verticals."
          />

          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {applicationCards.map((app) => (
              <Link
                key={app.title}
                to={`/applications/${app.slug}`}
                className="group relative aspect-[4/3] overflow-hidden bg-surface-dark"
              >
                <img
                  src={app.img}
                  alt={`${app.title} industrial robotics application`}
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="h-full w-full object-cover opacity-70 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-50"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface-dark to-transparent p-7 pt-24 text-surface-foreground">
                  <h3 className="font-display text-3xl uppercase tracking-wide group-hover:text-signal transition-colors">
                    {app.title}
                  </h3>
                  <p className="mt-2 text-xs text-surface-foreground/65">{app.desc}</p>
                  <span className="mt-4 flex items-center gap-2 text-xs font-bold uppercase text-signal">
                    Explore Industry Solutions <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TECHNOLOGY STACK (Section 35 - 6 Clickable Layers) */}
      <section className="px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1360px] gap-14 lg:grid-cols-[.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Technology Stack"
            title="From motion to intelligence"
            text="Mechanical design, electrical power, real-time control, sensing, software, and intelligence working as one engineered architecture."
          />
          <div className="space-y-2">
            {[
              {
                num: "01",
                name: "Mechanical",
                sub: "Actuators · Reducers · Gears · Joints · Wheels",
                href: "/technology/robotics",
              },
              {
                num: "02",
                name: "Electrical",
                sub: "Motors · Servo Drives · Power Systems",
                href: "/technology/servo",
              },
              {
                num: "03",
                name: "Control",
                sub: "Motion Controllers · PLCs · Fieldbuses",
                href: "/technology/motion-control",
              },
              {
                num: "04",
                name: "Sensing",
                sub: "Encoders · Torque Sensors · Vision · Proximity",
                href: "/technology/sensors",
              },
              {
                num: "05",
                name: "Software",
                sub: "Programming · Trajectory Math · Digital Twin",
                href: "/technology/automation",
              },
              {
                num: "06",
                name: "Intelligence",
                sub: "AI · Neural Vision · Machine Learning",
                href: "/technology/ai-robotics",
              },
            ].map((layer) => (
              <Link
                key={layer.name}
                to={layer.href}
                className="group grid grid-cols-[48px_1fr] items-center border border-border bg-card transition-all hover:border-signal"
              >
                <span className="grid h-full place-items-center border-r border-border font-display text-lg text-muted-foreground group-hover:text-signal">
                  {layer.num}
                </span>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-wide group-hover:text-signal transition-colors">
                      {layer.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">{layer.sub}</p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-signal opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. INDUSTRY 4.0 SECTION (Section 36 - Interactive Nodes) */}
      <section
        id="solutions"
        className="bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-[1360px]">
          <SectionHeading
            dark
            eyebrow="Industry 4.0 Architecture"
            title="Connecting robotics with the intelligent factory"
            text="Connected robots communicate with sensors, controllers, edge analytics, and cloud data platforms to create deterministic, transparent production environments."
          />

          <div className="flex flex-wrap items-center justify-center gap-2 py-8">
            {[
              { name: "Robot", href: "/technology/robotics" },
              { name: "Sensor", href: "/technology/sensors" },
              { name: "Controller", href: "/products/control-systems" },
              { name: "Edge", href: "/technology/industry-4" },
              { name: "Cloud", href: "/technology/industry-4" },
              { name: "Analytics", href: "/solutions/smart-manufacturing" },
            ].map((x, i) => (
              <div className="contents" key={x.name}>
                <Link
                  to={x.href}
                  className="border border-surface-foreground/20 bg-surface-elevated px-6 py-4 font-display text-xl uppercase tracking-wider transition-colors hover:border-signal hover:text-signal"
                >
                  {x.name}
                </Link>
                {i < 5 && <ArrowRight className="text-signal hidden sm:inline" size={16} />}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              "Industrial IoT",
              "OPC UA",
              "EtherCAT DC",
              "MQTT",
              "Edge Computing",
              "Predictive Analytics",
              "Digital Twin",
            ].map((tag) => (
              <span
                key={tag}
                className="border border-surface-foreground/15 px-3 py-1.5 text-[10px] uppercase tracking-widest text-surface-foreground/55"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 10. ENGINEERING RESOURCES (Section 23) */}
      <section id="resources" className="bg-card px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1360px]">
          <SectionHeading
            eyebrow="Knowledge Center"
            title="Engineering resources"
            text="Everything engineers need to evaluate, design, integrate, and deploy robotic systems."
          />

          <div className="grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Product Catalogues",
                desc: "Browse full dimensional drawings and ratings.",
                href: "/resources?type=catalogue",
              },
              {
                title: "Datasheets",
                desc: "Access electrical, thermal, and torque curves.",
                href: "/resources?type=datasheet",
              },
              {
                title: "Application Notes",
                desc: "Understand real-world implementation math.",
                href: "/resources?type=app-note",
              },
              {
                title: "Case Studies",
                desc: "Explore industrial deployment ROI and reports.",
                href: "/resources?type=case-study",
              },
              {
                title: "Technical Articles",
                desc: "Engineering deep-dives into motion control.",
                href: "/resources?type=article",
              },
              {
                title: "FAQs & Knowledge",
                desc: "Direct answers to common engineering questions.",
                href: "/resources/faqs",
              },
            ].map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="group border-b border-r border-border p-8 transition-colors hover:bg-muted/50"
              >
                <FileText className="text-signal" size={24} />
                <h3 className="mt-8 font-display text-2xl uppercase tracking-wide group-hover:text-signal transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-signal">
                  Explore{" "}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>

          {/* 11. FAQ PREVIEW (Section 33) */}
          <div id="faqs" className="mt-20 border-t border-border pt-16">
            <SectionHeading
              eyebrow="Technical Reference"
              title="Frequently Asked Questions"
              text="Direct engineering answers to common technical inquiries regarding robotics, actuators, gearing, and control architectures."
            />

            <div className="grid gap-4 md:grid-cols-2">
              {faqs.slice(0, 6).map((faq) => (
                <details
                  key={faq.question}
                  className="group border border-border bg-background p-5 transition-colors open:bg-surface-elevated/40"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-display text-lg uppercase tracking-wide list-none select-none">
                    <span>{faq.question}</span>
                    <ChevronDown
                      className="faq-chevron shrink-0 text-signal"
                      size={18}
                    />
                  </summary>
                  <p className="mt-4 text-xs leading-6 text-muted-foreground border-t border-border/50 pt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                asChild
                variant="outline"
                className="rounded-none border-border font-bold uppercase text-xs"
              >
                <Link to="/resources/faqs">View All FAQs in Knowledge Center →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FINAL CALL TO ACTION (Section 37) */}
      <section
        id="contact"
        className="bg-signal px-5 py-20 text-signal-foreground lg:px-10 lg:py-28"
      >
        <div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold uppercase tracking-[.24em]">
              Engineering Consultation
            </p>
            <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[.9] sm:text-7xl">
              Ready to build your next robotic system?
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 sm:text-lg">
              Whether you're specifying a high-torque joint actuator, developing a specialized AMR
              chassis, or planning an entire automated manufacturing cell, our application engineers
              are ready to assist.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              className="h-13 rounded-none border-signal-foreground bg-transparent px-7 font-bold uppercase text-signal-foreground hover:bg-signal-foreground hover:text-signal"
              onClick={() => openModal("engineer")}
            >
              Talk to an Engineer
            </Button>

            <Button
              className="h-13 rounded-none bg-surface-dark px-7 font-bold uppercase text-surface-foreground hover:bg-surface-elevated"
              onClick={() => openModal("quote")}
            >
              Request a Quote <ArrowRight size={14} className="ml-1" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
