import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface AlternatingFeature {
  title: string;
  description: string;
  bullets?: string[];
}

const DEFAULT_FEATURES: AlternatingFeature[] = [
  {
    title: 'Build stunning pages in minutes',
    description:
      'Our drag-and-drop builder makes it easy to create high-converting landing pages. Choose from dozens of pre-built sections and customize everything to match your brand.',
    bullets: [
      'Drag-and-drop visual editor',
      'Conversion-optimized templates',
      'Full HTML/CSS/JS access',
    ],
  },
  {
    title: 'Accept payments instantly',
    description:
      'Drop in your Stripe Payment Links and start collecting revenue immediately. No API keys, no webhooks to configure, no complex checkout flows to build.',
    bullets: [
      'Stripe Payment Links integration',
      'Zero configuration required',
      'Money goes directly to your account',
    ],
  },
  {
    title: 'Grow with built-in analytics',
    description:
      'Track every visitor, conversion, and revenue event from one unified dashboard. A/B test headlines, CTAs, and entire page variants to maximize your results.',
    bullets: [
      'Real-time visitor analytics',
      'A/B testing with revenue tracking',
      'Conversion funnel insights',
    ],
  },
];

export function FeaturesAlternating({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = content.title as string ?? 'How it works';
  const subtitle = content.subtitle as string ?? 'Three simple steps to go from idea to live product.';
  const rawFeatures = (content.features ?? DEFAULT_FEATURES) as Record<string, unknown>[];
  // Normalize bullets — may be string[] or newline-separated string from editor
  const features = rawFeatures.map((f) => {
    const rawBullets = f.bullets;
    let bullets: string[];
    if (Array.isArray(rawBullets)) {
      bullets = rawBullets as string[];
    } else if (typeof rawBullets === 'string' && rawBullets.trim()) {
      bullets = rawBullets.split('\n').map((s) => s.trim()).filter(Boolean);
    } else {
      bullets = [];
    }
    return {
      title: f.title as string ?? '',
      description: f.description as string ?? '',
      bullets,
    };
  });
  return (
    <section
      data-lp-section="features-alternating"
      className="relative bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        {/* Section header */}
        <div className={cn('mx-auto mb-20 max-w-2xl', tokens.textAlign)}>
          <h2 data-lp-editable="title" className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          <p data-lp-editable="subtitle" className={cn('mt-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
            {subtitle}
          </p>
        </div>

        {/* Alternating rows */}
        <div className="space-y-20 sm:space-y-28">
          {features.map((feature, i) => (
            <div
              key={i}
              className={cn(
                'flex flex-col items-center gap-10 lg:flex-row lg:gap-16',
                i % 2 !== 0 && 'lg:flex-row-reverse'
              )}
            >
              {/* Text side */}
              <div className="flex-1 text-center lg:text-left">
                {/* Step number */}
                <span
                  className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  {i + 1}
                </span>

                <h3 className="mt-2 text-2xl font-bold text-[var(--lp-site-heading)] sm:text-3xl">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[var(--lp-site-body)] sm:text-lg">
                  {feature.description}
                </p>

                {/* Bullet points */}
                {feature.bullets && feature.bullets.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {feature.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-3 text-[var(--lp-site-body)] lg:justify-start justify-center"
                      >
                        <svg
                          className="h-5 w-5 shrink-0"
                          style={{ color: branding.primaryColor }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm sm:text-base">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Visual placeholder side */}
              <div className="w-full flex-1 max-w-lg lg:max-w-none">
                <div className={cn("relative rounded-2xl bg-[var(--lp-site-card)] p-1 backdrop-blur-sm", tokens.cardStyle)}>
                  {/* Gradient border glow */}
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-40"
                    style={{
                      background:
                        i % 2 === 0
                          ? `linear-gradient(135deg, ${branding.primaryColor}30, transparent 60%)`
                          : `linear-gradient(225deg, ${branding.primaryColor}30, transparent 60%)`,
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative rounded-xl bg-[var(--lp-site-card)] p-6 sm:p-8">
                    {/* Mock UI content unique per feature */}
                    {i === 0 && (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          {[1, 2, 3].map((n) => (
                            <div
                              key={n}
                              className="h-8 flex-1 rounded-lg bg-[var(--lp-site-card-hover)]"
                            />
                          ))}
                        </div>
                        <div
                          className="h-32 rounded-lg opacity-20"
                          style={{
                            background: `linear-gradient(135deg, ${branding.primaryColor}, ${branding.secondaryColor})`,
                          }}
                        />
                        <div className="flex gap-2">
                          <div className="h-6 flex-1 rounded bg-[var(--lp-site-card-hover)]" />
                          <div className="h-6 w-20 rounded bg-[var(--lp-site-card-hover)]" />
                        </div>
                      </div>
                    )}
                    {i === 1 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="h-10 w-10 shrink-0 rounded-lg opacity-60"
                            style={{ backgroundColor: branding.primaryColor }}
                          />
                          <div className="flex-1 space-y-1.5">
                            <div className="h-3 w-3/4 rounded bg-[var(--lp-site-card-hover)]" />
                            <div className="h-3 w-1/2 rounded bg-[var(--lp-site-card-hover)]" />
                          </div>
                          <div className="text-xl font-bold text-[var(--lp-site-check)]">
                            $99
                          </div>
                        </div>
                        <div className="h-px bg-[var(--lp-site-card-hover)]" />
                        <div className="flex items-center gap-3">
                          <div
                            className="h-10 w-10 shrink-0 rounded-lg opacity-40"
                            style={{ backgroundColor: branding.primaryColor }}
                          />
                          <div className="flex-1 space-y-1.5">
                            <div className="h-3 w-2/3 rounded bg-[var(--lp-site-card-hover)]" />
                            <div className="h-3 w-2/5 rounded bg-[var(--lp-site-card-hover)]" />
                          </div>
                          <div className="text-xl font-bold text-[var(--lp-site-check)]">
                            $49
                          </div>
                        </div>
                        <div className="h-px bg-[var(--lp-site-card-hover)]" />
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--lp-site-muted)]">Total revenue</span>
                          <span className="font-semibold text-[var(--lp-site-heading)]">
                            $1,248
                          </span>
                        </div>
                      </div>
                    )}
                    {i >= 2 && (
                      <div className="space-y-3">
                        <div className="flex items-end gap-1.5">
                          {[40, 55, 35, 65, 50, 80, 70, 90, 60, 85].map(
                            (h, idx) => (
                              <div
                                key={idx}
                                className="flex-1 rounded-t opacity-40"
                                style={{
                                  height: `${h}px`,
                                  backgroundColor: branding.primaryColor,
                                }}
                              />
                            )
                          )}
                        </div>
                        <div className="flex gap-4 text-xs text-[var(--lp-site-muted)]">
                          <span>Mon</span>
                          <span className="flex-1" />
                          <span>Today</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: 'Visitors', val: '12.4k' },
                            { label: 'Conversion', val: '4.2%' },
                            { label: 'Revenue', val: '$8.9k' },
                          ].map((stat) => (
                            <div
                              key={stat.label}
                              className="rounded-lg bg-[var(--lp-site-card-hover)] p-2 text-center"
                            >
                              <div className="text-xs text-[var(--lp-site-muted)]">
                                {stat.label}
                              </div>
                              <div className="text-sm font-semibold text-[var(--lp-site-heading)]">
                                {stat.val}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
