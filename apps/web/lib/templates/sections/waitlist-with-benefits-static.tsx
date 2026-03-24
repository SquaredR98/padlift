import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function WaitlistWithBenefitsStatic({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Get early access';
  const subtitle = (content.subtitle as string) ?? 'Join our waitlist and be the first to try the platform.';
  const placeholder = (content.placeholder as string) ?? 'you@example.com';
  const ctaText = (content.ctaText as string) ?? 'Join Waitlist';
  const benefits = (content.benefits as Array<{ text: string }>) ?? [
    { text: 'Early access to all features' },
    { text: 'Founding member pricing' },
    { text: 'Priority support' },
    { text: 'Shape the product roadmap' },
  ];

  return (
    <section
      data-lp-section="waitlist-with-benefits"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto grid items-center gap-12 lg:grid-cols-2', tokens.maxWidth)}>
        <div className={tokens.textAlign}>
          <h2 className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-bold text-[var(--lp-site-heading)]')}>
            {title}
          </h2>
          {subtitle && <p className={cn('mt-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>}
          <form data-lp-waitlist-form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder={placeholder}
              required
              className={cn('h-12 flex-1 border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] px-4 text-[var(--lp-site-heading)] placeholder:text-[var(--lp-site-muted)]', tokens.borderRadius)}
              style={{ outlineColor: branding.primaryColor }}
            />
            <button
              type="submit"
              className={cn('h-12 shrink-0 px-8 text-base font-semibold text-white', tokens.borderRadius)}
              style={{ backgroundColor: branding.primaryColor }}
            >
              {ctaText}
            </button>
          </form>
          <p className="lp-waitlist-note mt-2 text-sm text-[var(--lp-site-muted)]" />
        </div>
        <div className="space-y-4">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${branding.primaryColor}15` }}
              >
                <svg className="h-3.5 w-3.5" style={{ color: branding.primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-base text-[var(--lp-site-body)]">{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
