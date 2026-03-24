'use client';

import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function TestimonialsMarquee({ branding, content, styles }: BlockComponentProps) {
  const title = (content.title as string) ?? 'What people are saying';
  const subtitle = (content.subtitle as string) ?? '';
  const testimonials = (content.testimonials as Array<{ quote: string; name: string; role: string; avatar?: string }>) ?? [
    { quote: 'This tool cut our launch time by 80%.', name: 'Sarah Chen', role: 'CEO, TechVenture' },
    { quote: 'The best investment we made this quarter.', name: 'Marcus Johnson', role: 'Head of Growth, ScaleUp' },
    { quote: 'I shipped my product in a weekend.', name: 'Priya Patel', role: 'Indie Hacker' },
    { quote: 'Incredible product. Highly recommended.', name: 'James Kim', role: 'CTO, CloudBase' },
    { quote: 'Simple, fast, and beautiful.', name: 'Emily Davis', role: 'Designer, PixelCo' },
    { quote: 'Replaced 5 tools with one platform.', name: 'Carlos Rivera', role: 'Founder, LaunchPad' },
  ];

  const tokens = resolveTokenClasses(styles);
  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);

  const renderCard = (t: typeof testimonials[0], idx: number) => (
    <div
      key={idx}
      className={cn("mx-3 w-80 shrink-0 bg-[var(--lp-site-card)] p-5", tokens.borderRadius, tokens.cardStyle)}
    >
      <p className="text-sm leading-relaxed text-[var(--lp-site-body)]">"{t.quote}"</p>
      <div className="mt-3 flex items-center gap-2">
        {t.avatar ? (
          <img src={t.avatar} alt={t.name} className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: branding.primaryColor }}
          >
            {t.name.split(' ').map((n) => n[0]).join('')}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-[var(--lp-site-heading)]">{t.name}</p>
          <p className="text-xs text-[var(--lp-site-muted)]">{t.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section
      data-lp-section="testimonials-marquee"
      className="overflow-hidden bg-[var(--lp-site-bg)] py-20 sm:py-28"
    >
      <div className={cn("mx-auto px-6 text-center", tokens.maxWidth)}>
        <h2 className={cn("font-bold text-[var(--lp-site-heading)]", tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
          {title}
        </h2>
        {subtitle && <p className={cn("mt-4 text-[var(--lp-site-body)]", tokens.bodySize)}>{subtitle}</p>}
      </div>

      <div className="mt-12 space-y-4">
        {/* Row 1 — scroll left */}
        <div className="flex animate-[marquee_40s_linear_infinite]">
          {row1.map((t, i) => renderCard(t, i))}
          {row1.map((t, i) => renderCard(t, i + row1.length))}
        </div>
        {/* Row 2 — scroll right */}
        <div className="flex animate-[marquee-reverse_40s_linear_infinite]">
          {row2.map((t, i) => renderCard(t, i))}
          {row2.map((t, i) => renderCard(t, i + row2.length))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
