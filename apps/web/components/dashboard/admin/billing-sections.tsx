'use client';

import Link from 'next/link';
import { Badge } from '@/app/dashboard/components/ui/badge';

// ─── Revenue Breakdown ────────────────────────────────────────

export function RevenueBreakdown({ counts, proMrr, bizMrr }: {
  counts: Record<string, number>; proMrr: number; bizMrr: number;
}) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">Revenue Breakdown</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Free</p>
            <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">{counts.FREE ?? 0} users</span>
          </div>
          <p className="mt-2 text-3xl font-bold text-foreground">$0</p>
          <p className="mt-1 text-xs text-dimmed-foreground">No revenue contribution</p>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5 dark:border-blue-900/50 dark:bg-blue-950/30">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Pro</p>
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">{counts.PRO ?? 0} users</span>
          </div>
          <p className="mt-2 text-3xl font-bold text-blue-700 dark:text-blue-300">${proMrr.toFixed(0)}</p>
          <p className="mt-1 text-xs text-blue-600/70 dark:text-blue-400/70">/month from Pro tier</p>
        </div>
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-5 dark:border-purple-900/50 dark:bg-purple-950/30">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Business</p>
            <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">{counts.BUSINESS ?? 0} users</span>
          </div>
          <p className="mt-2 text-3xl font-bold text-purple-700 dark:text-purple-300">${bizMrr.toFixed(0)}</p>
          <p className="mt-1 text-xs text-purple-600/70 dark:text-purple-400/70">/month from Business tier</p>
        </div>
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
                        <Badge variant={sub.plan === 'BUSINESS' ? 'purple' : sub.plan === 'PRO' ? 'info' : 'default'}>{sub.plan}</Badge>
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
