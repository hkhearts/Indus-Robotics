import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  ExternalLink,
  MousePointerClick,
  Video,
  Map,
  BarChart3,
  Users,
  Flame,
  Zap,
  Eye,
  Filter,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Clarity Analytics Dashboard | Indus Robotics" },
      { name: "description", content: "Internal Microsoft Clarity heatmaps, session recordings and behavioral analytics for Indus Robotics." },
    ],
  }),
  component: AnalyticsDashboard,
});

const CLARITY_PROJECT_ID = "yru44ykfxv";
const CLARITY_BASE = `https://clarity.microsoft.com/projects/view/${CLARITY_PROJECT_ID}`;

// ── Pages tracked with Clarity ─────────────────────────────────────────────
const TRACKED_PAGES = [
  { label: "Homepage",               path: "/",                           section: "home",         type: "Homepage" },
  { label: "Products Listing",       path: "/products",                   section: "products",     type: "Listing" },
  { label: "Actuators",              path: "/products/actuators",         section: "products",     type: "Product" },
  { label: "Precision Reducers",     path: "/products/precision-reducers",section: "products",     type: "Product" },
  { label: "Robotic Arms",           path: "/products/robotic-arms",      section: "products",     type: "Product" },
  { label: "Industrial Robots",      path: "/products/industrial-robots", section: "products",     type: "Product" },
  { label: "Solutions",              path: "/solutions",                  section: "solutions",    type: "Listing" },
  { label: "Factory Automation",     path: "/solutions/factory-automation", section: "solutions",  type: "Solution" },
  { label: "Mobile Robotics",        path: "/solutions/mobile-robotics",  section: "solutions",    type: "Solution" },
  { label: "Applications",           path: "/applications",               section: "applications", type: "Listing" },
  { label: "Contact Hub",            path: "/contact",                    section: "contact",      type: "Contact" },
  { label: "Engineering Enquiry",    path: "/contact/engineering-enquiry",section: "contact",      type: "Form" },
  { label: "About",                  path: "/about",                      section: "about",        type: "About" },
  { label: "Careers",                path: "/careers",                    section: "careers",      type: "Careers" },
  { label: "Resources",              path: "/resources",                  section: "resources",    type: "Resources" },
  { label: "FAQs",                   path: "/resources/faqs",             section: "resources",    type: "FAQ" },
  { label: "Search",                 path: "/search",                     section: "search",       type: "Search" },
  { label: "Google Trends Radar",    path: "/trends",                     section: "trends",       type: "Analytics" },
];

const SECTION_COLORS: Record<string, string> = {
  home: "#00e5ff",
  products: "#2dca72",
  solutions: "#4d9fff",
  applications: "#f59e0b",
  contact: "#a78bfa",
  about: "#f472b6",
  careers: "#fb923c",
  resources: "#34d399",
  search: "#94a3b8",
  trends: "#00e5ff",
};

// ── Quick-link cards ────────────────────────────────────────────────────────
const QUICK_LINKS = [
  {
    label: "Heatmaps",
    desc: "Click & scroll heatmaps for every page",
    icon: Flame,
    href: `${CLARITY_BASE}/heatmaps`,
    color: "#ff6b35",
  },
  {
    label: "Session Recordings",
    desc: "Watch real user sessions on your site",
    icon: Video,
    href: `${CLARITY_BASE}/recordings`,
    color: "#4d9fff",
  },
  {
    label: "Insights Dashboard",
    desc: "AI-powered engagement summary",
    icon: BarChart3,
    href: `${CLARITY_BASE}/dashboard`,
    color: "#2dca72",
  },
  {
    label: "Filters & Segments",
    desc: "Filter by page_type, device_type, section",
    icon: Filter,
    href: `${CLARITY_BASE}/recordings?filters=CustomTags`,
    color: "#a78bfa",
  },
  {
    label: "Users & Sessions",
    desc: "Visitors, bounce rate, engagement",
    icon: Users,
    href: `${CLARITY_BASE}/dashboard`,
    color: "#f59e0b",
  },
  {
    label: "Click Maps",
    desc: "See exactly where users click",
    icon: MousePointerClick,
    href: `${CLARITY_BASE}/heatmaps?heatmapType=Click`,
    color: "#f472b6",
  },
];

// ── Active Clarity tags (what the site sends) ───────────────────────────────
const ACTIVE_TAGS = [
  { key: "page_section",     values: ["home", "products", "solutions", "applications", "contact", "about", "careers", "resources", "trends"] },
  { key: "page_type",        values: ["homepage", "product_listing", "product_detail", "solution_detail", "application_detail", "contact", "form", "resources", "analytics"] },
  { key: "content_category", values: ["actuators", "robotic arms", "factory automation", "mobile robotics", "…dynamic"] },
  { key: "visitor_type",     values: ["new", "returning"] },
  { key: "device_type",      values: ["mobile", "desktop"] },
  { key: "site",             values: ["indus-robotics"] },
];

export function AnalyticsDashboard() {
  const [activeSection, setActiveSection] = useState<string>("all");

  const sections = ["all", ...Array.from(new Set(TRACKED_PAGES.map((p) => p.section)))];

  const filteredPages =
    activeSection === "all"
      ? TRACKED_PAGES
      : TRACKED_PAGES.filter((p) => p.section === activeSection);

  // Build per-page heatmap URL
  const heatmapUrl = (pagePath: string) =>
    `${CLARITY_BASE}/heatmaps?filters=Url%3A${encodeURIComponent(pagePath)}`;

  const recordingUrl = (pagePath: string) =>
    `${CLARITY_BASE}/recordings?filters=Url%3A${encodeURIComponent(pagePath)}`;

  return (
    <div className="min-h-screen bg-surface-dark text-surface-foreground">

      {/* ── Header ── */}
      <div className="border-b border-surface-foreground/10 bg-surface-elevated/20 px-5 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Behavioral Analytics
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
                Microsoft Clarity Dashboard
              </h1>
              <p className="mt-2 max-w-xl text-xs leading-5 text-surface-foreground/60">
                Project ID:{" "}
                <code className="rounded bg-surface-elevated px-2 py-0.5 font-mono text-signal">
                  {CLARITY_PROJECT_ID}
                </code>
                {" "}· Heatmaps, session recordings and engagement insights connected directly to your site.
              </p>
            </div>
            <a
              href={`${CLARITY_BASE}/dashboard`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-none bg-signal px-6 text-xs font-bold uppercase text-signal-foreground hover:bg-signal/90"
            >
              Open Clarity <ExternalLink size={13} />
            </a>
          </div>

          {/* Live connection badge */}
          <div className="mt-6 flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2dca72] opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[#2dca72]" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2dca72]">
              Clarity SDK Active · Recording sessions now
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-10 px-5 py-12">

        {/* ── Quick-link cards ── */}
        <div>
          <h2 className="mb-4 font-display text-xs font-bold uppercase tracking-[.18em] text-surface-foreground/50">
            Jump To Clarity Feature
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {QUICK_LINKS.map(({ label, desc, icon: Icon, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 rounded-none border border-border/10 bg-surface-elevated p-4 transition-all hover:border-signal/30 hover:bg-surface-elevated/80"
              >
                <div
                  className="flex size-9 items-center justify-center rounded-sm"
                  style={{ background: `${color}18`, color }}
                >
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-surface-foreground group-hover:text-signal">
                    {label}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-4 text-surface-foreground/45">{desc}</p>
                </div>
                <ExternalLink size={10} className="ml-auto mt-auto text-surface-foreground/30 group-hover:text-signal" />
              </a>
            ))}
          </div>
        </div>

        {/* ── Active Custom Tags ── */}
        <div>
          <h2 className="mb-4 font-display text-xs font-bold uppercase tracking-[.18em] text-surface-foreground/50">
            Active Clarity Custom Tags · Sent From Every Page
          </h2>
          <div className="overflow-hidden rounded-none border border-border/10 bg-surface-elevated">
            <div className="grid divide-y divide-border/10">
              {ACTIVE_TAGS.map(({ key, values }) => (
                <div key={key} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex w-40 shrink-0 items-center gap-2">
                    <Zap size={12} className="shrink-0 text-signal" />
                    <code className="font-mono text-[11px] font-bold text-signal">{key}</code>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {values.map((v) => (
                      <span
                        key={v}
                        className="rounded border border-border/10 bg-surface-dark px-2 py-0.5 text-[10px] text-surface-foreground/60"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`${CLARITY_BASE}/recordings?filters=CustomTags`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-1 text-[10px] font-bold text-signal hover:underline"
                  >
                    Filter in Clarity <ChevronRight size={10} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Per-page heatmap links ── */}
        <div>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-xs font-bold uppercase tracking-[.18em] text-surface-foreground/50">
              Heatmap &amp; Recording Links · By Page
            </h2>
            {/* Section filter */}
            <div className="flex flex-wrap gap-1.5">
              {sections.map((sec) => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    activeSection === sec
                      ? "border-signal bg-signal/10 text-signal"
                      : "border-border/15 text-surface-foreground/40 hover:border-signal/30 hover:text-surface-foreground"
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-none border border-border/10 bg-surface-elevated">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border/10 bg-surface-dark/50 text-[10px] uppercase tracking-wider text-surface-foreground/40">
                <tr>
                  <th className="px-5 py-3">Page</th>
                  <th className="px-5 py-3">Path</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3 text-center">Heatmap</th>
                  <th className="px-5 py-3 text-center">Recording</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/5">
                {filteredPages.map((page) => {
                  const color = SECTION_COLORS[page.section] ?? "#94a3b8";
                  return (
                    <tr key={page.path} className="transition-colors hover:bg-surface-dark/20">
                      <td className="px-5 py-3 font-bold" style={{ color }}>
                        {page.label}
                      </td>
                      <td className="px-5 py-3 font-mono text-surface-foreground/50">
                        {page.path}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className="rounded px-2 py-0.5 text-[10px] font-bold uppercase"
                          style={{ background: `${color}18`, color }}
                        >
                          {page.type}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <a
                          href={heatmapUrl(page.path)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-2.5 py-1 text-[10px] font-bold text-[#ff6b35] hover:bg-[#ff6b35]/20"
                        >
                          <Flame size={10} /> Heatmap
                        </a>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <a
                          href={recordingUrl(page.path)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded border border-[#4d9fff]/30 bg-[#4d9fff]/10 px-2.5 py-1 text-[10px] font-bold text-[#4d9fff] hover:bg-[#4d9fff]/20"
                        >
                          <Video size={10} /> Recordings
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[10px] text-surface-foreground/30">
            * Heatmap and recording data appears in Clarity after sessions are collected. First data typically appears within 24 hours of going live.
          </p>
        </div>

        {/* ── How data flows ── */}
        <div className="rounded-none border border-border/10 bg-surface-elevated p-6">
          <h2 className="mb-5 font-display text-xs font-bold uppercase tracking-[.18em] text-surface-foreground/50">
            How Your Data Flows Into Clarity
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Eye, color: "#4d9fff", step: "01", title: "User Visits Page", desc: "Clarity SDK fires automatically on every page load" },
              { icon: Activity, color: "#2dca72", step: "02", title: "Tags Sent", desc: "page_type, page_section, device_type, content_category tagged per route" },
              { icon: Map, color: "#f59e0b", step: "03", title: "Heatmap Built", desc: "Click, scroll and move data aggregated into visual heatmaps" },
              { icon: Video, color: "#a78bfa", step: "04", title: "Session Recorded", desc: "Full replay available in Clarity with tag-based filtering" },
            ].map(({ icon: Icon, color, step, title, desc }) => (
              <div key={step} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl font-bold text-surface-foreground/15">{step}</span>
                  <div
                    className="flex size-8 items-center justify-center rounded-sm"
                    style={{ background: `${color}18`, color }}
                  >
                    <Icon size={15} />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color }}>{title}</p>
                  <p className="mt-1 text-[10px] leading-4 text-surface-foreground/40">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
