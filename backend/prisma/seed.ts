import { PrismaClient } from "@prisma/client";
import { generateTransactions } from "../lib/mock-data";
import { hashPassword } from "../lib/auth/password";

const prisma = new PrismaClient();

const DEMO_EMAIL = "muriloalvim16@gmail.com";
const DEMO_PASSWORD = "Demo1234";

async function main() {
  console.log("🌱  Seeding Paylytics database…");

  await prisma.transaction.deleteMany();
  await prisma.analytics.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: "Murilo Alvim",
      email: DEMO_EMAIL,
      password: await hashPassword(DEMO_PASSWORD),
      role: "admin",
    },
  });

  const transactions = generateTransactions(280);
  await prisma.transaction.createMany({
    data: transactions.map((t) => ({
      amount: t.amount,
      currency: t.currency,
      status: t.status,
      paymentMethod: t.paymentMethod,
      customerName: t.customerName,
      customerEmail: t.customerEmail,
      country: t.country,
      cardBrand: t.cardBrand,
      description: t.description,
      createdAt: new Date(t.createdAt),
    })),
  });

  const now = new Date();
  await prisma.analytics.createMany({
    data: Array.from({ length: 12 }).map((_, i) => {
      const periodEnd = new Date(now.getFullYear(), now.getMonth() - i, 0);
      const periodStart = new Date(periodEnd.getFullYear(), periodEnd.getMonth(), 1);
      return {
        periodStart,
        periodEnd,
        revenue: 180_000 + i * 12_500,
        approvalRate: 88 + (i % 4),
        chargebacks: 8 + (i % 6),
        processedVolume: 450_000 + i * 22_000,
        transactionCount: 1800 + i * 80,
      };
    }),
  });

  console.log(`✔  Seeded ${transactions.length} transactions and 12 analytics rows.`);
  console.log(`👤  Demo login: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
