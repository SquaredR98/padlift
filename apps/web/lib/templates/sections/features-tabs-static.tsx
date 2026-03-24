import { cn } from '@/lib/utils';
import type { BlockComponentProps } from '../block-types';
import { resolveTokenClasses } from '../block-types';

export function FeaturesTabsStatic({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Powerful features';
  const subtitle = (content.subtitle as string) ?? 'Explore what makes our platform stand out.';
  const tabs = (content.tabs as Array<{ label: string; title: string; description: string; imageUrl?: string }>) ?? [
    { label: 'Dashboard', title: 'Intuitive Dashboard', description: 'Monitor all your metrics from a single, beautifully designed dashboard.' },
    { label: 'Analytics', title: 'Deep Analytics', description: 'Understand your audience with powerful analytics and insights.' },
    { label: 'Automation', title: 'Smart Automation', description: 'Automate repetitive tasks and focus on what matters most.' },
  ];

  return (
    <section
      data-lp-section="features-tabs"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className={tokens.textAlign}>
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          {subtitle && (
            <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>
          )}
        </div>

        <div className="mt-10 space-y-12">
          {tabs.map((tab, i) => (
            <div key={i} className={cn('grid items-center lg:grid-cols-2', tokens.gap)}>
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <h3 className="text-2xl font-bold text-[var(--lp-site-heading)]">
                  {tab.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[var(--lp-site-body)]">
                  {tab.description}
                </p>
              </div>
              <div className={cn('overflow-hidden border border-[var(--lp-site-border)] bg-[var(--lp-site-card)]', tokens.borderRadius, tokens.shadow, i % 2 === 1 && 'lg:order-1')}>
                {tab.imageUrl ? (
                  <img src={tab.imageUrl} alt={tab.title} className="h-full w-full object-cover" />
                ) : (
                  <div
                    className="flex aspect-video items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${branding.primaryColor}10, ${branding.secondaryColor}10)` }}
                  >
                    <p className="text-sm text-[var(--lp-site-muted)]">{tab.label}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
