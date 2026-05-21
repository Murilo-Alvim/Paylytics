"use client";

import { useState } from "react";
import {
  Bell,
  Lock,
  Moon,
  Palette,
  Save,
  ShieldCheck,
  Sun,
  User,
} from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/types";

type Tab = "profile" | "preferences" | "appearance" | "notifications" | "security";

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Perfil", icon: User },
  { id: "preferences", label: "Preferências", icon: Palette },
  { id: "appearance", label: "Aparência", icon: Moon },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "security", label: "Segurança", icon: ShieldCheck },
];

export function SettingsSections({ user }: { user: SessionUser }) {
  const [tab, setTab] = useState<Tab>("profile");
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [notify, setNotify] = useState({
    transactionAlerts: true,
    weeklyReport: true,
    fraudAlerts: true,
    productNews: false,
  });

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px,1fr]">
      <nav className="space-y-1">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition focus-ring",
                active
                  ? "border border-brand-500/20 bg-brand-500/10 text-foreground"
                  : "border border-transparent text-foreground-muted hover:bg-white/[0.04] hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </nav>

      <div>
        {tab === "profile" && (
          <Card>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Como você aparece para o seu time.</CardDescription>
            <div className="mt-6 flex items-center gap-4">
              <Avatar name={user.name} size="lg" />
              <div>
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-foreground-subtle">{user.email}</p>
                <button className="mt-2 text-xs font-medium text-brand-300 hover:text-brand-200">
                  Trocar foto
                </button>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" defaultValue={user.name} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="role">Cargo</Label>
                <Input id="role" defaultValue={user.role} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="timezone">Fuso horário</Label>
                <Select id="timezone" defaultValue="America/Sao_Paulo">
                  <option value="America/Sao_Paulo">America/Sao_Paulo (UTC-3)</option>
                  <option value="America/New_York">America/New_York (UTC-5)</option>
                  <option value="Europe/Lisbon">Europe/Lisbon (UTC+0)</option>
                  <option value="Europe/Berlin">Europe/Berlin (UTC+1)</option>
                </Select>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button size="md" icon={<Save className="h-4 w-4" />}>
                Salvar alterações
              </Button>
            </div>
          </Card>
        )}

        {tab === "preferences" && (
          <Card>
            <CardTitle>Preferências</CardTitle>
            <CardDescription>
              Formato regional e moeda padrão da sua conta.
            </CardDescription>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="language">Idioma</Label>
                <Select id="language" defaultValue="pt-BR">
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es">Español</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="currency">Moeda padrão</Label>
                <Select id="currency" defaultValue="BRL">
                  <option value="BRL">BRL — Real brasileiro</option>
                  <option value="USD">USD — US Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dateformat">Formato de data</Label>
                <Select id="dateformat" defaultValue="DD/MM/YYYY">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="weekstart">Início da semana</Label>
                <Select id="weekstart" defaultValue="monday">
                  <option value="monday">Segunda-feira</option>
                  <option value="sunday">Domingo</option>
                </Select>
              </div>
            </div>
          </Card>
        )}

        {tab === "appearance" && (
          <Card>
            <CardTitle>Aparência</CardTitle>
            <CardDescription>
              Escolha o tema que melhor se adapta ao seu ambiente.
            </CardDescription>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {(
                [
                  { id: "dark", label: "Dark", icon: Moon, hint: "Recomendado" },
                  { id: "light", label: "Light", icon: Sun, hint: "Em breve" },
                  { id: "system", label: "Sistema", icon: Palette, hint: "Segue OS" },
                ] as const
              ).map((opt) => {
                const Icon = opt.icon;
                const active = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setTheme(opt.id)}
                    className={cn(
                      "rounded-xl border p-4 text-left transition focus-ring",
                      active
                        ? "border-brand-500/40 bg-brand-500/10"
                        : "border-border bg-background-elevated/40 hover:border-border-strong",
                    )}
                  >
                    <Icon className="h-5 w-5 text-brand-300" />
                    <p className="mt-3 text-sm font-medium text-foreground">
                      {opt.label}
                    </p>
                    <p className="text-xs text-foreground-subtle">{opt.hint}</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-background-elevated/40 p-4">
              <div>
                <p className="text-sm font-medium text-foreground">Densidade compacta</p>
                <p className="text-xs text-foreground-subtle">
                  Reduz espaçamento em tabelas e cards.
                </p>
              </div>
              <Toggle />
            </div>
          </Card>
        )}

        {tab === "notifications" && (
          <Card>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>Controle o que chega no seu e-mail.</CardDescription>
            <div className="mt-6 space-y-3">
              {[
                {
                  key: "transactionAlerts",
                  label: "Alertas de transações de alto valor",
                  hint: "Recebe e-mail para transações acima de R$ 10.000",
                },
                {
                  key: "weeklyReport",
                  label: "Relatório semanal",
                  hint: "Resumo executivo toda segunda às 09h",
                },
                {
                  key: "fraudAlerts",
                  label: "Alertas antifraude",
                  hint: "Recebe push sempre que uma regra é acionada",
                },
                {
                  key: "productNews",
                  label: "Novidades do produto",
                  hint: "Lançamentos e melhorias da Paylytics",
                },
              ].map((opt) => {
                const k = opt.key as keyof typeof notify;
                return (
                  <div
                    key={opt.key}
                    className="flex items-center justify-between rounded-xl border border-border bg-background-elevated/40 p-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{opt.label}</p>
                      <p className="text-xs text-foreground-subtle">{opt.hint}</p>
                    </div>
                    <Toggle
                      checked={notify[k]}
                      onChange={(v) => setNotify((n) => ({ ...n, [k]: v }))}
                    />
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {tab === "security" && (
          <Card>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>Proteja sua conta com camadas adicionais.</CardDescription>
            <div className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="newPassword">Nova senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<Lock className="h-4 w-4" />}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm">Confirmar senha</Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="••••••••"
                  leftIcon={<Lock className="h-4 w-4" />}
                />
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border bg-background-elevated/40 p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Autenticação em duas etapas (2FA)
                  </p>
                  <p className="text-xs text-foreground-subtle">
                    Adiciona um código gerado pelo app autenticador.
                  </p>
                </div>
                <Toggle checked />
              </div>
              <div className="flex justify-end">
                <Button>Atualizar senha</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function Toggle({
  checked: controlled,
  onChange,
}: {
  checked?: boolean;
  onChange?: (v: boolean) => void;
}) {
  const [internal, setInternal] = useState(false);
  const value = controlled ?? internal;
  function toggle() {
    const next = !value;
    onChange ? onChange(next) : setInternal(next);
  }
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={toggle}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition focus-ring",
        value
          ? "border-brand-500/30 bg-brand-500"
          : "border-border bg-white/[0.06]",
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white shadow transition",
          value ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}
