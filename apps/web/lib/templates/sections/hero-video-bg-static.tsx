import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function HeroVideoBgStatic({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const headline = content.headline as string | undefined;
  const subheadline = (content.subheadline as string) ?? 'Experience the future of product launches.';
  const ctaPrimary = (content.ctaPrimary as string) ?? 'Get Started Free';
  const ctaSecondary = (content.ctaSecondary as string) ?? '';
  const posterImage = (content.posterImage as string) ?? '';
  const overlayOpacity = (content.overlayOpacity as number) ?? 50;

  return (
    <section
      data-lp-section="hero-video-bg"
      className="relative min-h-[80vh] overflow-hidden"
    >
      {/* Poster image as background for SSR */}
      {posterImage ? (
        <img
          src={posterImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${branding.primaryColor}44, ${branding.secondaryColor}44)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className={cn('relative z-10 mx-auto flex min-h-[80vh] flex-col items-center justify-center px-6 py-20 sm:py-28', tokens.maxWidth, tokens.textAlign)}>
        <h1 className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-extrabold text-white leading-[1.1]')}>
          <span data-lp-brand="company">{headline ?? branding.companyName}</span>
          <span className="mt-2 block text-4xl font-extrabold sm:text-5xl lg:text-6xl">
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

        <p className={cn('mx-auto mt-4 max-w-2xl leading-relaxed text-white/80', tokens.bodySize)}>
          {subheadline}
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
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
            <button className="h-12 rounded-xl border border-white/30 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">
              {ctaSecondary}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
