"use client";

import { Bell, LogOut, Menu, Search } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import type { SessionUser } from "@/types";

interface TopbarProps {
  onMenuClick: () => void;
  user: SessionUser;
  onSignOut: () => void;
}

export function Topbar({ onMenuClick, user, onSignOut }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/70 px-4 backdrop-blur-xl lg:px-6">
      <button
        type="button"
        className="rounded-lg p-2 text-foreground-muted hover:bg-white/[0.04] hover:text-foreground lg:hidden focus-ring"
        onClick={onMenuClick}
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden flex-1 max-w-md md:block">
        <Input
          placeholder="Buscar transações, clientes, países…"
          leftIcon={<Search className="h-4 w-4" />}
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border text-foreground-muted hover:border-border-strong hover:text-foreground focus-ring"
          aria-label="Notificações"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-400" />
        </button>

        <div className="ml-1 flex items-center gap-3 rounded-xl border border-border px-2.5 py-1.5">
          <Avatar name={user.name} src={user.avatarUrl} size="sm" />
          <div className="hidden text-xs leading-tight md:block">
            <p className="font-medium text-foreground">{user.name}</p>
            <p className="text-foreground-subtle">{user.role}</p>
          </div>
          <button
            type="button"
            onClick={onSignOut}
            className="rounded-md p-1 text-foreground-muted hover:bg-white/[0.04] hover:text-foreground focus-ring"
            aria-label="Sair"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
