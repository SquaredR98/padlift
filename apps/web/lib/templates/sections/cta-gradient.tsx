import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export default function CtaGradient({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = content.title as string ?? 'Ready to Get Started?';
  const subtitle = content.subtitle as string ?? 'Join thousands of teams already building better products. Start your free trial today \u2014 no credit card required.';
  const ctaPrimary = content.ctaPrimary as string ?? 'Start Free Trial';
  const ctaSecondary = content.ctaSecondary as string ?? 'Talk to Sales';
  const { primaryColor } = branding;

  return (
    <section
      data-lp-section="cta-gradient"
      className="relative bg-[var(--lp-site-bg)] py-20 sm:py-28 overflow-hidden"
    >
      {/* Primary gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to right, transparent, ${primaryColor}1A 50%, transparent)`,
        }}
      />

      {/* Decorative gradient orb - left */}
      <div
        className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 size-96 rounded-full blur-3xl opacity-[0.07]"
        style={{ backgroundColor: primaryColor }}
      />

      {/* Decorative gradient orb - right */}
      <div
        className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 size-96 rounded-full blur-3xl opacity-[0.07]"
        style={{ backgroundColor: primaryColor }}
      />

      {/* Top edge gradient line */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3"
        style={{
          background: `linear-gradient(to right, transparent, ${primaryColor}66, transparent)`,
        }}
      />

      <div className={cn('relative mx-auto px-4 sm:px-6 lg:px-8', tokens.maxWidth, tokens.textAlign)}>
        {/* Title */}
        <h2
          data-lp-brand="heading"
          data-lp-editable="title"
          className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-bold text-[var(--lp-site-heading)]')}
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p
          data-lp-brand="subheading"
          data-lp-editable="subtitle"
          className={cn('mt-5', tokens.bodySize, 'text-[var(--lp-site-body)] leading-relaxed max-w-2xl mx-auto')}
        >
          {subtitle}
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            className={cn('h-12 px-8 text-base font-semibold text-white border-0 hover:-translate-y-0.5 transition-all duration-200', tokens.borderRadius)}
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 4px 20px 0 ${primaryColor}40`,
            }}
          >
            <span data-lp-brand="cta-primary" data-lp-editable="ctaText">{ctaPrimary}</span>
          </Button>

          <Button
            variant="ghost"
            className={cn('h-12 px-8 text-base font-semibold text-[var(--lp-site-body)] border border-[var(--lp-site-border)] bg-transparent hover:bg-[var(--lp-site-card-hover)] hover:text-[var(--lp-site-heading)] hover:-translate-y-0.5 transition-all duration-200', tokens.borderRadius)}
          >
            <span data-lp-brand="cta-secondary">{ctaSecondary}</span>
          </Button>
        </div>
      </div>

      {/* Bottom edge gradient line */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-2/3"
        style={{
          background: `linear-gradient(to right, transparent, ${primaryColor}66, transparent)`,
        }}
      />
    </section>
  );
}
