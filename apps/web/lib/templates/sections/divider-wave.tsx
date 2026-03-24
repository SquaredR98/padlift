import type { BlockComponentProps } from '../block-types';

export function DividerWave({ branding, content }: BlockComponentProps) {
  const flip = content.flip === true || content.flip === 'true';
  const colorMode = (content.color as string) ?? 'brand';

  const fillColor =
    colorMode === 'subtle'
      ? 'var(--lp-site-border)'
      : colorMode === 'bg'
        ? 'var(--lp-site-bg)'
        : branding.primaryColor;

  return (
    <section
      data-lp-section="divider-wave"
      className="bg-[var(--lp-site-bg)] leading-[0]"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="block h-[60px] w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z"
          style={{ fill: fillColor, opacity: colorMode === 'brand' ? 0.15 : 1 }}
        />
      </svg>
    </section>
  );
}
