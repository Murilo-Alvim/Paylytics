"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import type { PaymentMethod, Transaction, TransactionStatus } from "@/types";

interface TransactionsTableProps {
  transactions: Transaction[];
}

const PAGE_SIZE = 10;

const METHOD_LABEL: Record<PaymentMethod, string> = {
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  PIX: "PIX",
  BOLETO: "Boleto",
  BANK_TRANSFER: "Transferência",
  WALLET: "Carteira Digital",
};

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<TransactionStatus | "ALL">("ALL");
  const [method, setMethod] = useState<PaymentMethod | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return transactions.filter((t) => {
      if (status !== "ALL" && t.status !== status) return false;
      if (method !== "ALL" && t.paymentMethod !== method) return false;
      if (!q) return true;
      return (
        t.customerName.toLowerCase().includes(q) ||
        t.customerEmail.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.country.toLowerCase().includes(q)
      );
    });
  }, [transactions, query, status, method]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  function onFilterChange<T,>(setter: (value: T) => void, value: T) {
    setter(value);
    setPage(1);
  }

  return (
    <Card className="p-0">
      <div className="flex flex-col gap-3 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <Input
          placeholder="Buscar por cliente, e-mail, ID ou país…"
          leftIcon={<Search className="h-4 w-4" />}
          value={query}
          onChange={(e) => onFilterChange(setQuery, e.target.value)}
          className="lg:max-w-sm"
        />
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={status}
            onChange={(e) => onFilterChange(setStatus, e.target.value as typeof status)}
            className="min-w-0 flex-1 sm:w-40 sm:flex-none"
          >
            <option value="ALL">Todos status</option>
            <option value="APPROVED">Aprovadas</option>
            <option value="PENDING">Pendentes</option>
            <option value="FAILED">Recusadas</option>
            <option value="REFUNDED">Reembolsadas</option>
          </Select>
          <Select
            value={method}
            onChange={(e) => onFilterChange(setMethod, e.target.value as typeof method)}
            className="min-w-0 flex-1 sm:w-48 sm:flex-none"
          >
            <option value="ALL">Todos métodos</option>
            {(Object.keys(METHOD_LABEL) as PaymentMethod[]).map((m) => (
              <option key={m} value={m}>
                {METHOD_LABEL[m]}
              </option>
            ))}
          </Select>
          <a href="/api/transactions/export" download>
            <Button size="md" icon={<Download className="h-4 w-4" />}>
              Exportar
            </Button>
          </a>
        </div>
      </div>

      <Table>
        <THead>
          <TR className="hover:bg-transparent">
            <TH className="hidden sm:table-cell">Transaction ID</TH>
            <TH>Cliente</TH>
            <TH>Valor</TH>
            <TH className="hidden sm:table-cell">Método</TH>
            <TH>Status</TH>
            <TH className="hidden md:table-cell">País</TH>
            <TH className="hidden md:table-cell">Data</TH>
          </TR>
        </THead>
        <TBody>
          {loading && (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <TR key={`sk-${i}`}>
                  {Array.from({ length: 7 }).map((__, j) => (
                    <TD key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TD>
                  ))}
                </TR>
              ))}
            </>
          )}

          {!loading && pageItems.length === 0 && (
            <TR>
              <TD colSpan={7} className="py-12 text-center text-foreground-subtle sm:py-16">
                Nenhuma transação encontrada com esses filtros.
              </TD>
            </TR>
          )}

          {!loading &&
            pageItems.map((t) => (
              <TR key={t.id}>
                <TD className="hidden sm:table-cell">
                  <span className="font-mono text-xs text-foreground-muted">
                    {t.id}
                  </span>
                </TD>
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
                <TD className="hidden sm:table-cell">
                  <span className="text-xs text-foreground-muted">
                    {METHOD_LABEL[t.paymentMethod]}
                    {t.cardBrand && (
                      <span className="ml-1 text-foreground-subtle">· {t.cardBrand}</span>
                    )}
                  </span>
                </TD>
                <TD>
                  <StatusBadge status={t.status} />
                </TD>
                <TD className="hidden text-xs text-foreground-muted md:table-cell">
                  {t.country}
                </TD>
                <TD className="hidden whitespace-nowrap text-xs text-foreground-muted md:table-cell">
                  {format(new Date(t.createdAt), "dd MMM yyyy, HH:mm", { locale: ptBR })}
                </TD>
              </TR>
            ))}
        </TBody>
      </Table>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-border p-4 sm:flex-row">
        <p className="text-xs text-foreground-subtle">
          Mostrando{" "}
          <span className="text-foreground">{Math.min((safePage - 1) * PAGE_SIZE + 1, filtered.length)}</span>
          –
          <span className="text-foreground">
            {Math.min(safePage * PAGE_SIZE, filtered.length)}
          </span>{" "}
          de <span className="text-foreground">{filtered.length}</span> transações
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={safePage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            icon={<ChevronLeft className="h-3.5 w-3.5" />}
          >
            Anterior
          </Button>
          <span className="text-xs text-foreground-muted tabular-nums">
            Página {safePage} de {totalPages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={safePage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            icon={<ChevronRight className="h-3.5 w-3.5" />}
            iconPosition="right"
          >
            Próxima
          </Button>
        </div>
      </div>
    </Card>
  );
}
