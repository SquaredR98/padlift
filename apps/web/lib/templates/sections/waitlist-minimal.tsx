'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { BlockComponentProps } from '../block-types';
import { resolveTokenClasses } from '../block-types';

export function WaitlistMinimal({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const placeholder = (content.placeholder as string) ?? 'you@example.com';
  const ctaText = (content.ctaText as string) ?? 'Join Waitlist';
  const successMessage = (content.successMessage as string) ?? "You're on the list!";

  const [email, setEmail] = useState('');
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
        body: JSON.stringify({ email, siteSlug: slug }),
      });
      if (res.ok) { setStatus('success'); setEmail(''); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <section
      data-lp-section="waitlist-minimal"
      className="bg-[var(--lp-site-bg)] px-6 py-10 sm:py-14"
    >
      <div className={cn("mx-auto", tokens.maxWidth)}>
        {status === 'success' ? (
          <p className="text-center text-sm font-medium text-green-500">{successMessage}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="h-11 flex-1 rounded-xl border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] px-4 text-sm text-[var(--lp-site-heading)] placeholder:text-[var(--lp-site-muted)]"
              style={{ outlineColor: branding.primaryColor }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className={cn(
                'h-11 shrink-0 rounded-xl px-6 text-sm font-semibold text-white transition-all',
                status === 'loading' && 'opacity-70'
              )}
              style={{ backgroundColor: branding.primaryColor }}
            >
              {status === 'loading' ? '...' : ctaText}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-2 text-center text-xs text-red-500">Something went wrong. Try again.</p>
        )}
      </div>
    </section>
  );
}
