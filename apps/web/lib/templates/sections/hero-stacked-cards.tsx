import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface CardItem { imageUrl: string; label: string; }

export function HeroStackedCards({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const headline = content.headline as string | undefined;
  const subheadline = (content.subheadline as string) ?? 'See what we have been building.';
  const ctaPrimary = (content.ctaPrimary as string) ?? 'Get Started Free';
  const rawCards = (content.cards ?? []) as Record<string, unknown>[];
  const cards: CardItem[] = rawCards.map((c) => ({
    imageUrl: (c.imageUrl as string) ?? '',
    label: (c.label as string) ?? '',
  }));

  const rotations = ['-rotate-6', 'rotate-0', 'rotate-6'];
  const offsets = ['translate-x-[-20%]', 'translate-x-0 z-10', 'translate-x-[20%]'];

  return (
    <section
      data-lp-section="hero-stacked-cards"
      className="relative overflow-hidden bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      {/* Gradient background */}
      {(styles.showDecorations !== false) && (
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${branding.primaryColor}44, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      <div className={cn('relative z-10 mx-auto text-center', tokens.maxWidth)}>
        <h1 className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-extrabold text-[var(--lp-site-heading)] leading-[1.1]')}>
          <span data-lp-brand="company">{headline ?? branding.companyName}</span>
          <span className="mt-2 block text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            <span
              data-lp-brand="tagline"
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${branding.primaryColor}, ${branding.secondaryColor})`,
              }}
            >
              {branding.tagline}
            </span>
          </span>
        </h1>

        <p className={cn('mx-auto mt-4 max-w-2xl leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
          {subheadline}
        </p>

        <div className="mt-8">
          <button
            className="h-12 rounded-xl px-8 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            style={{
              backgroundColor: branding.primaryColor,
              boxShadow: `0 8px 30px ${branding.primaryColor}40`,
            }}
          >
            {ctaPrimary}
          </button>
        </div>

        {/* Stacked cards */}
        <div className="relative mx-auto mt-16 flex max-w-3xl items-center justify-center">
          {(cards.length > 0 ? cards.slice(0, 3) : [
            { imageUrl: '', label: 'Dashboard' },
            { imageUrl: '', label: 'Analytics' },
            { imageUrl: '', label: 'Settings' },
          ]).map((card, i) => (
            <div
              key={i}
              className={`w-[60%] shrink-0 transition-transform ${rotations[i] ?? ''} ${offsets[i] ?? ''} ${i === 1 ? 'scale-105' : 'scale-95 opacity-80'}`}
            >
              <div className={cn('overflow-hidden border border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-card)] shadow-2xl', tokens.borderRadius)}>
                {/* Browser toolbar */}
                <div className="flex items-center gap-1.5 border-b border-[var(--lp-site-border-subtle)] px-3 py-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  {card.label && (
                    <span className="ml-2 text-[10px] text-[var(--lp-site-muted)]">{card.label}</span>
                  )}
                </div>
                {card.imageUrl ? (
                  <img src={card.imageUrl} alt={card.label} className="w-full" />
                ) : (
                  <div
                    className="aspect-[4/3]"
                    style={{ background: `linear-gradient(135deg, ${branding.primaryColor}11, ${branding.secondaryColor}11)` }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
