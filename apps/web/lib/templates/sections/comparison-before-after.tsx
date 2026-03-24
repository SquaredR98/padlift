import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function ComparisonBeforeAfter({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Before vs After';
  const subtitle = (content.subtitle as string) ?? 'See how our platform transforms your workflow.';
  const beforeLabel = (content.beforeLabel as string) ?? 'Before';
  const afterLabel = (content.afterLabel as string) ?? 'After';
  const rows = (content.rows as Array<{ aspect: string; before: string; after: string }>) ?? [
    { aspect: 'Launch time', before: '2-3 weeks', after: '15 minutes' },
    { aspect: 'Tools needed', before: '5+ different tools', after: '1 platform' },
    { aspect: 'Cost', before: '$500+/month', after: '$29/month' },
    { aspect: 'Developer required', before: 'Yes, always', after: 'Never' },
  ];

  return (
    <section
      data-lp-section="comparison-before-after"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className="text-center">
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>{title}</h2>
          {subtitle && <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Before column */}
          <div className={cn('border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] p-6', tokens.borderRadius)}>
            <h3 className="mb-6 text-center text-lg font-semibold text-[var(--lp-site-muted)]">{beforeLabel}</h3>
            <div className="space-y-4">
              {rows.map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-[var(--lp-site-muted)]">{r.aspect}</p>
                    <p className="text-sm text-[var(--lp-site-body)]">{r.before}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* After column */}
          <div
            className={cn('border-2 p-6', tokens.borderRadius)}
            style={{ borderColor: branding.primaryColor, backgroundColor: `${branding.primaryColor}05` }}
          >
            <h3 className="mb-6 text-center text-lg font-semibold" style={{ color: branding.primaryColor }}>{afterLabel}</h3>
            <div className="space-y-4">
              {rows.map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0" style={{ color: branding.primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-xs font-medium text-[var(--lp-site-muted)]">{r.aspect}</p>
                    <p className="text-sm font-medium text-[var(--lp-site-heading)]">{r.after}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
