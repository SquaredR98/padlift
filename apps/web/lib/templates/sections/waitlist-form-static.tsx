import { createElement } from 'react';
import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

/**
 * Static SSR version of WaitlistForm for publishing.
 * Renders the form HTML without useState/client hooks.
 * The vanilla JS handler in render-site.ts picks up data-lp-waitlist-form.
 */

const AVATAR_INITIALS = ['JK', 'SR', 'AL', 'MP', 'TC'];

export function WaitlistFormStatic({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = content.title as string ?? 'Get early access';
  const subtitle = content.subtitle as string ?? 'Be the first to know when we launch. No spam, just one email on launch day.';
  const placeholder = content.placeholder as string ?? 'you@example.com';
  const ctaText = content.ctaText as string ?? 'Join the Waitlist';
  const { primaryColor, companyName } = branding;

  return (
    <section
      data-lp-section="waitlist-form"
      className="bg-[var(--lp-site-bg)] py-20 sm:py-28"
    >
      <div className={cn("mx-auto px-6", tokens.maxWidth, tokens.textAlign)}>
        <h2 className={cn("font-bold text-[var(--lp-site-heading)]", tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
          {title}
        </h2>
        {subtitle && (
          <p className={cn("mx-auto mt-4 max-w-lg text-[var(--lp-site-body)]", tokens.bodySize)}>
            {subtitle}
          </p>
        )}

        <form
          data-lp-waitlist-form
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <input
            type="email"
            placeholder={placeholder}
            required
            className={cn("h-12 w-full border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] px-4 text-[var(--lp-site-heading)] placeholder:text-[var(--lp-site-muted)] sm:max-w-xs", tokens.borderRadius)}
            style={{ outlineColor: primaryColor }}
          />
          <button
            type="submit"
            className={cn("h-12 w-full shrink-0 px-8 text-base font-semibold text-white sm:w-auto", tokens.borderRadius)}
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 8px 24px -4px ${primaryColor}40`,
            }}
          >
            {ctaText}
          </button>
        </form>

        <p className="lp-waitlist-note mt-4 text-sm text-[var(--lp-site-muted)]" />

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex -space-x-2">
            {AVATAR_INITIALS.map((initials) => (
              <div
                key={initials}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--lp-site-avatar-ring)] bg-[var(--lp-site-card-hover)] text-xs font-medium text-[var(--lp-site-body)]"
              >
                {initials}
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--lp-site-muted)]">
            Join{' '}
            <span className="font-medium text-[var(--lp-site-body)]">2,000+ founders</span>{' '}
            already on the waitlist for{' '}
            <span data-lp-brand="company" className="font-medium text-[var(--lp-site-body)]">
              {companyName}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
