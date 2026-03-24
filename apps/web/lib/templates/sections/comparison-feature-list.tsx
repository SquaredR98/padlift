import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function ComparisonFeatureList({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'How we compare';
  const subtitle = (content.subtitle as string) ?? 'See why teams are switching.';
  const products = (content.products as Array<{ name: string; highlighted: boolean | string }>) ?? [
    { name: 'Us', highlighted: true },
    { name: 'Competitor A', highlighted: false },
    { name: 'Competitor B', highlighted: false },
  ];
  const features = (content.features as Array<{ name: string; values: string }>) ?? [
    { name: 'Free Tier', values: 'true|false|true' },
    { name: 'Custom Domains', values: 'true|true|false' },
    { name: 'Analytics', values: 'Advanced|Basic|Basic' },
    { name: 'Support', values: 'Priority|Email|Community' },
  ];

  const renderCell = (value: string) => {
    if (value === 'true') {
      return (
        <svg className="mx-auto h-5 w-5" style={{ color: branding.primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    if (value === 'false') {
      return (
        <svg className="mx-auto h-5 w-5 text-[var(--lp-site-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    return <span className="text-sm text-[var(--lp-site-body)]">{value}</span>;
  };

  return (
    <section
      data-lp-section="comparison-feature-list"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className="text-center">
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>{title}</h2>
          {subtitle && <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>}
        </div>

        <div className={cn('mt-12 overflow-hidden border border-[var(--lp-site-border)]', tokens.borderRadius)}>
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-[var(--lp-site-card)] p-4 text-left text-sm font-medium text-[var(--lp-site-muted)]">Feature</th>
                {products.map((p, i) => {
                  const isHighlighted = p.highlighted === true || p.highlighted === 'true';
                  return (
                    <th
                      key={i}
                      className={cn('p-4 text-center text-sm font-bold', isHighlighted ? 'text-white' : 'bg-[var(--lp-site-card)] text-[var(--lp-site-heading)]')}
                      style={isHighlighted ? { backgroundColor: branding.primaryColor } : undefined}
                    >
                      {p.name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {features.map((f, fi) => {
                const values = f.values.split('|');
                return (
                  <tr key={fi} className="border-t border-[var(--lp-site-border)]">
                    <td className="bg-[var(--lp-site-card)] p-4 text-sm font-medium text-[var(--lp-site-body)]">{f.name}</td>
                    {products.map((p, pi) => {
                      const isHighlighted = p.highlighted === true || p.highlighted === 'true';
                      return (
                        <td key={pi} className={cn('p-4 text-center', isHighlighted ? 'bg-[var(--lp-site-card-hover)]' : 'bg-[var(--lp-site-bg)]')}>
                          {renderCell(values[pi] ?? '')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
