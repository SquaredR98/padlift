import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface Logo {
  name: string;
  logoUrl?: string;
}

const DEFAULT_LOGOS: Logo[] = [
  { name: 'Acme Corp' },
  { name: 'TechFlow' },
  { name: 'DataSync' },
  { name: 'CloudBase' },
  { name: 'NexGen AI' },
  { name: 'Quantify' },
];

export function LogoCloud({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = content.title as string ?? 'Trusted by innovative teams';
  const logos = content.logos as Logo[] ?? DEFAULT_LOGOS;
  return (
    <section
      data-lp-section="logo-cloud"
      className="relative border-y border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-bg)] px-6 py-12 sm:py-16"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        {/* Title */}
        <p className={cn('mb-10 text-center font-medium uppercase tracking-wider text-[var(--lp-site-muted)]', tokens.headingSize)}>
          {title}
        </p>

        {/* Logo row */}
        <div className={cn('grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center lg:justify-center', tokens.gap)}>
          {logos.map((logo, i) => (
            <div
              key={i}
              className={cn(
                'flex items-center justify-center opacity-60 transition-opacity duration-200 hover:opacity-100'
              )}
            >
              {logo.logoUrl ? (
                <img src={logo.logoUrl} alt={logo.name} className="h-8 w-auto max-w-30 object-contain" />
              ) : (
                <span
                  className="select-none text-lg font-bold text-[var(--lp-site-dimmed)] sm:text-xl"
                  style={{
                    transition: 'color 0.2s ease',
                  }}
                >
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
