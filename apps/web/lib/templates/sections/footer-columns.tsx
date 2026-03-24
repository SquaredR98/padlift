import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function FooterColumns({ branding, content, styles }: BlockComponentProps) {
  const description = (content.description as string) ?? 'Building the future of product launches. One platform to build, launch, and grow.';
  const columns = (content.columns as Array<{ heading: string; links: string }>) ?? [
    { heading: 'Product', links: 'Features|#features\nPricing|#pricing\nTemplates|#templates' },
    { heading: 'Company', links: 'About|#about\nBlog|#blog\nCareers|#careers' },
    { heading: 'Support', links: 'Help Center|#help\nContact|#contact\nStatus|#status' },
  ];
  const socialLinks = (content.socialLinks as Array<{ platform: string; url: string }>) ?? [
    { platform: 'Twitter', url: '#' },
    { platform: 'GitHub', url: '#' },
  ];

  const tokens = resolveTokenClasses(styles);
  const parseLinks = (linksStr: string) =>
    linksStr.split('\n').filter(Boolean).map((line) => {
      const [label, href] = line.split('|');
      return { label: label?.trim() ?? '', href: href?.trim() ?? '#' };
    });

  return (
    <footer
      data-lp-section="footer-columns"
      className="border-t border-[var(--lp-site-border)] bg-[var(--lp-site-bg)] px-6 py-16"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <p className="text-lg font-bold text-[var(--lp-site-heading)]" data-lp-brand="company">
              {branding.companyName}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--lp-site-muted)]">
              {description}
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-4 flex gap-3">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    className="text-sm text-[var(--lp-site-muted)] transition-colors hover:text-[var(--lp-site-heading)]"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col, i) => {
            const links = parseLinks(col.links);
            return (
              <div key={i}>
                <h4 className="text-sm font-semibold text-[var(--lp-site-heading)]">{col.heading}</h4>
                <ul className="mt-3 space-y-2">
                  {links.map((link, li) => (
                    <li key={li}>
                      <a
                        href={link.href}
                        className="text-sm text-[var(--lp-site-muted)] transition-colors hover:text-[var(--lp-site-heading)]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 border-t border-[var(--lp-site-border)] pt-6">
          <p className="text-center text-sm text-[var(--lp-site-muted)]">
            &copy; {new Date().getFullYear()}{' '}
            <span data-lp-brand="company">{branding.companyName}</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
