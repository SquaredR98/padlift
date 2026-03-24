import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function ContentTwoColumn({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const leftTitle = (content.leftTitle as string) ?? 'Our Mission';
  const leftBody = (content.leftBody as string) ?? '';
  const rightTitle = (content.rightTitle as string) ?? 'Our Vision';
  const rightBody = (content.rightBody as string) ?? '';
  const divider = (content.divider as string) ?? 'none';

  return (
    <section
      data-lp-section="content-two-column"
      className="bg-[var(--lp-site-bg)] px-6 py-16 sm:py-20"
    >
      <div className={cn('mx-auto grid lg:grid-cols-2', tokens.maxWidth, tokens.gap)}>
        {/* Left column */}
        <div className={tokens.textAlign}>
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {leftTitle}
          </h2>
          <div
            className="mt-2 h-1 w-12 rounded-full"
            style={{ backgroundColor: branding.primaryColor }}
          />
          {leftBody && (
            <div className={cn('mt-4 space-y-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
              {leftBody.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}
        </div>

        {/* Divider */}
        {divider === 'line' && (
          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-[var(--lp-site-border-subtle)]" />
        )}

        {/* Right column */}
        <div className={cn(tokens.textAlign, divider === 'line' ? 'lg:border-l lg:border-[var(--lp-site-border-subtle)] lg:pl-16' : '')}>
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {rightTitle}
          </h2>
          <div
            className="mt-2 h-1 w-12 rounded-full"
            style={{ backgroundColor: branding.secondaryColor }}
          />
          {rightBody && (
            <div className={cn('mt-4 space-y-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
              {rightBody.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
