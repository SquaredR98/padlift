'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
  Loader2,
} from 'lucide-react';
import { PageHeader } from '../../components/ui/page-header';
import { StatCard } from '../../components/ui/stat-card';
import { RevenueBreakdown, SubscriptionsTable } from '@/components/dashboard/admin/billing-sections';

interface Subscription {
  id: string;
  email: string;
  name: string | null;
  plan: string;
  gumroadSubscriptionId: string | null;
  gumroadCustomerId: string | null;
  planExpiresAt: string | null;
  createdAt: string;
}

interface BillingData {
  mrr: number;
  arr: number;
  tierMrr: Record<string, number>;
  paidUsers: number;
  freeUsers: number;
  counts: Record<string, number>;
  subscriptions: Subscription[];
}

export default function AdminBillingPage() {
  const [data, setData] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBilling = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/billing');
      if (res.ok) {
        setData(await res.json());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBilling();
  }, [fetchBilling]);

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
        Failed to load billing data
      </div>
    );
  }

  const totalUsers = data.paidUsers + data.freeUsers;
  const conversionRate =
    totalUsers > 0 ? ((data.paidUsers / totalUsers) * 100).toFixed(1) : '0';

  return (
    <div>
      <PageHeader title="Billing" />

      <div className="space-y-8 px-5 pb-8 pt-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Monthly Revenue" value={`$${data.mrr.toFixed(0)}`} icon={DollarSign} subtitle="MRR" />
          <StatCard label="Annual Revenue" value={`$${data.arr.toFixed(0)}`} icon={TrendingUp} subtitle="ARR" />
          <StatCard label="Paid Users" value={data.paidUsers} icon={CreditCard} subtitle={`${conversionRate}% conversion`} />
          <StatCard label="Free Users" value={data.freeUsers} icon={Users} subtitle={`${totalUsers} total`} />
        </div>

        <RevenueBreakdown counts={data.counts} tierMrr={data.tierMrr} />
        <SubscriptionsTable subscriptions={data.subscriptions} />
      </div>
    </div>
  );
}
