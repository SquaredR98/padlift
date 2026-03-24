import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function LogosGrid({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Our Partners';
  const subtitle = (content.subtitle as string) ?? 'Trusted by leading companies worldwide.';
  const logos = (content.logos as Array<{ name: string; logoUrl?: string; href?: string }>) ?? [
    { name: 'Acme Corp' }, { name: 'TechStart' }, { name: 'CloudBase' }, { name: 'DataFlow' },
  ];

  return (
    <section
      data-lp-section="logos-grid"
      className="bg-[var(--lp-site-bg)] px-6 py-16 sm:py-20"
    >
      <div className={cn('mx-auto text-center', tokens.maxWidth)}>
        {title && (
          <h2 className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-bold text-[var(--lp-site-heading)]')}>
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-3 text-base text-[var(--lp-site-body)]">{subtitle}</p>
        )}

        <div className={cn('mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4', tokens.gap)}>
          {logos.map((logo, i) => {
            const inner = (
              <div
                key={i}
                className="flex h-24 items-center justify-center rounded-xl border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] p-4 transition-colors hover:bg-[var(--lp-site-card-hover)]"
              >
                {logo.logoUrl ? (
                  <img src={logo.logoUrl} alt={logo.name} className="h-10 w-auto object-contain opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
                ) : (
                  <span className="text-base font-semibold tracking-tight text-[var(--lp-site-muted)]">
                    {logo.name}
                  </span>
                )}
              </div>
            );

            if (logo.href) {
              return (
                <a key={i} href={logo.href} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              );
            }
            return inner;
          })}
        </div>
      </div>
    </section>
  );
}
