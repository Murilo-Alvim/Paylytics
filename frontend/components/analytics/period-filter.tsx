"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

const PERIODS = ["7d", "30d", "90d", "12m", "YTD"] as const;
export type Period = (typeof PERIODS)[number];

function isPeriod(value: string | null): value is Period {
  return value !== null && (PERIODS as readonly string[]).includes(value);
}

export function PeriodFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const raw = searchParams.get("period");
  const active: Period = isPeriod(raw) ? raw : "30d";

  function setPeriod(p: Period) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", p);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-xl border border-border bg-background-surface/60 p-1 transition-opacity",
        isPending && "opacity-60",
      )}
    >
      {PERIODS.map((p) => (
        <button
          key={p}
          onClick={() => setPeriod(p)}
          disabled={isPending}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-medium transition focus-ring",
            active === p
              ? "bg-brand-500/15 text-foreground border border-brand-500/30"
              : "text-foreground-muted hover:bg-foreground/[0.04] border border-transparent",
          )}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
