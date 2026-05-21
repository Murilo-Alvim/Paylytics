import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { InsightCard } from "@/components/dashboard/insight-card";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { CountryList } from "@/components/dashboard/country-list";
import { RevenueAreaChart } from "@/components/charts/area-chart";
import { ApprovalChart } from "@/components/charts/approval-chart";
import { PaymentMethodsChart } from "@/components/charts/payment-methods-chart";
import { getDashboardData } from "@/lib/data/dashboard";
import { getRecentTransactions } from "@/lib/data/transactions";

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [data, recent] = await Promise.all([
    getDashboardData(),
    getRecentTransactions(6),
  ]);

  return (
    <>
      <PageHeader
        title="Visão geral"
        description="Acompanhe seus indicadores operacionais em tempo real."
        actions={
          <a href="/api/transactions/export" download>
            <Button size="sm" icon={<Download className="h-4 w-4" />}>
              Exportar
            </Button>
          </a>
        }
      />

      {/* KPI grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {data.kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            kpi={kpi}
            className="xl:col-span-2 [&:nth-child(n+5)]:xl:col-span-3"
          />
        ))}
      </div>

      {/* Charts row */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Volume transacional</CardTitle>
              <CardDescription>
                Receita e volume processado nos últimos 30 dias.
              </CardDescription>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-xs text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
              Tempo real
            </span>
          </div>
          <div className="mt-4">
            <RevenueAreaChart data={data.revenueSeries} />
          </div>
        </Card>

        <Card>
          <CardTitle>Métodos de pagamento</CardTitle>
          <CardDescription>Distribuição da receita aprovada por método.</CardDescription>
          <div className="mt-4">
            <PaymentMethodsChart data={data.paymentMethodShare} />
          </div>
        </Card>
      </div>

      {/* Second row */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle>Aprovação vs. Recusa</CardTitle>
          <CardDescription>
            Quebra diária por status de transação (últimos 14 dias).
          </CardDescription>
          <div className="mt-4">
            <ApprovalChart data={data.approvalSeries} />
          </div>
        </Card>
        <Card>
          <CardTitle>Top países</CardTitle>
          <CardDescription>Receita aprovada por país de origem.</CardDescription>
          <div className="mt-5">
            <CountryList countries={data.countryShare} />
          </div>
        </Card>
      </div>

      {/* Insights */}
      <h2 className="mt-10 text-sm font-medium uppercase tracking-wider text-foreground-subtle">
        Insights automáticos
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>

      {/* Recent transactions */}
      <div className="mt-8">
        <RecentTransactions transactions={recent} />
      </div>
    </>
  );
}
