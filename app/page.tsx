import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  Layers,
  LineChart,
  Lock,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Webhook,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingNav } from "@/components/landing/landing-nav";
import { SectionNav } from "@/components/landing/section-nav";

const TRUSTED_BY = ["Nuvi", "Capital Pay", "Lume Fintech", "Onda", "Praia", "Stark"];

const LIVE_STATS = [
  { value: "R$ 8.4B", label: "processados", helper: "últimos 12 meses" },
  { value: "62M+", label: "transações/mês", helper: "média rolling" },
  { value: "94.2%", label: "taxa de aprovação", helper: "4.2pp acima do setor" },
  { value: "99.99%", label: "uptime SLA", helper: "janela mensal" },
];

const SMALL_FEATURES = [
  {
    icon: Webhook,
    title: "Webhooks resilientes",
    description: "Retries exponenciais, assinatura HMAC e dead-letter queue nativa.",
  },
  {
    icon: Lock,
    title: "Compliance pronto",
    description: "Logs auditáveis, PCI-DSS Level 1 e LGPD em todo o pipeline.",
  },
  {
    icon: Layers,
    title: "API-first",
    description: "OpenAPI 3.1, SDKs em TypeScript, Go e Python, e sandbox dedicado.",
  },
  {
    icon: LineChart,
    title: "Conciliação automática",
    description: "Match contra extratos bancários com IA de reconciliação contábil.",
  },
  {
    icon: BarChart3,
    title: "Relatórios programáveis",
    description: "Agende exports CSV/Excel/PDF e envie por e-mail ou S3.",
  },
  {
    icon: ShieldCheck,
    title: "Antifraude integrado",
    description: "Scoring de risco, regras dinâmicas e bloqueio em tempo real.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Conecte seus gateways",
    description:
      "Integração via OAuth ou API key com Stripe, Pagar.me, Cielo, Adyen e mais. Sincronização inicial em até 5 minutos.",
  },
  {
    n: "02",
    title: "Monitore em tempo real",
    description:
      "KPIs, gráficos e alertas atualizando ao vivo conforme as transações chegam. Sem refresh manual.",
  },
  {
    n: "03",
    title: "Otimize com insights",
    description:
      "A IA analisa padrões da sua base e sugere ajustes acionáveis: regras antifraude, 3DS, novos métodos.",
  },
];

export default function LandingPage() {
  return (
    <div id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-fade"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] bg-brand-glow"
      />

      <LandingNav />
      <SectionNav />

      <main>
        {/* HERO */}
        <section className="relative mx-auto max-w-7xl px-4 pt-28 pb-20 text-center lg:px-6 lg:pt-36 lg:pb-28">
          {/* Animated background orbs */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="orb-a absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-brand-500/25 blur-3xl" />
            <div className="orb-b absolute right-[4%] top-[2%] h-80 w-80 rounded-full bg-info/20 blur-3xl" />
            <div className="orb-c absolute left-[42%] top-[55%] h-64 w-64 rounded-full bg-brand-400/15 blur-3xl" />
          </div>

          {/* Floating live stat pills (lg+) */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-32 hidden lg:block">
            <div className="relative mx-auto max-w-6xl">
              <div className="float-a absolute left-2 top-6 flex items-center gap-2 rounded-2xl border border-border bg-background-surface/85 px-3 py-2 backdrop-blur shadow-card">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                <span className="font-mono text-xs text-foreground-muted">
                  +R$ 12.4k · <span className="text-success">aprovada</span>
                </span>
              </div>

              <div className="float-b absolute right-4 top-2 flex items-center gap-2 rounded-2xl border border-info/30 bg-background-surface/85 px-3 py-2 backdrop-blur shadow-card">
                <Zap className="h-3.5 w-3.5 text-info" />
                <span className="font-mono text-xs text-foreground-muted">
                  PIX <span className="font-semibold text-info">+23%</span>
                </span>
              </div>

              <div className="float-c absolute right-8 top-44 flex items-center gap-2 rounded-2xl border border-success/30 bg-background-surface/85 px-3 py-2 backdrop-blur shadow-card">
                <TrendingUp className="h-3.5 w-3.5 text-success" />
                <span className="font-mono text-xs text-foreground-muted">
                  aprovação <span className="font-semibold text-foreground">94.2%</span>
                </span>
              </div>

              <div className="float-a absolute left-6 top-52 flex items-center gap-2 rounded-2xl border border-brand-500/30 bg-background-surface/85 px-3 py-2 backdrop-blur shadow-card">
                <Sparkles className="h-3.5 w-3.5 text-brand-300" />
                <span className="font-mono text-xs text-foreground-muted">
                  insight detectado
                </span>
              </div>
            </div>
          </div>

          <span
            className="animate-slide-up inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1.5 text-xs font-medium text-brand-200 backdrop-blur"
            style={{ animationFillMode: "both" }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-400" />
            </span>
            v2.0 · Insights por IA agora disponíveis
          </span>

          <h1
            className="animate-slide-up mx-auto mt-7 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl"
            style={{ animationDelay: "100ms", animationFillMode: "both" }}
          >
            <span className="hero-grad-text">Real-time analytics</span>
            <br />
            para o seu fluxo de pagamentos.
          </h1>

          <p
            className="animate-slide-up mx-auto mt-6 max-w-2xl text-base text-foreground-muted sm:text-lg"
            style={{ animationDelay: "200ms", animationFillMode: "both" }}
          >
            Paylytics conecta gateways, bancos e adquirentes em um único painel
            de operação financeira — feito para times fintech que precisam
            decidir rápido, sem planilhas paralelas.
          </p>

          <div
            className="animate-slide-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "300ms", animationFillMode: "both" }}
          >
            <Link href="/signup">
              <Button
                size="lg"
                className="cta-glow"
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

          <p
            className="animate-slide-up mt-5 text-xs text-foreground-subtle"
            style={{ animationDelay: "400ms", animationFillMode: "both" }}
          >
            Sem cartão · Setup em &lt; 10 minutos
          </p>

          {/* Hero visual: dashboard preview mockup */}
          <div className="relative mx-auto mt-16 max-w-6xl lg:mt-20">
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-b from-brand-500/20 via-info/10 to-transparent blur-2xl"
            />
            <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-background-surface/80 backdrop-blur-xl shadow-card">
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 border-b border-border bg-background-elevated/60 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
                <div className="ml-4 hidden flex-1 rounded-md border border-border bg-background/40 px-3 py-1 text-[11px] text-foreground-subtle md:block">
                  paylytics.app/dashboard
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-3 lg:p-7">
                {/* KPIs row */}
                <div className="lg:col-span-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { l: "Volume", v: "R$ 535k", t: "+12.4%", up: true },
                    { l: "Aprovação", v: "94.2%", t: "+1.8pp", up: true },
                    { l: "Hoje", v: "1.247", t: "vs ontem", up: true },
                    { l: "Chargebacks", v: "0.18%", t: "-8.4%", up: false },
                  ].map((k) => (
                    <div
                      key={k.l}
                      className="rounded-2xl border border-border bg-background-elevated/40 p-4"
                    >
                      <p className="text-[10px] font-medium uppercase tracking-wider text-foreground-subtle">
                        {k.l}
                      </p>
                      <p className="mt-2 text-xl font-semibold tabular-nums text-foreground">
                        {k.v}
                      </p>
                      <p
                        className={`mt-1 text-[11px] ${k.up ? "text-success" : "text-danger"}`}
                      >
                        {k.up ? "↑" : "↓"} {k.t}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chart area */}
                <div className="lg:col-span-2 rounded-2xl border border-border bg-background-elevated/40 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground-subtle">
                      Volume últimas 24h
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-2 py-0.5 text-[10px] font-medium text-brand-200">
                      <span className="h-1 w-1 animate-pulse rounded-full bg-brand-400" />
                      live
                    </span>
                  </div>
                  <svg
                    viewBox="0 0 400 130"
                    preserveAspectRatio="none"
                    className="mt-4 h-32 w-full"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="hero-fill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#3b63f5" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3b63f5" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 95 L 30 80 L 60 88 L 100 55 L 140 65 L 180 45 L 220 52 L 260 30 L 300 42 L 340 22 L 380 25 L 400 15 L 400 130 L 0 130 Z"
                      fill="url(#hero-fill)"
                    />
                    <path
                      d="M 0 95 L 30 80 L 60 88 L 100 55 L 140 65 L 180 45 L 220 52 L 260 30 L 300 42 L 340 22 L 380 25 L 400 15"
                      stroke="#5a87ff"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="400" cy="15" r="3.5" fill="#5a87ff">
                      <animate
                        attributeName="opacity"
                        values="0.3;1;0.3"
                        dur="1.6s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </div>

                {/* Recent transactions */}
                <div className="rounded-2xl border border-border bg-background-elevated/40 p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-foreground-subtle">
                    Recent
                  </p>
                  <ul className="mt-3 space-y-2.5 text-xs">
                    {[
                      { c: "Mariana O.", v: "R$ 1.240", s: "success", m: "PIX" },
                      { c: "Lucas A.", v: "R$ 320", s: "success", m: "Cartão" },
                      { c: "Beatriz S.", v: "R$ 89", s: "warning", m: "Boleto" },
                      { c: "Rafael C.", v: "R$ 2.180", s: "success", m: "PIX" },
                    ].map((t, i) => (
                      <li key={i} className="flex items-center justify-between">
                        <div>
                          <p className="text-foreground">{t.c}</p>
                          <p className="text-[10px] text-foreground-subtle">{t.m}</p>
                        </div>
                        <div className="text-right">
                          <p className="tabular-nums text-foreground">{t.v}</p>
                          <p
                            className={`text-[10px] ${
                              t.s === "success" ? "text-success" : "text-warning"
                            }`}
                          >
                            {t.s === "success" ? "aprovada" : "pendente"}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED BY */}
        <section className="border-y border-border bg-background-surface/30 py-10 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <p className="text-center text-xs font-medium uppercase tracking-widest text-foreground-subtle">
              Usado por times de operação em fintechs
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-base font-medium text-foreground-muted sm:gap-x-14">
              {TRUSTED_BY.map((name) => (
                <span
                  key={name}
                  className="opacity-70 transition hover:opacity-100"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* LIVE STATS */}
        <section id="metrics" className="mx-auto max-w-7xl px-4 py-24 lg:px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-brand-300">
              Tração da plataforma
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Números reais, atualizados em tempo real.
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
            {LIVE_STATS.map((s) => (
              <div
                key={s.label}
                className="bg-background-surface/80 p-8 text-center backdrop-blur"
              >
                <p className="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {s.label}
                </p>
                <p className="mt-1 text-xs text-foreground-subtle">{s.helper}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURE 1 — Real-time monitoring */}
        <section
          id="dashboard"
          className="mx-auto max-w-7xl px-4 py-24 lg:px-6"
        >
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-300">
                <Zap className="h-3 w-3" />
                Monitoramento ao vivo
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                Veja cada transação <span className="text-gradient">no instante</span>{" "}
                em que acontece.
              </h2>
              <p className="mt-4 text-foreground-muted">
                Streams via SSE com latência menor que 200ms entre o gateway e
                o seu dashboard. KPIs, gráficos e alertas se atualizam sem
                refresh — você reage antes do problema escalar.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Latência p95 < 200ms entre gateway e UI",
                  "Atualização incremental sem flicker de re-render",
                  "Alertas em Slack/Discord quando KPI sai do trilho",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-foreground-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual: live chart card */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-3xl bg-brand-500/15 blur-3xl"
              />
              <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-background-surface/80 p-6 backdrop-blur-xl shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground-subtle">
                      Volume processado
                    </p>
                    <p className="mt-2 text-3xl font-semibold tabular-nums text-foreground">
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
                <svg
                  viewBox="0 0 400 140"
                  preserveAspectRatio="none"
                  className="mt-6 h-36 w-full"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="f1-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#3b63f5" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3b63f5" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 100 L 40 90 L 80 95 L 120 60 L 160 72 L 200 50 L 240 58 L 280 35 L 320 48 L 360 28 L 400 22 L 400 140 L 0 140 Z"
                    fill="url(#f1-fill)"
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
                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-xs text-foreground-subtle">
                  <div>
                    <span className="block text-sm font-semibold tabular-nums text-foreground">
                      12.3k
                    </span>
                    transações
                  </div>
                  <div>
                    <span className="block text-sm font-semibold tabular-nums text-foreground">
                      94.2%
                    </span>
                    aprovação
                  </div>
                  <div>
                    <span className="block text-sm font-semibold tabular-nums text-foreground">
                      142ms
                    </span>
                    latência p95
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE 2 — AI Insights (reversed layout) */}
        <section id="insights" className="mx-auto max-w-7xl px-4 py-24 lg:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Visual first on lg */}
            <div className="relative lg:order-1">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-3xl bg-info/15 blur-3xl"
              />
              <div className="relative space-y-3 rounded-3xl border border-info/20 bg-gradient-to-br from-info/10 via-background-surface to-background-surface p-6 backdrop-blur-xl shadow-card">
                {[
                  {
                    metric: "+23%",
                    title: "PIX cresceu 23% nas últimas 2 semanas",
                    body: "Considere expandir a campanha de cashback PIX para o segmento corporate.",
                    tone: "positive",
                  },
                  {
                    metric: "-8.4%",
                    title: "Chargebacks caíram após ajuste 3DS",
                    body: "Regra de challenge dinâmico está bloqueando 92% das tentativas suspeitas sem fricção desnecessária.",
                    tone: "positive",
                  },
                  {
                    metric: "+11%",
                    title: "Pico de recusas em cartões emitidos nos EUA",
                    body: "Sugerimos revisar threshold de score para BINs internacionais.",
                    tone: "negative",
                  },
                ].map((i) => (
                  <div
                    key={i.title}
                    className="rounded-2xl border border-border bg-background/40 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-info/10 text-info">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                          i.tone === "positive"
                            ? "border-success/20 bg-success-soft text-success"
                            : "border-danger/20 bg-danger-soft text-danger"
                        }`}
                      >
                        {i.metric}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {i.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground-muted">
                      {i.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:order-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-info/30 bg-info/10 px-2.5 py-1 text-xs font-medium text-info">
                <Sparkles className="h-3 w-3" />
                Insights por IA
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                Não é só dashboard.{" "}
                <span className="text-gradient">É diagnóstico.</span>
              </h2>
              <p className="mt-4 text-foreground-muted">
                Nossa engine analisa os padrões da sua base e gera
                recomendações acionáveis — você lê uma frase e sabe
                exatamente o que ajustar.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Detecção automática de anomalias em métricas-chave",
                  "Sugestões de ramp-up por método de pagamento",
                  "Alertas preditivos antes de chargebacks acontecerem",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-foreground-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FEATURE 3 — Multi-país */}
        <section id="global" className="mx-auto max-w-7xl px-4 py-24 lg:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning">
                <Globe2 className="h-3 w-3" />
                Operação global
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                30+ mercados,{" "}
                <span className="text-gradient">4 moedas nativas</span>,
                conciliação sem planilha.
              </h2>
              <p className="mt-4 text-foreground-muted">
                BRL, USD, EUR e GBP com conversão FX automática usando taxa do
                dia da operação. Relatórios consolidados em qualquer moeda
                que o seu CFO precisar.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Conversão FX automática com taxa do dia",
                  "Reconciliação multi-moeda em um clique",
                  "Compliance local (LGPD, GDPR, PCI-DSS)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-foreground-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-3xl bg-warning/10 blur-3xl"
              />
              <div className="relative rounded-3xl border border-border-strong bg-background-surface/80 p-6 backdrop-blur-xl shadow-card">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { flag: "🇧🇷", code: "BR", currency: "BRL" },
                    { flag: "🇺🇸", code: "US", currency: "USD" },
                    { flag: "🇵🇹", code: "PT", currency: "EUR" },
                    { flag: "🇲🇽", code: "MX", currency: "MXN" },
                    { flag: "🇪🇸", code: "ES", currency: "EUR" },
                    { flag: "🇩🇪", code: "DE", currency: "EUR" },
                    { flag: "🇯🇵", code: "JP", currency: "JPY" },
                    { flag: "🇬🇧", code: "GB", currency: "GBP" },
                    { flag: "🇦🇷", code: "AR", currency: "ARS" },
                  ].map((c) => (
                    <div
                      key={c.code}
                      className="rounded-xl border border-border bg-background-elevated/40 p-3 text-center"
                    >
                      <div className="text-2xl leading-none">{c.flag}</div>
                      <div className="mt-2 text-xs font-medium text-foreground">
                        {c.code}
                      </div>
                      <div className="text-[10px] font-mono text-foreground-subtle">
                        {c.currency}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-foreground-subtle">
                  <span>+ 21 mercados adicionais</span>
                  <span className="font-mono">USD/BRL · 5.42</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SMALL FEATURES GRID */}
        <section id="features" className="mx-auto max-w-7xl px-4 py-24 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-brand-300">
              Recursos
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Tudo que sua operação precisa, sem stack-Frankenstein.
            </h2>
            <p className="mt-4 text-foreground-muted">
              Consolidamos o que hoje vive em planilhas, dashboards isolados,
              exports manuais e ferramentas pontuais — em uma única plataforma.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SMALL_FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-border bg-background-surface/60 p-6 backdrop-blur transition hover:-translate-y-0.5 hover:border-border-strong hover:shadow-card"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-strong bg-gradient-to-br from-brand-500/20 to-info/10 text-brand-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="steps" className="mx-auto max-w-7xl px-4 py-24 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-brand-300">
              Como funciona
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Três passos. Menos de 10 minutos.
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="relative rounded-2xl border border-border bg-background-surface/60 p-7 backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl font-semibold text-gradient">
                    {s.n}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="hidden h-px flex-1 bg-gradient-to-r from-border to-transparent md:block" />
                  )}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="cta" className="mx-auto max-w-7xl px-4 pb-24 lg:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/15 via-background-surface to-background-surface p-10 text-center sm:p-16">
            <div
              aria-hidden
              className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/30 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 right-0 h-60 w-60 rounded-full bg-info/20 blur-3xl"
            />
            <span className="relative inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-300">
              <ArrowUpRight className="h-3 w-3" />
              Pronto pra começar
            </span>
            <h2 className="relative mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Enxergue seu fluxo financeiro{" "}
              <span className="text-gradient">com clareza.</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-foreground-muted">
              Crie sua conta em menos de 1 minuto. Sem cartão, sem fricção.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
          </div>
        </section>

        {/* BACK TO TOP */}
        <section className="border-t border-border bg-background-surface/30 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-12 text-center lg:px-6">
            <a href="#top" className="inline-block">
              <Button
                variant="secondary"
                size="lg"
                icon={<ArrowUp className="h-4 w-4" />}
              >
                Voltar ao topo
              </Button>
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-xs text-foreground-subtle sm:flex-row lg:px-6">
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
