import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export function LandingNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
        <Link href="/" className="focus-ring rounded-md">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-foreground-muted hover:text-foreground">
            Recursos
          </a>
          <a href="#dashboard" className="text-sm text-foreground-muted hover:text-foreground">
            Dashboard
          </a>
          <a href="#metrics" className="text-sm text-foreground-muted hover:text-foreground">
            Métricas
          </a>
          <a href="#cta" className="text-sm text-foreground-muted hover:text-foreground">
            Começar
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Criar conta</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
