import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface Feature {
  title: string;
  description: string;
  imageUrl: string;
}

export function FeaturesStickyScrollStatic({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Features';
  const subtitle = (content.subtitle as string) ?? '';
  const rawFeatures = (content.features ?? []) as Record<string, unknown>[];
  const features: Feature[] = rawFeatures.map((f) => ({
    title: (f.title as string) ?? '',
    description: (f.description as string) ?? '',
    imageUrl: (f.imageUrl as string) ?? '',
  }));

  return (
    <section
      data-lp-section="features-sticky-scroll"
      className="bg-[var(--lp-site-bg)] px-6 py-16 sm:py-20"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        {(title || subtitle) && (
          <div className="mb-12 text-center">
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

        <div className="flex flex-col gap-12">
          {features.map((f, i) => (
            <div
              key={i}
              className="grid items-center gap-8 lg:grid-cols-2"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--lp-site-heading)]">
                      {f.title}
                    </h3>
                    {f.description && (
                      <p className="mt-2 text-[var(--lp-site-body)] leading-relaxed">
                        {f.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <div className={cn('overflow-hidden border border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-card)]', tokens.borderRadius)}>
                  {f.imageUrl ? (
                    <img
                      src={f.imageUrl}
                      alt={f.title}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  ) : (
                    <div
                      className="flex aspect-[4/3] items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${branding.primaryColor}11, ${branding.secondaryColor}11)`,
                      }}
                    >
                      <svg
                        className="h-10 w-10 text-[var(--lp-site-muted)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
