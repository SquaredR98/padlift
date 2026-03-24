import { Lock } from 'lucide-react';
import Link from 'next/link';

export function PlanGate({
  allowed,
  feature,
  children,
}: {
  allowed: boolean;
  feature: string;
  children?: React.ReactNode;
}) {
  if (allowed) return children ?? null;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-amber-400">
      <Lock className="h-4 w-4 shrink-0" />
      <span>{feature} requires an upgrade.</span>
      <Link
        href="/dashboard/settings"
        className="ml-auto shrink-0 font-medium underline"
      >
        Upgrade
      </Link>
    </div>
  );
}

export function PlanLimitIndicator({
  label,
  current,
  max,
}: {
  label: string;
  current: number;
  max: number;
}) {
  const atLimit = current >= max;
  const nearLimit = current >= max * 0.8;

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-muted-foreground">
        {label}: {current} / {max >= 999999 ? '\u221e' : max}
      </span>
      {atLimit && (
        <Link
          href="/dashboard/settings"
          className="text-amber-400 underline"
        >
          Upgrade
        </Link>
      )}
      {!atLimit && nearLimit && (
        <span className="text-amber-400">Almost full</span>
      )}
    </div>
  );
}
