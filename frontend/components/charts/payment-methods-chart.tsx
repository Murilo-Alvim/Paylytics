"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "@/lib/utils";
import type { PaymentMethodShare } from "@/types";

const PALETTE = ["#3b63f5", "#06b6d4", "#10b981", "#f59e0b", "#a855f7", "#ef4444"];

export function PaymentMethodsChart({ data }: { data: PaymentMethodShare[] }) {
  return (
    <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr,1fr]">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Tooltip
            contentStyle={{
              background: "rgba(15, 21, 37, 0.96)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              fontSize: 12,
              color: "#e8ecf4",
            }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius={62}
            outerRadius={96}
            paddingAngle={3}
            stroke="rgba(5,7,13,0.8)"
            strokeWidth={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <ul className="space-y-3">
        {data.map((item, i) => (
          <li
            key={item.method}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ background: PALETTE[i % PALETTE.length] }}
              />
              <span className="truncate text-foreground">{item.label}</span>
            </div>
            <div className="flex items-baseline gap-2 shrink-0">
              <span className="text-foreground-muted text-xs tabular-nums">
                {item.share.toFixed(1)}%
              </span>
              <span className="text-foreground font-medium tabular-nums">
                {formatCurrency(item.value)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
