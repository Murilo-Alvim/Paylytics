import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { TransactionStatus } from "@/types";

type Tone = "success" | "warning" | "danger" | "info" | "neutral" | "brand";

const tones: Record<Tone, string> = {
  success: "bg-success-soft text-success border-success/20",
  warning: "bg-warning-soft text-warning border-warning/20",
  danger: "bg-danger-soft text-danger border-danger/20",
  info: "bg-info-soft text-info border-info/20",
  neutral: "bg-white/[0.05] text-foreground-muted border-border",
  brand: "bg-brand-500/10 text-brand-300 border-brand-500/20",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
}

export function Badge({
  tone = "neutral",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", {
          "bg-success": tone === "success",
          "bg-warning": tone === "warning",
          "bg-danger": tone === "danger",
          "bg-info": tone === "info",
          "bg-brand-400": tone === "brand",
          "bg-foreground-muted": tone === "neutral",
        })} />
      )}
      {children}
    </span>
  );
}

const statusConfig: Record<
  TransactionStatus,
  { tone: Tone; label: string }
> = {
  APPROVED: { tone: "success", label: "Aprovada" },
  PENDING: { tone: "warning", label: "Pendente" },
  FAILED: { tone: "danger", label: "Recusada" },
  REFUNDED: { tone: "info", label: "Reembolsada" },
};

export function StatusBadge({ status }: { status: TransactionStatus }) {
  const { tone, label } = statusConfig[status];
  return (
    <Badge tone={tone} dot>
      {label}
    </Badge>
  );
}
