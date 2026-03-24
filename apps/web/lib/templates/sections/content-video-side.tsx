import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

function getEmbedUrl(url: string): string {
  if (!url) return '';
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`;
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  const loomMatch = url.match(/(?:loom\.com\/share\/)([a-zA-Z0-9]+)/);
  if (loomMatch) return `https://www.loom.com/embed/${loomMatch[1]}`;
  return url;
}

export function ContentVideoSide({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'See it in action';
  const description = (content.description as string) ?? '';
  const videoUrl = (content.videoUrl as string) ?? '';
  const thumbnailUrl = (content.thumbnailUrl as string) ?? '';
  const bullets = ((content.bullets as string) ?? '').split('\n').filter(Boolean);
  const videoPosition = (content.videoPosition as string) ?? 'right';

  const embedUrl = getEmbedUrl(videoUrl);

  const videoEl = (
    <div className={cn('relative aspect-video overflow-hidden border border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-card)] shadow-xl', tokens.borderRadius)}>
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : thumbnailUrl ? (
        <>
          <img src={thumbnailUrl} alt={title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg"
              style={{ backgroundColor: branding.primaryColor }}
            >
              <svg className="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: branding.primaryColor }}
            >
              <svg className="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
            <p className="mt-2 text-sm text-[var(--lp-site-muted)]">Add a video URL</p>
          </div>
        </div>
      )}
    </div>
  );

  const textEl = (
    <div className="flex flex-col justify-center">
      <h2 className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-bold text-[var(--lp-site-heading)]')}>
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>{description}</p>
      )}
      {bullets.length > 0 && (
        <ul className="mt-6 space-y-3">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg
                className="mt-1 h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: branding.primaryColor }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[var(--lp-site-body)]">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <section
      data-lp-section="content-video-side"
      className="bg-[var(--lp-site-bg)] px-6 py-16 sm:py-20"
    >
      <div className={cn(
        'mx-auto grid gap-12 lg:grid-cols-2 lg:items-center', tokens.maxWidth,
      )}>
        {videoPosition === 'left' ? (
          <>{videoEl}{textEl}</>
        ) : (
          <>{textEl}{videoEl}</>
        )}
      </div>
    </section>
  );
}
