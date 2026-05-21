"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const PERIODS = ["7d", "30d", "90d", "12m", "YTD"] as const;
export type Period = (typeof PERIODS)[number];

export function PeriodFilter({
  initial = "30d",
  onChange,
}: {
  initial?: Period;
  onChange?: (period: Period) => void;
}) {
  const [active, setActive] = useState<Period>(initial);

  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-border bg-background-surface/60 p-1">
      {PERIODS.map((p) => (
        <button
          key={p}
          onClick={() => {
            setActive(p);
            onChange?.(p);
          }}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-medium transition focus-ring",
            active === p
              ? "bg-brand-500/15 text-foreground border border-brand-500/30"
              : "text-foreground-muted hover:bg-white/[0.04] border border-transparent",
          )}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
