import { cn } from '@/lib/utils';
import type { BlockComponentProps } from '../block-types';
import { resolveTokenClasses } from '../block-types';

export function LogosMarqueeStatic({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Trusted by innovative teams';
  const logos = (content.logos as Array<{ name: string; logoUrl?: string }>) ?? [
    { name: 'Acme Corp' }, { name: 'TechStart' }, { name: 'CloudBase' },
    { name: 'DataFlow' }, { name: 'BuildCo' }, { name: 'ScaleUp' },
  ];

  return (
    <section
      data-lp-section="logos-marquee"
      className="overflow-hidden bg-[var(--lp-site-bg)] py-10 sm:py-14"
    >
      {title && (
        <p className={cn('mb-8 text-center font-medium uppercase tracking-wider text-[var(--lp-site-muted)]', tokens.headingSize)}>
          {title}
        </p>
      )}

      <div className={cn('mx-auto flex flex-wrap items-center justify-center px-6', tokens.maxWidth, tokens.gap)}>
        {logos.map((logo, i) => (
          <div key={i} className="flex items-center gap-2">
            {logo.logoUrl ? (
              <img src={logo.logoUrl} alt={logo.name} className="h-8 w-auto object-contain opacity-60 grayscale" />
            ) : (
              <span className="text-lg font-semibold tracking-tight text-[var(--lp-site-muted)]">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
