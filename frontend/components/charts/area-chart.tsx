"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatCompact, formatCurrency } from "@/lib/utils";
import type { RevenuePoint } from "@/types";

interface RevenueAreaChartProps {
  data: RevenuePoint[];
  showVolume?: boolean;
}

export function RevenueAreaChart({ data, showVolume = true }: RevenueAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b63f5" stopOpacity={0.55} />
            <stop offset="100%" stopColor="#3b63f5" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
          </linearGradient>
        </defs>
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
          minTickGap={32}
        />
        <YAxis
          stroke="#5a6478"
          fontSize={11}
          tickFormatter={(value) => formatCompact(Number(value))}
          tickLine={false}
          axisLine={false}
          width={56}
        />
        <Tooltip
          cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }}
          contentStyle={{
            background: "rgba(15, 21, 37, 0.96)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            fontSize: 12,
            color: "#e8ecf4",
            boxShadow: "0 8px 32px -12px rgba(0,0,0,0.6)",
          }}
          labelFormatter={(label) =>
            format(new Date(label), "dd MMM yyyy", { locale: ptBR })
          }
          formatter={(value: number, name) => [
            formatCurrency(value),
            name === "revenue" ? "Receita" : "Volume",
          ]}
        />
        {showVolume && (
          <Area
            type="monotone"
            dataKey="volume"
            stroke="#06b6d4"
            strokeWidth={2}
            fill="url(#volumeGradient)"
          />
        )}
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#3b63f5"
          strokeWidth={2}
          fill="url(#revenueGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
