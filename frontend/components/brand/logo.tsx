import { cn } from "@/lib/utils";

export function Logo({ className, withWordmark = true }: { className?: string; withWordmark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl border border-border-strong bg-gradient-to-br from-brand-500 to-info text-white shadow-glow">
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          aria-hidden
        >
          <path
            d="M4 18V8a2 2 0 0 1 2-2h8l6 6v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M9 13h6M9 16h4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {withWordmark && (
        <span className="font-semibold tracking-tight text-foreground">
          Paylytics
        </span>
      )}
    </div>
  );
}
