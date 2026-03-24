import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface VideoTestimonial { videoUrl: string; thumbnailUrl: string; name: string; role: string; company: string; }

function getEmbedUrl(url: string): string {
  if (!url) return '';
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`;
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

export function TestimonialsVideo({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Hear from our customers';
  const subtitle = (content.subtitle as string) ?? '';
  const rawTestimonials = (content.testimonials ?? []) as Record<string, unknown>[];
  const testimonials: VideoTestimonial[] = rawTestimonials.map((t) => ({
    videoUrl: (t.videoUrl as string) ?? '',
    thumbnailUrl: (t.thumbnailUrl as string) ?? '',
    name: (t.name as string) ?? '',
    role: (t.role as string) ?? '',
    company: (t.company as string) ?? '',
  }));

  return (
    <section
      data-lp-section="testimonials-video"
      className="bg-[var(--lp-site-bg)] px-6 py-16 sm:py-20"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className="text-center">
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          {subtitle && (
            <p className={cn('mt-3 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>
          )}
        </div>

        <div className={cn('mt-12 grid', tokens.columns, tokens.gap)}>
          {testimonials.map((t, i) => {
            const embedUrl = getEmbedUrl(t.videoUrl);
            return (
              <div key={i} className={cn('overflow-hidden bg-[var(--lp-site-card)] shadow-sm transition-shadow hover:shadow-lg', tokens.borderRadius, tokens.cardStyle)}>
                <div className="relative aspect-video">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={`${t.name} testimonial`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  ) : t.thumbnailUrl ? (
                    <>
                      <img src={t.thumbnailUrl} alt={t.name} className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg"
                          style={{ backgroundColor: branding.primaryColor }}
                        >
                          <svg className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${branding.primaryColor}11, ${branding.secondaryColor}11)` }}
                    >
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full text-white"
                        style={{ backgroundColor: branding.primaryColor }}
                      >
                        <svg className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-semibold text-[var(--lp-site-heading)]">{t.name}</p>
                  <p className="text-sm text-[var(--lp-site-muted)]">
                    {t.role}{t.company && `, ${t.company}`}
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
