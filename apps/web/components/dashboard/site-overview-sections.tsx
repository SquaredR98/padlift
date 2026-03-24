'use client';

import Link from 'next/link';
import { CreditCard } from 'lucide-react';
import { Badge } from '@/app/dashboard/components/ui/badge';

// ─── Recent Waitlist Table ───────────────────────────────────

interface WaitlistEntry {
  id: string;
  email: string;
  position: number;
  referralCount: number;
  joinedAt: Date;
}

export function RecentWaitlistTable({ siteId, entries, total }: {
  siteId: string; entries: WaitlistEntry[]; total: number;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Recent Waitlist Signups</h2>
        {total > 0 && (
          <Link href={`/dashboard/sites/${siteId}/waitlist`} className="text-sm text-muted-foreground transition hover:text-foreground">
            View all ({total})
          </Link>
        )}
      </div>
      {entries.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-6 text-center">
          <p className="text-sm text-dimmed-foreground">No waitlist entries yet. Share your site to start collecting signups.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-card/50">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">#</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Referrals</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Joined</th>
              </tr>
            </thead>
            <tbody className="bg-card">
              {entries.map((entry) => (
                <tr key={entry.id} className="border-t border-border">
                  <td className="px-4 py-3 text-dimmed-foreground">{entry.position}</td>
                  <td className="px-4 py-3 text-foreground">{entry.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{entry.referralCount}</td>
                  <td className="px-4 py-3 text-dimmed-foreground">
                    {new Date(entry.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

// ─── Payment Links Section ───────────────────────────────────

interface PaymentLink {
  id: string;
  planName: string;
  price: string | number;
  billingCycle: string;
}

export function PaymentLinksSection({ siteId, links }: { siteId: string; links: PaymentLink[] }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Payment Links</h2>
        <Link href={`/dashboard/sites/${siteId}/settings`} className="text-sm text-muted-foreground transition hover:text-foreground">
          Manage
        </Link>
      </div>
      {links.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-6 text-center">
          <CreditCard className="mx-auto h-6 w-6 text-dimmed-foreground" />
          <p className="mt-2 text-sm text-dimmed-foreground">No payment links configured. Add payment links in settings.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {links.map((link) => (
            <div key={link.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-foreground">{link.planName}</p>
                <Badge variant="info">{link.billingCycle}</Badge>
              </div>
              <p className="mt-1 text-lg font-bold text-foreground">${Number(link.price).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
