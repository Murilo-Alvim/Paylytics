"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { signupSchema, type SignupInput } from "@/lib/auth-schemas";

export default function SignupPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({ resolver: zodResolver(signupSchema) });

  async function onSubmit(values: SignupInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Falha ao criar a conta");
      }
      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao criar a conta";
      setServerError(message);
    }
  }

  return (
    <div className="w-full glass-panel p-8 animate-slide-up">
      <h1 className="text-2xl font-semibold tracking-tight">Criar sua conta</h1>
      <p className="mt-1 text-sm text-foreground-muted">
        Comece a monitorar seus pagamentos em minutos.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            placeholder="Maria Silva"
            autoComplete="name"
            leftIcon={<User className="h-4 w-4" />}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail corporativo</Label>
          <Input
            id="email"
            type="email"
            placeholder="voce@empresa.com"
            autoComplete="email"
            leftIcon={<Mail className="h-4 w-4" />}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-danger">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              leftIcon={<Lock className="h-4 w-4" />}
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-danger">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Confirmar</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              leftIcon={<Lock className="h-4 w-4" />}
              aria-invalid={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-danger">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {serverError && (
          <div className="flex items-start gap-2 rounded-xl border border-danger/20 bg-danger-soft p-3 text-xs text-danger">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          loading={isSubmitting}
          icon={<ArrowRight className="h-4 w-4" />}
          iconPosition="right"
        >
          Criar conta
        </Button>

        <p className="text-center text-[11px] text-foreground-subtle">
          Ao continuar, você aceita os{" "}
          <a href="#" className="underline hover:text-foreground-muted">Termos</a> e a{" "}
          <a href="#" className="underline hover:text-foreground-muted">Política de Privacidade</a>.
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-foreground-muted">
        Já tem uma conta?{" "}
        <Link href="/login" className="font-medium text-brand-300 hover:text-brand-200">
          Entrar
        </Link>
      </p>
    </div>
  );
}
