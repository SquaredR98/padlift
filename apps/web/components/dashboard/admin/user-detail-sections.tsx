'use client';

import { Globe, Mail, Eye, Check } from 'lucide-react';
import { Badge } from '@/app/dashboard/components/ui/badge';
import { ALL_PERMISSIONS, type AdminPermission } from '@/lib/admin';

// ─── Billing Info Card ────────────────────────────────────────

export function BillingInfo({ user }: {
  user: {
    gumroadSubscriptionId: string | null;
    gumroadCustomerId: string | null;
    planExpiresAt: string | null;
  };
}) {
  const hasGR = user.gumroadSubscriptionId || user.gumroadCustomerId;

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">Billing Info</h3>
      <div className="mt-4 space-y-3">
        {hasGR ? (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-dimmed-foreground">Gumroad</p>
            <BillingField label="Subscription ID" value={user.gumroadSubscriptionId} />
            <BillingField label="Customer ID" value={user.gumroadCustomerId} />
          </>
        ) : (
          <p className="text-xs text-dimmed-foreground">No payment provider linked</p>
        )}
        <div>
          <p className="text-xs text-dimmed-foreground">Plan Expires At</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {user.planExpiresAt ? new Date(user.planExpiresAt).toLocaleDateString() : 'Never (active)'}
          </p>
        </div>
      </div>
    </div>
  );
}

function BillingField({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-xs text-dimmed-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-mono text-muted-foreground">{value || '—'}</p>
    </div>
  );
}

// ─── Permissions Grid ─────────────────────────────────────────

export function PermissionsGrid({ permissions, onToggle }: {
  permissions: string[];
  onToggle: (perm: AdminPermission) => void;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">Permissions</h3>
      <p className="mt-1 text-xs text-dimmed-foreground">
        Select which admin features this user can access. Super Admins have all permissions automatically.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ALL_PERMISSIONS.map((perm) => (
          <button
            key={perm.key}
            onClick={() => onToggle(perm.key)}
            className={`flex items-start gap-3 rounded-lg border p-3 text-left transition ${
              permissions.includes(perm.key)
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                : 'border-border hover:border-muted-foreground/30'
            }`}
          >
            <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
              permissions.includes(perm.key) ? 'border-blue-600 bg-blue-600' : 'border-border bg-background'
            }`}>
              {permissions.includes(perm.key) && <Check className="h-3 w-3 text-white" />}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{perm.label}</p>
              <p className="text-xs text-dimmed-foreground">{perm.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── User Sites Table ─────────────────────────────────────────

export function UserSitesTable({ sites }: {
  sites: {
    id: string; name: string; slug: string; publishedAt: string | null;
    _count: { waitlistEntries: number; visitors: number; pages: number };
  }[];
}) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-5 py-3">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">Sites ({sites.length})</h3>
      </div>
      {sites.length === 0 ? (
        <div className="px-5 py-8 text-center text-dimmed-foreground text-sm">This user has no sites.</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium text-dimmed-foreground">
              <th className="px-4 py-3">Site</th>
              <th className="px-4 py-3">Pages</th>
              <th className="px-4 py-3">Waitlist</th>
              <th className="px-4 py-3">Visitors</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site.id} className="border-b border-border/50 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{site.name}</p>
                  <p className="text-xs text-dimmed-foreground">/s/{site.slug}</p>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{site._count.pages}</td>
                <td className="px-4 py-3"><span className="flex items-center gap-1 text-muted-foreground"><Mail className="h-3 w-3" />{site._count.waitlistEntries}</span></td>
                <td className="px-4 py-3"><span className="flex items-center gap-1 text-muted-foreground"><Eye className="h-3 w-3" />{site._count.visitors}</span></td>
                <td className="px-4 py-3 text-right">
                  <Badge variant={site.publishedAt ? 'success' : 'default'}>{site.publishedAt ? 'Live' : 'Draft'}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
