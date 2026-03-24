import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function CtaBanner({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Ready to launch your product?';
  const ctaText = (content.ctaText as string) ?? 'Get Started Free';
  const ctaUrl = (content.ctaUrl as string) ?? '#';

  return (
    <section
      data-lp-section="cta-banner"
      className="px-6 py-6"
      style={{ backgroundColor: branding.primaryColor }}
    >
      <div className={cn('mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row', tokens.maxWidth)}>
        <h2 className={cn('font-bold text-white', tokens.headingSize)}>{title}</h2>
        <a
          href={ctaUrl}
          className={cn('shrink-0 border-2 border-white/30 bg-white/10 px-8 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20', tokens.borderRadius)}
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}
