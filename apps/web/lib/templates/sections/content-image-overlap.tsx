import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function ContentImageOverlap({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Our Story';
  const body = (content.body as string) ?? '';
  const imageUrl = (content.imageUrl as string) ?? '';
  const textPosition = (content.textPosition as string) ?? 'right';

  return (
    <section
      data-lp-section="content-image-overlap"
      className="bg-[var(--lp-site-bg)] px-6 py-16 sm:py-24"
    >
      <div className={cn('relative mx-auto', tokens.maxWidth)}>
        <div className={cn(
          'grid items-center gap-8 lg:grid-cols-2 lg:gap-0',
        )}>
          {/* Image — takes full height and overlaps */}
          <div className={cn(
            'relative z-0',
            textPosition === 'right' ? 'lg:order-1' : 'lg:order-2',
          )}>
            <div className={cn('overflow-hidden shadow-2xl', tokens.borderRadius)}>
              {imageUrl ? (
                <img src={imageUrl} alt={title} className="w-full" />
              ) : (
                <div
                  className="flex aspect-[4/3] items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${branding.primaryColor}22, ${branding.secondaryColor}22)` }}
                >
                  <svg className="h-16 w-16 text-[var(--lp-site-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Text card — overlaps image */}
          <div className={cn(
            'relative z-10',
            textPosition === 'right' ? 'lg:order-2 lg:-ml-16' : 'lg:order-1 lg:-mr-16',
          )}>
            <div className="rounded-2xl border border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-card)] p-8 shadow-xl sm:p-10">
              <h2 className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-bold text-[var(--lp-site-heading)]')}>
                {title}
              </h2>
              {body && (
                <div className={cn('mt-4 space-y-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
                  {body.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
              <div
                className="mt-6 h-1 w-16 rounded-full"
                style={{ backgroundColor: branding.primaryColor }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
