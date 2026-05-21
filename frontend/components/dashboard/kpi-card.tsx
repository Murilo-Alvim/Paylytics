import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Kpi } from "@/types";
import { Card } from "@/components/ui/card";

interface KpiCardProps {
  kpi: Kpi;
  className?: string;
}

export function KpiCard({ kpi, className }: KpiCardProps) {
  const positive = kpi.trend === "up";
  const negative = kpi.trend === "down";
  const tone = positive
    ? "text-success"
    : negative
    ? "text-danger"
    : "text-foreground-muted";

  const Icon = positive ? ArrowUpRight : negative ? ArrowDownRight : Minus;
  const deltaSign = kpi.delta > 0 ? "+" : "";

  return (
    <Card
      className={cn(
        "group flex flex-col gap-4 hover:-translate-y-0.5 hover:border-border-strong",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-foreground-subtle">
          {kpi.label}
        </p>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
            positive && "border-success/20 bg-success-soft text-success",
            negative && "border-danger/20 bg-danger-soft text-danger",
            !positive && !negative && "border-border bg-white/[0.04] text-foreground-muted",
          )}
        >
          <Icon className="h-3 w-3" strokeWidth={2.5} />
          {deltaSign}
          {kpi.delta.toFixed(1)}%
        </span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-3xl font-semibold tracking-tight text-gradient">
          {kpi.value}
        </span>
      </div>
      {kpi.helper && (
        <p className={cn("text-xs", tone)}>{kpi.helper}</p>
      )}
    </Card>
  );
}
