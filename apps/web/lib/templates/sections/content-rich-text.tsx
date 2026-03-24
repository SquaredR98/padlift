import { cn } from '@/lib/utils';
import { resolveTokenClasses } from '../block-types';
import type { BlockComponentProps } from '../block-types';

export function ContentRichText({ branding, content, styles }: BlockComponentProps) {
  const title = (content.title as string) ?? 'About Us';
  const body = (content.body as string) ?? 'We are building the future of product launches. Our mission is to give every founder the tools they need to go from idea to revenue — fast.\n\nWith a focus on simplicity and speed, we help teams validate ideas, capture demand, and start selling in minutes instead of months.';
  const imageUrl = (content.imageUrl as string) ?? '';
  const imagePosition = (content.imagePosition as string) ?? 'none';

  const paragraphs = body.split('\n').filter(Boolean);
  const hasImage = imageUrl && imagePosition !== 'none';
  const isSideImage = imagePosition === 'left' || imagePosition === 'right';
  const tokens = resolveTokenClasses(styles);

  return (
    <section
      data-lp-section="content-rich-text"
      className="relative bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        {/* Top image layout */}
        {hasImage && imagePosition === 'top' && (
          <div className={cn('mb-10 overflow-hidden border border-[var(--lp-site-border)]', tokens.borderRadius)}>
            <img
              src={imageUrl}
              alt=""
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div
          className={cn(
            isSideImage && 'grid gap-12 lg:grid-cols-2 lg:items-center',
          )}
        >
          {/* Image left */}
          {hasImage && imagePosition === 'left' && (
            <div className={cn('overflow-hidden border border-[var(--lp-site-border)]', tokens.borderRadius)}>
              <img
                src={imageUrl}
                alt=""
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Text content */}
          <div className={cn(!isSideImage && 'mx-auto max-w-3xl', tokens.textAlign)}>
            {title && (
              <h2 className={cn('mb-6 font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
                {title}
              </h2>
            )}
            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={cn('leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Image right */}
          {hasImage && imagePosition === 'right' && (
            <div className={cn('overflow-hidden border border-[var(--lp-site-border)]', tokens.borderRadius)}>
              <img
                src={imageUrl}
                alt=""
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
