import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function CustomHtml({ content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? '';
  const htmlContent = (content.htmlContent as string) ?? '';

  return (
    <section
      data-lp-section="custom-html"
      className="bg-[var(--lp-site-bg)] px-6 py-16 sm:py-20"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        {title && (
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-[var(--lp-site-heading)] sm:text-4xl">
            {title}
          </h2>
        )}

        {htmlContent ? (
          <div
            className="overflow-hidden rounded-xl"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : (
          <div className="flex min-h-[200px] items-center justify-center rounded-xl border-2 border-dashed border-[var(--lp-site-border-subtle)]">
            <div className="text-center">
              <svg className="mx-auto h-10 w-10 text-[var(--lp-site-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <p className="mt-2 text-sm text-[var(--lp-site-muted)]">
                Paste custom HTML code
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
