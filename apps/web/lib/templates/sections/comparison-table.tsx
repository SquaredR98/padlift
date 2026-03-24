import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface ComparisonRow {
  feature: string;
  yours: string;
  theirs: string;
}

const DEFAULT_ROWS: ComparisonRow[] = [
  { feature: 'Setup time', yours: '5 minutes', theirs: '2-3 hours' },
  { feature: 'No-code builder', yours: 'true', theirs: 'false' },
  { feature: 'Built-in analytics', yours: 'true', theirs: 'false' },
  { feature: 'Waitlist management', yours: 'true', theirs: 'false' },
  { feature: 'Custom domains', yours: 'true', theirs: 'true' },
  { feature: 'A/B testing', yours: 'true', theirs: 'false' },
  { feature: 'Starting price', yours: 'Free', theirs: '$49/mo' },
];

function CellValue({ value, color }: { value: string; color: string }) {
  if (value === 'true') {
    return (
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}20` }}
      >
        <svg className="h-4 w-4" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  }
  if (value === 'false') {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--lp-site-card-hover)]">
        <svg className="h-4 w-4 text-[var(--lp-site-dimmed)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    );
  }
  return <span className="text-sm text-[var(--lp-site-body)]">{value}</span>;
}

export function ComparisonTable({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = content.title as string ?? 'See the difference';
  const subtitle = content.subtitle as string ?? 'Compare us to the alternatives and see why teams are switching.';
  const yourBrand = content.yourBrand as string | undefined;
  const competitor = content.competitor as string ?? 'Others';
  const rows = content.rows as ComparisonRow[] ?? DEFAULT_ROWS;
  const { primaryColor } = branding;
  const brandName = yourBrand || branding.companyName;

  return (
    <section
      data-lp-section="comparison-table"
      className="relative bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          <p className={cn('mt-4 leading-relaxed text-[var(--lp-site-body)]', tokens.bodySize)}>
            {subtitle}
          </p>
        </div>

        {/* Table */}
        <div className={cn('overflow-hidden border border-[var(--lp-site-border)]', tokens.borderRadius)}>
          {/* Header row */}
          <div className="grid grid-cols-3 bg-[var(--lp-site-card)] px-6 py-4">
            <div className="text-sm font-medium text-[var(--lp-site-muted)]">Feature</div>
            <div className="text-center">
              <span
                className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-[var(--lp-site-heading)]"
                style={{ backgroundColor: `${primaryColor}30` }}
              >
                {brandName}
              </span>
            </div>
            <div className="text-center text-sm font-medium text-[var(--lp-site-muted)]">{competitor}</div>
          </div>

          {/* Data rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className={cn(
                'grid grid-cols-3 items-center px-6 py-4 transition-colors',
                i % 2 === 0 ? 'bg-[var(--lp-site-card)]' : 'bg-[var(--lp-site-card)]'
              )}
            >
              <div className="text-sm font-medium text-[var(--lp-site-body)]">{row.feature}</div>
              <div className="flex justify-center">
                <CellValue value={row.yours} color={primaryColor} />
              </div>
              <div className="flex justify-center">
                <CellValue value={row.theirs} color="#ef4444" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
