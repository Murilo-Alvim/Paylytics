import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { PaymentMethod, Transaction, TransactionStatus } from "@/types";
import type { Prisma, Transaction as DbTransaction } from "@prisma/client";

const CACHE_REVALIDATE_SECONDS = 30;
const CACHE_TAG = "transactions";

export interface TransactionsQuery {
  status?: TransactionStatus | null;
  method?: PaymentMethod | null;
  query?: string;
  page?: number;
  pageSize?: number;
}

export interface TransactionsResult {
  items: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

function mapTransaction(t: DbTransaction): Transaction {
  return {
    id: t.id,
    amount: Number(t.amount),
    currency: t.currency,
    status: t.status,
    paymentMethod: t.paymentMethod,
    customerName: t.customerName,
    customerEmail: t.customerEmail ?? "",
    country: t.country,
    cardBrand: t.cardBrand ?? undefined,
    description: t.description ?? undefined,
    createdAt: t.createdAt.toISOString(),
  };
}

export const getTransactions = unstable_cache(
  async (opts: TransactionsQuery = {}): Promise<TransactionsResult> => {
    const page = Math.max(1, opts.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, opts.pageSize ?? 20));
    const query = (opts.query ?? "").trim();

    const where: Prisma.TransactionWhereInput = {};
    if (opts.status) where.status = opts.status;
    if (opts.method) where.paymentMethod = opts.method;
    if (query) {
      where.OR = [
        { customerName: { contains: query, mode: "insensitive" } },
        { customerEmail: { contains: query, mode: "insensitive" } },
        { id: { contains: query, mode: "insensitive" } },
        { country: { contains: query, mode: "insensitive" } },
      ];
    }

    const [total, items] = await Promise.all([
      prisma.transaction.count({ where }),
      prisma.transaction.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return {
      items: items.map(mapTransaction),
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
  },
  ["transactions-list"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: [CACHE_TAG] },
);

export const getRecentTransactions = unstable_cache(
  async (limit = 6): Promise<Transaction[]> => {
    const items = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return items.map(mapTransaction);
  },
  ["transactions-recent"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: [CACHE_TAG] },
);

export const getAllTransactions = unstable_cache(
  async (): Promise<Transaction[]> => {
    const items = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
    });
    return items.map(mapTransaction);
  },
  ["transactions-all"],
  { revalidate: CACHE_REVALIDATE_SECONDS, tags: [CACHE_TAG] },
);
