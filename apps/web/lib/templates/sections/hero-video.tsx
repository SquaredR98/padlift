import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function HeroVideo({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const badge = (content.badge as string) ?? '';
  const headline = content.headline as string | undefined;
  const subheadline = (content.subheadline as string) ?? 'See our product in action. Watch how teams are shipping faster than ever.';
  const ctaPrimary = (content.ctaPrimary as string) ?? 'Get Started Free';
  const ctaSecondary = (content.ctaSecondary as string) ?? 'Learn More';
  const videoUrl = (content.videoUrl as string) ?? '';
  const videoThumbnail = (content.videoThumbnail as string) ?? '';

  return (
    <section
      data-lp-section="hero-video"
      className="relative overflow-hidden bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      {(styles.showDecorations !== false) && (
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${branding.primaryColor}, transparent 70%)` }}
          aria-hidden="true"
        />
      )}

      <div className={cn("relative z-10 mx-auto", tokens.maxWidth, tokens.textAlign)}>
        {badge && (
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-badge-bg)] px-4 py-1.5 text-sm font-medium text-[var(--lp-site-body)]"
          >
            <span
              className="inline-block h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: branding.primaryColor }}
            />
            <span data-lp-editable="badge">{badge}</span>
          </span>
        )}

        <h1 className={cn("font-extrabold text-[var(--lp-site-heading)] leading-[1.1]", tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
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

        <p data-lp-editable="subheadline" className={cn("mx-auto mt-4 max-w-2xl leading-relaxed text-[var(--lp-site-body)]", tokens.bodySize)}>
          {subheadline}
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            data-lp-editable="ctaPrimary"
            className={cn(
              'h-12 rounded-xl px-8 text-base font-semibold text-white transition-all',
              'hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0'
            )}
            style={{
              backgroundColor: branding.primaryColor,
              boxShadow: `0 8px 30px ${branding.primaryColor}40`,
            }}
          >
            {ctaPrimary}
          </button>
          <button
            className="h-12 rounded-xl px-8 text-base font-semibold text-[var(--lp-site-body)] hover:text-[var(--lp-site-heading)] hover:bg-[var(--lp-site-ghost-hover)] transition-all"
          >
            {ctaSecondary}
            <span className="ml-1" aria-hidden="true">&rarr;</span>
          </button>
        </div>

        {/* Video container */}
        <div className="mt-12 mx-auto max-w-3xl">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-card)] shadow-2xl">
            {videoUrl ? (
              <iframe
                src={videoUrl}
                title="Product video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : videoThumbnail ? (
              <>
                <img
                  src={videoThumbnail}
                  alt="Video thumbnail"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="mt-3 text-sm text-[var(--lp-site-muted)]">
                    Add a video URL or thumbnail
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
