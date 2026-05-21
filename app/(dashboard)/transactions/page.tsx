import { PageHeader } from "@/components/layout/page-header";
import { TransactionsTable } from "@/components/transactions/transactions-table";
import { getAllTransactions } from "@/lib/data/transactions";

export const metadata = { title: "Transações" };
export const dynamic = "force-dynamic";

export default async function TransactionsPage() {
  const transactions = await getAllTransactions();

  return (
    <>
      <PageHeader
        title="Transações"
        description="Pesquise, filtre e acompanhe cada transação processada."
      />
      <TransactionsTable transactions={transactions} />
    </>
  );
}
