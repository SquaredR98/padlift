import type { BlockComponentProps } from '../block-types';

export function DividerLine({ branding, content }: BlockComponentProps) {
  const label = (content.label as string) ?? '';
  const style = (content.style as string) ?? 'solid';

  const lineStyle =
    style === 'dashed'
      ? 'border-dashed'
      : style === 'gradient'
        ? 'border-none'
        : 'border-solid';

  if (label) {
    return (
      <section
        data-lp-section="divider-line"
        className="bg-[var(--lp-site-bg)] px-6 py-4"
      >
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <div className="flex-1">
            {style === 'gradient' ? (
              <div
                className="h-px"
                style={{
                  background: `linear-gradient(to right, transparent, ${branding.primaryColor}, transparent)`,
                }}
              />
            ) : (
              <div
                className={`h-0 border-t border-[var(--lp-site-border)] ${lineStyle}`}
              />
            )}
          </div>
          <span className="shrink-0 text-sm font-medium text-[var(--lp-site-muted)]">
            {label}
          </span>
          <div className="flex-1">
            {style === 'gradient' ? (
              <div
                className="h-px"
                style={{
                  background: `linear-gradient(to right, transparent, ${branding.primaryColor}, transparent)`,
                }}
              />
            ) : (
              <div
                className={`h-0 border-t border-[var(--lp-site-border)] ${lineStyle}`}
              />
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      data-lp-section="divider-line"
      className="bg-[var(--lp-site-bg)] px-6 py-4"
    >
      <div className="mx-auto max-w-4xl">
        {style === 'gradient' ? (
          <div
            className="h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${branding.primaryColor}, transparent)`,
            }}
          />
        ) : (
          <div
            className={`h-0 border-t border-[var(--lp-site-border)] ${lineStyle}`}
          />
        )}
      </div>
    </section>
  );
}
