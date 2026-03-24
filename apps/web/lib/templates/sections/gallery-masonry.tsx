import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

const MASONRY_COLUMNS: Record<number, string> = {
  1: 'columns-1',
  2: 'columns-1 sm:columns-2',
  3: 'columns-1 sm:columns-2 lg:columns-3',
  4: 'columns-1 sm:columns-2 lg:columns-4',
};

export function GalleryMasonry({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const masonryCols = MASONRY_COLUMNS[styles.columns ?? 3];
  const title = (content.title as string) ?? 'Gallery';
  const subtitle = (content.subtitle as string) ?? '';
  const images = (content.images as Array<{ imageUrl: string; caption?: string; tag?: string }>) ?? [
    { imageUrl: '', caption: 'Project Alpha', tag: 'Design' },
    { imageUrl: '', caption: 'Project Beta', tag: 'Development' },
    { imageUrl: '', caption: 'Project Gamma', tag: 'Branding' },
    { imageUrl: '', caption: 'Project Delta', tag: 'Mobile' },
    { imageUrl: '', caption: 'Project Epsilon', tag: 'Web' },
    { imageUrl: '', caption: 'Project Zeta', tag: 'Design' },
  ];

  return (
    <section
      data-lp-section="gallery-masonry"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className="text-center">
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>{title}</h2>
          {subtitle && <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>}
        </div>

        <div className={cn('mt-12', masonryCols, tokens.gap)}>
          {images.map((img, i) => (
            <div
              key={i}
              className={cn('group relative mb-4 break-inside-avoid overflow-hidden border border-[var(--lp-site-border)]', tokens.borderRadius)}
            >
              {img.imageUrl ? (
                <img src={img.imageUrl} alt={img.caption ?? ''} className="w-full object-cover transition-transform group-hover:scale-105" />
              ) : (
                <div
                  className="flex aspect-square items-center justify-center sm:aspect-auto sm:h-48"
                  style={{ background: `linear-gradient(135deg, ${branding.primaryColor}10, ${branding.secondaryColor}10)` }}
                >
                  <p className="text-sm text-[var(--lp-site-muted)]">{img.caption || 'Image'}</p>
                </div>
              )}
              {(img.caption || img.tag) && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  {img.tag && (
                    <span
                      className="mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium text-white"
                      style={{ backgroundColor: branding.primaryColor }}
                    >
                      {img.tag}
                    </span>
                  )}
                  {img.caption && <p className="text-sm font-medium text-white">{img.caption}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
