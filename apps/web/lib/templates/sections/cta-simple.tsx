import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function CtaSimple({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Ready to get started?';
  const subtitle = (content.subtitle as string) ?? 'Join thousands of teams already building better products.';
  const ctaText = (content.ctaText as string) ?? 'Start Free Trial';
  const ctaUrl = (content.ctaUrl as string) ?? '#';

  return (
    <section
      data-lp-section="cta-simple"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth, tokens.textAlign)}>
        <h2 data-lp-editable="title" className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
          {title}
        </h2>
        {subtitle && (
          <p data-lp-editable="subtitle" className={cn('mt-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>
        )}
        <a
          href={ctaUrl}
          className={cn(
            'mt-8 inline-block h-12 px-8 text-base font-semibold leading-[3rem] text-white transition-all',
            'hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0',
            tokens.borderRadius
          )}
          style={{
            backgroundColor: branding.primaryColor,
            boxShadow: `0 8px 30px ${branding.primaryColor}40`,
          }}
        >
          <span data-lp-editable="ctaText">{ctaText}</span>
        </a>
      </div>
    </section>
  );
}
