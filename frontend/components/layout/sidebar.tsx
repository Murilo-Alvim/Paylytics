"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  LayoutDashboard,
  LifeBuoy,
  Receipt,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transações", icon: Receipt },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Configurações", icon: Settings },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-background-surface/95 backdrop-blur-xl transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/dashboard" className="focus-ring rounded-md">
            <Logo />
          </Link>
          <button
            className="rounded-md p-1 text-foreground-muted hover:bg-foreground/[0.06] hover:text-foreground lg:hidden"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-foreground-subtle">
            Plataforma
          </p>
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition focus-ring",
                  active
                    ? "bg-brand-500/10 text-foreground border border-brand-500/20"
                    : "text-foreground-muted hover:bg-foreground/[0.04] hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition",
                    active ? "text-brand-300" : "group-hover:text-foreground",
                  )}
                />
                {item.label}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-400" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="m-3 mt-auto rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 to-info/5 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-300" />
            <p className="text-sm font-medium text-foreground">Upgrade Enterprise</p>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">
            Desbloqueie SLA dedicado, conciliação avançada e insights por IA.
          </p>
          <button className="mt-3 inline-flex h-8 w-full items-center justify-center rounded-lg bg-brand-500 text-xs font-medium text-white transition hover:bg-brand-400">
            Falar com vendas
          </button>
        </div>

        <div className="border-t border-border px-3 py-3">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs text-foreground-muted hover:bg-foreground/[0.04] hover:text-foreground"
          >
            <LifeBuoy className="h-4 w-4" /> Suporte e ajuda
          </Link>
        </div>
      </aside>
    </>
  );
}
