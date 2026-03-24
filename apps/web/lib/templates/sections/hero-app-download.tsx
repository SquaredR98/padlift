import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function HeroAppDownload({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const headline = content.headline as string | undefined;
  const subheadline = (content.subheadline as string) ?? 'Available on iOS and Android. Download now and start building.';
  const appStoreUrl = (content.appStoreUrl as string) ?? '#';
  const playStoreUrl = (content.playStoreUrl as string) ?? '#';
  const phoneImageUrl = (content.phoneImageUrl as string) ?? '';

  return (
    <section
      data-lp-section="hero-app-download"
      className="relative overflow-hidden bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto grid items-center gap-12 lg:grid-cols-2', tokens.maxWidth)}>
        {/* Text side */}
        <div>
          <h1 className={cn(tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform, 'font-extrabold text-[var(--lp-site-heading)] leading-[1.1]')}>
            <span data-lp-brand="company">{headline ?? branding.companyName}</span>
            <span className="mt-2 block text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              <span
                data-lp-brand="tagline"
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${branding.primaryColor}, ${branding.primaryColor}99, ${branding.secondaryColor})`,
                }}
              >
                {branding.tagline}
              </span>
            </span>
          </h1>

          <p className={cn('mt-4 max-w-lg leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
            {subheadline}
          </p>

          {/* Store buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={appStoreUrl}
              className="inline-flex h-14 items-center gap-3 rounded-xl border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] px-6 transition-colors hover:bg-[var(--lp-site-card-hover)]"
            >
              <svg className="h-7 w-7 text-[var(--lp-site-heading)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-[var(--lp-site-muted)]">Download on the</div>
                <div className="text-sm font-semibold text-[var(--lp-site-heading)]">App Store</div>
              </div>
            </a>
            <a
              href={playStoreUrl}
              className="inline-flex h-14 items-center gap-3 rounded-xl border border-[var(--lp-site-border)] bg-[var(--lp-site-card)] px-6 transition-colors hover:bg-[var(--lp-site-card-hover)]"
            >
              <svg className="h-7 w-7 text-[var(--lp-site-heading)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 2.04c-.22.22-.35.54-.35.97v18c0 .42.13.74.35.96l.05.05L13.8 12.44v-.1L3.23 1.99l-.05.05zM17.35 16l-3.55-3.55v-.1L17.35 8.8l.08.05 4.2 2.39c1.2.68 1.2 1.79 0 2.47l-4.2 2.39-.08.04zM13.8 12.44L3.69 22.56c.38.4.99.42 1.7.04L18.3 14.8 13.8 12.44zm0-.89L18.3 8.19 5.39 1.39c-.71-.38-1.32-.36-1.7.05L13.8 11.55z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-[var(--lp-site-muted)]">Get it on</div>
                <div className="text-sm font-semibold text-[var(--lp-site-heading)]">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-[280px]">
            <div className="overflow-hidden rounded-[2.5rem] border-4 border-[var(--lp-site-border)] bg-[var(--lp-site-card)] shadow-2xl">
              {/* Notch */}
              <div className="relative mx-auto h-6 w-32 rounded-b-2xl bg-[var(--lp-site-border)]" />
              {/* Screen */}
              <div className="aspect-[9/19]">
                {phoneImageUrl ? (
                  <img
                    src={phoneImageUrl}
                    alt="App screenshot"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${branding.primaryColor}20, ${branding.secondaryColor}20)`,
                    }}
                  >
                    <p className="text-sm text-[var(--lp-site-muted)]">App screenshot</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
