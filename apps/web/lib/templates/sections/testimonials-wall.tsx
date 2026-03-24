import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function TestimonialsWall({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Wall of love';
  const subtitle = (content.subtitle as string) ?? '';
  const testimonials = (content.testimonials as Array<{ quote: string; name: string; role: string; avatar?: string; rating?: number }>) ?? [
    { quote: 'This tool cut our launch time by 80%. Absolutely incredible.', name: 'Sarah Chen', role: 'CEO, TechVenture', rating: 5 },
    { quote: 'The best investment we made this quarter. Hands down.', name: 'Marcus Johnson', role: 'Head of Growth', rating: 5 },
    { quote: 'I shipped my product in a weekend. No exaggeration. The templates are amazing and the editor is so intuitive.', name: 'Priya Patel', role: 'Indie Hacker', rating: 5 },
    { quote: 'Simple, fast, beautiful.', name: 'James Kim', role: 'CTO, CloudBase', rating: 5 },
    { quote: 'Replaced five tools with one platform. Our workflow has never been smoother.', name: 'Emily Davis', role: 'Designer', rating: 5 },
    { quote: 'Outstanding support and product quality.', name: 'Carlos Rivera', role: 'Founder', rating: 4 },
  ];

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4"
          style={{ color: i < rating ? '#facc15' : 'var(--lp-site-border)' }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section
      data-lp-section="testimonials-wall"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className="text-center">
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          {subtitle && <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>}
        </div>

        <div className={cn('mt-12 columns-1 sm:columns-2 lg:columns-3', tokens.gap)}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={cn('mb-4 break-inside-avoid bg-[var(--lp-site-card)] p-5', tokens.borderRadius, tokens.cardStyle)}
            >
              {t.rating != null && t.rating > 0 && (
                <div className="mb-3">{renderStars(t.rating)}</div>
              )}
              <p className="text-sm leading-relaxed text-[var(--lp-site-body)]">"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-2">
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
      </div>
    </section>
  );
}
