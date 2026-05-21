"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, CheckCircle2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { loginSchema, type LoginInput } from "@/lib/auth-schemas";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Credenciais inválidas");
      }
      router.replace(next);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao entrar";
      setServerError(message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="voce@empresa.com"
          autoComplete="email"
          leftIcon={<Mail className="h-4 w-4" />}
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-danger">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Senha</Label>
          <Link href="#" className="text-xs text-brand-300 hover:text-brand-200">
            Esqueci minha senha
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          leftIcon={<Lock className="h-4 w-4" />}
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-danger">{errors.password.message}</p>
        )}
      </div>

      {serverError && (
        <div className="flex items-start gap-2 rounded-xl border border-danger/20 bg-danger-soft p-3 text-xs text-danger">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {isSubmitSuccessful && !serverError && (
        <div className="flex items-center gap-2 rounded-xl border border-success/20 bg-success-soft p-3 text-xs text-success">
          <CheckCircle2 className="h-4 w-4" />
          Redirecionando para o dashboard…
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        loading={isSubmitting}
        icon={<ArrowRight className="h-4 w-4" />}
        iconPosition="right"
      >
        Entrar
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="w-full glass-panel p-8 animate-slide-up">
      <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo de volta</h1>
      <p className="mt-1 text-sm text-foreground-muted">
        Entre com sua conta para acessar o dashboard.
      </p>

      <Suspense fallback={<div className="mt-6 h-64" />}>
        <LoginForm />
      </Suspense>

      <p className="mt-6 text-center text-sm text-foreground-muted">
        Ainda não tem conta?{" "}
        <Link href="/signup" className="font-medium text-brand-300 hover:text-brand-200">
          Criar conta
        </Link>
      </p>

      <div className="mt-6 rounded-xl border border-border bg-background-elevated/40 p-3 text-xs text-foreground-subtle">
        <p className="font-medium text-foreground-muted">Demo</p>
        <p className="mt-1 leading-relaxed">
          Use <code className="text-brand-300">muriloalvim16@gmail.com</code> /{" "}
          <code className="text-brand-300">Demo1234</code> ou crie uma conta nova.
        </p>
      </div>
    </div>
  );
}
