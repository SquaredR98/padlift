import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function SectionSplitColor({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Built for modern teams';
  const body = (content.body as string) ?? '';
  const imageUrl = (content.imageUrl as string) ?? '';
  const leftColor = (content.leftColor as string) ?? '';
  const rightColor = (content.rightColor as string) ?? '';
  const contentPosition = (content.contentPosition as string) ?? 'left';

  return (
    <section
      data-lp-section="section-split-color"
      className="relative overflow-hidden"
    >
      {/* Two-tone background */}
      <div className="absolute inset-0 flex">
        <div
          className="w-1/2"
          style={{ backgroundColor: leftColor || `${branding.primaryColor}11` }}
        />
        <div
          className="w-1/2"
          style={{ backgroundColor: rightColor || 'var(--lp-site-bg)' }}
        />
      </div>

      <div className={cn('relative z-10 mx-auto grid items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2', tokens.maxWidth)}>
        <div className={cn(tokens.textAlign, contentPosition === 'right' && 'lg:order-2')}>
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          {body && (
            <div className={cn('mt-4 space-y-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
              {body.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
          <div
            className="mt-6 h-1 w-16 rounded-full"
            style={{ backgroundColor: branding.primaryColor }}
          />
        </div>
        <div className={cn(contentPosition === 'right' && 'lg:order-1')}>
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="rounded-2xl shadow-xl" />
          ) : (
            <div
              className="flex aspect-[4/3] items-center justify-center rounded-2xl"
              style={{ background: `linear-gradient(135deg, ${branding.primaryColor}22, ${branding.secondaryColor}22)` }}
            >
              <svg className="h-16 w-16 text-[var(--lp-site-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
