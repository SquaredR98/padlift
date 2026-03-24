import { cn } from '@/lib/utils';
import type { BlockComponentProps } from '../block-types';
import { resolveTokenClasses } from '../block-types';

export function PricingToggleStatic({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Simple, transparent pricing';
  const subtitle = (content.subtitle as string) ?? 'Choose the plan that fits your needs.';
  const tiers = (content.tiers as Array<{
    name: string; priceMonthly: string; priceAnnual: string; period: string;
    description: string; features: string; cta: string; highlighted: boolean | string;
  }>) ?? [];

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
      </div>

      <div className={cn('mx-auto mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3', tokens.maxWidth)}>
        {tiers.map((tier, i) => {
          const isHighlighted = tier.highlighted === true || tier.highlighted === 'true';
          const features = typeof tier.features === 'string' ? tier.features.split('\n').filter(Boolean) : Array.isArray(tier.features) ? tier.features : [];
          return (
            <div
              key={i}
              className={cn(
                'relative border p-8', tokens.borderRadius, tokens.shadow,
                isHighlighted ? 'border-2 bg-[var(--lp-site-card)]' : 'border-[var(--lp-site-border)] bg-[var(--lp-site-card)]'
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
                <span className="text-4xl font-bold text-[var(--lp-site-heading)]">{tier.priceMonthly}</span>
                <span className="text-sm text-[var(--lp-site-muted)]">{tier.period}</span>
                {tier.priceAnnual && (
                  <span className="ml-2 text-xs text-[var(--lp-site-muted)]">
                    ({tier.priceAnnual}/mo billed annually)
                  </span>
                )}
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
                    ? 'text-white'
                    : 'border border-[var(--lp-site-border)] text-[var(--lp-site-heading)]'
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
