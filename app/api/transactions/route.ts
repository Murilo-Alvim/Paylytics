import { NextResponse } from "next/server";
import { getTransactions } from "@/lib/data/transactions";
import type { PaymentMethod, TransactionStatus } from "@/types";

const VALID_STATUS = new Set<TransactionStatus>([
  "APPROVED",
  "PENDING",
  "FAILED",
  "REFUNDED",
]);
const VALID_METHODS = new Set<PaymentMethod>([
  "CREDIT_CARD",
  "DEBIT_CARD",
  "PIX",
  "BOLETO",
  "BANK_TRANSFER",
  "WALLET",
]);

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as TransactionStatus | null;
  const method = searchParams.get("method") as PaymentMethod | null;
  const query = searchParams.get("q") ?? undefined;
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = Math.min(
    100,
    Math.max(1, Number(searchParams.get("pageSize") ?? "20")),
  );

  try {
    const result = await getTransactions({
      status: status && VALID_STATUS.has(status) ? status : null,
      method: method && VALID_METHODS.has(method) ? method : null,
      query,
      page,
      pageSize,
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error("[GET /api/transactions]", err);
    return NextResponse.json(
      { message: "Erro ao buscar transações" },
      { status: 500 },
    );
  }
}
