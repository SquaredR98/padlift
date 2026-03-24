import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function ContentSectionHeader({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const badge = (content.badge as string) ?? '';
  const title = (content.title as string) ?? 'Built for the modern web';
  const subtitle = (content.subtitle as string) ?? 'We believe in simplicity, speed, and giving founders the power to launch without a team of engineers.';
  const alignment = (content.alignment as string) ?? 'center';
  const isCenter = alignment === 'center';

  return (
    <section
      data-lp-section="content-section-header"
      className="relative bg-[var(--lp-site-bg)] px-6 py-16 sm:py-20"
    >
      <div className={cn('mx-auto', tokens.maxWidth, tokens.textAlign)}>
        {badge && (
          <div className={cn('mb-4 flex items-center gap-2', isCenter && 'justify-center')}>
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: branding.primaryColor }}
            />
            <span className="text-sm font-medium text-[var(--lp-site-muted)]">
              {badge}
            </span>
          </div>
        )}

        <h2 className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-bold text-[var(--lp-site-heading)]')}>
          {title}
        </h2>

        {subtitle && (
          <p className={cn('mt-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
