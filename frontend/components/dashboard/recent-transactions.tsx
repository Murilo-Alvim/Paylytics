import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import type { Transaction } from "@/types";

export function RecentTransactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <Card className="p-0">
      <div className="flex items-center justify-between p-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Transações recentes</h3>
          <p className="text-xs text-foreground-subtle">Atualizadas em tempo real</p>
        </div>
        <Link
          href="/transactions"
          className="inline-flex items-center gap-1 text-xs font-medium text-brand-300 hover:text-brand-200"
        >
          Ver todas
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <Table>
        <THead>
          <TR className="hover:bg-transparent">
            <TH>Cliente</TH>
            <TH>Valor</TH>
            <TH>Status</TH>
            <TH className="hidden sm:table-cell">Método</TH>
            <TH className="hidden md:table-cell">Data</TH>
          </TR>
        </THead>
        <TBody>
          {transactions.map((t) => (
            <TR key={t.id}>
              <TD>
                <div className="flex items-center gap-3">
                  <Avatar name={t.customerName} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {t.customerName}
                    </p>
                    <p className="truncate text-xs text-foreground-subtle">
                      {t.customerEmail}
                    </p>
                  </div>
                </div>
              </TD>
              <TD className="font-medium tabular-nums text-foreground">
                {formatCurrency(t.amount, t.currency)}
              </TD>
              <TD>
                <StatusBadge status={t.status} />
              </TD>
              <TD className="hidden text-xs text-foreground-muted sm:table-cell">
                {t.paymentMethod.replace("_", " ")}
              </TD>
              <TD className="hidden whitespace-nowrap text-xs text-foreground-muted md:table-cell">
                {format(new Date(t.createdAt), "dd MMM, HH:mm", { locale: ptBR })}
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </Card>
  );
}
