import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

const HEIGHT_MAP: Record<string, string> = {
  sm: '300px',
  md: '450px',
  lg: '600px',
  xl: '800px',
};

export function EmbedCustom({ content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? '';
  const description = (content.description as string) ?? '';
  const embedCode = (content.embedCode as string) ?? '';
  const height = (content.height as string) ?? 'md';

  return (
    <section
      data-lp-section="embed-custom"
      className="bg-[var(--lp-site-bg)] px-6 py-16 sm:py-20"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        {(title || description) && (
          <div className="mb-8 text-center">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-[var(--lp-site-heading)] sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-3 text-lg text-[var(--lp-site-body)]">{description}</p>
            )}
          </div>
        )}

        {embedCode ? (
          <div
            className={cn('overflow-hidden border border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-card)]', tokens.borderRadius)}
            style={{ minHeight: HEIGHT_MAP[height] ?? HEIGHT_MAP.md }}
            dangerouslySetInnerHTML={{ __html: embedCode }}
          />
        ) : (
          <div
            className={cn('flex items-center justify-center border-2 border-dashed border-[var(--lp-site-border-subtle)]', tokens.borderRadius)}
            style={{ minHeight: HEIGHT_MAP[height] ?? HEIGHT_MAP.md }}
          >
            <div className="text-center">
              <svg className="mx-auto h-10 w-10 text-[var(--lp-site-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <p className="mt-2 text-sm text-[var(--lp-site-muted)]">
                Paste embed code (HTML/iframe)
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
