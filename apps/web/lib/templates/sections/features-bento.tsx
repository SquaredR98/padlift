import { resolveTokenClasses, type BlockComponentProps } from '../block-types';
import { cn } from '@/lib/utils';

export function FeaturesBento({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Everything you need';
  const subtitle = (content.subtitle as string) ?? 'A powerful set of tools designed for modern teams.';
  const features = (content.features as Array<{ icon: string; title: string; description: string; imageUrl?: string }>) ?? [
    { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for speed at every layer.' },
    { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security built in.' },
    { icon: '📈', title: 'Analytics', description: 'Track every metric.' },
    { icon: '🎨', title: 'Beautiful Design', description: 'Pixel-perfect templates you can customize.' },
  ];

  return (
    <section
      data-lp-section="features-bento"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className={cn(tokens.textAlign)}>
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          {subtitle && (
            <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>
          )}
        </div>

        <div className={cn('mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', tokens.gap)}>
          {features.map((f, i) => {
            const isWide = i === 0 || i === 3;
            return (
              <div
                key={i}
                className={cn('relative overflow-hidden bg-[var(--lp-site-card)] p-6', tokens.cardStyle, tokens.borderRadius, isWide && 'sm:col-span-2')}
              >
                {f.imageUrl && (
                  <div className="absolute inset-0 opacity-10">
                    <img src={f.imageUrl} alt="" className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="relative">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-lg"
                    style={{ backgroundColor: `${branding.primaryColor}15` }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--lp-site-heading)]">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--lp-site-body)]">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
