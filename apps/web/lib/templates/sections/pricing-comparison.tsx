import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function PricingComparison({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Compare plans';
  const subtitle = (content.subtitle as string) ?? 'Find the perfect plan for your needs.';
  const plans = (content.plans as Array<{ name: string; price: string; period: string; cta: string; highlighted: boolean | string }>) ?? [
    { name: 'Free', price: '$0', period: '/mo', cta: 'Get Started', highlighted: false },
    { name: 'Pro', price: '$29', period: '/mo', cta: 'Start Trial', highlighted: true },
    { name: 'Enterprise', price: '$99', period: '/mo', cta: 'Contact Sales', highlighted: false },
  ];
  const features = (content.features as Array<{ name: string; values: string }>) ?? [
    { name: 'Projects', values: '3|Unlimited|Unlimited' },
    { name: 'Storage', values: '1 GB|50 GB|500 GB' },
    { name: 'Analytics', values: 'Basic|Advanced|Custom' },
    { name: 'Support', values: 'Community|Priority|Dedicated' },
    { name: 'Custom Domains', values: 'false|true|true' },
    { name: 'SSO', values: 'false|false|true' },
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
      data-lp-section="pricing-comparison"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto text-center', tokens.maxWidth)}>
        <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
          {title}
        </h2>
        {subtitle && <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>}
      </div>

      {/* Desktop table */}
      <div className={cn('mx-auto mt-12 hidden overflow-hidden sm:block', tokens.maxWidth, tokens.borderRadius, tokens.cardStyle)}>
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-[var(--lp-site-card)] p-4 text-left text-sm font-medium text-[var(--lp-site-muted)]">Features</th>
              {plans.map((p, i) => {
                const isHighlighted = p.highlighted === true || p.highlighted === 'true';
                return (
                  <th
                    key={i}
                    className={cn('p-4 text-center', isHighlighted ? 'text-white' : 'bg-[var(--lp-site-card)] text-[var(--lp-site-heading)]')}
                    style={isHighlighted ? { backgroundColor: branding.primaryColor } : undefined}
                  >
                    <div className="text-lg font-bold">{p.name}</div>
                    <div className="mt-1">
                      <span className="text-2xl font-bold">{p.price}</span>
                      <span className="text-sm opacity-80">{p.period}</span>
                    </div>
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
                  {plans.map((p, pi) => {
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
          <tfoot>
            <tr className="border-t border-[var(--lp-site-border)]">
              <td className="bg-[var(--lp-site-card)] p-4" />
              {plans.map((p, i) => {
                const isHighlighted = p.highlighted === true || p.highlighted === 'true';
                return (
                  <td key={i} className={cn('p-4 text-center', isHighlighted ? 'bg-[var(--lp-site-card-hover)]' : 'bg-[var(--lp-site-bg)]')}>
                    <button
                      className={cn(
                        'rounded-xl px-6 py-2 text-sm font-semibold transition-all',
                        isHighlighted
                          ? 'text-white'
                          : 'border border-[var(--lp-site-border)] text-[var(--lp-site-heading)] hover:bg-[var(--lp-site-card-hover)]'
                      )}
                      style={isHighlighted ? { backgroundColor: branding.primaryColor } : undefined}
                    >
                      {p.cta}
                    </button>
                  </td>
                );
              })}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile cards */}
      <div className={cn('mx-auto mt-12 space-y-6 sm:hidden', tokens.maxWidth)}>
        {plans.map((p, i) => {
          const isHighlighted = p.highlighted === true || p.highlighted === 'true';
          return (
            <div
              key={i}
              className={cn('p-6', tokens.borderRadius, isHighlighted ? 'border-2' : tokens.cardStyle)}
              style={isHighlighted ? { borderColor: branding.primaryColor } : undefined}
            >
              <h3 className="text-lg font-bold text-[var(--lp-site-heading)]">{p.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-[var(--lp-site-heading)]">{p.price}</span>
                <span className="text-sm text-[var(--lp-site-muted)]">{p.period}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {features.map((f, fi) => {
                  const values = f.values.split('|');
                  const val = values[i] ?? '';
                  return (
                    <li key={fi} className="flex items-center justify-between text-sm">
                      <span className="text-[var(--lp-site-muted)]">{f.name}</span>
                      {renderCell(val)}
                    </li>
                  );
                })}
              </ul>
              <button
                className={cn(
                  'mt-6 w-full rounded-xl py-2.5 text-sm font-semibold',
                  isHighlighted ? 'text-white' : 'border border-[var(--lp-site-border)] text-[var(--lp-site-heading)]'
                )}
                style={isHighlighted ? { backgroundColor: branding.primaryColor } : undefined}
              >
                {p.cta}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
