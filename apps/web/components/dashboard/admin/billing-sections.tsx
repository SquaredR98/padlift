'use client';

import Link from 'next/link';
import { Badge } from '@/app/dashboard/components/ui/badge';

// ─── Revenue Breakdown ────────────────────────────────────────

const TIER_STYLES: Record<string, { border: string; bg: string; text: string; badge: string; sub: string }> = {
  FREE:     { border: 'border-border', bg: 'bg-card', text: 'text-foreground', badge: 'bg-muted text-muted-foreground', sub: 'text-dimmed-foreground' },
  LITE:     { border: 'border-green-200 dark:border-green-900/50', bg: 'bg-green-50 dark:bg-green-950/30', text: 'text-green-700 dark:text-green-300', badge: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300', sub: 'text-green-600/70 dark:text-green-400/70' },
  STARTER:  { border: 'border-cyan-200 dark:border-cyan-900/50', bg: 'bg-cyan-50 dark:bg-cyan-950/30', text: 'text-cyan-700 dark:text-cyan-300', badge: 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300', sub: 'text-cyan-600/70 dark:text-cyan-400/70' },
  PRO:      { border: 'border-blue-200 dark:border-blue-900/50', bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-700 dark:text-blue-300', badge: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300', sub: 'text-blue-600/70 dark:text-blue-400/70' },
  BUSINESS: { border: 'border-purple-200 dark:border-purple-900/50', bg: 'bg-purple-50 dark:bg-purple-950/30', text: 'text-purple-700 dark:text-purple-300', badge: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300', sub: 'text-purple-600/70 dark:text-purple-400/70' },
};

const TIER_ORDER = ['FREE', 'LITE', 'STARTER', 'PRO', 'BUSINESS'];
const TIER_LABELS: Record<string, string> = { FREE: 'Free', LITE: 'Lite', STARTER: 'Starter', PRO: 'Pro', BUSINESS: 'Business' };

export function RevenueBreakdown({ counts, tierMrr }: {
  counts: Record<string, number>; tierMrr: Record<string, number>;
}) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">Revenue Breakdown</h2>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {TIER_ORDER.map((tier) => {
          const s = TIER_STYLES[tier] ?? TIER_STYLES.FREE;
          const mrr = tierMrr[tier] ?? 0;
          const label = TIER_LABELS[tier] ?? tier;
          return (
            <div key={tier} className={`rounded-lg border ${s.border} ${s.bg} p-5`}>
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${s.text}`}>{label}</p>
                <span className={`rounded px-2 py-0.5 text-xs font-medium ${s.badge}`}>{counts[tier] ?? 0} users</span>
              </div>
              <p className={`mt-2 text-3xl font-bold ${s.text}`}>${mrr.toFixed(0)}</p>
              <p className={`mt-1 text-xs ${s.sub}`}>
                {tier === 'FREE' ? 'No revenue contribution' : `/month from ${label} tier`}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Subscriptions Table ──────────────────────────────────────

interface Subscription {
  id: string; email: string; name: string | null; plan: string;
  gumroadSubscriptionId: string | null;
  planExpiresAt: string | null; createdAt: string;
}

export function SubscriptionsTable({ subscriptions }: { subscriptions: Subscription[] }) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">Active Subscriptions ({subscriptions.length})</h2>
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-card/50">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">User</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Plan</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Subscription ID</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">Since</th>
              </tr>
            </thead>
            <tbody className="bg-card">
              {subscriptions.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-dimmed-foreground">No paid subscriptions yet</td></tr>
              ) : (
                subscriptions.map((sub) => {
                  const isExpired = sub.planExpiresAt && new Date(sub.planExpiresAt) < new Date();
                  return (
                    <tr key={sub.id} className="border-t border-border transition hover:bg-muted/50">
                      <td className="px-4 py-3">
                        <Link href={`/dashboard/admin/users/${sub.id}`} className="group">
                          <p className="font-medium text-foreground group-hover:underline">{sub.name || 'Unnamed'}</p>
                          <p className="text-xs text-dimmed-foreground">{sub.email}</p>
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={sub.plan === 'BUSINESS' ? 'purple' : sub.plan === 'PRO' ? 'info' : sub.plan === 'STARTER' ? 'info' : sub.plan === 'LITE' ? 'success' : 'default'}>{sub.plan}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-muted-foreground">{sub.gumroadSubscriptionId || '—'}</span>
                      </td>
                      <td className="px-4 py-3"><Badge variant={isExpired ? 'error' : 'success'} dot>{isExpired ? 'Expired' : 'Active'}</Badge></td>
                      <td className="px-4 py-3 text-right text-dimmed-foreground">
                        {new Date(sub.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
