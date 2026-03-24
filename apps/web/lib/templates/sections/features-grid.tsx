import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const DEFAULT_FEATURES: Feature[] = [
  {
    icon: '\u26A1',
    title: 'Lightning Fast',
    description:
      'Optimized for speed at every layer. Your pages load in milliseconds, not seconds.',
  },
  {
    icon: '\uD83D\uDD12',
    title: 'Secure by Default',
    description:
      'Enterprise-grade security built in. SSL, encryption, and compliance out of the box.',
  },
  {
    icon: '\uD83D\uDCC8',
    title: 'Analytics & Insights',
    description:
      'Track every visitor, conversion, and revenue metric from a single dashboard.',
  },
  {
    icon: '\uD83C\uDFA8',
    title: 'Beautiful Templates',
    description:
      'Start with conversion-tested designs. Customize every pixel to match your brand.',
  },
  {
    icon: '\uD83D\uDD17',
    title: 'Integrations',
    description:
      'Connect with Stripe, Zapier, Slack, and 50+ tools your team already uses.',
  },
  {
    icon: '\uD83D\uDE80',
    title: 'One-Click Publish',
    description:
      'Go live in seconds. Custom domains, SSL certificates, and CDN included automatically.',
  },
];

export function FeaturesGrid({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = content.title as string ?? 'Everything you need to launch';
  const subtitle = content.subtitle as string ?? 'Replace your entire tool stack with one platform built for speed.';
  const features = content.features as Feature[] ?? DEFAULT_FEATURES;
  return (
    <section
      data-lp-section="features-grid"
      className="relative bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        {/* Section header */}
        <div className={cn('mx-auto mb-16 max-w-2xl', tokens.textAlign)}>
          <h2 data-lp-editable="title" className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-bold text-[var(--lp-site-heading)]')}>
            {title}
          </h2>
          <p data-lp-editable="subtitle" className={cn('mt-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
            {subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className={cn('grid', tokens.columns, tokens.gap)}>
          {features.map((feature, i) => (
            <div
              key={i}
              className={cn(
                `group relative ${tokens.borderRadius} bg-[var(--lp-site-card)] p-6`,
                tokens.cardStyle,
                'transition-all duration-200 hover:-translate-y-1 hover:border-[var(--lp-site-border)] hover:shadow-lg'
              )}
            >
              {/* Icon circle */}
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                style={{
                  backgroundColor: `${branding.primaryColor}15`,
                }}
              >
                {feature.icon}
              </div>

              <h3 className="mb-2 text-lg font-semibold text-[var(--lp-site-heading)]">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--lp-site-body)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
