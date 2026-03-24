import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

export function FeaturesIconGrid({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Features';
  const subtitle = (content.subtitle as string) ?? '';
  const rawFeatures = (content.features ?? []) as Record<string, unknown>[];
  const features: Feature[] = rawFeatures.map((f) => ({
    icon: (f.icon as string) ?? '',
    title: (f.title as string) ?? '',
    description: (f.description as string) ?? '',
  }));

  return (
    <section
      data-lp-section="features-icon-grid"
      className="bg-[var(--lp-site-bg)] px-6 py-16 sm:py-20"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        {(title || subtitle) && (
          <div className={cn('mb-12', tokens.textAlign)}>
            {title && (
              <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn('mt-3 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>
            )}
          </div>
        )}

        <div className={cn('grid', tokens.columns, tokens.gap)}>
          {features.map((f, i) => (
            <div key={i} className={cn('flex flex-col items-center', tokens.textAlign)}>
              <div
                className={cn('flex h-14 w-14 items-center justify-center text-2xl', tokens.borderRadius)}
                style={{ backgroundColor: `${branding.primaryColor}15` }}
              >
                {f.icon || (
                  <svg
                    className="h-6 w-6"
                    style={{ color: branding.primaryColor }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                    />
                  </svg>
                )}
              </div>
              {f.title && (
                <h3 className="mt-4 text-lg font-semibold text-[var(--lp-site-heading)]">
                  {f.title}
                </h3>
              )}
              {f.description && (
                <p className="mt-2 text-sm leading-relaxed text-[var(--lp-site-body)]">
                  {f.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
