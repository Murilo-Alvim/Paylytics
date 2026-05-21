"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { ApprovalPoint } from "@/types";

const SERIES = [
  { key: "approved", label: "Aprovadas", color: "#10b981" },
  { key: "pending", label: "Pendentes", color: "#f59e0b" },
  { key: "failed", label: "Recusadas", color: "#ef4444" },
  { key: "refunded", label: "Reembolsadas", color: "#06b6d4" },
] as const;

export function ApprovalChart({ data }: { data: ApprovalPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={(value) =>
            format(new Date(value), "dd MMM", { locale: ptBR })
          }
          stroke="#5a6478"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          minTickGap={24}
        />
        <YAxis
          stroke="#5a6478"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          width={40}
        />
        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.03)" }}
          contentStyle={{
            background: "rgba(15, 21, 37, 0.96)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            fontSize: 12,
            color: "#e8ecf4",
          }}
          labelFormatter={(label) =>
            format(new Date(label), "dd MMM yyyy", { locale: ptBR })
          }
        />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 12, color: "#8b94a8", paddingTop: 12 }}
        />
        {SERIES.map((s) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label}
            stackId="approvals"
            fill={s.color}
            radius={[s === SERIES[0] ? 4 : 0, s === SERIES[0] ? 4 : 0, 0, 0]}
            maxBarSize={28}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
