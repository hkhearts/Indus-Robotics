/**
 * ThemeToggle.tsx — Dark / Light / System theme switcher
 */
import React, { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { getTheme, setTheme, type Theme } from "@/lib/visitor";

const THEMES: { value: Theme; icon: React.ReactNode; label: string }[] = [
  { value: "light", icon: <Sun size={14} />, label: "Light" },
  { value: "system", icon: <Monitor size={14} />, label: "System" },
  { value: "dark", icon: <Moon size={14} />, label: "Dark" },
];

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [current, setCurrent] = useState<Theme>("system");

  useEffect(() => {
    setCurrent(getTheme());
  }, []);

  const handleChange = (theme: Theme) => {
    setTheme(theme);
    setCurrent(theme);
  };

  if (compact) {
    const next: Record<Theme, Theme> = { dark: "light", light: "system", system: "dark" };
    const icon = current === "dark" ? <Moon size={16} /> : current === "light" ? <Sun size={16} /> : <Monitor size={16} />;
    return (
      <button
        onClick={() => handleChange(next[current])}
        aria-label={`Switch theme (current: ${current})`}
        className="flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-signal hover:text-signal"
        title={`Theme: ${current}`}
      >
        {icon}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-0.5 border border-border bg-surface-dark p-0.5">
      {THEMES.map(({ value, icon, label }) => (
        <button
          key={value}
          onClick={() => handleChange(value)}
          aria-label={`${label} theme`}
          title={`${label} theme`}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
            current === value
              ? "bg-signal text-signal-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
