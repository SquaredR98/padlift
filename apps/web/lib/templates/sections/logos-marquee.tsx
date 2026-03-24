'use client';

import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function LogosMarquee({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Trusted by innovative teams';
  const logos = (content.logos as Array<{ name: string; logoUrl?: string }>) ?? [
    { name: 'Acme Corp' }, { name: 'TechStart' }, { name: 'CloudBase' },
    { name: 'DataFlow' }, { name: 'BuildCo' }, { name: 'ScaleUp' },
  ];

  const renderLogo = (logo: { name: string; logoUrl?: string }, idx: number) => (
    <div
      key={idx}
      className="flex shrink-0 items-center gap-2"
    >
      {logo.logoUrl ? (
        <img src={logo.logoUrl} alt={logo.name} className="h-8 w-auto object-contain opacity-60 grayscale" />
      ) : (
        <span className="text-lg font-semibold tracking-tight text-[var(--lp-site-muted)]">
          {logo.name}
        </span>
      )}
    </div>
  );

  return (
    <section
      data-lp-section="logos-marquee"
      className="overflow-hidden bg-[var(--lp-site-bg)] py-10 sm:py-14"
    >
      {title && (
        <div className={cn('mx-auto mb-8 px-6', tokens.maxWidth)}>
          <p className={cn('text-center font-medium uppercase tracking-wider text-[var(--lp-site-muted)]', tokens.headingSize)}>
            {title}
          </p>
        </div>
      )}

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--lp-site-bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--lp-site-bg)] to-transparent" />

        <div className={cn('flex animate-[marquee_30s_linear_infinite]', tokens.gap)}>
          {logos.map((logo, i) => renderLogo(logo, i))}
          {logos.map((logo, i) => renderLogo(logo, i + logos.length))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
