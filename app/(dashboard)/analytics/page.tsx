import { Sparkles } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { PeriodFilter } from "@/components/analytics/period-filter";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { InsightCard } from "@/components/dashboard/insight-card";
import { CountryList } from "@/components/dashboard/country-list";
import { RevenueAreaChart } from "@/components/charts/area-chart";
import { MonthlyTrendsChart } from "@/components/charts/monthly-trends-chart";
import { ApprovalChart } from "@/components/charts/approval-chart";
import { PaymentMethodsChart } from "@/components/charts/payment-methods-chart";
import { getDashboardData } from "@/lib/data/dashboard";

export const metadata = { title: "Analytics" };
export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const data = await getDashboardData();
  const analyticalKpis = data.kpis.slice(0, 4);

  return (
    <>
      <PageHeader
        title="Analytics"
        description="Tendências, comparações e indicadores avançados de performance."
        actions={<PeriodFilter />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {analyticalKpis.map((k) => (
          <KpiCard key={k.label} kpi={k} />
        ))}
      </div>

      {/* Hero insight banner */}
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/15 via-background-surface to-background-surface p-6">
        <div className="absolute -top-12 right-0 h-40 w-40 rounded-full bg-brand-500/30 blur-3xl" aria-hidden />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-300">
            <Sparkles className="h-3 w-3" />
            Insight do mês
          </span>
          <h2 className="mt-3 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Você processou <span className="text-gradient">18% mais transações</span> neste mês.
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-foreground-muted">
            O crescimento foi puxado por PIX (+23%) e por uma redução de 8.4% em chargebacks
            após o ajuste das regras antifraude na semana passada.
          </p>
        </div>
      </div>

      {/* Trends */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle>Tendências mensais</CardTitle>
          <CardDescription>
            Comparação entre receita, custos operacionais e lucro líquido.
          </CardDescription>
          <div className="mt-4">
            <MonthlyTrendsChart data={data.monthlyTrends} />
          </div>
        </Card>
        <Card>
          <CardTitle>Crescimento por país</CardTitle>
          <CardDescription>Top mercados por receita aprovada.</CardDescription>
          <div className="mt-5">
            <CountryList countries={data.countryShare} />
          </div>
        </Card>
      </div>

      {/* Performance */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle>Receita vs. Volume</CardTitle>
          <CardDescription>
            Evolução combinada do volume processado e da receita líquida.
          </CardDescription>
          <div className="mt-4">
            <RevenueAreaChart data={data.revenueSeries} />
          </div>
        </Card>
        <Card>
          <CardTitle>Métodos de pagamento</CardTitle>
          <CardDescription>Share da receita por instrumento.</CardDescription>
          <div className="mt-4">
            <PaymentMethodsChart data={data.paymentMethodShare} />
          </div>
        </Card>
      </div>

      {/* Approval breakdown */}
      <Card className="mt-6">
        <CardTitle>Aprovação por dia</CardTitle>
        <CardDescription>Distribuição diária de status nos últimos 14 dias.</CardDescription>
        <div className="mt-4">
          <ApprovalChart data={data.approvalSeries} />
        </div>
      </Card>

      {/* Insights */}
      <h2 className="mt-10 text-sm font-medium uppercase tracking-wider text-foreground-subtle">
        Insights automáticos
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </>
  );
}
