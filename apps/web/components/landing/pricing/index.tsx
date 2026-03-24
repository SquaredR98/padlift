'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, X, Zap, Crown, Building2, Sparkles } from 'lucide-react';
import type { PlanConfigData } from '@/lib/plan-gate';
import type { Plan } from '@prisma/client';
import { FadeIn, HoverCard, motion, staggerContainer, staggerItem } from '../motion';
import './styles.css';

interface PlanData {
  tier: Plan;
  displayName: string;
  priceMonthly: number;
  [key: string]: unknown;
}

interface PricingProps {
  plans: Array<{ tier: Plan } & PlanConfigData>;
}

interface PricingVariant {
  tier: string;
  displayName?: string;
  priceMonthly?: number;
  priceYearly?: number;
  gumroadUrl?: string;
}

const TIER_ICONS: Record<string, typeof Zap> = {
  FREE: Zap,
  PRO: Crown,
  BUSINESS: Building2,
};

function formatPrice(cents: number): string {
  if (cents === 0) return '$0';
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

function buildAllFeatures(cfg: PlanConfigData): { label: string; included: boolean }[] {
  return [
    {
      label: cfg.maxSites >= 999999 ? 'Unlimited sites' : `${cfg.maxSites} site${cfg.maxSites === 1 ? '' : 's'}`,
      included: true,
    },
    {
      label: cfg.maxWaitlistEntries >= 999999 ? 'Unlimited waitlist' : `${cfg.maxWaitlistEntries.toLocaleString()} waitlist entries`,
      included: true,
    },
    { label: 'Custom domain', included: cfg.customDomain },
    { label: 'Google Sheets sync', included: cfg.googleSheets },
    { label: 'Webhooks', included: cfg.webhooks },
    { label: 'Remove branding', included: cfg.removeBranding },
    { label: 'Analytics dashboard', included: cfg.analytics },
    { label: 'A/B testing', included: cfg.abTesting },
  ];
}

export function LandingPricing({ plans }: PricingProps) {
  const [experimentId, setExperimentId] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<PricingVariant[]>([]);
  const [paymentsEnabled, setPaymentsEnabled] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        // Load experiment and payments status in parallel
        const [expRes, payRes] = await Promise.all([
          fetch(
            localStorage.getItem('padlift_pricing_eid')
              ? `/api/pricing-experiment?eid=${localStorage.getItem('padlift_pricing_eid')}`
              : '/api/pricing-experiment',
          ),
          fetch('/api/payments-status'),
        ]);

        if (expRes.ok) {
          const data = await expRes.json();
          if (data.experimentId) {
            localStorage.setItem('padlift_pricing_eid', data.experimentId);
            setExperimentId(data.experimentId);
            setOverrides(data.variants || []);
          }
        }

        if (payRes.ok) {
          const data = await payRes.json();
          setPaymentsEnabled(data.paymentsEnabled);
        }
      } catch {
        // silently fall back to defaults
      }
    }
    loadData();
  }, []);

  function getDisplayPlan(plan: { tier: Plan } & PlanConfigData) {
    const override = overrides.find((v) => v.tier === plan.tier);
    if (!override) return plan;
    return {
      ...plan,
      displayName: override.displayName ?? plan.displayName,
      priceMonthly: override.priceMonthly ?? plan.priceMonthly,
      priceYearly: override.priceYearly ?? plan.priceYearly,
    };
  }

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Launch at any budget</h2>
          <p className="mt-4 text-lg text-muted-foreground">Start free. Upgrade when you&apos;re ready.</p>
        </FadeIn>

        <motion.div
          className="grid gap-6 sm:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {plans.map((basePlan) => {
            const plan = getDisplayPlan(basePlan);
            const Icon = TIER_ICONS[plan.tier] ?? Zap;
            const features = buildAllFeatures(basePlan);
            const isPopular = plan.tier === 'PRO';

            return (
              <motion.div key={plan.tier} variants={staggerItem}>
                <HoverCard className={`pricing-card ${isPopular ? 'pricing-card-popular' : ''}`}>
                  {isPopular && <span className="pricing-popular-badge">Most Popular</span>}
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                    <h3 className="font-semibold text-foreground">{plan.displayName}</h3>
                  </div>
                  <p className="mt-3 text-3xl font-bold text-foreground">
                    {formatPrice(plan.priceMonthly)}
                    {plan.priceMonthly > 0 && <span className="text-sm font-normal text-muted-foreground">/mo</span>}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {features.map((f) => (
                      <li
                        key={f.label}
                        className={`flex items-center gap-2 text-sm ${
                          f.included
                            ? 'text-muted-foreground'
                            : 'text-dimmed-foreground/50 line-through'
                        }`}
                      >
                        {f.included ? (
                          <Check className="h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400" />
                        ) : (
                          <X className="h-4 w-4 shrink-0 text-dimmed-foreground/40" />
                        )}
                        {f.label}
                      </li>
                    ))}
                  </ul>
                  {plan.priceMonthly === 0 || paymentsEnabled ? (
                    <Link
                      href="/signup"
                      className={`pricing-cta ${isPopular ? 'pricing-cta-primary' : 'pricing-cta-outline'}`}
                    >
                      {plan.priceMonthly === 0 ? 'Get Started Free' : 'Start Free Trial'}
                    </Link>
                  ) : (
                    <button
                      onClick={() => setShowComingSoon(true)}
                      className={`pricing-cta ${isPopular ? 'pricing-cta-primary' : 'pricing-cta-outline'}`}
                    >
                      Coming Soon
                    </button>
                  )}
                </HoverCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                <Sparkles className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Coming Soon</h3>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Paid plans are launching soon! Sign up for free now and you&apos;ll be the first to know when they&apos;re available.
            </p>
            <div className="mt-5 flex gap-2">
              <Link
                href="/signup"
                className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-500"
              >
                Sign Up Free
              </Link>
              <button
                onClick={() => setShowComingSoon(false)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
