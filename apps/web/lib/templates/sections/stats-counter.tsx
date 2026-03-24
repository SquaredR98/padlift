import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface Stat {
  value: string;
  label: string;
}

const DEFAULT_STATS: Stat[] = [
  { value: '500+', label: 'Happy Customers' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '$2M+', label: 'Revenue Processed' },
  { value: '50K+', label: 'API Calls Daily' },
];

export function StatsCounter({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = content.title as string ?? 'Trusted by teams worldwide';
  const stats = content.stats as Stat[] ?? DEFAULT_STATS;
  const { primaryColor } = branding;

  return (
    <section
      data-lp-section="stats-counter"
      className="relative overflow-hidden bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      {/* Subtle background gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${primaryColor}, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Top edge gradient line */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3"
        style={{
          background: `linear-gradient(to right, transparent, ${primaryColor}33, transparent)`,
        }}
      />

      <div className={cn('relative z-10 mx-auto', tokens.maxWidth)}>
        {/* Optional title */}
        {title && (
          <div className={cn('mx-auto mb-14 max-w-2xl', tokens.textAlign)}>
            <h2 data-lp-editable="title" className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
              {title}
            </h2>
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-8 sm:gap-6 lg:flex lg:items-center lg:justify-between">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-6 lg:flex-1">
              {/* Stat content */}
              <div
                className={cn(
                  'flex flex-1 flex-col items-center text-center',
                  'lg:items-center'
                )}
              >
                <span
                  className="text-3xl font-bold tracking-tight sm:text-4xl"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}BB, #e2e8f0)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </span>
                <span className="mt-2 text-sm font-medium text-[var(--lp-site-body)]">
                  {stat.label}
                </span>
              </div>

              {/* Vertical divider (not after last item) */}
              {i < stats.length - 1 && (
                <div className="hidden h-12 w-px bg-[var(--lp-site-border)] lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom edge gradient line */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-2/3"
        style={{
          background: `linear-gradient(to right, transparent, ${primaryColor}33, transparent)`,
        }}
      />
    </section>
  );
}
