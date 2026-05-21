import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, leftIcon, rightIcon, ...props },
  ref,
) {
  return (
    <div className="relative">
      {leftIcon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-subtle">
          {leftIcon}
        </span>
      )}
      <input
        ref={ref}
        className={cn(
          "h-10 w-full rounded-xl border border-border bg-background-surface/60 px-3 text-sm text-foreground placeholder:text-foreground-subtle focus-ring transition",
          "hover:border-border-strong focus:border-brand-500/50",
          leftIcon && "pl-10",
          rightIcon && "pr-10",
          className,
        )}
        {...props}
      />
      {rightIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-subtle">
          {rightIcon}
        </span>
      )}
    </div>
  );
});

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cn(
        "h-10 w-full appearance-none rounded-xl border border-border bg-background-surface/60 px-3 pr-8 text-sm text-foreground focus-ring transition",
        "hover:border-border-strong focus:border-brand-500/50",
        "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%238b94a8%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22 /></svg>')] bg-no-repeat",
        className,
      )}
      style={{
        backgroundPosition: "right 0.5rem center",
        backgroundSize: "1.25rem",
      }}
      {...props}
    >
      {children}
    </select>
  );
});

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "text-xs font-medium uppercase tracking-wide text-foreground-muted",
        className,
      )}
      {...props}
    />
  );
}
