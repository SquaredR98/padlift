import { resolveTokenClasses, type BlockComponentProps } from '../block-types';
import { cn } from '@/lib/utils';

export function FeaturesScreenshot({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'See it in action';
  const description = (content.description as string) ?? 'Our intuitive interface makes complex tasks simple. See how teams are using our platform to ship faster.';
  const screenshotUrl = (content.screenshotUrl as string) ?? '';
  const bulletsRaw = (content.bullets as string) ?? 'Drag-and-drop editor\nReal-time collaboration\nOne-click publishing';
  const imagePosition = (content.imagePosition as string) ?? 'right';
  const bullets = bulletsRaw.split('\n').filter(Boolean);

  const textContent = (
    <div>
      <h2 className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, "font-bold text-[var(--lp-site-heading)]")}>
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-[var(--lp-site-body)]">
        {description}
      </p>
      {bullets.length > 0 && (
        <ul className="mt-6 space-y-3">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0"
                style={{ color: branding.primaryColor }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-[var(--lp-site-body)]">{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const imageContent = (
    <div className={cn("overflow-hidden bg-[var(--lp-site-card)] shadow-lg", tokens.cardStyle, tokens.borderRadius)}>
      {screenshotUrl ? (
        <img src={screenshotUrl} alt={title} className="w-full object-cover" />
      ) : (
        <div
          className="flex aspect-video items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${branding.primaryColor}10, ${branding.secondaryColor}10)` }}
        >
          <p className="text-sm text-[var(--lp-site-muted)]">Upload a screenshot</p>
        </div>
      )}
    </div>
  );

  return (
    <section
      data-lp-section="features-screenshot"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn("mx-auto grid items-center lg:grid-cols-2", tokens.maxWidth, tokens.gap)}>
        {imagePosition === 'left' ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    </section>
  );
}
