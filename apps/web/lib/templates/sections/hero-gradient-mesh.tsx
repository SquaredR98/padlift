import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function HeroGradientMesh({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const headline = content.headline as string | undefined;
  const subheadline = (content.subheadline as string) ?? 'The all-in-one launch platform. Landing pages, payments, waitlists, and analytics — one dashboard, zero complexity.';
  const ctaPrimary = (content.ctaPrimary as string) ?? 'Get Started Free';
  const ctaSecondary = (content.ctaSecondary as string) ?? 'Learn More';

  return (
    <section
      data-lp-section="hero-gradient-mesh"
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      {/* Gradient blobs */}
      {(styles.showDecorations !== false) && (<>
        <div
          className="pointer-events-none absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
          style={{ backgroundColor: branding.primaryColor }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: branding.secondaryColor }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-[30%] right-[20%] h-[300px] w-[300px] rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: branding.primaryColor }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-[20%] left-[15%] h-[350px] w-[350px] rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: branding.secondaryColor }}
          aria-hidden="true"
        />
      </>)}

      <div className={cn('relative z-10 mx-auto', tokens.maxWidth, tokens.textAlign)}>
        <h1 className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-extrabold text-[var(--lp-site-heading)] leading-[1.1]')}>
          <span data-lp-brand="company" data-lp-editable="headline">{headline ?? branding.companyName}</span>
          <span className="mt-2 block text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            <span
              data-lp-brand="tagline"
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${branding.primaryColor}, ${branding.primaryColor}99, ${branding.secondaryColor})`,
              }}
            >
              {branding.tagline}
            </span>
          </span>
        </h1>

        <p data-lp-editable="subheadline" className={cn('mx-auto mt-6 max-w-2xl leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
          {subheadline}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            className={cn(
              'h-12 rounded-xl px-8 text-base font-semibold text-white transition-all',
              'hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0'
            )}
            style={{
              backgroundColor: branding.primaryColor,
              boxShadow: `0 8px 30px ${branding.primaryColor}40`,
            }}
            data-lp-editable="ctaPrimary"
          >
            {ctaPrimary}
          </button>
          <button data-lp-editable="ctaSecondary" className="h-12 rounded-xl px-8 text-base font-semibold text-[var(--lp-site-body)] hover:text-[var(--lp-site-heading)] hover:bg-[var(--lp-site-ghost-hover)] transition-all">
            {ctaSecondary}
            <span className="ml-1" aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
