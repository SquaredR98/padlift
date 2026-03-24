'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

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

export function CountdownTimer({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = content.title as string ?? 'Something Big is Coming';
  const subtitle = content.subtitle as string ?? "We're working on something incredible. Be the first to know when we launch.";
  const launchDate = content.launchDate as string ?? '2026-06-01';
  const { primaryColor, companyName } = branding;
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [time, setTime] = useState(getTimeLeft(launchDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(launchDate)), 1000);
    return () => clearInterval(id);
  }, [launchDate]);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      data-lp-section="countdown-timer"
      className="relative overflow-hidden bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      {/* Decorative gradient orb */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full opacity-15 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${primaryColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className={cn('relative z-10 mx-auto', tokens.maxWidth)}>
        {/* Section header */}
        <div className={cn('mx-auto mb-14 max-w-2xl', tokens.textAlign)}>
          <h2 data-lp-editable="title" className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-bold text-[var(--lp-site-heading)]')}>
            {title}
          </h2>
          <p data-lp-editable="subtitle" className={cn('mt-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
            {subtitle}
          </p>
        </div>

        {/* Countdown boxes */}
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
                <span className="text-4xl font-bold tabular-nums text-[var(--lp-site-heading)] sm:text-5xl">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="mt-2 text-xs font-medium uppercase tracking-wider text-[var(--lp-site-muted)]">
                  {unit.label}
                </span>
              </div>

              {/* Separator colon (not after last unit) */}
              {i < units.length - 1 && (
                <span className="text-2xl font-bold text-[var(--lp-site-dimmed)] sm:text-3xl">
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Launch date label */}
        <p className="mt-6 text-center text-sm text-[var(--lp-site-muted)]">
          Launching{' '}
          <span className="font-medium text-[var(--lp-site-body)]">{launchDate}</span>
        </p>

        {/* Email capture */}
        <div className="mx-auto mt-12 max-w-md">
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-3 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={cn('h-11 w-full border-[var(--lp-site-border)] bg-[var(--lp-site-card)] text-[var(--lp-site-heading)] placeholder:text-[var(--lp-site-muted)] focus-visible:ring-1 sm:flex-1', tokens.borderRadius)}
                style={{
                  // @ts-expect-error -- CSS custom property
                  '--tw-ring-color': primaryColor,
                }}
              />
              <Button
                type="submit"
                className={cn('h-11 w-full shrink-0 px-6 text-sm font-semibold text-white hover:-translate-y-0.5 transition-all duration-200 sm:w-auto', tokens.borderRadius)}
                style={{
                  backgroundColor: primaryColor,
                  boxShadow: `0 4px 14px 0 ${primaryColor}40`,
                }}
              >
                Notify Me
              </Button>
            </form>
          ) : (
            <div className={cn(tokens.borderRadius, 'border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] px-5 py-4 text-center')}>
              <p className="text-sm font-semibold text-[var(--lp-site-heading)]">
                &#10003; You&apos;re on the list!
              </p>
              <p className="mt-1 text-xs text-[var(--lp-site-body)]">
                We&apos;ll notify you when{' '}
                <span data-lp-brand="company">{companyName}</span> launches.
              </p>
            </div>
          )}
        </div>

        {/* Social proof */}
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
