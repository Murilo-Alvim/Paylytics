import { NextResponse } from "next/server";
import { getAllTransactions } from "@/lib/data/transactions";
import { getCurrentUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

function escapeCsv(value: unknown): string {
  if (value == null) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await getAllTransactions();
    const header = [
      "ID",
      "Cliente",
      "Email",
      "País",
      "Método",
      "Bandeira",
      "Status",
      "Moeda",
      "Valor",
      "Descrição",
      "Data",
    ];
    const rows = items.map((t) => [
      t.id,
      t.customerName,
      t.customerEmail,
      t.country,
      t.paymentMethod,
      t.cardBrand ?? "",
      t.status,
      t.currency,
      t.amount,
      t.description ?? "",
      t.createdAt,
    ]);
    const csv =
      "﻿" +
      [header, ...rows]
        .map((row) => row.map(escapeCsv).join(","))
        .join("\n");
    const filename = `paylytics-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("[GET /api/transactions/export]", err);
    return NextResponse.json(
      { message: "Erro ao exportar transações" },
      { status: 500 },
    );
  }
}
