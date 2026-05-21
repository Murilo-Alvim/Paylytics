import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { getAllTransactions } from "@/lib/data/transactions";
import { getCurrentUser } from "@/lib/auth/session";
import type { PaymentMethod, TransactionStatus } from "@/types";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<TransactionStatus, string> = {
  APPROVED: "Aprovada",
  PENDING: "Pendente",
  FAILED: "Recusada",
  REFUNDED: "Reembolsada",
};

const METHOD_LABEL: Record<PaymentMethod, string> = {
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  PIX: "PIX",
  BOLETO: "Boleto",
  BANK_TRANSFER: "Transferência",
  WALLET: "Carteira Digital",
};

const STATUS_COLOR: Record<TransactionStatus, string> = {
  APPROVED: "FF065F46",
  PENDING: "FF92400E",
  FAILED: "FF991B1B",
  REFUNDED: "FF155E75",
};

const STATUS_BG: Record<TransactionStatus, string> = {
  APPROVED: "FFD1FAE5",
  PENDING: "FFFEF3C7",
  FAILED: "FFFEE2E2",
  REFUNDED: "FFCFFAFE",
};

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await getAllTransactions();

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Paylytics";
    workbook.created = new Date();

    const sheet = workbook.addWorksheet("Transações", {
      properties: { defaultRowHeight: 22 },
      views: [{ state: "frozen", ySplit: 1 }],
    });

    sheet.columns = [
      { header: "Transaction ID", key: "id", width: 28 },
      { header: "Cliente", key: "customerName", width: 26 },
      { header: "E-mail", key: "customerEmail", width: 34 },
      { header: "País", key: "country", width: 18 },
      { header: "Método", key: "paymentMethod", width: 20 },
      { header: "Bandeira", key: "cardBrand", width: 14 },
      { header: "Status", key: "status", width: 16 },
      { header: "Moeda", key: "currency", width: 10 },
      { header: "Valor", key: "amount", width: 16, style: { numFmt: '#,##0.00' } },
      { header: "Descrição", key: "description", width: 28 },
      { header: "Data", key: "createdAt", width: 22, style: { numFmt: "dd/mm/yyyy hh:mm" } },
    ];

    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1F2937" },
    };
    headerRow.alignment = { vertical: "middle", horizontal: "left" };
    headerRow.height = 28;
    headerRow.eachCell((cell) => {
      cell.border = {
        bottom: { style: "medium", color: { argb: "FF111827" } },
      };
    });

    for (const t of items) {
      const row = sheet.addRow({
        id: t.id,
        customerName: t.customerName,
        customerEmail: t.customerEmail,
        country: t.country,
        paymentMethod: METHOD_LABEL[t.paymentMethod],
        cardBrand: t.cardBrand ?? "",
        status: STATUS_LABEL[t.status],
        currency: t.currency,
        amount: Number(t.amount),
        description: t.description ?? "",
        createdAt: new Date(t.createdAt),
      });

      const statusCell = row.getCell("status");
      statusCell.font = { bold: true, color: { argb: STATUS_COLOR[t.status] } };
      statusCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: STATUS_BG[t.status] },
      };
      statusCell.alignment = { vertical: "middle", horizontal: "center" };

      row.getCell("amount").alignment = { horizontal: "right" };
      row.getCell("id").font = { name: "Consolas", size: 10, color: { argb: "FF6B7280" } };
      row.alignment = { vertical: "middle" };
    }

    sheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: sheet.columnCount },
    };

    const buffer = await workbook.xlsx.writeBuffer();
    const filename = `paylytics-transactions-${new Date().toISOString().slice(0, 10)}.xlsx`;

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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
