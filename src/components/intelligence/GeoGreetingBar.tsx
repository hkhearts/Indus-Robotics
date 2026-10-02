/**
 * GeoGreetingBar.tsx — Shows timezone-aware greeting + traffic stats
 */
import React, { useEffect, useState } from "react";
import { Globe, Users, TrendingUp } from "lucide-react";
import { getGeoGreeting, getTrafficStats } from "@/lib/visitor";
import type { VisitorData } from "@/lib/visitor";

interface GeoGreetingBarProps {
  visitorData: VisitorData | null;
}

export function GeoGreetingBar({ visitorData }: GeoGreetingBarProps) {
  const [traffic, setTraffic] = useState({ activeUsers: 0, todayViews: 0 });
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    getTrafficStats().then(setTraffic);
    // Poll every 60 seconds
    const interval = setInterval(() => getTrafficStats().then(setTraffic), 60_000);

    // Live clock in visitor's timezone (using browser native time)
    const updateClock = () => {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const now = new Date().toLocaleTimeString("en-US", {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(now);
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 10_000);

    return () => {
      clearInterval(interval);
      clearInterval(clockInterval);
    };
  }, [visitorData]);

  const greeting = getGeoGreeting();

  return (
    <div className="border-b border-border/50 bg-card/60 px-5 py-1.5 lg:px-10">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        {/* Geo greeting */}
        <div className="flex items-center gap-3">
          <Globe size={14} className="shrink-0 text-signal" />
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{greeting}</span>
            {currentTime && (
              <>
                {" "}
                · <span>{currentTime}</span>
              </>
            )}
          </p>
        </div>

        {/* Traffic stats (right side, only show if > 0) */}
        <div className="hidden items-center gap-4 sm:flex">
          {traffic.activeUsers > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-signal" />
              </span>
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{traffic.activeUsers}</span> active now
              </p>
            </div>
          )}
          {traffic.todayViews > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <TrendingUp size={12} className="text-signal" />
              <span className="font-semibold text-foreground">{traffic.todayViews}</span> views today
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
