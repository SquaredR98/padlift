'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function PricingToggle({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Simple, transparent pricing';
  const subtitle = (content.subtitle as string) ?? 'Choose the plan that fits your needs.';
  const discountLabel = (content.discountLabel as string) ?? 'Save 20%';
  const tiers = (content.tiers as Array<{
    name: string; priceMonthly: string; priceAnnual: string; period: string;
    description: string; features: string; cta: string; highlighted: boolean | string;
  }>) ?? [
    { name: 'Starter', priceMonthly: '$9', priceAnnual: '$7', period: '/mo', description: 'For individuals', features: '3 projects\n1 GB storage\nBasic analytics', cta: 'Get Started', highlighted: false },
    { name: 'Pro', priceMonthly: '$29', priceAnnual: '$23', period: '/mo', description: 'For teams', features: 'Unlimited projects\n50 GB storage\nAdvanced analytics\nPriority support', cta: 'Start Free Trial', highlighted: true },
    { name: 'Enterprise', priceMonthly: '$99', priceAnnual: '$79', period: '/mo', description: 'For organizations', features: 'Everything in Pro\nSSO & SAML\nDedicated support\nCustom SLA', cta: 'Contact Sales', highlighted: false },
  ];

  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section
      data-lp-section="pricing-toggle"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto text-center', tokens.maxWidth)}>
        <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
          {title}
        </h2>
        {subtitle && <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>}

        {/* Toggle */}
        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] p-1">
          <button
            onClick={() => setIsAnnual(false)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-colors',
              !isAnnual ? 'text-white' : 'text-[var(--lp-site-body)]'
            )}
            style={!isAnnual ? { backgroundColor: branding.primaryColor } : undefined}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-colors',
              isAnnual ? 'text-white' : 'text-[var(--lp-site-body)]'
            )}
            style={isAnnual ? { backgroundColor: branding.primaryColor } : undefined}
          >
            Annual
            {discountLabel && (
              <span className="ml-2 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-500">
                {discountLabel}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className={cn('mx-auto mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3', tokens.maxWidth)}>
        {tiers.map((tier, i) => {
          const isHighlighted = tier.highlighted === true || tier.highlighted === 'true';
          const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;
          const features = typeof tier.features === 'string' ? tier.features.split('\n').filter(Boolean) : Array.isArray(tier.features) ? tier.features : [];
          return (
            <div
              key={i}
              className={cn(
                'relative p-8',
                tokens.borderRadius,
                isHighlighted
                  ? 'border-2 bg-[var(--lp-site-card)]'
                  : cn('bg-[var(--lp-site-card)]', tokens.cardStyle)
              )}
              style={isHighlighted ? { borderColor: branding.primaryColor } : undefined}
            >
              {isHighlighted && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-[var(--lp-site-heading)]">{tier.name}</h3>
              <p className="mt-1 text-sm text-[var(--lp-site-muted)]">{tier.description}</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-[var(--lp-site-heading)]">{price}</span>
                <span className="text-sm text-[var(--lp-site-muted)]">{tier.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm text-[var(--lp-site-body)]">
                    <svg className="h-4 w-4 shrink-0" style={{ color: branding.primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={cn(
                  'mt-8 w-full rounded-xl py-3 text-sm font-semibold transition-all',
                  isHighlighted
                    ? 'text-white hover:-translate-y-0.5 hover:shadow-lg'
                    : 'border border-[var(--lp-site-border)] text-[var(--lp-site-heading)] hover:bg-[var(--lp-site-card-hover)]'
                )}
                style={isHighlighted ? { backgroundColor: branding.primaryColor } : undefined}
              >
                {tier.cta}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
