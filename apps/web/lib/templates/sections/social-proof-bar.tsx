import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface ProofItem {
  value: string;
  text: string;
}

const DEFAULT_ITEMS: ProofItem[] = [
  { value: '2,847', text: 'founders on the waitlist' },
  { value: '4.9/5', text: 'average rating' },
  { value: '12hrs', text: 'saved per week' },
  { value: '$0', text: 'to get started' },
];

export function SocialProofBar({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const items = content.items as ProofItem[] ?? DEFAULT_ITEMS;
  const { primaryColor } = branding;

  return (
    <section
      data-lp-section="social-proof-bar"
      className="relative border-y border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-bg)] px-6 py-8 sm:py-10"
    >
      {/* Subtle gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`,
        }}
        aria-hidden="true"
      />

      <div className={cn('relative mx-auto flex flex-wrap items-center justify-center', tokens.maxWidth, tokens.gap, tokens.textAlign)}>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span
              className={cn('font-extrabold', tokens.headingSize)}
              style={{ color: primaryColor }}
            >
              {item.value}
            </span>
            <span className={cn('text-[var(--lp-site-body)] leading-tight max-w-24', tokens.bodySize)}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
