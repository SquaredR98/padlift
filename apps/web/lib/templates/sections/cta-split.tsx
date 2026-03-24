import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function CtaSplit({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Start building today';
  const subtitle = (content.subtitle as string) ?? 'Everything you need to launch your next product. Start your free trial — no credit card required.';
  const ctaPrimary = (content.ctaPrimary as string) ?? 'Start Free Trial';
  const ctaSecondary = (content.ctaSecondary as string) ?? 'Learn More';
  const imageUrl = (content.imageUrl as string) ?? '';

  return (
    <section
      data-lp-section="cta-split"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className={cn('overflow-hidden border border-[var(--lp-site-border)] bg-[var(--lp-site-card)]', tokens.borderRadius)}>
          <div className="grid lg:grid-cols-2">
            <div className={cn('flex flex-col justify-center p-8 sm:p-12', tokens.textAlign)}>
              <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
                {title}
              </h2>
              <p className={cn('mt-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
                {subtitle}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  className={cn(
                    'h-12 px-8 text-base font-semibold text-white transition-all',
                    'hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0',
                    tokens.borderRadius
                  )}
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  {ctaPrimary}
                </button>
                {ctaSecondary && (
                  <button className={cn('h-12 px-8 text-base font-semibold text-[var(--lp-site-body)] hover:text-[var(--lp-site-heading)] hover:bg-[var(--lp-site-ghost-hover)] transition-all', tokens.borderRadius)}>
                    {ctaSecondary}
                  </button>
                )}
              </div>
            </div>
            <div className="hidden lg:block">
              {imageUrl ? (
                <img src={imageUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <div
                  className="flex h-full min-h-[300px] items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${branding.primaryColor}20, ${branding.secondaryColor}20)`,
                  }}
                >
                  <p className="text-sm text-[var(--lp-site-muted)]">Upload an image</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
