'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, X, Rocket, Crown, Building2, Sparkles } from 'lucide-react';
import type { PlanConfigData } from '@/lib/plan-gate';
import type { Plan } from '@prisma/client';
import { FadeIn, HoverCard, motion, staggerContainer, staggerItem } from '../motion';
import './styles.css';

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

// Only show these tiers as pricing cards
const VISIBLE_TIERS: Plan[] = ['STARTER', 'PRO', 'BUSINESS'];

const TIER_ICONS: Record<string, typeof Rocket> = {
  STARTER: Rocket,
  PRO: Crown,
  BUSINESS: Building2,
};

function formatPrice(cents: number): string {
  if (cents === 0) return '$0';
  const dollars = cents / 100;
  return `$${dollars % 1 === 0 ? dollars.toFixed(0) : dollars.toFixed(2)}`;
}

function buildFeatures(tier: Plan, cfg: PlanConfigData): string[] {
  const features: string[] = [];

  // Scale features first
  features.push(
    cfg.maxSites >= 999999
      ? 'Unlimited sites'
      : `${cfg.maxSites} site${cfg.maxSites === 1 ? '' : 's'}`,
  );
  features.push(
    cfg.maxPages >= 999999
      ? 'Unlimited pages'
      : `${cfg.maxPages} page${cfg.maxPages === 1 ? '' : 's'} per site`,
  );
  features.push(`${cfg.maxStorageMb >= 1000 ? `${(cfg.maxStorageMb / 1000).toFixed(0)} GB` : `${cfg.maxStorageMb} MB`} storage`);
  features.push(
    cfg.maxWaitlistEntries >= 999999
      ? 'Unlimited waitlist entries'
      : `${cfg.maxWaitlistEntries.toLocaleString()} waitlist entries`,
  );

  // All paid tiers get these features
  features.push('Custom domain');
  features.push('Analytics dashboard');
  features.push('Remove branding');
  features.push('Google Sheets sync');
  features.push('Webhooks');

  // Business only
  if (cfg.abTesting) {
    features.push('A/B testing');
  }

  return features;
}

export function LandingPricing({ plans }: PricingProps) {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [experimentId, setExperimentId] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<PricingVariant[]>([]);
  const [paymentsEnabled, setPaymentsEnabled] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
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

  // Filter to only visible tiers
  const visiblePlans = plans.filter((p) => VISIBLE_TIERS.includes(p.tier));

  // Calculate save percentage (same for all tiers: ~17%)
  const samplePlan = visiblePlans.find((p) => p.priceMonthly > 0);
  const savePercent = samplePlan
    ? Math.round((1 - samplePlan.priceYearly / (samplePlan.priceMonthly * 12)) * 100)
    : 17;

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Launch at any budget</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every paid plan includes all features. Pick your scale.
          </p>

          {/* Monthly / Yearly toggle */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setBilling('monthly')}
              className={`pricing-toggle ${billing === 'monthly' ? 'pricing-toggle-active' : ''}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`pricing-toggle ${billing === 'yearly' ? 'pricing-toggle-active' : ''}`}
            >
              Yearly
              <span className="pricing-save-badge">Save {savePercent}%</span>
            </button>
          </div>
        </FadeIn>

        <motion.div
          className="grid gap-6 sm:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {visiblePlans.map((basePlan) => {
            const plan = getDisplayPlan(basePlan);
            const Icon = TIER_ICONS[plan.tier] ?? Rocket;
            const features = buildFeatures(plan.tier, basePlan);
            const isPopular = plan.tier === 'PRO';

            const monthlyPrice = plan.priceMonthly;
            const yearlyPrice = plan.priceYearly;
            const effectiveMonthly = billing === 'yearly' ? yearlyPrice / 12 : monthlyPrice;

            return (
              <motion.div key={plan.tier} variants={staggerItem}>
                <HoverCard className={`pricing-card ${isPopular ? 'pricing-card-popular' : ''}`}>
                  {isPopular && <span className="pricing-popular-badge">Most Popular</span>}
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                    <h3 className="font-semibold text-foreground">{plan.displayName}</h3>
                  </div>

                  {/* Price display */}
                  <div className="mt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">
                        {formatPrice(effectiveMonthly)}
                      </span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                      {billing === 'yearly' && monthlyPrice !== effectiveMonthly && (
                        <span className="pricing-price-struck text-sm">
                          {formatPrice(monthlyPrice)}
                        </span>
                      )}
                    </div>
                    {billing === 'yearly' && (
                      <p className="pricing-yearly-note">
                        Billed as {formatPrice(yearlyPrice)}/year
                      </p>
                    )}
                  </div>

                  <ul className="mt-6 space-y-2.5">
                    {features.map((label) => (
                      <li key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400" />
                        {label}
                      </li>
                    ))}
                    {/* Show what Business has that others don't */}
                    {!basePlan.abTesting && (
                      <li className="flex items-center gap-2 text-sm text-dimmed-foreground/50 line-through">
                        <X className="h-4 w-4 shrink-0 text-dimmed-foreground/40" />
                        A/B testing
                      </li>
                    )}
                  </ul>

                  {paymentsEnabled ? (
                    <Link
                      href="/signup"
                      className={`pricing-cta ${isPopular ? 'pricing-cta-primary' : 'pricing-cta-outline'}`}
                    >
                      Get Started
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

        {/* Free CTA */}
        <FadeIn className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Not ready to commit?{' '}
            <Link href="/signup" className="font-medium text-blue-500 underline underline-offset-4 hover:text-blue-400">
              Start free
            </Link>
            {' '}&mdash; 1 site, 100 entries, no credit card required.
          </p>
        </FadeIn>
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
