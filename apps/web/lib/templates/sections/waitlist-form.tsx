'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { BlockComponentProps } from '../block-types';
import { resolveTokenClasses } from '../block-types';

const AVATAR_INITIALS = ['JK', 'SR', 'AL', 'MP', 'TC'];

export function WaitlistForm({ branding, content, styles }: BlockComponentProps) {
  const title = content.title as string ?? 'Get early access';
  const subtitle = content.subtitle as string ?? 'Be the first to know when we launch. No spam, just one email on launch day.';
  const placeholder = content.placeholder as string ?? 'you@example.com';
  const ctaText = content.ctaText as string ?? 'Join the Waitlist';
  const { primaryColor, companyName } = branding;
  const tokens = resolveTokenClasses(styles);

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      data-lp-section="waitlist-form"
      className="bg-[var(--lp-site-bg)] py-20 sm:py-28"
    >
      <div className={cn("mx-auto px-6", tokens.maxWidth, tokens.textAlign)}>
        {/* Header */}
        <h2 data-lp-editable="title" className={cn("font-bold text-[var(--lp-site-heading)]", tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
          {title}
        </h2>
        {subtitle && (
          <p data-lp-editable="subtitle" className={cn("mx-auto mt-4 max-w-lg text-[var(--lp-site-body)]", tokens.bodySize)}>
            {subtitle}
          </p>
        )}

        {/* Form */}
        {!submitted ? (
          <form
            data-lp-waitlist-form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Input
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={cn("h-12 w-full border-[var(--lp-site-border)] bg-[var(--lp-site-card)] text-[var(--lp-site-heading)] placeholder:text-[var(--lp-site-muted)] focus-visible:ring-1 sm:max-w-xs", tokens.borderRadius)}
              style={{
                // @ts-expect-error -- CSS custom property
                '--tw-ring-color': primaryColor,
              }}
            />
            <Button
              type="submit"
              className={cn("h-12 w-full shrink-0 px-8 text-base font-semibold text-white sm:w-auto", tokens.borderRadius)}
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 8px 24px -4px ${primaryColor}40`,
              }}
            >
              {ctaText}
            </Button>
            <p className="mt-2 w-full text-center text-[10px] text-[var(--lp-site-muted)] sm:text-left">By joining, you agree to receive updates. No spam.</p>
          </form>
        ) : (
          <div className={cn("mt-10 border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] px-6 py-8", tokens.borderRadius)}>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-2xl">
              &#10003;
            </div>
            <p className="text-lg font-semibold text-[var(--lp-site-heading)]">
              You&apos;re on the list!
            </p>
            <p className="mt-1 text-sm text-[var(--lp-site-body)]">
              We&apos;ll send you an email when{' '}
              <span data-lp-brand="company">{companyName}</span> is ready.
            </p>
          </div>
        )}

        {/* Social proof */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex -space-x-2">
            {AVATAR_INITIALS.map((initials) => (
              <div
                key={initials}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--lp-site-avatar-ring)] bg-[var(--lp-site-card-hover)] text-xs font-medium text-[var(--lp-site-body)]"
              >
                {initials}
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--lp-site-muted)]">
            Join{' '}
            <span className="font-medium text-[var(--lp-site-body)]">2,000+ founders</span>{' '}
            already on the waitlist for{' '}
            <span data-lp-brand="company" className="font-medium text-[var(--lp-site-body)]">
              {companyName}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
