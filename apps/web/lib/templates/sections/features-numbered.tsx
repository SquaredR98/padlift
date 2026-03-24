import { resolveTokenClasses, type BlockComponentProps } from '../block-types';
import { cn } from '@/lib/utils';

export function FeaturesNumbered({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Why we stand out';
  const subtitle = (content.subtitle as string) ?? 'Three reasons teams choose our platform.';
  const features = (content.features as Array<{ title: string; description: string }>) ?? [
    { title: 'Ship in Minutes', description: 'Go from idea to live product in minutes, not weeks. Our templates and tools handle the heavy lifting.' },
    { title: 'Built for Growth', description: 'Every feature is designed to help you acquire users, convert visitors, and grow revenue.' },
    { title: 'Developer Friendly', description: 'Clean APIs, great docs, and integrations with the tools you already use.' },
  ];

  return (
    <section
      data-lp-section="features-numbered"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className={tokens.textAlign}>
          <h2 className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-bold text-[var(--lp-site-heading)]')}>
            {title}
          </h2>
          {subtitle && (
            <p className={cn('mt-4', tokens.bodySize, 'text-[var(--lp-site-body)]')}>{subtitle}</p>
          )}
        </div>

        <div className="mt-12 space-y-10">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-6">
              <span
                className="shrink-0 text-5xl font-extrabold leading-none opacity-50"
                style={{ color: branding.primaryColor }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-[var(--lp-site-heading)]">
                  {f.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[var(--lp-site-body)]">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
