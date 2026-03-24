import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function HeroSplit({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const headline = content.headline as string | undefined;
  const subheadline = content.subheadline as string ?? 'Build, launch, and grow your product with everything you need in one place. No more juggling a dozen different tools.';
  const ctaPrimary = content.ctaPrimary as string ?? 'Start Building Free';
  const ctaSecondary = content.ctaSecondary as string ?? 'Watch Demo';
  const heroImageUrl = content.heroImageUrl as string | undefined;
  return (
    <section
      data-lp-section="hero-split"
      className="relative overflow-hidden bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      {/* Subtle gradient background */}
      {(styles.showDecorations !== false) && (
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 20% 40%, ${branding.primaryColor}15, transparent), radial-gradient(ellipse 60% 40% at 80% 60%, ${branding.secondaryColor}15, transparent)`,
          }}
          aria-hidden="true"
        />
      )}

      <div className={cn("relative z-10 mx-auto flex flex-col items-center gap-12 lg:flex-row lg:gap-16", tokens.maxWidth)}>
        {/* Left: text content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className={cn("font-extrabold text-[var(--lp-site-heading)] leading-[1.1]", tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            <span data-lp-brand="company" data-lp-editable="headline">{headline ?? branding.companyName}</span>
            <span className="mt-2 block">
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

          <p data-lp-editable="subheadline" className={cn("mt-6 max-w-xl leading-relaxed text-[var(--lp-site-body)] lg:mx-0 mx-auto", tokens.bodySize)}>
            {subheadline}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start justify-center">
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

          {/* Social proof dots */}
          <div className="mt-8 flex items-center gap-3 lg:justify-start justify-center">
            <div className="flex -space-x-2">
              {['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'].map((bg, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--lp-site-avatar-ring)] text-xs font-bold text-white',
                    bg
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-[var(--lp-site-muted)]">
              Trusted by <span className="font-semibold text-[var(--lp-site-body)]">2,000+</span> founders
            </p>
          </div>
        </div>

        {/* Right: image or decorative placeholder */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none">
          <div className="relative rounded-2xl border border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-card)] p-1 backdrop-blur-sm">
            {/* Gradient border glow */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-50"
              style={{
                background: `linear-gradient(135deg, ${branding.primaryColor}30, transparent 50%, ${branding.secondaryColor}30)`,
              }}
              aria-hidden="true"
            />

            {heroImageUrl ? (
              <img
                src={heroImageUrl}
                alt="Product screenshot"
                className="relative w-full rounded-xl"
              />
            ) : (
              <div className="relative rounded-xl bg-[var(--lp-site-card)] p-6 sm:p-8">
                {/* Mock product UI */}
                <div className="space-y-4">
                  {/* Fake top bar */}
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/60" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                    <div className="h-3 w-3 rounded-full bg-green-500/60" />
                    <div className="ml-4 h-4 flex-1 rounded bg-[var(--lp-site-card-hover)]" />
                  </div>

                  {/* Fake sidebar + content */}
                  <div className="flex gap-4">
                    <div className="flex w-28 shrink-0 flex-col gap-2">
                      {[60, 80, 45, 70, 55].map((w, i) => (
                        <div
                          key={i}
                          className="h-3 rounded bg-[var(--lp-site-card-hover)]"
                          style={{ width: `${w}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div
                        className="h-24 rounded-lg opacity-20"
                        style={{
                          background: `linear-gradient(135deg, ${branding.primaryColor}, ${branding.secondaryColor})`,
                        }}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-16 rounded-lg bg-[var(--lp-site-card-hover)]" />
                        <div className="h-16 rounded-lg bg-[var(--lp-site-card-hover)]" />
                      </div>
                      <div className="flex gap-3">
                        <div className="h-10 flex-1 rounded-lg bg-[var(--lp-site-card-hover)]" />
                        <div
                          className="h-10 w-24 shrink-0 rounded-lg opacity-60"
                          style={{ backgroundColor: branding.primaryColor }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Floating decorative elements */}
          {(styles.showDecorations !== false) && (
            <>
              <div
                className="absolute -top-4 -right-4 h-20 w-20 rounded-2xl opacity-10 blur-2xl"
                style={{ backgroundColor: branding.primaryColor }}
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-4 -left-4 h-16 w-16 rounded-2xl opacity-10 blur-2xl"
                style={{ backgroundColor: branding.secondaryColor }}
                aria-hidden="true"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
