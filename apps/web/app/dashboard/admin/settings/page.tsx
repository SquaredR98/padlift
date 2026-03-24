'use client';

import { useState, useEffect, useCallback } from 'react';
import { Loader2, CreditCard, Check, X } from 'lucide-react';
import { PageHeader } from '../../components/ui/page-header';
import {
  SuperAdminsList,
  AdminsList,
  BootstrapEmails,
  SystemInfo,
} from '@/components/dashboard/admin/settings-sections';

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  adminPermissions: string[];
  createdAt: string;
}

interface SettingsData {
  admins: AdminUser[];
  bootstrapEmails: string[];
  stats: { totalUsers: number; totalSites: number; totalEntries: number };
  paymentsEnabled: boolean;
}

export default function AdminSettingsPage() {
  const [data, setData] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingPayments, setSavingPayments] = useState(false);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        setData(await res.json());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const togglePayments = async () => {
    if (!data) return;
    const newValue = !data.paymentsEnabled;
    setSavingPayments(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentsEnabled: newValue }),
      });
      if (res.ok) {
        setData({ ...data, paymentsEnabled: newValue });
      }
    } finally {
      setSavingPayments(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-dimmed-foreground" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="px-5 py-20 text-center text-dimmed-foreground">
        Failed to load settings
      </div>
    );
  }

  const superAdmins = data.admins.filter((a) => a.role === 'SUPER_ADMIN');
  const admins = data.admins.filter((a) => a.role === 'ADMIN');

  return (
    <div>
      <PageHeader title="Settings" />

      <div className="space-y-8 px-5 pb-8 pt-5">
        {/* Payments Toggle */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Payments</h2>
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  data.paymentsEnabled ? 'bg-green-500/10' : 'bg-muted'
                }`}>
                  <CreditCard className={`h-4 w-4 ${
                    data.paymentsEnabled ? 'text-green-400' : 'text-muted-foreground'
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Accept Payments
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {data.paymentsEnabled
                      ? 'Checkout is live — users can purchase paid plans.'
                      : 'Checkout is disabled — upgrade buttons show "Coming Soon" message.'}
                  </p>
                </div>
              </div>
              <button
                onClick={togglePayments}
                disabled={savingPayments}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  data.paymentsEnabled
                    ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {savingPayments ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : data.paymentsEnabled ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <X className="h-3 w-3" />
                )}
                {data.paymentsEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Admin Users ({data.admins.length})
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Users with admin or super admin roles. Manage roles and permissions from the user detail page.
          </p>

          <SuperAdminsList admins={superAdmins} bootstrapEmails={data.bootstrapEmails} />
          <AdminsList admins={admins} />

          {data.admins.length === 0 && (
            <div className="rounded-lg border border-border bg-card px-5 py-8 text-center text-sm text-dimmed-foreground">
              No admin users configured. Bootstrap emails still have access.
            </div>
          )}
        </section>

        <BootstrapEmails emails={data.bootstrapEmails} />
        <SystemInfo stats={data.stats} />
      </div>
    </div>
  );
}
