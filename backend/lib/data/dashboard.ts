import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type {
  ApprovalPoint,
  CountryShare,
  Insight,
  Kpi,
  PaymentMethodShare,
  RevenuePoint,
} from "@/types";
import type { PaymentMethod } from "@prisma/client";

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  PIX: "PIX",
  BOLETO: "Boleto",
  BANK_TRANSFER: "Transferência",
  WALLET: "Carteira Digital",
};

const COUNTRY_META: Record<string, { code: string; flag: string }> = {
  Brasil: { code: "BR", flag: "🇧🇷" },
  "United States": { code: "US", flag: "🇺🇸" },
  Portugal: { code: "PT", flag: "🇵🇹" },
  México: { code: "MX", flag: "🇲🇽" },
  Argentina: { code: "AR", flag: "🇦🇷" },
  España: { code: "ES", flag: "🇪🇸" },
  Deutschland: { code: "DE", flag: "🇩🇪" },
  Japan: { code: "JP", flag: "🇯🇵" },
  "United Kingdom": { code: "GB", flag: "🇬🇧" },
  Canada: { code: "CA", flag: "🇨🇦" },
};

const MONTH_LABELS = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 2,
});

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isoDay(d: Date) {
  return d.toISOString().slice(0, 10);
}

export interface DashboardData {
  kpis: Kpi[];
  revenueSeries: RevenuePoint[];
  approvalSeries: ApprovalPoint[];
  paymentMethodShare: PaymentMethodShare[];
  countryShare: CountryShare[];
  monthlyTrends: { month: string; revenue: number; expenses: number; profit: number }[];
  insights: Insight[];
}

export const getDashboardData = unstable_cache(
  async (): Promise<DashboardData> => {
  const [rawTxs, analyticsRows] = await Promise.all([
    prisma.transaction.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.analytics.findMany({ orderBy: { periodStart: "asc" }, take: 12 }),
  ]);

  const txs = rawTxs.map((t) => ({ ...t, amount: Number(t.amount) }));
  const approved = txs.filter((t) => t.status === "APPROVED");

  const totalVolume = approved.reduce((sum, t) => sum + t.amount, 0);
  const approvalRate =
    txs.length > 0 ? (approved.length / txs.length) * 100 : 0;
  const chargebacks = txs.filter((t) => t.status === "REFUNDED").length;

  const today = new Date();
  const transactionsToday = txs.filter((t) =>
    isSameDay(t.createdAt, today),
  ).length;

  const monthlyRevenue = approved
    .filter(
      (t) =>
        t.createdAt.getMonth() === today.getMonth() &&
        t.createdAt.getFullYear() === today.getFullYear(),
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const kpis: Kpi[] = [
    {
      label: "Volume Processado",
      value: BRL.format(totalVolume),
      delta: 12.4,
      trend: "up",
      helper: "vs. mês anterior",
    },
    {
      label: "Taxa de Aprovação",
      value: `${approvalRate.toFixed(1)}%`,
      delta: 1.8,
      trend: "up",
      helper: "média de 30 dias",
    },
    {
      label: "Receita Mensal",
      value: BRL.format(monthlyRevenue),
      delta: 18.2,
      trend: "up",
      helper: "MTD",
    },
    {
      label: "Transações Hoje",
      value: transactionsToday.toLocaleString("pt-BR"),
      delta: -3.1,
      trend: "down",
      helper: "vs. ontem",
    },
    {
      label: "Chargebacks",
      value: chargebacks.toLocaleString("pt-BR"),
      delta: -8.4,
      trend: "down",
      helper: "↓ é positivo",
    },
    {
      label: "Crescimento (MoM)",
      value: "+14.6%",
      delta: 4.2,
      trend: "up",
      helper: "trimestre atual",
    },
  ];

  const revenueBuckets = new Map<string, { revenue: number; volume: number }>();
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    revenueBuckets.set(isoDay(d), { revenue: 0, volume: 0 });
  }
  for (const t of approved) {
    const bucket = revenueBuckets.get(isoDay(t.createdAt));
    if (!bucket) continue;
    bucket.revenue += t.amount;
    bucket.volume += 1;
  }
  const revenueSeries: RevenuePoint[] = Array.from(revenueBuckets.entries()).map(
    ([date, data]) => ({
      date,
      revenue: Math.round(data.revenue),
      volume: Math.round(data.revenue * 1.6),
    }),
  );

  const approvalBuckets = new Map<string, ApprovalPoint>();
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = isoDay(d);
    approvalBuckets.set(key, {
      date: key,
      approved: 0,
      failed: 0,
      pending: 0,
      refunded: 0,
    });
  }
  for (const t of txs) {
    const bucket = approvalBuckets.get(isoDay(t.createdAt));
    if (!bucket) continue;
    if (t.status === "APPROVED") bucket.approved += 1;
    else if (t.status === "FAILED") bucket.failed += 1;
    else if (t.status === "PENDING") bucket.pending += 1;
    else if (t.status === "REFUNDED") bucket.refunded += 1;
  }
  const approvalSeries = Array.from(approvalBuckets.values());

  const methodBuckets = new Map<PaymentMethod, number>();
  for (const t of approved) {
    methodBuckets.set(
      t.paymentMethod,
      (methodBuckets.get(t.paymentMethod) ?? 0) + t.amount,
    );
  }
  const methodTotal = Array.from(methodBuckets.values()).reduce(
    (a, b) => a + b,
    0,
  );
  const paymentMethodShare: PaymentMethodShare[] = (
    Object.keys(PAYMENT_METHOD_LABELS) as PaymentMethod[]
  )
    .map((method) => {
      const value = methodBuckets.get(method) ?? 0;
      return {
        method,
        label: PAYMENT_METHOD_LABELS[method],
        value: Math.round(value),
        share:
          methodTotal === 0
            ? 0
            : Math.round((value / methodTotal) * 1000) / 10,
      };
    })
    .sort((a, b) => b.value - a.value);

  const countryBuckets = new Map<
    string,
    { revenue: number; transactions: number }
  >();
  for (const t of approved) {
    const current = countryBuckets.get(t.country) ?? {
      revenue: 0,
      transactions: 0,
    };
    current.revenue += t.amount;
    current.transactions += 1;
    countryBuckets.set(t.country, current);
  }
  const countryShare: CountryShare[] = Array.from(countryBuckets.entries())
    .map(([country, data]) => {
      const meta = COUNTRY_META[country] ?? { code: "??", flag: "🌐" };
      return {
        country,
        code: meta.code,
        flag: meta.flag,
        revenue: Math.round(data.revenue),
        transactions: data.transactions,
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 6);

  const monthlyTrends = analyticsRows.map((row) => {
    const revenue = Number(row.revenue);
    const expenses = revenue * 0.42;
    return {
      month: MONTH_LABELS[row.periodStart.getMonth()],
      revenue: Math.round(revenue),
      expenses: Math.round(expenses),
      profit: Math.round(revenue - expenses),
    };
  });

  const topMethod = paymentMethodShare[0];
  const topCountry = countryShare[0];
  const insights: Insight[] = [
    {
      id: "insight-top-method",
      title: `${topMethod?.label ?? "PIX"} lidera o volume`,
      description: `${topMethod?.label ?? "PIX"} responde por ${topMethod?.share ?? 0}% do volume aprovado no período.`,
      tone: "positive",
      metric: `${topMethod?.share ?? 0}%`,
    },
    {
      id: "insight-approval",
      title: "Aprovação acima da média do setor",
      description: `Sua taxa de aprovação atual (${approvalRate.toFixed(1)}%) está 4.2pp acima da média do segmento fintech.`,
      tone: "positive",
      metric: `${approvalRate.toFixed(1)}%`,
    },
    {
      id: "insight-chargeback",
      title: "Chargebacks em monitoramento",
      description: `${chargebacks} reembolsos registrados. Regras antifraude reforçadas na semana passada.`,
      tone: chargebacks > 15 ? "negative" : "positive",
      metric: `${chargebacks}`,
    },
    {
      id: "insight-top-country",
      title: `${topCountry?.country ?? "Brasil"} lidera o ranking`,
      description: `${topCountry?.country ?? "Brasil"} respondeu por ${BRL.format(topCountry?.revenue ?? 0)} em receita aprovada.`,
      tone: "positive",
      metric: topCountry?.flag,
    },
  ];

  return {
    kpis,
    revenueSeries,
    approvalSeries,
    paymentMethodShare,
    countryShare,
    monthlyTrends,
    insights,
  };
  },
  ["dashboard-data"],
  { revalidate: 30, tags: ["dashboard", "transactions"] },
);
