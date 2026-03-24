import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function GalleryBrowserMockup({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Product Screenshots';
  const subtitle = (content.subtitle as string) ?? '';
  const screens = (content.screens as Array<{ imageUrl: string; label?: string; url?: string }>) ?? [
    { imageUrl: '', label: 'Dashboard', url: 'app.yoursite.com/dashboard' },
    { imageUrl: '', label: 'Analytics', url: 'app.yoursite.com/analytics' },
  ];

  return (
    <section
      data-lp-section="gallery-browser-mockup"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className="text-center">
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>{title}</h2>
          {subtitle && <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>}
        </div>

        <div className={cn('mt-12 space-y-8')}>
          {screens.map((s, i) => (
            <div key={i}>
              <div className={cn('overflow-hidden border border-[var(--lp-site-border)] bg-[var(--lp-site-card)]', tokens.borderRadius, tokens.shadow)}>
                {/* Browser toolbar */}
                <div className="flex items-center gap-2 border-b border-[var(--lp-site-border)] bg-[var(--lp-site-card-hover)] px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                    <div className="h-3 w-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="mx-auto flex-1 max-w-sm">
                    <div className="h-5 rounded bg-[var(--lp-site-bg)] px-3 text-center text-xs leading-5 text-[var(--lp-site-muted)]">
                      {s.url ?? 'yourapp.com'}
                    </div>
                  </div>
                  <div className="w-[52px]" />
                </div>
                {/* Screenshot */}
                <div className="aspect-[16/10]">
                  {s.imageUrl ? (
                    <img src={s.imageUrl} alt={s.label ?? ''} className="h-full w-full object-cover object-top" />
                  ) : (
                    <div
                      className="flex h-full items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${branding.primaryColor}10, ${branding.secondaryColor}10)` }}
                    >
                      <p className="text-sm text-[var(--lp-site-muted)]">{s.label || 'Upload screenshot'}</p>
                    </div>
                  )}
                </div>
              </div>
              {s.label && (
                <p className="mt-3 text-center text-sm font-medium text-[var(--lp-site-body)]">{s.label}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
