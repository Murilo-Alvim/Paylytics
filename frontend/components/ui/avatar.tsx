import { cn, initialsOf } from "@/lib/utils";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-11 w-11 text-sm",
};

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={name}
        src={src}
        className={cn(
          "rounded-full border border-border object-cover",
          sizes[size],
          className,
        )}
      />
    );
  }
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-gradient-to-br from-brand-500/30 to-info/20 font-semibold text-foreground border border-border-strong",
        sizes[size],
        className,
      )}
      aria-label={name}
    >
      {initialsOf(name) || "?"}
    </div>
  );
}
