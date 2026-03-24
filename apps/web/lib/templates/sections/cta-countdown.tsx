'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

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

export function CtaCountdown({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Launching Soon';
  const subtitle = (content.subtitle as string) ?? 'Get in before the deadline.';
  const targetDate = (content.targetDate as string) ?? '2026-06-01';
  const ctaText = (content.ctaText as string) ?? 'Join Now';
  const ctaUrl = (content.ctaUrl as string) ?? '#';

  const [time, setTime] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <section
      data-lp-section="cta-countdown"
      className="bg-[var(--lp-site-bg)] px-6 py-16 sm:py-20"
    >
      <div className={cn('mx-auto', tokens.maxWidth, tokens.textAlign)}>
        {title && (
          <h2 data-lp-editable="title" className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
        )}
        {subtitle && (
          <p data-lp-editable="subtitle" className={cn('mt-3 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>
        )}

        <div className="mt-8 flex items-center justify-center gap-4">
          {units.map((u) => (
            <div key={u.label} className="flex flex-col items-center">
              <div
                className={cn('flex h-16 w-16 items-center justify-center border border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-card)] text-2xl font-bold sm:h-20 sm:w-20 sm:text-3xl', tokens.borderRadius)}
                style={{ color: branding.primaryColor }}
              >
                {String(u.value).padStart(2, '0')}
              </div>
              <span className="mt-2 text-xs font-medium uppercase tracking-wider text-[var(--lp-site-muted)]">
                {u.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <a
            href={ctaUrl}
            className="inline-flex h-12 items-center rounded-xl px-8 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
            style={{
              backgroundColor: branding.primaryColor,
              boxShadow: `0 8px 30px ${branding.primaryColor}40`,
            }}
          >
            <span data-lp-editable="ctaText">{ctaText}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
