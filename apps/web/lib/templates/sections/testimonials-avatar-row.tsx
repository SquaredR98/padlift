'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function TestimonialsAvatarRow({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Hear from our customers';
  const testimonials = (content.testimonials as Array<{ quote: string; name: string; role: string; avatar?: string }>) ?? [
    { quote: 'This platform completely changed how we approach launches. What used to take weeks now takes hours.', name: 'Sarah Chen', role: 'CEO, TechVenture' },
    { quote: 'The best investment we made this quarter. Our conversion rate doubled in the first month.', name: 'Marcus Johnson', role: 'Head of Growth, ScaleUp' },
    { quote: 'I shipped my product in a weekend. The templates are gorgeous and the editor is incredibly intuitive.', name: 'Priya Patel', role: 'Indie Hacker' },
  ];

  const [active, setActive] = useState(0);
  const current = testimonials[active] ?? testimonials[0];

  return (
    <section
      data-lp-section="testimonials-avatar-row"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto text-center', tokens.maxWidth)}>
        <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
          {title}
        </h2>

        {/* Avatar row */}
        <div className="mt-10 flex items-center justify-center gap-4">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all"
              style={{
                boxShadow: i === active ? `0 0 0 3px ${branding.primaryColor}` : 'none',
              }}
            >
              {t.avatar ? (
                <img
                  src={t.avatar}
                  alt={t.name}
                  className={`h-14 w-14 rounded-full object-cover transition-opacity ${i === active ? 'opacity-100' : 'opacity-50'}`}
                />
              ) : (
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full text-sm font-medium text-white transition-opacity ${i === active ? 'opacity-100' : 'opacity-50'}`}
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Quote */}
        {current && (
          <div className="mt-8">
            <blockquote className="text-xl leading-relaxed text-[var(--lp-site-heading)] sm:text-2xl">
              "{current.quote}"
            </blockquote>
            <div className="mt-4">
              <p className="font-semibold text-[var(--lp-site-heading)]">{current.name}</p>
              <p className="text-sm text-[var(--lp-site-muted)]">{current.role}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
