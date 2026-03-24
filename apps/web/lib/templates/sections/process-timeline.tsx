import { cn } from '@/lib/utils';
import { resolveTokenClasses } from '../block-types';
import type { BlockComponentProps } from '../block-types';

export function ProcessTimeline({ branding, content, styles }: BlockComponentProps) {
  const title = (content.title as string) ?? 'Our roadmap';
  const subtitle = (content.subtitle as string) ?? 'Key milestones on our journey.';
  const milestones = (content.milestones as Array<{ date: string; title: string; description: string }>) ?? [
    { date: 'Q1 2026', title: 'Beta Launch', description: 'Open beta to the first 1,000 users.' },
    { date: 'Q2 2026', title: 'Public Launch', description: 'Full release with all core features.' },
    { date: 'Q3 2026', title: 'Enterprise', description: 'Team features, SSO, and dedicated support.' },
    { date: 'Q4 2026', title: 'API & Integrations', description: 'Open API and third-party integrations.' },
  ];
  const tokens = resolveTokenClasses(styles);

  return (
    <section
      data-lp-section="process-timeline"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className="text-center">
          <h2 data-lp-editable="title" className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          {subtitle && (
            <p data-lp-editable="subtitle" className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>
          )}
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="relative mt-14 hidden sm:block">
          {/* Horizontal line */}
          {(styles.showDecorations !== false) && (
            <div
              className="absolute top-4 left-0 h-0.5 w-full"
              style={{ backgroundColor: `${branding.primaryColor}30` }}
            />
          )}

          <div className={cn('grid', tokens.gap)} style={{ gridTemplateColumns: `repeat(${milestones.length}, 1fr)` }}>
            {milestones.map((m, i) => (
              <div key={i} className="relative px-2 text-center">
                {/* Dot */}
                <div
                  className="relative z-10 mx-auto h-8 w-8 rounded-full border-4 border-[var(--lp-site-bg)]"
                  style={{ backgroundColor: branding.primaryColor }}
                />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[var(--lp-site-muted)]">
                  {m.date}
                </p>
                <h3 className="mt-2 text-base font-semibold text-[var(--lp-site-heading)]">
                  {m.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--lp-site-body)]">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className={cn('relative mt-10 sm:hidden', tokens.gap, 'space-y-8')}>
          {(styles.showDecorations !== false) && (
            <div
              className="absolute top-0 left-4 h-full w-0.5"
              style={{ backgroundColor: `${branding.primaryColor}30` }}
            />
          )}
          {milestones.map((m, i) => (
            <div key={i} className="relative flex items-start gap-4 pl-1">
              <div
                className="relative z-10 mt-1 h-7 w-7 shrink-0 rounded-full border-4 border-[var(--lp-site-bg)]"
                style={{ backgroundColor: branding.primaryColor }}
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--lp-site-muted)]">
                  {m.date}
                </p>
                <h3 className="mt-1 text-base font-semibold text-[var(--lp-site-heading)]">
                  {m.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--lp-site-body)]">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
