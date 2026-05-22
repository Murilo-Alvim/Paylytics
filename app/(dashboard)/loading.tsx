"use client";

import { useEffect, useState } from "react";

const STAGES = [
  "Conectando ao gateway de pagamentos",
  "Sincronizando transações em tempo real",
  "Calculando KPIs e agregações",
  "Renderizando visualizações",
];

export default function DashboardLoading() {
  const [stage, setStage] = useState(0);
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    setLatency(Math.floor(Math.random() * 90 + 40));
    const id = setInterval(() => {
      setStage((s) => (s + 1) % STAGES.length);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center gap-7 overflow-hidden px-4">
      <div
        aria-hidden
        className="loading-orbit pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl"
      />

      <div className="relative">
        <div className="relative inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-br from-brand-500 to-info text-white shadow-glow">
          <svg
            viewBox="0 0 32 32"
            width="44"
            height="44"
            fill="none"
            aria-hidden
          >
            <rect
              className="loading-bar"
              x="7"
              y="18"
              width="4"
              height="8"
              rx="1"
              fill="white"
              fillOpacity="0.75"
            />
            <rect
              className="loading-bar delay-1"
              x="14"
              y="13"
              width="4"
              height="13"
              rx="1"
              fill="white"
              fillOpacity="0.9"
            />
            <rect
              className="loading-bar delay-2"
              x="21"
              y="8"
              width="4"
              height="18"
              rx="1"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-gradient sm:text-3xl">
          Paylytics
        </h2>
        <p
          key={stage}
          className="mt-2 h-5 text-sm text-foreground-muted animate-fade-in"
        >
          {STAGES[stage]}…
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-border bg-background-surface/60 px-3 py-1.5 font-mono text-[11px] text-foreground-subtle backdrop-blur">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
        </span>
        <span>
          stream ativo · {latency ?? "—"}
          <span className="text-foreground-subtle/60">ms</span>
        </span>
      </div>
    </div>
  );
}
