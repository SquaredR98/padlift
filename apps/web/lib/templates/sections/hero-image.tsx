import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function HeroImage({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const badge = (content.badge as string) ?? '';
  const headline = content.headline as string | undefined;
  const subheadline = (content.subheadline as string) ?? 'The all-in-one launch platform. Landing pages, payments, waitlists, and analytics — one dashboard, zero complexity.';
  const ctaPrimary = (content.ctaPrimary as string) ?? 'Get Started Free';
  const ctaSecondary = (content.ctaSecondary as string) ?? 'See how it works';
  const screenshotUrl = (content.screenshotUrl as string) ?? '';

  return (
    <section
      data-lp-section="hero-image"
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
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-badge-bg)] px-4 py-1.5 text-sm font-medium text-[var(--lp-site-body)]">
            <span
              className="inline-block h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: branding.primaryColor }}
            />
            {badge}
          </span>
        )}

        <h1 className={cn("font-extrabold text-[var(--lp-site-heading)] leading-[1.1]", tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
          <span data-lp-brand="company">{headline ?? branding.companyName}</span>
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

        <p className={cn("mx-auto mt-4 max-w-2xl leading-relaxed text-[var(--lp-site-body)]", tokens.bodySize)}>
          {subheadline}
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
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
          <button className="h-12 rounded-xl px-8 text-base font-semibold text-[var(--lp-site-body)] hover:text-[var(--lp-site-heading)] hover:bg-[var(--lp-site-ghost-hover)] transition-all">
            {ctaSecondary}
            <span className="ml-1" aria-hidden="true">&rarr;</span>
          </button>
        </div>

        {/* Browser mockup frame */}
        <div className="mt-12 mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-xl border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] shadow-2xl">
            {/* Browser toolbar */}
            <div className="flex items-center gap-2 border-b border-[var(--lp-site-border)] bg-[var(--lp-site-card-hover)] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <div className="h-3 w-3 rounded-full bg-green-400/80" />
              </div>
              <div className="mx-auto flex-1 max-w-xs">
                <div className="h-5 rounded bg-[var(--lp-site-bg)] px-3 text-center text-xs leading-5 text-[var(--lp-site-muted)]">
                  yourapp.com
                </div>
              </div>
              <div className="w-[52px]" />
            </div>
            {/* Screenshot */}
            <div className="aspect-[16/10]">
              {screenshotUrl ? (
                <img
                  src={screenshotUrl}
                  alt="Product screenshot"
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[var(--lp-site-bg)]">
                  <p className="text-sm text-[var(--lp-site-muted)]">
                    Upload a product screenshot
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
