import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Activity, Search, TrendingUp, RefreshCw, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/trends")({
  head: () => ({
    meta: [
      { title: "Google Trends Radar | Indus Robotics" },
      {
        name: "description",
        content:
          "Live Google Trends intelligence for robotics, automation and motion control keywords relevant to Indus Robotics.",
      },
    ],
  }),
  component: TrendsDashboard,
});

// ─── Website-context keyword groups ────────────────────────────────────────
const TREND_GROUPS = [
  {
    label: "Industrial Robotics",
    keywords: ["industrial robot", "robotic automation", "factory automation"],
    geo: "IN",
  },
  {
    label: "Motion Control & Actuators",
    keywords: ["servo motor", "linear actuator", "precision reducer"],
    geo: "IN",
  },
  {
    label: "Smart Manufacturing",
    keywords: ["smart manufacturing", "Industry 4.0", "IIoT"],
    geo: "IN",
  },
  {
    label: "Mobile Robotics & AGV",
    keywords: ["AGV robot", "AMR robot", "mobile robotics"],
    geo: "IN",
  },
  {
    label: "Predictive Maintenance",
    keywords: ["predictive maintenance", "condition monitoring", "machine health"],
    geo: "IN",
  },
  {
    label: "AI & Robotics",
    keywords: ["AI robotics", "machine vision", "collaborative robot"],
    geo: "IN",
  },
];

// ─── Build Google Trends embed URL ─────────────────────────────────────────
function buildTrendsEmbedUrl(keywords: string[], geo = "IN") {
  const comparisonItems = keywords.slice(0, 3).map((kw) => ({
    keyword: kw,
    geo,
    time: "today 12-m",
  }));
  const req = encodeURIComponent(
    JSON.stringify({
      comparisonItem: comparisonItems,
      category: 0,
      property: "",
    })
  );
  const tz = -330; // IST offset (UTC+5:30 → -330 minutes)
  return `https://trends.google.com/trends/embed/explore/TIMESERIES?req=${req}&tz=${tz}&eq=q%3D${encodeURIComponent(keywords[0] ?? "")}%26geo%3D${geo}`;
}

export function TrendsDashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [selectedGroup, setSelectedGroup] = useState(0);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cron?action=trends");
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  const activeGroup = TREND_GROUPS[selectedGroup]!;

  return (
    <div className="min-h-screen bg-surface-dark text-surface-foreground">

      {/* ── Header ── */}
      <div className="border-b border-surface-foreground/10 bg-surface-elevated/20 px-5 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Market Intelligence
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
                Google Trends Radar
              </h1>
              <p className="mt-2 max-w-xl text-xs leading-5 text-surface-foreground/60">
                Live search-trend intelligence for robotics, automation and motion control —
                keywords mapped directly to Indus Robotics product categories.
              </p>
            </div>
            <Button
              onClick={fetchTrends}
              disabled={loading}
              className="h-11 rounded-none bg-signal px-6 text-xs font-bold uppercase text-signal-foreground"
            >
              <RefreshCw size={14} className={`mr-2 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Scanning..." : "Run Manual Scan"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-10 px-5 py-12">

        {/* ── Loading state ── */}
        {!data && loading && (
          <div className="flex flex-col items-center justify-center py-20 text-surface-foreground/40">
            <Activity size={32} className="mb-4 animate-pulse text-signal" />
            <p className="text-xs font-bold uppercase tracking-wider">
              Querying Google Trends RSS…
            </p>
          </div>
        )}

        {/* ── KPI Grid (no Status card) ── */}
        {data && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-md border border-border/10 bg-surface-elevated p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-surface-foreground/50">
                  Trends Analyzed
                </span>
                <Search size={14} className="text-surface-foreground/40" />
              </div>
              <div className="font-display text-3xl font-bold">{data.trendsAnalyzed ?? 0}</div>
            </div>
            <div className="rounded-md border border-border/10 bg-surface-elevated p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-signal">
                  Robotics Matches
                </span>
                <TrendingUp size={14} className="text-signal" />
              </div>
              <div className="font-display text-3xl font-bold text-signal">
                {data.roboticsRelevant ?? 0}
              </div>
            </div>
            <div className="rounded-md border border-border/10 bg-surface-elevated p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4d9fff]">
                  Jira Tasks Created
                </span>
                <CheckCircle2 size={14} className="text-[#4d9fff]" />
              </div>
              <div className="font-display text-3xl font-bold text-[#4d9fff]">
                {data.jiraTasksCreated ?? 0}
              </div>
            </div>
          </div>
        )}

        {/* ── Top Matches Table ── */}
        {data && (
          <div className="overflow-hidden rounded-md border border-border/10 bg-surface-elevated">
            <div className="border-b border-border/10 bg-surface-dark/50 p-5">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider">
                Top Robotics Keyword Matches
              </h3>
            </div>
            {data.topTrends && data.topTrends.length > 0 ? (
              <table className="w-full text-left text-sm">
                <thead className="bg-surface-dark/30 text-[10px] uppercase tracking-wider text-surface-foreground/50">
                  <tr>
                    <th className="px-5 py-3 font-medium">Trending Search</th>
                    <th className="px-5 py-3 font-medium">Matched Keyword</th>
                    <th className="px-5 py-3 font-medium">Category</th>
                    <th className="px-5 py-3 text-right font-medium">Traffic</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/5">
                  {data.topTrends.map((trend: any, i: number) => (
                    <tr key={i} className="transition-colors hover:bg-surface-dark/20">
                      <td className="px-5 py-4 font-bold text-signal">{trend.title}</td>
                      <td className="px-5 py-4">
                        <span className="rounded border border-border/10 bg-surface-dark px-2 py-1 text-xs">
                          {trend.matchedKeyword}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs uppercase tracking-wider text-surface-foreground/70">
                        {trend.category}
                      </td>
                      <td className="px-5 py-4 text-right font-mono text-xs">{trend.traffic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-10 text-center text-sm text-surface-foreground/50">
                No direct robotics matches in today's top Google Trends for India.
              </div>
            )}
          </div>
        )}

        {/* ── Jira Banner ── */}
        {data?.jiraKeys && data.jiraKeys.length > 0 && (
          <div className="flex items-center justify-between rounded-md border border-[#2a2a4e] bg-[#12122a] p-5">
            <div className="flex items-center gap-3">
              <div className="rounded bg-[#4d9fff]/20 p-2 text-[#4d9fff]">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#e0e0e0]">
                  Tasks created in Jira (Project DI)
                </h4>
                <p className="mt-0.5 text-xs text-[#8888aa]">
                  Tickets: {data.jiraKeys.join(", ")}
                </p>
              </div>
            </div>
            <a
              href="https://trustworkz.atlassian.net/jira/software/projects/DI/boards"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-bold uppercase text-[#4d9fff] hover:underline"
            >
              View Board <ExternalLink size={11} className="ml-0.5" />
            </a>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            GOOGLE TRENDS LIVE GRAPHS — contextual keywords for Indus Robotics
        ══════════════════════════════════════════════════════════════════ */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border/20" />
            <span className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
              Live Trend Charts · Google Trends · India
            </span>
            <div className="h-px flex-1 bg-border/20" />
          </div>
          <p className="mb-6 text-xs leading-5 text-surface-foreground/50">
            Select a product category below to see 12-month Google Trends data for the exact
            keywords powering Indus Robotics SEO.
          </p>

          {/* Category tab selector */}
          <div className="mb-6 flex flex-wrap gap-2">
            {TREND_GROUPS.map((group, idx) => (
              <button
                key={group.label}
                onClick={() => setSelectedGroup(idx)}
                className={`border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  selectedGroup === idx
                    ? "border-signal bg-signal/10 text-signal"
                    : "border-border/20 text-surface-foreground/50 hover:border-signal/40 hover:text-surface-foreground"
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>

          {/* Active group info + keywords */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-surface-foreground/40">
              Tracking:
            </span>
            {activeGroup.keywords.map((kw) => (
              <span
                key={kw}
                className="rounded border border-signal/30 bg-signal/5 px-2 py-0.5 text-[10px] font-semibold text-signal"
              >
                {kw}
              </span>
            ))}
            <span className="ml-auto text-[10px] text-surface-foreground/30">Region: India · 12 months</span>
          </div>

          {/* Embedded Google Trends chart */}
          <div className="overflow-hidden rounded-md border border-border/10 bg-[#0a0a12]">
            <iframe
              key={selectedGroup}
              src={buildTrendsEmbedUrl(activeGroup.keywords, activeGroup.geo)}
              title={`Google Trends: ${activeGroup.label}`}
              width="100%"
              height="420"
              className="border-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>

          {/* Direct Google Trends link */}
          <div className="mt-3 flex justify-end">
            <a
              href={`https://trends.google.com/trends/explore?q=${encodeURIComponent(
                activeGroup.keywords.join(",")
              )}&geo=${activeGroup.geo}&hl=en`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-signal hover:underline"
            >
              Open in Google Trends <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* All-keywords quick reference */}
        <div className="rounded-md border border-border/10 bg-surface-elevated p-6">
          <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-wider text-surface-foreground/60">
            All Tracked SEO Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {TREND_GROUPS.flatMap((g) =>
              g.keywords.map((kw) => (
                <a
                  key={kw}
                  href={`https://trends.google.com/trends/explore?q=${encodeURIComponent(kw)}&geo=IN`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-border/15 bg-surface-dark px-3 py-1 text-[11px] text-surface-foreground/70 transition-colors hover:border-signal/40 hover:text-signal"
                >
                  {kw}
                </a>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
