import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function StatsCards({ branding, content, styles }: BlockComponentProps) {
  const title = (content.title as string) ?? 'By the numbers';
  const subtitle = (content.subtitle as string) ?? '';
  const tokens = resolveTokenClasses(styles);
  const stats = (content.stats as Array<{ value: string; label: string; description?: string }>) ?? [
    { value: '10K+', label: 'Active Users', description: 'Using our platform daily' },
    { value: '500+', label: 'Companies', description: 'Trust us with their products' },
    { value: '99.9%', label: 'Uptime', description: 'Reliable infrastructure' },
    { value: '4.9/5', label: 'Rating', description: 'From thousands of reviews' },
  ];

  return (
    <section
      data-lp-section="stats-cards"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        {title && (
          <div className={tokens.textAlign}>
            <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>{title}</h2>
            {subtitle && <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>}
          </div>
        )}
        <div className={cn('mt-12 grid', tokens.columns, tokens.gap)}>
          {stats.map((s, i) => (
            <div
              key={i}
              className={cn('border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] p-6', tokens.textAlign, tokens.borderRadius, tokens.shadow)}
            >
              <p className="text-3xl font-bold" style={{ color: branding.primaryColor }}>{s.value}</p>
              <p className="mt-1 text-sm font-semibold text-[var(--lp-site-heading)]">{s.label}</p>
              {s.description && (
                <p className="mt-1 text-xs text-[var(--lp-site-muted)]">{s.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
