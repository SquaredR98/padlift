import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function TestimonialsTweet({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'What people are saying';
  const subtitle = (content.subtitle as string) ?? '';
  const tweets = (content.tweets as Array<{ quote: string; name: string; handle: string; avatar?: string }>) ?? [
    { quote: 'Just launched my product with @launchpad in under 15 minutes. This is insane.', name: 'Sarah Chen', handle: '@sarahchen' },
    { quote: 'Finally a tool that gets it. Simple, fast, and actually beautiful.', name: 'Marcus Johnson', handle: '@marcusj' },
    { quote: 'Replaced Webflow + Stripe + Mailchimp + Analytics with one platform. Mind blown.', name: 'Priya Patel', handle: '@priyabuilds' },
    { quote: 'The waitlist feature alone saved me 20 hours of dev work. Highly recommend.', name: 'James Kim', handle: '@jameskim_dev' },
  ];

  return (
    <section
      data-lp-section="testimonials-tweet"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className="text-center">
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          {subtitle && <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>}
        </div>

        <div className={cn('mt-12 grid', tokens.columns, tokens.gap)}>
          {tweets.map((t, i) => (
            <div
              key={i}
              className={cn('bg-[var(--lp-site-card)] p-5', tokens.borderRadius, tokens.cardStyle)}
            >
              <div className="flex items-center gap-3">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-[var(--lp-site-heading)]">{t.name}</p>
                  <p className="text-xs text-[var(--lp-site-muted)]">{t.handle}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--lp-site-body)]">
                {t.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
