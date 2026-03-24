import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface GridImage { imageUrl: string; caption: string; }

export function ContentImageGrid({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? '';
  const subtitle = (content.subtitle as string) ?? '';
  const rawImages = (content.images ?? []) as Record<string, unknown>[];
  const images: GridImage[] = rawImages.map((img) => ({
    imageUrl: (img.imageUrl as string) ?? '',
    caption: (img.caption as string) ?? '',
  }));

  return (
    <section
      data-lp-section="content-image-grid"
      className="bg-[var(--lp-site-bg)] px-6 py-16 sm:py-20"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        {(title || subtitle) && (
          <div className="mb-10 text-center">
            {title && (
              <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn('mt-3 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>
            )}
          </div>
        )}

        <div className={cn('grid', tokens.columns, tokens.gap)}>
          {images.map((img, i) => (
            <div key={i} className={cn('group relative overflow-hidden', tokens.borderRadius)}>
              {img.imageUrl ? (
                <>
                  <img
                    src={img.imageUrl}
                    alt={img.caption || `Image ${i + 1}`}
                    className="w-full transition-transform duration-300 group-hover:scale-105"
                  />
                  {img.caption && (
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="p-4 text-sm font-medium text-white">{img.caption}</p>
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="flex aspect-square items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${branding.primaryColor}11, ${branding.secondaryColor}11)` }}
                >
                  <svg className="h-10 w-10 text-[var(--lp-site-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
