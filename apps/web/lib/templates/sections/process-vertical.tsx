import { cn } from '@/lib/utils';
import { resolveTokenClasses } from '../block-types';
import type { BlockComponentProps } from '../block-types';

export function ProcessVertical({ branding, content, styles }: BlockComponentProps) {
  const title = (content.title as string) ?? 'How it works';
  const subtitle = (content.subtitle as string) ?? 'Get started in three simple steps.';
  const steps = (content.steps as Array<{ number?: string; title: string; description: string; icon?: string }>) ?? [
    { number: '1', title: 'Create your account', description: 'Sign up in seconds. No credit card required.', icon: '🚀' },
    { number: '2', title: 'Build your page', description: 'Choose a template and customize it to match your brand.', icon: '🎨' },
    { number: '3', title: 'Go live', description: 'Hit publish and share with the world.', icon: '🌍' },
  ];
  const tokens = resolveTokenClasses(styles);

  return (
    <section
      data-lp-section="process-vertical"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className="text-center">
          <h2 data-lp-editable="title" className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          {subtitle && (
            <p data-lp-editable="subtitle" className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>
          )}
        </div>

        <div className="relative mt-12">
          {/* Vertical line */}
          {(styles.showDecorations !== false) && (
            <div
              className="absolute top-0 left-5 h-full w-0.5 sm:left-6"
              style={{ backgroundColor: `${branding.primaryColor}30` }}
            />
          )}

          <div className={cn('space-y-10', tokens.gap)}>
            {steps.map((step, i) => (
              <div key={i} className="relative flex items-start gap-5 sm:gap-6">
                {/* Step circle */}
                <div
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white sm:h-12 sm:w-12"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  {step.icon || step.number || i + 1}
                </div>
                {/* Step content */}
                <div className="pt-1">
                  <h3 className="text-lg font-semibold text-[var(--lp-site-heading)]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-[var(--lp-site-body)]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
