import { cn } from '@/lib/utils';
import type { BlockComponentProps } from '../block-types';
import { resolveTokenClasses } from '../block-types';

export function TestimonialsMarqueeStatic({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'What people are saying';
  const subtitle = (content.subtitle as string) ?? '';
  const testimonials = (content.testimonials as Array<{ quote: string; name: string; role: string; avatar?: string }>) ?? [
    { quote: 'This tool cut our launch time by 80%.', name: 'Sarah Chen', role: 'CEO, TechVenture' },
    { quote: 'The best investment we made this quarter.', name: 'Marcus Johnson', role: 'Head of Growth, ScaleUp' },
    { quote: 'I shipped my product in a weekend.', name: 'Priya Patel', role: 'Indie Hacker' },
  ];

  return (
    <section
      data-lp-section="testimonials-marquee"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto text-center', tokens.maxWidth)}>
        <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
          {title}
        </h2>
        {subtitle && <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>}
      </div>

      <div className={cn('mx-auto mt-12 grid', tokens.maxWidth, tokens.columns, tokens.gap)}>
        {testimonials.map((t, i) => (
          <div key={i} className={cn('border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] p-5', tokens.borderRadius, tokens.shadow)}>
            <p className={cn('leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>"{t.quote}"</p>
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
        ))}
      </div>
    </section>
  );
}
