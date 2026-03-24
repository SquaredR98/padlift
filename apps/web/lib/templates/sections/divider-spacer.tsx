import type { BlockComponentProps } from '../block-types';

const HEIGHTS: Record<string, string> = {
  sm: 'h-8',
  md: 'h-16',
  lg: 'h-24',
  xl: 'h-32',
};

export function DividerSpacer({ content }: BlockComponentProps) {
  const height = (content.height as string) ?? 'md';
  const cls = HEIGHTS[height] ?? HEIGHTS.md;

  return (
    <section data-lp-section="divider-spacer" className="bg-[var(--lp-site-bg)]">
      <div className={cls} />
    </section>
  );
}
