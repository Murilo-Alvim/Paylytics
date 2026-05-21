"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCompact, formatCurrency } from "@/lib/utils";

interface MonthlyTrendsChartProps {
  data: { month: string; revenue: number; expenses: number; profit: number }[];
}

export function MonthlyTrendsChart({ data }: MonthlyTrendsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis
          dataKey="month"
          stroke="#5a6478"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#5a6478"
          fontSize={11}
          tickFormatter={(v) => formatCompact(Number(v))}
          tickLine={false}
          axisLine={false}
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
          formatter={(value: number) => formatCurrency(value)}
        />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 12, color: "#8b94a8", paddingTop: 12 }}
        />
        <Bar dataKey="revenue" name="Receita" fill="#3b63f5" radius={[4, 4, 0, 0]} maxBarSize={28} />
        <Bar dataKey="expenses" name="Custos" fill="#475569" radius={[4, 4, 0, 0]} maxBarSize={28} />
        <Line
          type="monotone"
          dataKey="profit"
          name="Lucro"
          stroke="#10b981"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#10b981" }}
          activeDot={{ r: 5 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
