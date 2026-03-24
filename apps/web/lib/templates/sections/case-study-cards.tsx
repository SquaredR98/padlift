import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface CaseStudy { logoUrl: string; metric: string; metricLabel: string; story: string; linkUrl: string; linkText: string; }

export function CaseStudyCards({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Customer stories';
  const subtitle = (content.subtitle as string) ?? '';
  const rawStudies = (content.studies ?? []) as Record<string, unknown>[];
  const studies: CaseStudy[] = rawStudies.map((s) => ({
    logoUrl: (s.logoUrl as string) ?? '',
    metric: (s.metric as string) ?? '',
    metricLabel: (s.metricLabel as string) ?? '',
    story: (s.story as string) ?? '',
    linkUrl: (s.linkUrl as string) ?? '',
    linkText: (s.linkText as string) ?? 'Read more',
  }));

  return (
    <section
      data-lp-section="case-study-cards"
      className="bg-[var(--lp-site-bg)] px-6 py-16 sm:py-20"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className="text-center">
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          {subtitle && (
            <p className={cn('mt-3 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>
          )}
        </div>

        <div className={cn('mt-12 grid', tokens.columns, tokens.gap)}>
          {studies.map((study, i) => (
            <div
              key={i}
              className={cn('flex flex-col overflow-hidden bg-[var(--lp-site-card)] p-6 shadow-sm transition-shadow hover:shadow-lg', tokens.borderRadius, tokens.cardStyle)}
            >
              {/* Logo */}
              {study.logoUrl ? (
                <img src={study.logoUrl} alt="" className="mb-4 h-8 w-auto object-contain object-left" />
              ) : (
                <div className="mb-4 h-8 w-24 rounded bg-[var(--lp-site-border-subtle)]" />
              )}

              {/* Key metric */}
              {study.metric && (
                <div className="mb-4">
                  <span
                    className="text-4xl font-extrabold"
                    style={{ color: branding.primaryColor }}
                  >
                    {study.metric}
                  </span>
                  {study.metricLabel && (
                    <span className="ml-2 text-sm font-medium text-[var(--lp-site-muted)]">
                      {study.metricLabel}
                    </span>
                  )}
                </div>
              )}

              {/* Story */}
              <p className="flex-1 text-[var(--lp-site-body)] leading-relaxed">
                {study.story}
              </p>

              {/* Link */}
              {study.linkUrl && (
                <a
                  href={study.linkUrl}
                  className="mt-4 inline-flex items-center text-sm font-semibold transition-colors"
                  style={{ color: branding.primaryColor }}
                >
                  {study.linkText}
                  <span className="ml-1" aria-hidden="true">&rarr;</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
