import type {
  ApprovalPoint,
  CountryShare,
  Insight,
  Kpi,
  PaymentMethod,
  PaymentMethodShare,
  RevenuePoint,
  Transaction,
  TransactionStatus,
} from "@/types";

// Deterministic PRNG so the dashboard renders the same numbers on each load.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260520);
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rand() * arr.length)];
const between = (min: number, max: number) => min + rand() * (max - min);

const CUSTOMERS = [
  "Mariana Oliveira",
  "Lucas Almeida",
  "Beatriz Santos",
  "Rafael Costa",
  "Camila Ribeiro",
  "Felipe Carvalho",
  "Juliana Souza",
  "Gabriel Martins",
  "Larissa Pereira",
  "Thiago Fernandes",
  "Isabela Rocha",
  "Bruno Cardoso",
  "Aline Moreira",
  "Diego Barbosa",
  "Fernanda Lima",
  "Pedro Henrique",
  "Sophia Andrade",
  "Eduardo Pinto",
  "Natália Gomes",
  "Vinícius Araújo",
  "Helena Castro",
  "Igor Nogueira",
  "Patrícia Mendes",
  "Caio Vasconcelos",
  "Renata Teixeira",
  "Olivia Bennett",
  "James Carter",
  "Emma Whitaker",
  "Liam Robinson",
  "Sofia Müller",
  "Hiroshi Tanaka",
  "Aiko Yamamoto",
  "Mateo García",
  "Valentina Rossi",
  "Noah Andersen",
];

const COUNTRIES: ReadonlyArray<{ code: string; name: string; flag: string }> = [
  { code: "BR", name: "Brasil", flag: "🇧🇷" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "MX", name: "México", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "ES", name: "España", flag: "🇪🇸" },
  { code: "DE", name: "Deutschland", flag: "🇩🇪" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
];

const PAYMENT_METHODS: ReadonlyArray<{
  method: PaymentMethod;
  label: string;
  weight: number;
}> = [
  { method: "CREDIT_CARD", label: "Cartão de Crédito", weight: 0.42 },
  { method: "PIX", label: "PIX", weight: 0.31 },
  { method: "DEBIT_CARD", label: "Cartão de Débito", weight: 0.12 },
  { method: "BOLETO", label: "Boleto", weight: 0.06 },
  { method: "BANK_TRANSFER", label: "Transferência", weight: 0.05 },
  { method: "WALLET", label: "Carteira Digital", weight: 0.04 },
];

const CARD_BRANDS = ["Visa", "Mastercard", "Amex", "Elo", "Hipercard"];

const STATUS_WEIGHTS: ReadonlyArray<{
  status: TransactionStatus;
  weight: number;
}> = [
  { status: "APPROVED", weight: 0.82 },
  { status: "PENDING", weight: 0.08 },
  { status: "FAILED", weight: 0.07 },
  { status: "REFUNDED", weight: 0.03 },
];

const DESCRIPTIONS = [
  "Assinatura Premium",
  "Compra recorrente",
  "Plano Enterprise",
  "Upgrade de conta",
  "Renovação anual",
  "Add-on de relatórios",
  "Marketplace fee",
  "Subscription tier Pro",
  "Pacote de créditos",
  "Cobrança mensal",
];

function weightedPick<T extends { weight: number }>(items: readonly T[]): T {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let threshold = rand() * total;
  for (const item of items) {
    threshold -= item.weight;
    if (threshold <= 0) return item;
  }
  return items[items.length - 1];
}

function randomId() {
  return `tx_${Math.floor(rand() * 1e12).toString(36)}`;
}

function emailFor(name: string) {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.|\.$/g, "");
  const domains = ["gmail.com", "outlook.com", "hotmail.com", "proton.me", "icloud.com"];
  return `${slug}@${pick(domains)}`;
}

export function generateTransactions(count: number = 240): Transaction[] {
  const now = Date.now();
  const transactions: Transaction[] = [];

  for (let i = 0; i < count; i++) {
    const customer = pick(CUSTOMERS);
    const country = pick(COUNTRIES);
    const method = weightedPick(PAYMENT_METHODS);
    const status = weightedPick(STATUS_WEIGHTS);
    const amount = Number(between(18, 4800).toFixed(2));
    const daysAgo = rand() * 60;
    const date = new Date(now - daysAgo * 24 * 60 * 60 * 1000);

    transactions.push({
      id: randomId(),
      amount,
      currency: country.code === "BR" || country.code === "PT" ? "BRL" : "USD",
      status: status.status,
      paymentMethod: method.method,
      customerName: customer,
      customerEmail: emailFor(customer),
      country: country.name,
      cardBrand:
        method.method === "CREDIT_CARD" || method.method === "DEBIT_CARD"
          ? pick(CARD_BRANDS)
          : undefined,
      description: pick(DESCRIPTIONS),
      createdAt: date.toISOString(),
    });
  }

  return transactions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export const MOCK_TRANSACTIONS: Transaction[] = generateTransactions();

const totalVolume = MOCK_TRANSACTIONS.filter((t) => t.status === "APPROVED").reduce(
  (sum, t) => sum + t.amount,
  0,
);
const approvedCount = MOCK_TRANSACTIONS.filter((t) => t.status === "APPROVED").length;
const approvalRate = (approvedCount / MOCK_TRANSACTIONS.length) * 100;
const chargebacks = MOCK_TRANSACTIONS.filter((t) => t.status === "REFUNDED").length;

const today = new Date();
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const transactionsToday = MOCK_TRANSACTIONS.filter((t) =>
  isSameDay(new Date(t.createdAt), today),
).length;

const monthlyRevenue = MOCK_TRANSACTIONS.filter((t) => {
  const d = new Date(t.createdAt);
  return (
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear() &&
    t.status === "APPROVED"
  );
}).reduce((sum, t) => sum + t.amount, 0);

export const MOCK_KPIS: Kpi[] = [
  {
    label: "Volume Processado",
    value: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(totalVolume),
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
    value: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(monthlyRevenue),
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

export const MOCK_REVENUE_SERIES: RevenuePoint[] = (() => {
  const points: RevenuePoint[] = [];
  const days = 30;
  let baseline = 42000;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const drift = between(-3500, 5200);
    baseline = Math.max(28000, baseline + drift);
    const revenue = Math.round(baseline + between(-1200, 1200));
    const volume = Math.round(revenue * between(1.4, 1.9));
    points.push({
      date: d.toISOString().slice(0, 10),
      revenue,
      volume,
    });
  }
  return points;
})();

export const MOCK_APPROVAL_SERIES: ApprovalPoint[] = (() => {
  const points: ApprovalPoint[] = [];
  const days = 14;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const total = Math.floor(between(220, 360));
    const approved = Math.floor(total * between(0.78, 0.9));
    const failed = Math.floor((total - approved) * between(0.45, 0.7));
    const refunded = Math.floor((total - approved - failed) * between(0.3, 0.6));
    const pending = total - approved - failed - refunded;
    points.push({
      date: d.toISOString().slice(0, 10),
      approved,
      failed,
      pending: Math.max(pending, 0),
      refunded,
    });
  }
  return points;
})();

export const MOCK_PAYMENT_METHOD_SHARE: PaymentMethodShare[] = (() => {
  const buckets = new Map<PaymentMethod, number>();
  for (const t of MOCK_TRANSACTIONS) {
    if (t.status !== "APPROVED") continue;
    buckets.set(t.paymentMethod, (buckets.get(t.paymentMethod) ?? 0) + t.amount);
  }
  const total = Array.from(buckets.values()).reduce((sum, v) => sum + v, 0);
  return PAYMENT_METHODS.map(({ method, label }) => {
    const value = buckets.get(method) ?? 0;
    return {
      method,
      label,
      value: Math.round(value),
      share: total === 0 ? 0 : Math.round((value / total) * 1000) / 10,
    };
  }).sort((a, b) => b.value - a.value);
})();

export const MOCK_COUNTRY_SHARE: CountryShare[] = (() => {
  const buckets = new Map<string, { revenue: number; transactions: number; flag: string; code: string }>();
  for (const t of MOCK_TRANSACTIONS) {
    if (t.status !== "APPROVED") continue;
    const country = COUNTRIES.find((c) => c.name === t.country);
    if (!country) continue;
    const current = buckets.get(country.name) ?? {
      revenue: 0,
      transactions: 0,
      flag: country.flag,
      code: country.code,
    };
    current.revenue += t.amount;
    current.transactions += 1;
    buckets.set(country.name, current);
  }
  return Array.from(buckets.entries())
    .map(([country, data]) => ({
      country,
      code: data.code,
      flag: data.flag,
      revenue: Math.round(data.revenue),
      transactions: data.transactions,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 6);
})();

export const MOCK_INSIGHTS: Insight[] = [
  {
    id: "insight-volume",
    title: "Crescimento acelerado em PIX",
    description:
      "O volume processado via PIX cresceu 23% nas últimas duas semanas, indicando forte adoção entre clientes brasileiros.",
    tone: "positive",
    metric: "+23%",
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
    title: "Chargebacks em queda",
    description:
      "Os reembolsos diminuíram 8.4% após o ajuste das regras antifraude na semana passada.",
    tone: "positive",
    metric: "-8.4%",
  },
  {
    id: "insight-card-decline",
    title: "Aumento de recusas em cartão internacional",
    description:
      "Identificamos um pico de 11% em recusas para cartões emitidos nos EUA. Revisar regras 3DS.",
    tone: "negative",
    metric: "+11%",
  },
];

export const MOCK_MONTHLY_TRENDS = (() => {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return months.map((m, i) => ({
    month: m,
    revenue: Math.round(180000 + i * 12500 + between(-9000, 14000)),
    expenses: Math.round(80000 + i * 4200 + between(-3000, 5000)),
    profit: 0,
  })).map((row) => ({ ...row, profit: row.revenue - row.expenses }));
})();

