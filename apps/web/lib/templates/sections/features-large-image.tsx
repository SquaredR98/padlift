import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function FeaturesLargeImage({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'See it in action';
  const description = (content.description as string) ?? '';
  const imageUrl = (content.imageUrl as string) ?? '';
  const bullets = ((content.bullets as string) ?? '').split('\n').filter(Boolean);
  const imagePosition = (content.imagePosition as string) ?? 'right';

  const imageEl = (
    <div className={cn('relative overflow-hidden border border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-card)] shadow-xl', tokens.borderRadius)}>
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full" />
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center bg-[var(--lp-site-card)]">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-[var(--lp-site-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
            <p className="mt-2 text-sm text-[var(--lp-site-muted)]">Add product screenshot</p>
          </div>
        </div>
      )}
    </div>
  );

  const textEl = (
    <div className="flex flex-col justify-center">
      <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>{description}</p>
      )}
      {bullets.length > 0 && (
        <ul className="mt-6 space-y-3">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg
                className="mt-1 h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: branding.primaryColor }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[var(--lp-site-body)]">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <section
      data-lp-section="features-large-image"
      className="bg-[var(--lp-site-bg)] px-6 py-16 sm:py-20"
    >
      <div className={cn(
        'mx-auto grid items-center gap-12',
        tokens.maxWidth,
        'lg:grid-cols-[3fr_2fr]',
        imagePosition === 'left' && 'lg:grid-cols-[3fr_2fr]',
        imagePosition === 'right' && 'lg:grid-cols-[2fr_3fr]',
      )}>
        {imagePosition === 'left' ? (
          <>{imageEl}{textEl}</>
        ) : (
          <>{textEl}{imageEl}</>
        )}
      </div>
    </section>
  );
}
