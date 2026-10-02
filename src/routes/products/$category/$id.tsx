import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  MessageSquare,
  Wrench,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getProduct, getCategory, products, type Product } from "@/data/robotics";
import { companyConfig } from "@/data/config";
import { useModals } from "@/components/modals/ModalContext";
import { RelatedContent } from "@/components/common/RelatedContent";
import { ComplianceBar } from "@/components/intelligence/ComplianceBar";
import { SmartBOMPanel } from "@/components/intelligence/SmartBOMPanel";
import { SupplyChainNote } from "@/components/intelligence/SupplyChainNote";
import { ReadingAdapt } from "@/components/intelligence/ReadingAdapt";
import componentsImage from "@/assets/robotic-components.jpg";
import armImage from "@/assets/robotic-arm-cell.jpg";
import mobileImage from "@/assets/mobile-robotics.jpg";

export const Route = createFileRoute("/products/$category/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    const category = getCategory(params.category);
    if (!product || !category) {
      throw notFound();
    }
    return { product, category };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    return {
      meta: [
        { title: `${product?.name || "Product"} | INDUS Industrial Robotics` },
        { name: "description", content: product?.overview || product?.positioning || "" },
      ],
    };
  },
  component: ProductDetailPage,
});

const images = { components: componentsImage, arm: armImage, mobile: mobileImage };

export function ProductDetailPage() {
  const { product, category } = Route.useLoaderData();
  const { openModal } = useModals();

  // Section 27: Product-specific quick enquiry form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quickForm, setQuickForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "1-5 units",
    application: "",
    message: "",
  });

  const handleQuickSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 600);
  };

  const handleWhatsApp = () => {
    window.open(
      companyConfig.getWhatsAppUrl({ type: "product", name: product.name }),
      "_blank",
      "noopener,noreferrer",
    );
  };

  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.categorySlug === product.categorySlug || product.related.includes(p.slug)),
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* 1. HERO & POSITIONING (Section 17 & 18) */}
      <section className="technical-grid border-b border-border/40 bg-surface-dark px-5 py-20 text-surface-foreground lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_.75fr] items-center">
            <div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/products/${category.slug}`}
                  className="text-xs font-bold uppercase tracking-[.2em] text-signal hover:underline"
                >
                  {category.title}
                </Link>
                <span className="text-surface-foreground/40">/</span>
                <span className="text-xs uppercase tracking-wider text-surface-foreground/60">
                  Engineering Specification
                </span>
              </div>

              <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-[.92] sm:text-6xl lg:text-7xl">
                {product.name}
              </h1>

              <p className="mt-4 font-display text-xl uppercase tracking-wide text-signal sm:text-2xl">
                {product.positioning}
              </p>

              <p className="mt-6 text-base leading-8 text-surface-foreground/75 sm:text-lg">
                {product.overview}
              </p>

              {/* #3 Geo-Compliance Intelligence */}
              <div className="mt-4"><ComplianceBar /></div>
              {/* #11 Reading-Velocity: skim bullets */}
              <ReadingAdapt bullets={product.features} />
              {/* #4 Smart BOM */}
              <SmartBOMPanel productId={product.id} categorySlug={category.slug} />
              {/* #13 Supply-chain routing */}
              <SupplyChainNote productId={product.id} categorySlug={category.slug} />

              {/* Header CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  className="h-12 rounded-none bg-signal px-7 font-bold uppercase text-signal-foreground hover:bg-signal/90"
                  onClick={() =>
                    openModal("quote", { productName: product.name, categoryName: category.title })
                  }
                >
                  Request Quote <ArrowRight size={14} className="ml-1.5" />
                </Button>

                <Button
                  variant="outline"
                  className="h-12 rounded-none border-surface-foreground/30 bg-transparent px-6 font-bold uppercase text-surface-foreground hover:bg-surface-elevated hover:text-signal"
                  onClick={() => openModal("engineer", { productName: product.name })}
                >
                  <Wrench size={14} className="mr-1.5" />
                  Talk to Engineer
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

            {/* Visual Technical Card */}
            <div className="border border-border/80 bg-surface-elevated/60 p-4">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={images[product.image]}
                  alt={`${product.name} technical hardware overview`}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0"
                />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border/30 pt-3 text-[11px] uppercase tracking-wider text-surface-foreground/60">
                <span>Model Class: {product.slug.toUpperCase()}</span>
                <span className="text-signal">ISO Standard Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KEY FEATURES & ENGINEERING SPECIFICATIONS */}
      <section className="px-5 py-20 lg:px-10 lg:py-24 bg-background">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Features */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Architecture & Capabilities
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                Key Engineering Features
              </h2>
              <ul className="mt-6 space-y-4">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-1 shrink-0 text-signal" />
                    <span className="text-sm font-medium text-foreground leading-6">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Integration Section */}
              <div className="mt-10 border border-border bg-card p-6">
                <h3 className="font-display text-xl uppercase tracking-wider text-signal border-b border-border pb-3">
                  Control & Mechanical Integration
                </h3>
                <p className="mt-4 text-xs leading-6 text-muted-foreground sm:text-sm">
                  {product.integration}
                </p>
              </div>
            </div>

            {/* Specifications Table (Section 18) */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                    Technical Data
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                    Performance Ratings
                  </h2>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-none border-border text-xs font-bold uppercase"
                  onClick={() => openModal("engineer", { productName: product.name })}
                >
                  Request CAD / 3D STEP
                </Button>
              </div>

              <div className="mt-6 overflow-x-auto border border-border bg-card">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border bg-muted/40 uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3 font-bold">Engineering Parameter</th>
                      <th className="px-5 py-3 font-bold">Standard Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {product.specifications.map((row) => (
                      <tr key={row.label} className="hover:bg-muted/20">
                        <td className="px-5 py-3.5 font-medium text-foreground">{row.label}</td>
                        <td className="px-5 py-3.5 text-muted-foreground font-mono">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-start gap-2 text-[11px] text-muted-foreground">
                <ShieldAlert size={14} className="shrink-0 text-signal mt-0.5" />
                <p>
                  Custom gear ratios, specialized hollow-bore diameters, and customized motor
                  windings are available upon technical review with our design team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT-SPECIFIC QUICK FORM (Section 27) */}
      <section className="border-t border-border/40 bg-card px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl border border-border bg-background p-8 sm:p-12 shadow-xl">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
              Expedited Inquiry
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              Enquire About {product.name}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-muted-foreground sm:text-sm">
              Connect directly with our application engineers for sizing verification, mechanical
              availability, and quantity pricing.
            </p>
          </div>

          <div className="mt-6 border border-signal/30 bg-surface-elevated/40 p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-signal">
              Selected Product
            </span>
            <p className="font-display text-lg uppercase text-foreground">
              {product.name} ({category.title})
            </p>
          </div>

          {formSubmitted ? (
            <div className="mt-8 py-8 text-center animate-in fade-in">
              <div className="mx-auto flex size-14 items-center justify-center bg-signal text-signal-foreground">
                <Check size={28} />
              </div>
              <h3 className="mt-4 font-display text-2xl uppercase">Enquiry Transmitted</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Thank you, {quickForm.name || "Engineer"}. Your technical enquiry for {product.name}{" "}
                has been routed to our application engineering team.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Button
                  className="rounded-none bg-signal text-signal-foreground hover:bg-signal/90"
                  onClick={() => setFormSubmitted(false)}
                >
                  Submit Another Note
                </Button>
                <Button variant="outline" className="rounded-none" onClick={handleWhatsApp}>
                  <MessageSquare size={14} className="mr-1.5" />
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleQuickSubmit} className="mt-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Full Name *
                  <Input
                    required
                    value={quickForm.name}
                    onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="mt-1.5 h-12 rounded-none border-input bg-card text-sm"
                  />
                </label>

                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Company Name *
                  <Input
                    required
                    value={quickForm.company}
                    onChange={(e) => setQuickForm({ ...quickForm, company: e.target.value })}
                    placeholder="e.g. Precision Systems Inc"
                    className="mt-1.5 h-12 rounded-none border-input bg-card text-sm"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Business Email *
                  <Input
                    type="email"
                    required
                    value={quickForm.email}
                    onChange={(e) => setQuickForm({ ...quickForm, email: e.target.value })}
                    placeholder="a.morgan@company.com"
                    className="mt-1.5 h-12 rounded-none border-input bg-card text-sm"
                  />
                </label>

                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Phone Number
                  <Input
                    type="tel"
                    value={quickForm.phone}
                    onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="mt-1.5 h-12 rounded-none border-input bg-card text-sm"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Target Quantity
                  <Input
                    value={quickForm.quantity}
                    onChange={(e) => setQuickForm({ ...quickForm, quantity: e.target.value })}
                    placeholder="e.g. 5 units / Pilot"
                    className="mt-1.5 h-12 rounded-none border-input bg-card text-sm"
                  />
                </label>

                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Application Task
                  <Input
                    value={quickForm.application}
                    onChange={(e) => setQuickForm({ ...quickForm, application: e.target.value })}
                    placeholder="e.g. Robotic Arm Joint Axis 3"
                    className="mt-1.5 h-12 rounded-none border-input bg-card text-sm"
                  />
                </label>
              </div>

              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Technical Sizing Requirements *
                <Textarea
                  required
                  rows={3}
                  value={quickForm.message}
                  onChange={(e) => setQuickForm({ ...quickForm, message: e.target.value })}
                  placeholder={`Describe your torque, velocity, duty cycle, mounting envelope, or fieldbus needs for ${product.name}...`}
                  className="mt-1.5 rounded-none border-input bg-card text-sm"
                />
              </label>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-none bg-signal font-bold uppercase text-signal-foreground hover:bg-signal/90"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Enquiry for {product.name} <ArrowRight size={14} className="ml-1.5" />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleWhatsApp}
                  className="rounded-none border-border"
                >
                  <MessageSquare size={14} className="mr-1.5 text-signal" />
                  WhatsApp Instead
                </Button>
              </div>

              <div className="border-t border-border pt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Need to provide complete machine drawings or multi-axis specs?
                </p>
                <Link
                  to="/contact/engineering-enquiry"
                  className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-signal hover:underline"
                >
                  Open Full 7-Section Engineering Form →
                </Link>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 4. CONTEXTUAL RELATED CONTENT (Section 40) */}
      <RelatedContent
        title={`Related Technologies for ${product.name}`}
        items={[
          {
            sectionTitle: "Complementary Products",
            links: relatedProducts.map((p) => ({
              title: p.name,
              category: p.category,
              description: p.overview,
              href: `/products/${p.categorySlug}/${p.slug}`,
            })),
          },
          {
            sectionTitle: "Applicable Industries",
            links: product.applications.map((app) => ({
              title: app,
              description: `Robotic integration for ${app} manufacturing environments.`,
              href: `/applications/${app.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
            })),
          },
          {
            sectionTitle: "Control & Fieldbuses",
            links: [
              {
                title: "Coordinated Motion Controllers",
                category: "Control Systems",
                description: "Deterministic trajectory interpolation over EtherCAT fieldbus.",
                href: "/products/control-systems",
              },
              {
                title: "Motion Control Technology",
                category: "Technology",
                description: "Deep-dive into polynomial spline trajectory generation.",
                href: "/technology/motion-control",
              },
            ],
          },
        ]}
      />
    </div>
  );
}
