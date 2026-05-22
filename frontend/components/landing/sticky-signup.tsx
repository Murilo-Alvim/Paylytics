"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StickySignupCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 800);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-40 transition-all duration-500 sm:bottom-6 sm:right-6",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-brand-500/40 bg-background-surface/90 p-2 pl-4 shadow-card backdrop-blur-xl">
        <div className="hidden sm:block">
          <p className="text-xs font-semibold text-foreground">
            Pronto pra ver seu fluxo em tempo real?
          </p>
          <p className="text-[11px] text-foreground-subtle">
            Conta grátis em menos de 1 minuto
          </p>
        </div>
        <Link href="/signup">
          <Button
            size="sm"
            className="cta-glow"
            icon={<ArrowRight className="h-3.5 w-3.5" />}
            iconPosition="right"
          >
            Criar conta
          </Button>
        </Link>
      </div>
    </div>
  );
}
