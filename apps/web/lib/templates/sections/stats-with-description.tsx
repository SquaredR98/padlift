import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function StatsWithDescription({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Trusted by thousands';
  const description = (content.description as string) ?? 'We have been helping teams launch products faster since 2024. Our platform has processed millions of visitors and helped generate significant revenue for our customers.';
  const stats = (content.stats as Array<{ value: string; label: string }>) ?? [
    { value: '10K+', label: 'Active Users' },
    { value: '500+', label: 'Companies' },
    { value: '99.9%', label: 'Uptime' },
    { value: '$2M+', label: 'Revenue Generated' },
  ];

  return (
    <section
      data-lp-section="stats-with-description"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto grid items-center gap-12 lg:grid-cols-2', tokens.maxWidth)}>
        <div>
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          <p className={cn('mt-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
            {description}
          </p>
        </div>
        <div className="space-y-6">
          {stats.map((s, i) => (
            <div key={i} className="flex items-baseline gap-4 border-b border-[var(--lp-site-border)] pb-4 last:border-0">
              <span className="text-3xl font-bold" style={{ color: branding.primaryColor }}>
                {s.value}
              </span>
              <span className="text-sm text-[var(--lp-site-muted)]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
