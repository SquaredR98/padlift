'use client';

import {
  Save,
  Loader2,
  Zap,
  Crown,
  Building2,
  Check,
  X,
} from 'lucide-react';
import type { PlanConfigRow } from './index';

const TIER_ICONS: Record<string, typeof Zap> = {
  FREE: Zap,
  PRO: Crown,
  BUSINESS: Building2,
};

const TIER_ACCENT: Record<string, string> = {
  FREE: 'border-border',
  PRO: 'border-blue-800',
  BUSINESS: 'border-purple-800',
};

const FEATURES = [
  ['customDomain', 'Custom Domain'],
  ['googleSheets', 'Google Sheets'],
  ['webhooks', 'Webhooks'],
  ['removeBranding', 'Remove Branding'],
  ['analytics', 'Analytics'],
  ['abTesting', 'A/B Testing'],
] as const;

interface PlanCardProps {
  plan: PlanConfigRow;
  saving: boolean;
  saved: boolean;
  onFieldChange: (field: keyof PlanConfigRow, value: unknown) => void;
  onSave: () => void;
}

export function PlanCard({ plan, saving, saved, onFieldChange, onSave }: PlanCardProps) {
  const Icon = TIER_ICONS[plan.tier] ?? Zap;
  const accent = TIER_ACCENT[plan.tier] ?? 'border-border';

  return (
    <div className={`rounded-lg border ${accent} bg-card p-4 space-y-3`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-dimmed-foreground">{plan.tier}</span>
        </div>
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : saved ? <Check className="h-3 w-3 text-green-400" /> : <Save className="h-3 w-3" />}
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>

      {/* Display Name */}
      <PlanInput label="Display Name" value={plan.displayName} onChange={(v) => onFieldChange('displayName', v)} />

      {/* Pricing */}
      <div className="grid grid-cols-2 gap-2">
        <PlanNumberInput label="Monthly (cents)" value={plan.priceMonthly} onChange={(v) => onFieldChange('priceMonthly', v)} />
        <PlanNumberInput label="Yearly (cents)" value={plan.priceYearly} onChange={(v) => onFieldChange('priceYearly', v)} />
      </div>

      {/* Gumroad */}
      <div>
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-dimmed-foreground">Gumroad</p>
        <PlanInput label="Product ID" value={plan.gumroadProductId ?? ''} onChange={(v) => onFieldChange('gumroadProductId', v || null)} placeholder="e.g. abc123" />
      </div>
      <PlanInput label="Tier Name" value={plan.gumroadTierName ?? ''} onChange={(v) => onFieldChange('gumroadTierName', v || null)} placeholder="e.g. Pro, Business" />
      <PlanInput label="Monthly URL" value={plan.gumroadMonthlyUrl ?? ''} onChange={(v) => onFieldChange('gumroadMonthlyUrl', v || null)} placeholder="https://..." />
      <PlanInput label="Yearly URL" value={plan.gumroadYearlyUrl ?? ''} onChange={(v) => onFieldChange('gumroadYearlyUrl', v || null)} placeholder="https://..." />

      {/* Limits */}
      <div className="grid grid-cols-2 gap-2">
        <PlanNumberInput label="Max Sites" value={plan.maxSites} onChange={(v) => onFieldChange('maxSites', v)} />
        <PlanNumberInput label="Max Pages" value={plan.maxPages} onChange={(v) => onFieldChange('maxPages', v)} />
        <PlanNumberInput label="Max Waitlist" value={plan.maxWaitlistEntries} onChange={(v) => onFieldChange('maxWaitlistEntries', v)} />
        <PlanNumberInput label="Max Pay Links" value={plan.maxPaymentLinks} onChange={(v) => onFieldChange('maxPaymentLinks', v)} />
        <PlanNumberInput label="Storage (MB)" value={plan.maxStorageMb} onChange={(v) => onFieldChange('maxStorageMb', v)} />
      </div>

      {/* Feature toggles */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-medium uppercase tracking-wider text-dimmed-foreground">Features</label>
        {FEATURES.map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <button
              type="button"
              onClick={() => onFieldChange(key, !plan[key])}
              className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                plan[key] ? 'border-blue-600 bg-blue-600' : 'border-border bg-background'
              }`}
            >
              {plan[key] && <Check className="h-3 w-3 text-white" />}
            </button>
            <span className="text-xs text-muted-foreground">{label}</span>
          </label>
        ))}
      </div>

      {/* Active toggle */}
      <div className="flex items-center justify-between border-t border-border pt-2">
        <span className="text-xs text-dimmed-foreground">Active</span>
        <button
          type="button"
          onClick={() => onFieldChange('isActive', !plan.isActive)}
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${
            plan.isActive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          }`}
        >
          {plan.isActive ? <><Check className="h-3 w-3" /> Yes</> : <><X className="h-3 w-3" /> No</>}
        </button>
      </div>
    </div>
  );
}

// ── Shared input helpers ──

function PlanInput({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[10px] font-medium uppercase tracking-wider text-dimmed-foreground">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-0.5 w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-foreground placeholder:text-dimmed-foreground"
      />
    </div>
  );
}

function PlanNumberInput({ label, value, onChange }: {
  label: string; value: number; onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="text-[10px] font-medium uppercase tracking-wider text-dimmed-foreground">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="mt-0.5 w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-foreground"
      />
    </div>
  );
}
