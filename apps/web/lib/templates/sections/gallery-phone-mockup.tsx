import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function GalleryPhoneMockup({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Screenshots';
  const subtitle = (content.subtitle as string) ?? '';
  const screens = (content.screens as Array<{ imageUrl: string; label?: string }>) ?? [
    { imageUrl: '', label: 'Home Screen' },
    { imageUrl: '', label: 'Dashboard' },
    { imageUrl: '', label: 'Profile' },
  ];

  return (
    <section
      data-lp-section="gallery-phone-mockup"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className="text-center">
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>{title}</h2>
          {subtitle && <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>}
        </div>

        <div className={cn('mt-12 flex flex-wrap items-end justify-center', tokens.gap)}>
          {screens.map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-[200px]">
                <div className="overflow-hidden rounded-[2rem] border-4 border-[var(--lp-site-border)] bg-[var(--lp-site-card)] shadow-xl">
                  <div className="relative mx-auto h-5 w-24 rounded-b-xl bg-[var(--lp-site-border)]" />
                  <div className="aspect-[9/19]">
                    {s.imageUrl ? (
                      <img src={s.imageUrl} alt={s.label ?? ''} className="h-full w-full object-cover" />
                    ) : (
                      <div
                        className="flex h-full items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${branding.primaryColor}15, ${branding.secondaryColor}15)` }}
                      >
                        <p className="text-xs text-[var(--lp-site-muted)]">{s.label || 'Screen'}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {s.label && (
                <p className="mt-3 text-sm font-medium text-[var(--lp-site-body)]">{s.label}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
