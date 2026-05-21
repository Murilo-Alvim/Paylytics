import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-fade"
      />
      <Logo className="mb-8" />
      <p className="text-xs font-medium uppercase tracking-widest text-brand-300">
        Erro 404
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
        Página não encontrada
      </h1>
      <p className="mt-3 max-w-md text-sm text-foreground-muted">
        Não conseguimos encontrar a página que você procura. Verifique o endereço
        ou volte para o dashboard.
      </p>
      <Link href="/dashboard" className="mt-6">
        <Button icon={<ArrowLeft className="h-4 w-4" />}>Voltar ao dashboard</Button>
      </Link>
    </div>
  );
}
