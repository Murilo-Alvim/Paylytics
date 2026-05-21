"use client";

import { ArrowUpRight } from "lucide-react";
import { RevenueAreaChart } from "@/components/charts/area-chart";
import { MOCK_REVENUE_SERIES } from "@/lib/mock-data";

export function DashboardPreview() {
  return (
    <div className="relative mx-auto mt-16 w-full max-w-6xl px-4">
      <div className="absolute inset-x-12 -top-12 h-40 rounded-full bg-brand-500/30 blur-3xl" aria-hidden />
      <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-background-surface shadow-[0_40px_120px_-30px_rgba(59,99,245,0.4)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-background-muted/60 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-danger/60" />
          <span className="h-3 w-3 rounded-full bg-warning/60" />
          <span className="h-3 w-3 rounded-full bg-success/60" />
          <div className="mx-auto rounded-md border border-border bg-background-surface/50 px-3 py-0.5 text-xs text-foreground-subtle">
            app.paylytics.io / dashboard
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 p-4 sm:p-6">
          {/* Mini KPIs */}
          <div className="col-span-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "Volume", value: "R$ 4.2M", delta: "+12.4%" },
              { label: "Aprovação", value: "94.2%", delta: "+1.8%" },
              { label: "Receita", value: "R$ 612K", delta: "+18.2%" },
              { label: "Hoje", value: "1.284", delta: "-3.1%" },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-border bg-background-elevated/60 p-3"
              >
                <p className="text-[10px] uppercase tracking-wider text-foreground-subtle">
                  {m.label}
                </p>
                <div className="mt-1 flex items-baseline justify-between gap-1">
                  <span className="text-base font-semibold text-foreground">{m.value}</span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-success">
                    <ArrowUpRight className="h-2.5 w-2.5" />
                    {m.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Chart */}
          <div className="col-span-12 rounded-xl border border-border bg-background-elevated/40 p-4 lg:col-span-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-foreground">Volume transacional</h3>
                <p className="text-xs text-foreground-subtle">Últimos 30 dias</p>
              </div>
              <span className="rounded-md border border-brand-500/20 bg-brand-500/10 px-2 py-0.5 text-[10px] font-medium text-brand-300">
                Tempo real
              </span>
            </div>
            <div className="mt-3 -mx-2">
              <RevenueAreaChart data={MOCK_REVENUE_SERIES.slice(-20)} />
            </div>
          </div>
          {/* Side */}
          <div className="col-span-12 space-y-3 lg:col-span-4">
            <div className="rounded-xl border border-border bg-background-elevated/40 p-4">
              <p className="text-xs font-medium text-foreground-muted">Top métodos</p>
              <ul className="mt-3 space-y-2.5 text-xs">
                {[
                  { name: "Cartão de Crédito", value: "42%", color: "#3b63f5" },
                  { name: "PIX", value: "31%", color: "#06b6d4" },
                  { name: "Débito", value: "12%", color: "#10b981" },
                  { name: "Boleto", value: "6%", color: "#f59e0b" },
                ].map((m) => (
                  <li key={m.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-foreground-muted">
                      <span className="h-2 w-2 rounded-full" style={{ background: m.color }} />
                      {m.name}
                    </span>
                    <span className="text-foreground font-medium tabular-nums">{m.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 to-info/5 p-4">
              <p className="text-xs font-medium text-brand-300">Insight gerado por IA</p>
              <p className="mt-1.5 text-sm text-foreground leading-relaxed">
                Você processou <span className="font-semibold">18% mais transações</span> este mês.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
