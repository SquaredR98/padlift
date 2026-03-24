import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function WaitlistMinimalStatic({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const placeholder = (content.placeholder as string) ?? 'you@example.com';
  const ctaText = (content.ctaText as string) ?? 'Join Waitlist';

  return (
    <section
      data-lp-section="waitlist-minimal"
      className="bg-[var(--lp-site-bg)] px-6 py-10 sm:py-14"
    >
      <div className={cn("mx-auto", tokens.maxWidth)}>
        <form data-lp-waitlist-form className="flex gap-2">
          <input
            type="email"
            placeholder={placeholder}
            required
            className="h-11 flex-1 rounded-xl border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] px-4 text-sm text-[var(--lp-site-heading)] placeholder:text-[var(--lp-site-muted)]"
            style={{ outlineColor: branding.primaryColor }}
          />
          <button
            type="submit"
            className="h-11 shrink-0 rounded-xl px-6 text-sm font-semibold text-white"
            style={{ backgroundColor: branding.primaryColor }}
          >
            {ctaText}
          </button>
        </form>
        <p className="lp-waitlist-note mt-2 text-center text-xs text-[var(--lp-site-muted)]" />
      </div>
    </section>
  );
}
