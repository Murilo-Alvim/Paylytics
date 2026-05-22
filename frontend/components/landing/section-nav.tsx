"use client";

import { useEffect, useState } from "react";
import { Compass } from "lucide-react";
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
      className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 animate-slide-up lg:block"
      style={{ animationDelay: "600ms", animationFillMode: "both" }}
    >
      <div className="rounded-2xl border border-border bg-background-surface/85 p-3 backdrop-blur-xl shadow-card">
        <div className="mb-3 flex items-center gap-2 px-2">
          <Compass className="h-3.5 w-3.5 text-brand-300" />
          <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">
            Navegação
          </p>
        </div>

        <ul className="flex flex-col gap-0.5">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-2.5 py-1.5 text-xs transition-all focus-ring",
                    isActive
                      ? "bg-brand-500/15 text-foreground"
                      : "text-foreground-muted hover:bg-foreground/[0.04] hover:text-foreground",
                  )}
                >
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    {isActive && (
                      <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-brand-400/60" />
                    )}
                    <span
                      className={cn(
                        "relative rounded-full transition-all",
                        isActive
                          ? "h-2 w-2 bg-brand-400 shadow-[0_0_8px_rgba(59,99,245,0.9)]"
                          : "h-1.5 w-1.5 bg-foreground/30 group-hover:bg-foreground/60",
                      )}
                    />
                  </span>
                  <span
                    className={cn(
                      "font-medium",
                      isActive && "text-brand-200",
                    )}
                  >
                    {s.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
