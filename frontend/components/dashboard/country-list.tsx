import { formatCurrency } from "@/lib/utils";
import type { CountryShare } from "@/types";

export function CountryList({ countries }: { countries: CountryShare[] }) {
  const max = Math.max(...countries.map((c) => c.revenue), 1);
  return (
    <ul className="space-y-3">
      {countries.map((c) => (
        <li key={c.code}>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-base leading-none">{c.flag}</span>
              <span className="text-foreground">{c.country}</span>
            </div>
            <span className="tabular-nums text-foreground font-medium">
              {formatCurrency(c.revenue)}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-foreground/[0.04]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-info"
              style={{ width: `${(c.revenue / max) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-foreground-subtle">
            {c.transactions.toLocaleString("pt-BR")} transações aprovadas
          </p>
        </li>
      ))}
    </ul>
  );
}
