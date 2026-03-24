'use client';

import { useState } from 'react';
import { PlanCard } from './plan-card';

export interface PlanConfigRow {
  id: string;
  tier: string;
  displayName: string;
  priceMonthly: number;
  priceYearly: number;
  gumroadProductId: string | null;
  gumroadMonthlyUrl: string | null;
  gumroadYearlyUrl: string | null;
  gumroadTierName: string | null;
  maxSites: number;
  maxWaitlistEntries: number;
  maxPages: number;
  maxPaymentLinks: number;
  customDomain: boolean;
  removeBranding: boolean;
  googleSheets: boolean;
  webhooks: boolean;
  analytics: boolean;
  abTesting: boolean;
  maxStorageMb: number;
  position: number;
  isActive: boolean;
}

export function PlanEditor({ initialPlans }: { initialPlans: PlanConfigRow[] }) {
  const [plans, setPlans] = useState<PlanConfigRow[]>(initialPlans);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  function updateField(id: string, field: keyof PlanConfigRow, value: unknown) {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  }

  async function savePlan(plan: PlanConfigRow) {
    setSaving(plan.id);
    try {
      const res = await fetch('/api/admin/plans', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan),
      });
      if (!res.ok) throw new Error('Failed to save');
      setSaved(plan.id);
      setTimeout(() => setSaved(null), 2000);
    } catch (err) {
      console.error('Failed to save plan:', err);
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          saving={saving === plan.id}
          saved={saved === plan.id}
          onFieldChange={(field, value) => updateField(plan.id, field, value)}
          onSave={() => savePlan(plan)}
        />
      ))}
    </div>
  );
}
