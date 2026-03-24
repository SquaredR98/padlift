import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function ContentCallout({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const emoji = (content.emoji as string) ?? '💡';
  const title = (content.title as string) ?? 'Did you know?';
  const body = (content.body as string) ?? 'Our platform processes over 10 million requests per day with 99.99% uptime. That means your landing pages are always fast, always available.';
  const variant = (content.variant as string) ?? 'info';

  const borderColor =
    variant === 'success'
      ? '#22c55e'
      : variant === 'warning'
        ? '#f59e0b'
        : branding.primaryColor;

  return (
    <section
      data-lp-section="content-callout"
      className="relative bg-[var(--lp-site-bg)] px-6 py-12 sm:py-16"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div
          className={cn('border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] p-6 sm:p-8', tokens.borderRadius)}
          style={{ borderLeftWidth: '4px', borderLeftColor: borderColor }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{emoji}</span>
            <h3 className={cn(tokens.headingSize, 'font-semibold text-[var(--lp-site-heading)]')}>
              {title}
            </h3>
          </div>
          <p className={cn('leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
