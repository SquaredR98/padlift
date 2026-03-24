import { cn } from '@/lib/utils';
import type { BlockComponentProps } from '../block-types';
import { resolveTokenClasses } from '../block-types';

export function TestimonialsAvatarRowStatic({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Hear from our customers';
  const testimonials = (content.testimonials as Array<{ quote: string; name: string; role: string; avatar?: string }>) ?? [
    { quote: 'This platform completely changed how we approach launches. What used to take weeks now takes hours.', name: 'Sarah Chen', role: 'CEO, TechVenture' },
  ];

  const first = testimonials[0];

  return (
    <section
      data-lp-section="testimonials-avatar-row"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto text-center', tokens.maxWidth)}>
        <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
          {title}
        </h2>

        <div className="mt-10 flex items-center justify-center gap-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-full"
              style={i === 0 ? { boxShadow: `0 0 0 3px ${branding.primaryColor}` } : undefined}
            >
              {t.avatar ? (
                <img
                  src={t.avatar}
                  alt={t.name}
                  className={`h-14 w-14 rounded-full object-cover ${i === 0 ? 'opacity-100' : 'opacity-50'}`}
                />
              ) : (
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full text-sm font-medium text-white ${i === 0 ? 'opacity-100' : 'opacity-50'}`}
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
              )}
            </div>
          ))}
        </div>

        {first && (
          <div className="mt-8">
            <blockquote className={cn('leading-relaxed text-[var(--lp-site-heading)]', tokens.bodySize)}>
              "{first.quote}"
            </blockquote>
            <div className="mt-4">
              <p className="font-semibold text-[var(--lp-site-heading)]">{first.name}</p>
              <p className="text-sm text-[var(--lp-site-muted)]">{first.role}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
