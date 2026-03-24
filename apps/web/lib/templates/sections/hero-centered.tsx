import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function HeroCentered({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const badge = content.badge as string ?? 'Now in Public Beta';
  const headline = content.headline as string | undefined;
  const subheadline = content.subheadline as string ?? 'The all-in-one launch platform. Landing pages, payments, waitlists, and analytics — one dashboard, zero complexity.';
  const ctaPrimary = content.ctaPrimary as string ?? 'Get Started Free';
  const ctaSecondary = content.ctaSecondary as string ?? 'See how it works';
  const heroImageUrl = content.heroImageUrl as string | undefined;
  return (
    <section
      data-lp-section="hero-centered"
      className="relative flex items-center justify-center overflow-hidden bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      {/* Decorative gradient orb */}
      {(styles.showDecorations !== false) && (
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${branding.primaryColor}, transparent 70%)` }}
          aria-hidden="true"
        />
      )}

      <div className={cn('relative z-10 mx-auto', tokens.maxWidth, tokens.textAlign)}>
        {/* Badge */}
        {badge && (
          <Badge
            variant="outline"
            className={cn(
              'mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-badge-bg)] px-4 py-1.5 text-sm font-medium text-[var(--lp-site-body)] backdrop-blur-sm',
              'hover:bg-[var(--lp-site-ghost-hover)] transition-colors'
            )}
          >
            <span
              className="inline-block h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: branding.primaryColor }}
            />
            <span data-lp-editable="badge">{badge}</span>
          </Badge>
        )}

        {/* Headline */}
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

        {/* Subheadline */}
        <p data-lp-editable="subheadline" className={cn('mx-auto mt-4 max-w-2xl leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
          {subheadline}
        </p>

        {/* CTAs */}
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            data-lp-editable="ctaPrimary"
            size="lg"
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
          </Button>
          <Button
            data-lp-editable="ctaSecondary"
            variant="ghost"
            size="lg"
            className="h-12 rounded-xl px-8 text-base font-semibold text-[var(--lp-site-body)] hover:text-[var(--lp-site-heading)] hover:bg-[var(--lp-site-ghost-hover)] transition-all"
          >
            {ctaSecondary}
            <span className="ml-1" aria-hidden="true">&rarr;</span>
          </Button>
        </div>

        {/* Hero image */}
        {heroImageUrl && (
          <div className="mt-8 mx-auto max-w-4xl">
            <div className="relative rounded-2xl border border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-card)] p-1 backdrop-blur-sm overflow-hidden">
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-50"
                style={{
                  background: `linear-gradient(135deg, ${branding.primaryColor}30, transparent 50%, ${branding.secondaryColor}30)`,
                }}
                aria-hidden="true"
              />
              <img
                src={heroImageUrl}
                alt="Product screenshot"
                className="relative w-full rounded-xl"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
