'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function HeroWaitlist({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const badge = (content.badge as string) ?? '';
  const headline = content.headline as string | undefined;
  const subheadline = (content.subheadline as string) ?? 'Be the first to experience the future of product launches. Join our waitlist for early access.';
  const placeholder = (content.placeholder as string) ?? 'you@example.com';
  const ctaText = (content.ctaText as string) ?? 'Join Waitlist';
  const socialProofText = (content.socialProofText as string) ?? '2,000+ founders already signed up';

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const slug = typeof window !== 'undefined'
        ? window.location.pathname.split('/')[2] ?? ''
        : '';
      const res = await fetch(`/api/waitlist/join`, {
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
      data-lp-section="hero-waitlist"
      className="relative overflow-hidden bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      {(styles.showDecorations !== false) && (
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${branding.primaryColor}, transparent 70%)` }}
          aria-hidden="true"
        />
      )}

      <div className={cn('relative z-10 mx-auto', tokens.maxWidth, tokens.textAlign)}>
        {badge && (
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-badge-bg)] px-4 py-1.5 text-sm font-medium text-[var(--lp-site-body)]">
            <span className="inline-block h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: branding.primaryColor }} />
            {badge}
          </span>
        )}

        <h1 className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-extrabold text-[var(--lp-site-heading)] leading-[1.1]')}>
          <span data-lp-brand="company">{headline ?? branding.companyName}</span>
          <span className="mt-2 block text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            <span
              data-lp-brand="tagline"
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${branding.primaryColor}, ${branding.primaryColor}99, ${branding.secondaryColor})` }}
            >
              {branding.tagline}
            </span>
          </span>
        </h1>

        <p className={cn('mx-auto mt-4 max-w-2xl leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
          {subheadline}
        </p>

        {/* Inline waitlist form */}
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="h-12 w-full rounded-xl border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] px-4 text-[var(--lp-site-heading)] placeholder:text-[var(--lp-site-muted)] sm:max-w-xs"
            style={{ outlineColor: branding.primaryColor }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className={cn(
              'h-12 w-full shrink-0 rounded-xl px-8 text-base font-semibold text-white transition-all sm:w-auto',
              'hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0',
              status === 'loading' && 'opacity-70'
            )}
            style={{
              backgroundColor: branding.primaryColor,
              boxShadow: `0 8px 24px -4px ${branding.primaryColor}40`,
            }}
          >
            {status === 'loading' ? 'Joining...' : ctaText}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-3 text-sm font-medium text-green-500">
            You're on the list! We'll be in touch soon.
          </p>
        )}
        {status === 'error' && (
          <p className="mt-3 text-sm font-medium text-red-500">
            Something went wrong. Please try again.
          </p>
        )}

        {socialProofText && status === 'idle' && (
          <p className="mt-4 text-sm text-[var(--lp-site-muted)]">{socialProofText}</p>
        )}
      </div>
    </section>
  );
}
