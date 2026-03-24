import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: { value: string; positive: boolean };
  subtitle?: string;
}

export function StatCard({ label, value, icon: Icon, trend, subtitle }: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {Icon && (
          <div className="rounded-md bg-muted p-1.5">
            <Icon className="h-4 w-4 text-dimmed-foreground" />
          </div>
        )}
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">{value}</p>
      <div className="mt-1 flex items-center gap-2">
        {trend && (
          <span
            className={`text-xs font-medium ${
              trend.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {trend.positive ? '+' : ''}{trend.value}
          </span>
        )}
        {subtitle && <span className="text-xs text-dimmed-foreground">{subtitle}</span>}
      </div>
    </div>
  );
}
