import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function HeroAsymmetric({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const headline = content.headline as string | undefined;
  const subheadline = (content.subheadline as string) ?? 'The all-in-one launch platform built for speed.';
  const ctaPrimary = (content.ctaPrimary as string) ?? 'Get Started Free';
  const ctaSecondary = (content.ctaSecondary as string) ?? '';
  const imageUrl = (content.imageUrl as string) ?? '';
  const imagePosition = (content.imagePosition as string) ?? 'right';

  const isImageLeft = imagePosition === 'left';

  return (
    <section
      data-lp-section="hero-asymmetric"
      className="relative overflow-hidden bg-[var(--lp-site-bg)]"
    >
      <div className={cn(
        'mx-auto grid min-h-[80vh] items-center', tokens.maxWidth,
        'lg:grid-cols-[2fr_3fr]',
        isImageLeft && 'lg:grid-cols-[3fr_2fr]',
      )}>
        {/* Text side */}
        <div className={cn(
          'relative z-10 px-6 py-16 sm:py-20',
          isImageLeft ? 'lg:order-2 lg:pl-12' : 'lg:order-1 lg:pr-12',
        )}>
          <h1 className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-extrabold text-[var(--lp-site-heading)] leading-[1.1]')}>
            <span data-lp-brand="company">{headline ?? branding.companyName}</span>
            <span className="mt-2 block text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              <span
                data-lp-brand="tagline"
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${branding.primaryColor}, ${branding.secondaryColor})`,
                }}
              >
                {branding.tagline}
              </span>
            </span>
          </h1>

          <p className={cn('mt-4 max-w-lg leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
            {subheadline}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              className="h-12 rounded-xl px-8 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
              style={{
                backgroundColor: branding.primaryColor,
                boxShadow: `0 8px 30px ${branding.primaryColor}40`,
              }}
            >
              {ctaPrimary}
            </button>
            {ctaSecondary && (
              <button className="h-12 rounded-xl px-8 text-base font-semibold text-[var(--lp-site-body)] hover:text-[var(--lp-site-heading)] hover:bg-[var(--lp-site-ghost-hover)] transition-all">
                {ctaSecondary}
                <span className="ml-1" aria-hidden="true">&rarr;</span>
              </button>
            )}
          </div>
        </div>

        {/* Image side — bleeds to edge */}
        <div className={cn(
          'relative h-full min-h-[400px] lg:min-h-[80vh]',
          isImageLeft ? 'lg:order-1' : 'lg:order-2',
        )}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={headline ?? branding.companyName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background: `linear-gradient(135deg, ${branding.primaryColor}22, ${branding.secondaryColor}22)`,
              }}
            >
              <div className="flex h-full items-center justify-center">
                <svg className="h-20 w-20 text-[var(--lp-site-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
