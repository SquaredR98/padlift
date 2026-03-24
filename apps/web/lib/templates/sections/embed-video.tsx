import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

function getEmbedUrl(url: string): string {
  if (!url) return '';
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`;
  // Vimeo
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  // Loom
  const loomMatch = url.match(/(?:loom\.com\/share\/)([a-zA-Z0-9]+)/);
  if (loomMatch) return `https://www.loom.com/embed/${loomMatch[1]}`;
  // Already an embed URL or direct URL
  return url;
}

export function EmbedVideo({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? '';
  const description = (content.description as string) ?? '';
  const videoUrl = (content.videoUrl as string) ?? '';
  const thumbnailUrl = (content.thumbnailUrl as string) ?? '';
  const aspectRatio = (content.aspectRatio as string) ?? '16:9';

  const embedUrl = getEmbedUrl(videoUrl);
  const aspectClass = aspectRatio === '4:3' ? 'aspect-[4/3]' : aspectRatio === '1:1' ? 'aspect-square' : 'aspect-video';

  return (
    <section
      data-lp-section="embed-video"
      className="bg-[var(--lp-site-bg)] px-6 py-16 sm:py-20"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        {(title || description) && (
          <div className="mb-8 text-center">
            {title && (
              <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
                {title}
              </h2>
            )}
            {description && (
              <p className={cn('mt-3 text-[var(--lp-site-body)]', tokens.bodySize)}>{description}</p>
            )}
          </div>
        )}

        <div className={cn('relative overflow-hidden border border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-card)] shadow-2xl', aspectClass, tokens.borderRadius)}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title || 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : thumbnailUrl ? (
            <>
              <img
                src={thumbnailUrl}
                alt={title || 'Video thumbnail'}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="mt-3 text-sm text-[var(--lp-site-muted)]">Add a video URL</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
