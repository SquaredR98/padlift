'use client';

import { Crown, Shield, Mail, Users, Globe } from 'lucide-react';
import { Badge } from '@/app/dashboard/components/ui/badge';
import { ALL_PERMISSIONS } from '@/lib/admin';

// ─── Types ───────────────────────────────────────────────────

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  adminPermissions: string[];
  createdAt: string;
}

// ─── Super Admins List ───────────────────────────────────────

export function SuperAdminsList({ admins, bootstrapEmails }: { admins: AdminUser[]; bootstrapEmails: string[] }) {
  if (admins.length === 0) return null;
  return (
    <div className="mb-4">
      <h3 className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
        <Crown className="h-4 w-4 text-amber-500" />
        Super Admins
      </h3>
      <div className="space-y-2">
        {admins.map((admin) => {
          const isBootstrap = bootstrapEmails.includes(admin.email);
          return (
            <div key={admin.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  {admin.name?.charAt(0)?.toUpperCase() ?? admin.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{admin.name || admin.email}</p>
                    {isBootstrap && <Badge variant="warning">Bootstrap</Badge>}
                  </div>
                  <p className="text-xs text-dimmed-foreground">{admin.email}</p>
                </div>
              </div>
              <span className="text-xs text-dimmed-foreground">All permissions</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Regular Admins List ─────────────────────────────────────

export function AdminsList({ admins }: { admins: AdminUser[] }) {
  if (admins.length === 0) return null;
  return (
    <div>
      <h3 className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
        <Shield className="h-4 w-4 text-blue-500" />
        Admins
      </h3>
      <div className="space-y-2">
        {admins.map((admin) => (
          <div key={admin.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  {admin.name?.charAt(0)?.toUpperCase() ?? admin.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{admin.name || admin.email}</p>
                  <p className="text-xs text-dimmed-foreground">{admin.email}</p>
                </div>
              </div>
              <span className="text-xs text-dimmed-foreground">
                {admin.adminPermissions.length} of {ALL_PERMISSIONS.length} permissions
              </span>
            </div>
            {admin.adminPermissions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5 pl-12">
                {admin.adminPermissions.map((perm) => {
                  const info = ALL_PERMISSIONS.find((p) => p.key === perm);
                  return (
                    <span key={perm} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                      {info?.label ?? perm}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Bootstrap Emails ────────────────────────────────────────

export function BootstrapEmails({ emails }: { emails: string[] }) {
  return (
    <section>
      <h2 className="mb-2 text-lg font-semibold text-foreground">Bootstrap Emails</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        These emails always have Super Admin access, regardless of their database role. Configured in the application code.
      </p>
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="space-y-2">
          {emails.map((email) => (
            <div key={email} className="flex items-center gap-2 text-sm text-foreground">
              <Mail className="h-3.5 w-3.5 text-dimmed-foreground" />
              <span className="font-mono">{email}</span>
            </div>
          ))}
          {emails.length === 0 && (
            <p className="text-sm text-dimmed-foreground">No bootstrap emails configured</p>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── System Info ─────────────────────────────────────────────

export function SystemInfo({ stats }: { stats: { totalUsers: number; totalSites: number; totalEntries: number } }) {
  return (
    <section>
      <h2 className="mb-2 text-lg font-semibold text-foreground">System Info</h2>
      <p className="mb-4 text-sm text-muted-foreground">Quick overview of platform statistics.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-dimmed-foreground" />
            <p className="text-sm text-muted-foreground">Total Users</p>
          </div>
          <p className="mt-2 text-2xl font-bold text-foreground">{stats.totalUsers}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-dimmed-foreground" />
            <p className="text-sm text-muted-foreground">Total Sites</p>
          </div>
          <p className="mt-2 text-2xl font-bold text-foreground">{stats.totalSites}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-dimmed-foreground" />
            <p className="text-sm text-muted-foreground">Waitlist Entries</p>
          </div>
          <p className="mt-2 text-2xl font-bold text-foreground">{stats.totalEntries}</p>
        </div>
      </div>
    </section>
  );
}
