import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function WaitlistMultiFieldStatic({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Join the waitlist';
  const subtitle = (content.subtitle as string) ?? 'Be the first to know when we launch.';
  const namePlaceholder = (content.namePlaceholder as string) ?? 'Your name';
  const emailPlaceholder = (content.emailPlaceholder as string) ?? 'you@example.com';
  const extraFieldLabel = (content.extraFieldLabel as string) ?? '';
  const extraFieldPlaceholder = (content.extraFieldPlaceholder as string) ?? '';
  const ctaText = (content.ctaText as string) ?? 'Join Waitlist';

  return (
    <section
      data-lp-section="waitlist-multi-field"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className={cn(tokens.borderRadius, 'border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] p-8', tokens.textAlign)}>
          <h2 className={cn(tokens.headingSize, 'font-bold text-[var(--lp-site-heading)]')}>{title}</h2>
          {subtitle && <p className={cn('mt-2', tokens.bodySize, 'text-[var(--lp-site-body)]')}>{subtitle}</p>}
          <form data-lp-waitlist-form className="mt-6 space-y-3">
            <input
              type="text"
              name="name"
              placeholder={namePlaceholder}
              className={cn('h-11 w-full border border-[var(--lp-site-border)] bg-[var(--lp-site-bg)] px-4 text-sm text-[var(--lp-site-heading)] placeholder:text-[var(--lp-site-muted)]', tokens.borderRadius)}
              style={{ outlineColor: branding.primaryColor }}
            />
            <input
              type="email"
              placeholder={emailPlaceholder}
              required
              className={cn('h-11 w-full border border-[var(--lp-site-border)] bg-[var(--lp-site-bg)] px-4 text-sm text-[var(--lp-site-heading)] placeholder:text-[var(--lp-site-muted)]', tokens.borderRadius)}
              style={{ outlineColor: branding.primaryColor }}
            />
            {extraFieldLabel && (
              <input
                type="text"
                placeholder={extraFieldPlaceholder}
                className={cn('h-11 w-full border border-[var(--lp-site-border)] bg-[var(--lp-site-bg)] px-4 text-sm text-[var(--lp-site-heading)] placeholder:text-[var(--lp-site-muted)]', tokens.borderRadius)}
                style={{ outlineColor: branding.primaryColor }}
              />
            )}
            <button
              type="submit"
              className={cn('h-11 w-full text-sm font-semibold text-white', tokens.borderRadius)}
              style={{ backgroundColor: branding.primaryColor }}
            >
              {ctaText}
            </button>
          </form>
          <p className="lp-waitlist-note mt-2 text-xs text-[var(--lp-site-muted)]" />
        </div>
      </div>
    </section>
  );
}
