import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function ContentFullwidthImage({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const imageUrl = (content.imageUrl as string) ?? '';
  const caption = (content.caption as string) ?? '';
  const captionPosition = (content.captionPosition as string) ?? 'bottom-left';
  const aspectRatio = (content.aspectRatio as string) ?? '16:9';

  const aspectClass = aspectRatio === '21:9' ? 'aspect-[21/9]' : aspectRatio === 'auto' ? '' : 'aspect-video';

  return (
    <section
      data-lp-section="content-fullwidth-image"
      className={cn('relative w-full overflow-hidden', tokens.maxWidth, 'mx-auto')}
    >
      {imageUrl ? (
        <div className={cn('relative w-full', aspectClass)}>
          <img
            src={imageUrl}
            alt={caption || 'Full width image'}
            className={cn(
              'w-full object-cover',
              tokens.borderRadius,
              aspectClass ? 'absolute inset-0 h-full' : '',
            )}
          />
          {caption && (
            <>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              <div className={cn(
                'absolute bottom-0 z-10 p-6 sm:p-8',
                captionPosition === 'bottom-center' && 'inset-x-0 text-center',
                captionPosition === 'bottom-left' && 'left-0',
              )}>
                <p className="text-lg font-medium text-white sm:text-xl">{caption}</p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div
          className={cn('flex w-full items-center justify-center', aspectClass || 'min-h-[300px]')}
          style={{ background: `linear-gradient(135deg, ${branding.primaryColor}22, ${branding.secondaryColor}22)` }}
        >
          <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-[var(--lp-site-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
            <p className="mt-2 text-sm text-[var(--lp-site-muted)]">Add a full-width image</p>
          </div>
        </div>
      )}
    </section>
  );
}
