import { cn } from '@/lib/utils';
import { resolveTokenClasses } from '../block-types';
import type { BlockComponentProps } from '../block-types';

interface Step {
  number: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const DEFAULT_STEPS: Step[] = [
  {
    number: '1',
    title: 'Sign up in seconds',
    description: 'Create your account with just an email. No credit card required, no complex setup.',
  },
  {
    number: '2',
    title: 'Choose a template',
    description: 'Pick from 20+ conversion-optimized templates designed for maximum signups.',
  },
  {
    number: '3',
    title: 'Launch & grow',
    description: 'Customize your content, connect your domain, and start collecting waitlist entries.',
  },
];

export function HowItWorks({ branding, content, styles }: BlockComponentProps) {
  const title = content.title as string ?? 'How it works';
  const subtitle = content.subtitle as string ?? 'Go from zero to launched in three simple steps.';
  const steps = content.steps as Step[] ?? DEFAULT_STEPS;
  const { primaryColor } = branding;
  const tokens = resolveTokenClasses(styles);

  return (
    <section
      data-lp-section="how-it-works"
      className="relative bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          <p className={cn('mt-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
            {subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className={cn('relative space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3', tokens.gap)}>
          {/* Connecting line (desktop) */}
          {(styles.showDecorations !== false) && (
            <div
              className="pointer-events-none absolute top-12 left-[16.5%] right-[16.5%] hidden h-px lg:block"
              style={{
                background: `linear-gradient(90deg, transparent, ${primaryColor}40, transparent)`,
              }}
              aria-hidden="true"
            />
          )}

          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {/* Step number */}
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] shadow-lg">
                <span
                  className="text-lg font-bold"
                  style={{ color: primaryColor }}
                >
                  {step.number}
                </span>
              </div>

              {/* Optional image */}
              {step.imageUrl && (
                <div className="mx-auto mb-6 max-w-xs overflow-hidden rounded-xl border border-[var(--lp-site-border)]">
                  <img src={step.imageUrl} alt={step.title} className="w-full" />
                </div>
              )}

              {/* Text */}
              <h3 className="mb-3 text-xl font-semibold text-[var(--lp-site-heading)]">{step.title}</h3>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-[var(--lp-site-body)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
