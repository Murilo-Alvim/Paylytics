"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "top", label: "Início" },
  { id: "metrics", label: "Métricas" },
  { id: "dashboard", label: "Dashboard" },
  { id: "insights", label: "Insights IA" },
  { id: "global", label: "Multi-país" },
  { id: "features", label: "Recursos" },
  { id: "steps", label: "Como funciona" },
  { id: "cta", label: "Começar" },
];

export function SectionNav() {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visible = new Set<string>();

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visible.add(s.id);
          else visible.delete(s.id);
          const ordered = SECTIONS.map((x) => x.id).filter((id) =>
            visible.has(id),
          );
          if (ordered.length > 0) setActive(ordered[0]);
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      aria-label="Navegação por seção"
      className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col gap-1 rounded-2xl border border-border bg-background-surface/70 p-2 backdrop-blur shadow-card">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="group relative flex items-center">
              <a
                href={`#${s.id}`}
                aria-label={s.label}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full transition-all focus-ring",
                  isActive
                    ? "bg-brand-500/15"
                    : "hover:bg-foreground/[0.05]",
                )}
              >
                <span
                  className={cn(
                    "block rounded-full transition-all",
                    isActive
                      ? "h-2.5 w-2.5 bg-brand-400 shadow-[0_0_10px_rgba(59,99,245,0.8)]"
                      : "h-1.5 w-1.5 bg-foreground/30 group-hover:bg-foreground/60",
                  )}
                />
              </a>
              <span
                className={cn(
                  "pointer-events-none absolute right-10 whitespace-nowrap rounded-md border border-border bg-background-elevated/95 px-2.5 py-1 text-xs font-medium backdrop-blur transition-all",
                  isActive
                    ? "text-brand-200 opacity-0 group-hover:opacity-100"
                    : "text-foreground opacity-0 group-hover:opacity-100",
                )}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
