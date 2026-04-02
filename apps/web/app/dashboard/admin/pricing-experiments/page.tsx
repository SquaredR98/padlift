'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, FlaskConical } from 'lucide-react';
import { PageHeader } from '../../components/ui/page-header';
import { Badge } from '../../components/ui/badge';

interface PricingVariant {
  tier: string;
  displayName?: string;
  priceMonthly?: number;
  priceYearly?: number;
  gumroadUrl?: string;
}

interface Experiment {
  id: string;
  name: string;
  isActive: boolean;
  weight: number;
  variants: PricingVariant[];
  conversions: number;
  views: number;
  createdAt: string;
}

const TIERS = ['FREE', 'LITE', 'STARTER', 'PRO', 'BUSINESS'] as const;

function formatCents(cents: number): string {
  if (cents === 0) return '$0';
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

function conversionRate(views: number, conversions: number): string {
  if (views === 0) return '—';
  return `${((conversions / views) * 100).toFixed(1)}%`;
}

const EMPTY_VARIANTS: PricingVariant[] = TIERS.map((tier) => ({ tier }));

export default function AdminPricingExperimentsPage() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formWeight, setFormWeight] = useState(1);
  const [formActive, setFormActive] = useState(false);
  const [formVariants, setFormVariants] = useState<PricingVariant[]>(EMPTY_VARIANTS);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/pricing-experiments');
      if (res.ok) {
        const data = await res.json();
        setExperiments(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function resetForm() {
    setFormName('');
    setFormWeight(1);
    setFormActive(false);
    setFormVariants(EMPTY_VARIANTS.map((v) => ({ ...v })));
    setEditingId(null);
    setShowForm(false);
  }

  function startEdit(exp: Experiment) {
    setFormName(exp.name);
    setFormWeight(exp.weight);
    setFormActive(exp.isActive);
    // Ensure all tiers present in variants
    const merged = TIERS.map((tier) => {
      const existing = (exp.variants as PricingVariant[]).find((v) => v.tier === tier);
      return existing ?? { tier };
    });
    setFormVariants(merged);
    setEditingId(exp.id);
    setShowForm(true);
  }

  function updateVariant(index: number, field: keyof PricingVariant, value: string) {
    setFormVariants((prev) => {
      const copy = [...prev];
      const v = { ...copy[index] };
      if (field === 'priceMonthly' || field === 'priceYearly') {
        const num = parseInt(value, 10);
        (v as any)[field] = isNaN(num) ? undefined : num;
      } else {
        (v as any)[field] = value || undefined;
      }
      copy[index] = v;
      return copy;
    });
  }

  async function handleSubmit() {
    // Clean empty variants (remove tier-only entries with no overrides)
    const cleanedVariants = formVariants.filter(
      (v) => v.displayName || v.priceMonthly !== undefined || v.priceYearly !== undefined || v.gumroadUrl,
    );

    const body = {
      name: formName,
      weight: formWeight,
      isActive: formActive,
      variants: cleanedVariants,
    };

    if (editingId) {
      await fetch(`/api/admin/pricing-experiments/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } else {
      await fetch('/api/admin/pricing-experiments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }

    resetForm();
    fetchData();
  }

  async function handleToggleActive(exp: Experiment) {
    await fetch(`/api/admin/pricing-experiments/${exp.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !exp.isActive }),
    });
    fetchData();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this experiment? This cannot be undone.')) return;
    await fetch(`/api/admin/pricing-experiments/${id}`, { method: 'DELETE' });
    fetchData();
  }

  return (
    <div>
      <PageHeader
        title="Pricing Experiments"
        description="A/B test different pricing configurations on your landing page."
      />

      <div className="mb-4 flex justify-end">
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          New Experiment
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8 rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            {editingId ? 'Edit Experiment' : 'Create Experiment'}
          </h3>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Name</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Q2 2026 — Lower Pro"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Weight</label>
              <input
                type="number"
                min={1}
                value={formWeight}
                onChange={(e) => setFormWeight(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-blue-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Higher weight = more traffic. Weight 2 gets 2× the traffic of weight 1.
              </p>
            </div>
            <div className="flex items-end gap-3">
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={formActive}
                  onChange={(e) => setFormActive(e.target.checked)}
                  className="h-4 w-4 rounded border-border"
                />
                Active
              </label>
            </div>
          </div>

          <h4 className="mb-3 mt-6 text-sm font-semibold text-foreground">Tier Overrides</h4>
          <p className="mb-4 text-xs text-muted-foreground">
            Leave fields blank to keep defaults from the plan config. Price is in cents (e.g. 900 = $9).
          </p>

          <div className="space-y-4">
            {formVariants.map((v, i) => (
              <div key={v.tier} className="rounded-md border border-border p-4">
                <p className="mb-3 text-sm font-semibold text-foreground">{v.tier}</p>
                <div className="grid gap-3 sm:grid-cols-4">
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">Display Name</label>
                    <input
                      type="text"
                      value={v.displayName ?? ''}
                      onChange={(e) => updateVariant(i, 'displayName', e.target.value)}
                      placeholder="Override name"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">Monthly Price (cents)</label>
                    <input
                      type="number"
                      value={v.priceMonthly ?? ''}
                      onChange={(e) => updateVariant(i, 'priceMonthly', e.target.value)}
                      placeholder="e.g. 900"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">Yearly Price (cents)</label>
                    <input
                      type="number"
                      value={v.priceYearly ?? ''}
                      onChange={(e) => updateVariant(i, 'priceYearly', e.target.value)}
                      placeholder="e.g. 7900"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">Gumroad URL</label>
                    <input
                      type="text"
                      value={v.gumroadUrl ?? ''}
                      onChange={(e) => updateVariant(i, 'gumroadUrl', e.target.value)}
                      placeholder="Gumroad checkout URL"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={!formName}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {editingId ? 'Save Changes' : 'Create Experiment'}
            </button>
            <button
              onClick={resetForm}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Experiments list */}
      {loading ? (
        <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>
      ) : experiments.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
          <FlaskConical className="h-10 w-10" />
          <p className="text-sm">No experiments yet. Create one to start A/B testing prices.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiments.map((exp) => {
            const variants = (exp.variants ?? []) as PricingVariant[];
            return (
              <div
                key={exp.id}
                className="rounded-lg border border-border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">{exp.name}</h3>
                      <Badge variant={exp.isActive ? 'success' : 'default'}>
                        {exp.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Weight: {exp.weight}</span>
                    </div>
                    <div className="mt-2 flex gap-6 text-sm text-muted-foreground">
                      <span>{exp.views.toLocaleString()} views</span>
                      <span>{exp.conversions.toLocaleString()} conversions</span>
                      <span>{conversionRate(exp.views, exp.conversions)} rate</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(exp)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        exp.isActive
                          ? 'bg-muted text-foreground hover:bg-muted/80'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {exp.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => startEdit(exp)}
                      className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Variant overrides summary */}
                {variants.length > 0 && (
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {variants.map((v) => (
                      <div key={v.tier} className="rounded-md border border-border bg-muted/50 p-3 text-sm">
                        <span className="font-medium text-foreground">{v.tier}</span>
                        <div className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                          {v.displayName && <p>Name: {v.displayName}</p>}
                          {v.priceMonthly !== undefined && <p>Monthly: {formatCents(v.priceMonthly)}</p>}
                          {v.priceYearly !== undefined && <p>Yearly: {formatCents(v.priceYearly)}</p>}
                          {v.gumroadUrl && <p>URL: {v.gumroadUrl}</p>}
                          {!v.displayName && v.priceMonthly === undefined && !v.gumroadUrl && (
                            <p className="italic">No overrides</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
