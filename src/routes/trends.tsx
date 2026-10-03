import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Activity, Search, LineChart, TrendingUp, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/trends")({
  head: () => ({
    meta: [{ title: "Google Trends Radar | Indus Robotics" }],
  }),
  component: TrendsDashboard,
});

export function TrendsDashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

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

  return (
    <div className="min-h-screen bg-surface-dark text-surface-foreground">
      <div className="border-b border-surface-foreground/10 bg-surface-elevated/20 px-5 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">
                Market Intelligence
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
                Google Trends Radar
              </h1>
              <p className="mt-2 text-xs text-surface-foreground/60 max-w-xl leading-5">
                Scanning daily trending searches in India for robotics, automation, and motion control keywords.
                Matches are automatically pushed to Jira for marketing action.
              </p>
            </div>
            <Button
              onClick={fetchTrends}
              disabled={loading}
              className="bg-signal text-signal-foreground font-bold uppercase text-xs h-11 px-6 rounded-none"
            >
              <RefreshCw size={14} className={`mr-2 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Scanning..." : "Run Manual Scan"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12">
        {!data && loading && (
          <div className="flex flex-col items-center justify-center py-20 text-surface-foreground/40">
            <Activity size={32} className="animate-pulse text-signal mb-4" />
            <p className="text-xs uppercase tracking-wider font-bold">Querying Google Trends RSS...</p>
          </div>
        )}

        {data && (
          <div className="space-y-8">
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-surface-elevated border border-border/10 p-6 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-surface-foreground/50">Trends Analyzed</span>
                  <Search size={14} className="text-surface-foreground/40" />
                </div>
                <div className="text-3xl font-bold font-display">{data.trendsAnalyzed || 0}</div>
              </div>
              <div className="bg-surface-elevated border border-border/10 p-6 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-signal">Robotics Matches</span>
                  <TrendingUp size={14} className="text-signal" />
                </div>
                <div className="text-3xl font-bold font-display text-signal">{data.roboticsRelevant || 0}</div>
              </div>
              <div className="bg-surface-elevated border border-border/10 p-6 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#4d9fff]">Jira Tasks Created</span>
                  <CheckCircle2 size={14} className="text-[#4d9fff]" />
                </div>
                <div className="text-3xl font-bold font-display text-[#4d9fff]">{data.jiraTasksCreated || 0}</div>
              </div>
              <div className="bg-surface-elevated border border-border/10 p-6 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-surface-foreground/50">Status</span>
                  <LineChart size={14} className="text-surface-foreground/40" />
                </div>
                <div className="text-sm font-bold uppercase mt-2 text-[#2dca72]">{data.success ? "Active & Syncing" : "Error"}</div>
              </div>
            </div>

            {/* Top Matches Table */}
            <div className="bg-surface-elevated border border-border/10 rounded-md overflow-hidden">
              <div className="p-5 border-b border-border/10 bg-surface-dark/50">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider">Top Robotics Trends</h3>
              </div>
              {data.topTrends && data.topTrends.length > 0 ? (
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-dark/30 text-[10px] uppercase tracking-wider text-surface-foreground/50">
                    <tr>
                      <th className="px-5 py-3 font-medium">Trending Search Term</th>
                      <th className="px-5 py-3 font-medium">Matched Keyword</th>
                      <th className="px-5 py-3 font-medium">Category</th>
                      <th className="px-5 py-3 font-medium text-right">Approx. Traffic</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/5">
                    {data.topTrends.map((trend: any, i: number) => (
                      <tr key={i} className="hover:bg-surface-dark/20 transition-colors">
                        <td className="px-5 py-4 font-bold text-signal">{trend.title}</td>
                        <td className="px-5 py-4">
                          <span className="bg-surface-dark px-2 py-1 rounded text-xs border border-border/10">
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
                  No direct robotics keywords found in today's top 20 Google Trends for India.
                </div>
              )}
            </div>

            {data.jiraKeys && data.jiraKeys.length > 0 && (
              <div className="bg-[#12122a] border border-[#2a2a4e] p-5 rounded-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#4d9fff]/20 text-[#4d9fff] p-2 rounded">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#e0e0e0]">Tasks successfully created in Jira (Project DI)</h4>
                    <p className="text-xs text-[#8888aa] mt-0.5">Tickets: {data.jiraKeys.join(", ")}</p>
                  </div>
                </div>
                <a 
                  href="https://trustworkz.atlassian.net/jira/software/projects/DI/boards"
                  target="_blank"
                  className="text-xs font-bold uppercase text-[#4d9fff] hover:underline"
                >
                  View Board →
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
