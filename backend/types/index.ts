export type TransactionStatus = "APPROVED" | "PENDING" | "FAILED" | "REFUNDED";

export type PaymentMethod =
  | "CREDIT_CARD"
  | "DEBIT_CARD"
  | "PIX"
  | "BOLETO"
  | "BANK_TRANSFER"
  | "WALLET";

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  customerName: string;
  customerEmail: string;
  country: string;
  cardBrand?: string;
  description?: string;
  createdAt: string;
}

export interface Kpi {
  label: string;
  value: string;
  delta: number;
  trend: "up" | "down" | "flat";
  helper?: string;
}

export interface RevenuePoint {
  date: string;
  revenue: number;
  volume: number;
}

export interface ApprovalPoint {
  date: string;
  approved: number;
  failed: number;
  pending: number;
  refunded: number;
}

export interface PaymentMethodShare {
  method: PaymentMethod;
  label: string;
  value: number;
  share: number;
}

export interface CountryShare {
  country: string;
  code: string;
  flag: string;
  revenue: number;
  transactions: number;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  tone: "positive" | "negative" | "neutral";
  metric?: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
}
