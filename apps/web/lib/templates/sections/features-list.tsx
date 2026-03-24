import { resolveTokenClasses, type BlockComponentProps } from '../block-types';
import { cn } from '@/lib/utils';

export function FeaturesList({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Why choose us';
  const subtitle = (content.subtitle as string) ?? 'Everything you need to launch and grow your product.';
  const features = (content.features as Array<{ icon: string; title: string; description: string }>) ?? [
    { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for speed at every layer. Your pages load in milliseconds.' },
    { icon: '🔒', title: 'Secure by Default', description: 'Enterprise-grade security built in. SSL, encryption, and compliance.' },
    { icon: '📈', title: 'Analytics', description: 'Track every visitor, conversion, and revenue metric from one dashboard.' },
  ];

  return (
    <section
      data-lp-section="features-list"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className={cn(tokens.textAlign)}>
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          {subtitle && (
            <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>
          )}
        </div>

        <div className="mt-12 space-y-0 divide-y divide-[var(--lp-site-border)]">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-4 py-6">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg"
                style={{ backgroundColor: `${branding.primaryColor}15` }}
              >
                {f.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-[var(--lp-site-heading)]">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--lp-site-body)]">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
