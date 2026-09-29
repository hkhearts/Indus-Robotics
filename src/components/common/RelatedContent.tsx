import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Cpu, Move3d, Layers } from "lucide-react";

export interface RelatedLink {
  title: string;
  category?: string;
  description: string;
  href: string;
}

export function RelatedContent({
  title = "Related Engineering Content",
  eyebrow = "Connected Ecosystem",
  items,
}: {
  title?: string;
  eyebrow?: string;
  items: {
    sectionTitle: string;
    links: RelatedLink[];
  }[];
}) {
  return (
    <section className="border-t border-border/40 bg-surface-dark px-5 py-16 text-surface-foreground lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-signal">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-surface-foreground sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((group) => (
            <div
              key={group.sectionTitle}
              className="border border-surface-foreground/15 bg-surface-elevated/40 p-6"
            >
              <h3 className="font-display text-xl uppercase tracking-wider text-signal border-b border-surface-foreground/15 pb-3">
                {group.sectionTitle}
              </h3>
              <ul className="mt-4 space-y-4">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="group block transition-colors hover:text-signal"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-base uppercase text-surface-foreground group-hover:text-signal">
                          {link.title}
                        </span>
                        <ArrowRight
                          size={14}
                          className="text-signal opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </div>
                      {link.category && (
                        <span className="mt-0.5 inline-block text-[10px] uppercase tracking-wider text-surface-foreground/50">
                          {link.category}
                        </span>
                      )}
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-surface-foreground/60">
                        {link.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
