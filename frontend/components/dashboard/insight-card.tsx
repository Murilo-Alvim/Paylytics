import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Insight } from "@/types";

const tones = {
  positive: {
    badge: "border-success/20 bg-success-soft text-success",
    icon: ArrowUpRight,
  },
  negative: {
    badge: "border-danger/20 bg-danger-soft text-danger",
    icon: ArrowDownRight,
  },
  neutral: {
    badge: "border-border bg-foreground/[0.05] text-foreground-muted",
    icon: Sparkles,
  },
} as const;

export function InsightCard({ insight }: { insight: Insight }) {
  const tone = tones[insight.tone];
  const Icon = tone.icon;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-background-surface/60 p-5 transition hover:border-border-strong hover:bg-background-surface">
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-300">
          <Sparkles className="h-4 w-4" />
        </div>
        {insight.metric && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
              tone.badge,
            )}
          >
            <Icon className="h-3 w-3" />
            {insight.metric}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-sm font-semibold text-foreground">{insight.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
        {insight.description}
      </p>
    </div>
  );
}
