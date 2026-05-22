import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingNav } from "@/components/landing/landing-nav";

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-fade"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-brand-glow"
      />

      <LandingNav />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 lg:px-6 lg:pt-32">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* HERO */}
          <section className="relative overflow-hidden rounded-3xl border border-border bg-background-surface/60 p-8 backdrop-blur-xl md:col-span-2 lg:col-span-2 lg:row-span-2 lg:p-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
              v2.0 · Insights por IA disponíveis
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              <span className="text-gradient">Real-time analytics</span>
              <br />
              para o seu fluxo de pagamentos.
            </h1>
            <p className="mt-5 max-w-lg text-base text-foreground-muted sm:text-lg">
              Conecte gateways, bancos e adquirentes em um único painel
              de operação financeira — feito para times fintech modernos.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/signup">
                <Button
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                >
                  Começar gratuitamente
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="secondary">
                  Já tenho conta
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-xs text-foreground-subtle">
              Sem cartão · Setup em &lt; 10 minutos
            </p>
            <div
              aria-hidden
              className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl"
            />
          </section>

          {/* LIVE CHART PREVIEW */}
          <section
            id="dashboard"
            className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/15 via-background-surface to-background-surface p-6 md:col-span-2 lg:col-span-2 lg:row-span-2 lg:p-8"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-foreground-subtle">
                  Volume últimas 24h
                </p>
                <p className="mt-2 text-3xl font-semibold tabular-nums text-foreground sm:text-4xl">
                  R$ <span className="text-gradient">535.110</span>
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 text-[11px] font-medium text-brand-200">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-400" />
                </span>
                tempo real
              </span>
            </div>

            <div className="mt-6">
              <svg
                viewBox="0 0 400 140"
                preserveAspectRatio="none"
                className="h-32 w-full sm:h-40"
                aria-hidden
              >
                <defs>
                  <linearGradient id="area-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b63f5" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#3b63f5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 100 L 40 90 L 80 95 L 120 60 L 160 72 L 200 50 L 240 58 L 280 35 L 320 48 L 360 28 L 400 22 L 400 140 L 0 140 Z"
                  fill="url(#area-fill)"
                />
                <path
                  d="M 0 100 L 40 90 L 80 95 L 120 60 L 160 72 L 200 50 L 240 58 L 280 35 L 320 48 L 360 28 L 400 22"
                  stroke="#5a87ff"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="400" cy="22" r="4" fill="#5a87ff">
                  <animate
                    attributeName="opacity"
                    values="0.3;1;0.3"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-4 text-xs text-foreground-subtle">
              <div>
                <span className="block text-base font-semibold tabular-nums text-foreground">
                  12.3k
                </span>
                transações
              </div>
              <div>
                <span className="block text-base font-semibold tabular-nums text-foreground">
                  94.2%
                </span>
                aprovação
              </div>
              <div>
                <span className="block text-base font-semibold tabular-nums text-foreground">
                  142ms
                </span>
                latência p95
              </div>
            </div>
          </section>

          {/* APPROVAL KPI */}
          <section className="group rounded-3xl border border-border bg-background-surface/60 p-6 backdrop-blur-xl transition hover:border-border-strong">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium uppercase tracking-wider text-foreground-subtle">
                Aprovação
              </p>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-success/30 bg-success-soft text-success">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold tabular-nums text-foreground">
              94.2%
            </p>
            <p className="mt-1 text-xs text-success">+1.8pp vs. setor</p>
          </section>

          {/* PIX KPI */}
          <section className="group rounded-3xl border border-border bg-background-surface/60 p-6 backdrop-blur-xl transition hover:border-border-strong">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium uppercase tracking-wider text-foreground-subtle">
                PIX em alta
              </p>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-info/30 bg-info-soft text-info">
                <Zap className="h-3.5 w-3.5" />
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold tabular-nums text-info">
              +23%
            </p>
            <p className="mt-1 text-xs text-foreground-subtle">
              crescimento 14d
            </p>
          </section>

          {/* AI INSIGHTS */}
          <section
            id="features"
            className="relative overflow-hidden rounded-3xl border border-info/20 bg-gradient-to-br from-info/10 via-background-surface to-background-surface p-6 md:col-span-2"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-info/30 bg-info/10 text-info">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Insights gerados por IA
            </h3>
            <p className="mt-1.5 text-sm text-foreground-muted">
              Recomendações acionáveis baseadas em padrões reais da sua base —
              não é só dashboard, é diagnóstico.
            </p>
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-background/40 p-3">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-info" />
              <p className="text-xs leading-relaxed text-foreground-muted">
                <span className="font-medium text-info">Insight detectado:</span>{" "}
                chargebacks caíram 8.4% após o ajuste das regras 3DS na semana
                passada. Considere expandir para cartões internacionais.
              </p>
            </div>
          </section>

          {/* ANTIFRAUDE */}
          <section className="rounded-3xl border border-border bg-background-surface/60 p-6 backdrop-blur-xl md:col-span-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-success/30 bg-success/10 text-success">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Antifraude integrado
            </h3>
            <p className="mt-1.5 text-sm text-foreground-muted">
              Regras dinâmicas, scoring de risco e bloqueio automático para
              transações suspeitas — sem precisar codar.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4">
              <div>
                <p className="text-xl font-semibold tabular-nums text-foreground">
                  62M+
                </p>
                <p className="text-xs text-foreground-subtle">transações/mês</p>
              </div>
              <div>
                <p className="text-xl font-semibold tabular-nums text-foreground">
                  99.99%
                </p>
                <p className="text-xs text-foreground-subtle">uptime SLA</p>
              </div>
            </div>
          </section>

          {/* MULTI-PAÍS */}
          <section
            id="metrics"
            className="rounded-3xl border border-border bg-background-surface/60 p-6 backdrop-blur-xl md:col-span-2"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-warning/30 bg-warning/10 text-warning">
              <Globe2 className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              30+ mercados, 4 moedas nativas
            </h3>
            <p className="mt-1.5 text-sm text-foreground-muted">
              Conciliação automática e relatórios consolidados em BRL, USD,
              EUR e GBP — sem planilhas paralelas.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-1.5 text-2xl">
              <span>🇧🇷</span>
              <span>🇺🇸</span>
              <span>🇵🇹</span>
              <span>🇲🇽</span>
              <span>🇪🇸</span>
              <span>🇩🇪</span>
              <span>🇯🇵</span>
              <span>🇬🇧</span>
              <span>🇦🇷</span>
              <span>🇨🇦</span>
              <span className="ml-1 rounded-full border border-border bg-background-elevated/60 px-2 py-0.5 font-mono text-[11px] text-foreground-subtle">
                +20
              </span>
            </div>
          </section>

          {/* CTA */}
          <section
            id="cta"
            className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/15 via-background-surface to-background-surface p-10 text-center md:col-span-2 lg:col-span-4 lg:p-14"
          >
            <div
              aria-hidden
              className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-brand-500/30 blur-3xl"
            />
            <h2 className="relative text-2xl font-semibold tracking-tight sm:text-3xl">
              Pronto para enxergar seu fluxo financeiro{" "}
              <span className="text-gradient">com clareza?</span>
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-sm text-foreground-muted">
              Crie sua conta em menos de 1 minuto e veja seus pagamentos em
              tempo real.
            </p>
            <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/signup">
                <Button
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                >
                  Criar conta grátis
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Entrar
                </Button>
              </Link>
            </div>
          </section>
        </div>

        <footer className="mt-16">
          <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-foreground-subtle sm:flex-row">
            <p>
              © {new Date().getFullYear()} Paylytics — Todos os direitos
              reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground">
                Privacidade
              </a>
              <a href="#" className="hover:text-foreground">
                Termos
              </a>
              <a href="#" className="hover:text-foreground">
                Status
              </a>
              <a href="#" className="hover:text-foreground">
                Contato
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
