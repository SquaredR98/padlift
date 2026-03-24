import { cn } from '@/lib/utils';
import { resolveTokenClasses } from '../block-types';
import type { BlockComponentProps } from '../block-types';

interface BenefitCard {
  iconUrl?: string;
  emoji?: string;
  headline: string;
  description: string;
}

const DEFAULT_CARDS: BenefitCard[] = [
  {
    emoji: '🚀',
    headline: 'Launch in minutes',
    description: 'Go from idea to live landing page faster than ever. No design or coding skills needed.',
  },
  {
    emoji: '📈',
    headline: 'Built for conversion',
    description: 'Every template is optimized to turn visitors into waitlist signups.',
  },
  {
    emoji: '🎯',
    headline: 'Know your audience',
    description: 'Built-in analytics tell you exactly where your signups come from.',
  },
  {
    emoji: '🔒',
    headline: 'Enterprise-grade security',
    description: 'SSL, DDoS protection, and SOC 2 compliance baked in from day one.',
  },
];

export function BenefitCards({ branding, content, styles }: BlockComponentProps) {
  const title = content.title as string ?? 'Why teams choose us';
  const cards = content.cards as BenefitCard[] ?? DEFAULT_CARDS;
  const { primaryColor } = branding;
  const tokens = resolveTokenClasses(styles);

  return (
    <section
      data-lp-section="benefit-cards"
      className="relative bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        {/* Header */}
        <div className={cn('mx-auto mb-16 max-w-2xl', tokens.textAlign)}>
          <h2 data-lp-editable="title" className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
        </div>

        {/* Cards grid */}
        <div className={cn('grid', tokens.columns, tokens.gap)}>
          {cards.map((card, i) => (
            <div
              key={i}
              className={cn(
                'group relative overflow-hidden p-8',
                tokens.borderRadius,
                tokens.shadow,
                tokens.cardStyle,
                'transition-all duration-300 hover:-translate-y-1'
              )}
            >
              {/* Hover glow */}
              {(styles.showDecorations !== false) && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${primaryColor}08, transparent)`,
                  }}
                  aria-hidden="true"
                />
              )}

              <div className="relative">
                {/* Icon */}
                <div className="mb-4">
                  {card.iconUrl ? (
                    <img src={card.iconUrl} alt="" className="h-10 w-10 object-contain" />
                  ) : (
                    <span className="text-3xl">{card.emoji || '✨'}</span>
                  )}
                </div>

                {/* Text */}
                <h3 className="mb-2 text-xl font-semibold text-[var(--lp-site-heading)]">{card.headline}</h3>
                <p className={cn('leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
