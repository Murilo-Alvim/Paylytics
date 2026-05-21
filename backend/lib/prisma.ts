import { PrismaClient } from "@prisma/client";

const TRANSIENT_ERROR_PATTERN =
  /Closed|terminated|timeout|ECONNREFUSED|ETIMEDOUT|ENOTFOUND|reset/i;

function isTransientError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const message = String((err as { message?: string }).message ?? "");
  return TRANSIENT_ERROR_PATTERN.test(message);
}

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (!isTransientError(err)) throw err;
    await new Promise((r) => setTimeout(r, 600));
    return fn();
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
  return client.$extends({
    query: {
      $allOperations: ({ args, query }) => withRetry(() => query(args)),
    },
  }) as unknown as PrismaClient;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
