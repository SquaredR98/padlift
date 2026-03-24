'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function WaitlistMultiField({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Join the waitlist';
  const subtitle = (content.subtitle as string) ?? 'Be the first to know when we launch.';
  const namePlaceholder = (content.namePlaceholder as string) ?? 'Your name';
  const emailPlaceholder = (content.emailPlaceholder as string) ?? 'you@example.com';
  const extraFieldLabel = (content.extraFieldLabel as string) ?? '';
  const extraFieldPlaceholder = (content.extraFieldPlaceholder as string) ?? '';
  const ctaText = (content.ctaText as string) ?? 'Join Waitlist';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [extra, setExtra] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const slug = typeof window !== 'undefined' ? window.location.pathname.split('/')[2] ?? '' : '';
      const res = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, extra, siteSlug: slug }),
      });
      if (res.ok) { setStatus('success'); setName(''); setEmail(''); setExtra(''); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <section
      data-lp-section="waitlist-multi-field"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className={cn(tokens.borderRadius, 'border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] p-8', tokens.textAlign)}>
          <h2 className={cn(tokens.headingSize, 'font-bold text-[var(--lp-site-heading)]')}>{title}</h2>
          {subtitle && <p className={cn('mt-2', tokens.bodySize, 'text-[var(--lp-site-body)]')}>{subtitle}</p>}

          {status === 'success' ? (
            <p className="mt-6 text-sm font-medium text-green-500">You're on the list! We'll be in touch soon.</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={namePlaceholder}
                className={cn('h-11 w-full border border-[var(--lp-site-border)] bg-[var(--lp-site-bg)] px-4 text-sm text-[var(--lp-site-heading)] placeholder:text-[var(--lp-site-muted)]', tokens.borderRadius)}
                style={{ outlineColor: branding.primaryColor }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={emailPlaceholder}
                required
                className={cn('h-11 w-full border border-[var(--lp-site-border)] bg-[var(--lp-site-bg)] px-4 text-sm text-[var(--lp-site-heading)] placeholder:text-[var(--lp-site-muted)]', tokens.borderRadius)}
                style={{ outlineColor: branding.primaryColor }}
              />
              {extraFieldLabel && (
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--lp-site-muted)]">{extraFieldLabel}</label>
                  <input
                    type="text"
                    value={extra}
                    onChange={(e) => setExtra(e.target.value)}
                    placeholder={extraFieldPlaceholder}
                    className={cn('h-11 w-full border border-[var(--lp-site-border)] bg-[var(--lp-site-bg)] px-4 text-sm text-[var(--lp-site-heading)] placeholder:text-[var(--lp-site-muted)]', tokens.borderRadius)}
                    style={{ outlineColor: branding.primaryColor }}
                  />
                </div>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className={cn(
                  'h-11 w-full text-sm font-semibold text-white transition-all',
                  tokens.borderRadius,
                  status === 'loading' && 'opacity-70'
                )}
                style={{ backgroundColor: branding.primaryColor }}
              >
                {status === 'loading' ? 'Joining...' : ctaText}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="mt-2 text-xs text-red-500">Something went wrong. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  );
}
