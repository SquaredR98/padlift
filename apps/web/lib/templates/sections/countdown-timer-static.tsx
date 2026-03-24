import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

/**
 * Static SSR version of CountdownTimer for publishing.
 * Renders initial countdown values and adds data-lp-countdown attribute
 * so the client-side script can tick it live.
 */

const AVATAR_INITIALS = ['AK', 'LM', 'RD', 'JS', 'NP'];

function getTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimerStatic({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = content.title as string ?? 'Something Big is Coming';
  const subtitle = content.subtitle as string ?? "We're working on something incredible. Be the first to know when we launch.";
  const launchDate = content.launchDate as string ?? '2026-06-01';
  const { primaryColor, companyName } = branding;

  const time = getTimeLeft(launchDate);
  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <section
      data-lp-section="countdown-timer"
      data-lp-countdown={launchDate}
      className="relative overflow-hidden bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full opacity-15 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${primaryColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className={cn('relative z-10 mx-auto', tokens.maxWidth)}>
        <div className={cn('mx-auto mb-14 max-w-2xl', tokens.textAlign)}>
          <h2 className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-bold text-[var(--lp-site-heading)]')}>
            {title}
          </h2>
          <p className={cn('mt-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
            {subtitle}
          </p>
        </div>

        <div className="mx-auto flex max-w-2xl items-center justify-center gap-3 sm:gap-5">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-3 sm:gap-5">
              <div
                className={cn(
                  'flex flex-col items-center justify-center border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] px-4 py-5 sm:px-7 sm:py-6',
                  tokens.borderRadius,
                  'transition-all duration-200'
                )}
                style={{
                  boxShadow: `0 0 20px -5px ${primaryColor}20, inset 0 1px 0 0 rgba(255,255,255,0.03)`,
                }}
              >
                <span
                  className="text-4xl font-bold tabular-nums text-[var(--lp-site-heading)] sm:text-5xl"
                  data-lp-countdown-unit={unit.label.toLowerCase()}
                >
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="mt-2 text-xs font-medium uppercase tracking-wider text-[var(--lp-site-muted)]">
                  {unit.label}
                </span>
              </div>

              {i < units.length - 1 && (
                <span className="text-2xl font-bold text-[var(--lp-site-dimmed)] sm:text-3xl">
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-[var(--lp-site-muted)]">
          Launching{' '}
          <span className="font-medium text-[var(--lp-site-body)]">{launchDate}</span>
        </p>

        <div className="mx-auto mt-12 max-w-md">
          <form
            data-lp-waitlist-form
            className="flex flex-col items-center gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="you@example.com"
              required
              className={cn('h-11 w-full border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] px-4 text-[var(--lp-site-heading)] placeholder:text-[var(--lp-site-muted)] sm:flex-1', tokens.borderRadius)}
              style={{ outlineColor: primaryColor }}
            />
            <button
              type="submit"
              className={cn('h-11 w-full shrink-0 px-6 text-sm font-semibold text-white hover:-translate-y-0.5 transition-all duration-200 sm:w-auto', tokens.borderRadius)}
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 4px 14px 0 ${primaryColor}40`,
              }}
            >
              Notify Me
            </button>
          </form>
          <p className="lp-waitlist-note mt-3 text-center text-sm text-[var(--lp-site-muted)]" />
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex -space-x-2">
            {AVATAR_INITIALS.map((initials) => (
              <div
                key={initials}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[var(--lp-site-avatar-ring)] bg-[var(--lp-site-card-hover)] text-xs font-medium text-[var(--lp-site-body)]"
              >
                {initials}
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--lp-site-muted)]">
            Join{' '}
            <span className="font-medium text-[var(--lp-site-body)]">2,000+ others</span>{' '}
            waiting for launch
          </p>
        </div>
      </div>
    </section>
  );
}
