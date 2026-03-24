import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface LogoItem { name: string; logoUrl: string; }

export function LogosBanner({ branding, content, styles }: BlockComponentProps) {
  const rawLogos = (content.logos ?? []) as Record<string, unknown>[];
  const logos: LogoItem[] = rawLogos.map((l) => ({
    name: (l.name as string) ?? '',
    logoUrl: (l.logoUrl as string) ?? '',
  }));
  const bgColor = (content.bgColor as string) ?? 'subtle';

  const tokens = resolveTokenClasses(styles);
  const bgStyle = bgColor === 'brand'
    ? { backgroundColor: `${branding.primaryColor}15` }
    : bgColor === 'dark'
      ? { backgroundColor: 'rgba(0,0,0,0.4)' }
      : {};

  return (
    <section
      data-lp-section="logos-banner"
      className="bg-[var(--lp-site-bg)]"
    >
      <div className="py-6 sm:py-8" style={bgStyle}>
        <div className={cn('mx-auto flex flex-wrap items-center justify-center px-6', tokens.maxWidth, tokens.gap)}>
          {logos.map((logo, i) => (
            <div key={i} className="flex items-center justify-center opacity-60 transition-opacity hover:opacity-100">
              {logo.logoUrl ? (
                <img src={logo.logoUrl} alt={logo.name} className="h-7 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
              ) : (
                <span className="text-sm font-semibold tracking-wide text-[var(--lp-site-muted)] uppercase">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
