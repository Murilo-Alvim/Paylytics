import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Globe2,
  Layers,
  LineChart,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingNav } from "@/components/landing/landing-nav";
import { DashboardPreview } from "@/components/landing/dashboard-preview";

const FEATURES = [
  {
    icon: BarChart3,
    title: "Métricas em tempo real",
    description:
      "KPIs financeiros, taxa de aprovação e volume processado atualizando em tempo real com latência menor que 200ms.",
  },
  {
    icon: ShieldCheck,
    title: "Antifraude integrado",
    description:
      "Regras dinâmicas, scoring de risco e bloqueio automático para transações suspeitas.",
  },
  {
    icon: Sparkles,
    title: "Insights por IA",
    description:
      "Sugestões acionáveis baseadas em padrões da sua base — recomendações de ramp-up de PIX, ajustes 3DS e mais.",
  },
  {
    icon: Globe2,
    title: "Multi-país e multi-moeda",
    description:
      "BRL, USD, EUR e GBP nativos. Conciliação automática para mais de 30 mercados.",
  },
  {
    icon: Zap,
    title: "Webhooks ultrarrápidos",
    description:
      "Entregas com retry exponencial, assinatura HMAC e SLA de 99.99% em janelas mensais.",
  },
  {
    icon: Layers,
    title: "API-first",
    description:
      "Documentação OpenAPI completa, SDKs em TypeScript, Go e Python e sandbox dedicado.",
  },
];

const METRICS = [
  { label: "Volume processado", value: "R$ 8.4B" },
  { label: "Transações / mês", value: "62M+" },
  { label: "Taxa de aprovação", value: "94.2%" },
  { label: "Uptime SLA", value: "99.99%" },
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-fade"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-brand-glow"
      />

      <LandingNav />

      <main className="pt-24">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 pb-12 pt-12 text-center lg:px-6 lg:pt-20">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-background-surface/60 px-3 py-1 text-xs text-foreground-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
            v2.0 · Insights gerados por IA agora disponíveis
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">Real-time analytics</span>
            <br />
            para o seu fluxo de pagamentos.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-foreground-muted sm:text-lg">
            Paylytics é a plataforma SaaS que conecta gateways, bancos e adquirentes
            em um único dashboard de operação financeira — feito para times fintech modernos.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                Começar gratuitamente
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Já tenho conta
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-xs text-foreground-subtle">
            Sem cartão · Setup em &lt; 10 minutos
          </p>
        </section>

        {/* Dashboard preview */}
        <section id="dashboard">
          <DashboardPreview />
        </section>

        {/* Metrics */}
        <section id="metrics" className="mx-auto mt-24 max-w-7xl px-4 lg:px-6">
          <div className="glass-panel grid grid-cols-2 gap-6 p-8 sm:grid-cols-4">
            {METRICS.map((m) => (
              <div key={m.label} className="text-center sm:text-left">
                <p className="text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">
                  {m.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-foreground-subtle">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto mt-24 max-w-7xl px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-brand-300">
              Recursos
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Tudo que sua operação de pagamentos precisa.
            </h2>
            <p className="mt-4 text-foreground-muted">
              De observabilidade a conciliação automática, Paylytics consolida o que
              hoje vive em planilhas, dashboards isolados e exports manuais.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background-surface/60 p-6 transition hover:-translate-y-0.5 hover:border-border-strong hover:shadow-card"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-strong bg-gradient-to-br from-brand-500/20 to-info/10 text-brand-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="mx-auto mt-32 max-w-7xl px-4 lg:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/15 via-background-surface to-background-surface p-10 text-center sm:p-16">
            <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-brand-500/30 blur-3xl" aria-hidden />
            <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
              Pronto para enxergar seu fluxo financeiro com clareza?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-foreground-muted">
              Junte-se a centenas de times fintech que já usam Paylytics para
              tomar decisões mais rápidas, baseadas em dados confiáveis.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                  Criar conta grátis
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Entrar
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mx-auto mt-24 max-w-7xl px-4 pb-12 lg:px-6">
          <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-foreground-subtle sm:flex-row">
            <p>© {new Date().getFullYear()} Paylytics — Todos os direitos reservados.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground">Privacidade</a>
              <a href="#" className="hover:text-foreground">Termos</a>
              <a href="#" className="hover:text-foreground">Status</a>
              <a href="#" className="hover:text-foreground">Contato</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
