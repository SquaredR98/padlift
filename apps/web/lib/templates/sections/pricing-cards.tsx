import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta?: string;
}

const defaultTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'Perfect for side projects and experimenting with the platform.',
    features: [
      'Up to 3 projects',
      '1 GB storage',
      'Community support',
      'Basic analytics',
      'API access',
    ],
    cta: 'Get Started Free',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For growing teams that need more power and flexibility.',
    features: [
      'Unlimited projects',
      '50 GB storage',
      'Priority support',
      'Advanced analytics',
      'Custom domains',
      'Team collaboration',
      'Webhooks & integrations',
    ],
    highlighted: true,
    cta: 'Start Free Trial',
  },
  {
    name: 'Business',
    price: '$79',
    period: '/mo',
    description: 'For organizations that need enterprise-grade features.',
    features: [
      'Everything in Pro',
      '500 GB storage',
      'Dedicated support',
      'SSO & SAML',
      'Audit logs',
      'Custom SLA',
      'White-label options',
      'Advanced security',
    ],
    cta: 'Contact Sales',
  },
];

export default function PricingCards({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = content.title as string ?? 'Simple, Transparent Pricing';
  const subtitle = content.subtitle as string ?? 'Choose the plan that fits your needs. Upgrade or downgrade at any time.';
  const rawTiers = (content.tiers ?? defaultTiers) as Record<string, unknown>[];
  // Normalize tier data — features may be string[] or newline-separated string, highlighted may be a string
  const tiers = rawTiers.map((t) => {
    const rawFeatures = t.features;
    let features: string[];
    if (Array.isArray(rawFeatures)) {
      features = rawFeatures as string[];
    } else if (typeof rawFeatures === 'string' && rawFeatures.trim()) {
      features = rawFeatures.split('\n').map((s) => s.trim()).filter(Boolean);
    } else {
      features = [];
    }
    return {
      name: t.name as string ?? '',
      price: t.price as string ?? '',
      period: t.period as string ?? '',
      description: t.description as string ?? '',
      cta: t.cta as string | undefined,
      features,
      highlighted: t.highlighted === true || t.highlighted === 'true',
    };
  });
  const { primaryColor } = branding;

  return (
    <section
      data-lp-section="pricing-cards"
      className="relative bg-[var(--lp-site-bg)] py-20 sm:py-28 overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${primaryColor}, transparent)`,
        }}
      />

      <div className={cn('relative mx-auto px-4 sm:px-6 lg:px-8', tokens.maxWidth)}>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2
            data-lp-brand="heading"
            data-lp-editable="title"
            className={cn(`${tokens.headingSize} font-bold text-[var(--lp-site-heading)]`)}
          >
            {title}
          </h2>
          <p
            data-lp-brand="subheading"
            data-lp-editable="subtitle"
            className={cn(`mt-4 ${tokens.bodySize} text-[var(--lp-site-body)] leading-relaxed`)}
          >
            {subtitle}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className={cn('grid grid-cols-1 md:grid-cols-3 items-start', tokens.gap)}>
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                `relative ${tokens.borderRadius} p-8 flex flex-col transition-transform duration-300`,
                tier.highlighted
                  ? 'border scale-100 md:scale-105 shadow-lg z-10'
                  : cn('bg-[var(--lp-site-card)] hover:-translate-y-0.5', tokens.cardStyle),
              )}
              style={
                tier.highlighted
                  ? {
                      borderColor: primaryColor,
                      backgroundColor: 'rgb(17, 24, 39)',
                      boxShadow: `0 10px 40px -10px ${primaryColor}33`,
                    }
                  : undefined
              }
            >
              {/* Popular badge */}
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge
                    className="px-3 py-1 text-xs font-semibold text-white border-0 shadow-md"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Popular
                  </Badge>
                </div>
              )}

              {/* Tier name */}
              <h3 className="text-lg font-semibold text-[var(--lp-site-heading)]">{tier.name}</h3>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-[var(--lp-site-heading)]">
                  {tier.price}
                </span>
                <span className="text-sm text-[var(--lp-site-body)]">{tier.period}</span>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-[var(--lp-site-body)] leading-relaxed">
                {tier.description}
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-[var(--lp-site-card-hover)]" />

              {/* Features */}
              <ul className="flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-[var(--lp-site-check)]" />
                    <span className="text-[var(--lp-site-body)]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8">
                {tier.highlighted ? (
                  <Button
                    className={cn(`w-full ${tokens.borderRadius} text-sm font-semibold py-5 text-white border-0 hover:-translate-y-0.5 transition-all duration-200`)}
                    style={{
                      backgroundColor: primaryColor,
                      boxShadow: `0 4px 14px 0 ${primaryColor}40`,
                    }}
                  >
                    {tier.cta ?? 'Get Started'}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className={cn(`w-full ${tokens.borderRadius} text-sm font-semibold py-5 border-[var(--lp-site-border)] text-[var(--lp-site-body)] bg-transparent hover:bg-[var(--lp-site-card-hover)] hover:text-[var(--lp-site-heading)] hover:-translate-y-0.5 transition-all duration-200`)}
                  >
                    {tier.cta ?? 'Get Started'}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
