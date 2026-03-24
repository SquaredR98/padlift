import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

interface FooterLink {
  label: string;
  href: string;
}

const DEFAULT_LINKS: FooterLink[] = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#blog' },
  { label: 'Twitter', href: '#twitter' },
];

export function FooterStandard({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const links = content.links as FooterLink[] ?? DEFAULT_LINKS;
  const logoUrl = content.logoUrl as string | undefined;
  const { companyName } = branding;
  const year = new Date().getFullYear();

  return (
    <footer
      data-lp-section="footer-standard"
      className="border-t border-[var(--lp-site-border)] bg-[var(--lp-site-bg)] py-12 sm:py-16"
    >
      <div className={cn('mx-auto px-6', tokens.maxWidth)}>
        {/* Top row */}
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          {/* Company logo or name */}
          <div className="flex items-center gap-3">
            {logoUrl && (
              <img src={logoUrl} alt={companyName} className="h-8 w-auto" />
            )}
            <span
              data-lp-brand="company"
              className="text-lg font-bold text-[var(--lp-site-heading)]"
            >
              {companyName}
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[var(--lp-site-muted)] transition-colors hover:text-[var(--lp-site-heading)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-[var(--lp-site-border)]" />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-[var(--lp-site-muted)]">
            &copy; {year}{' '}
            <span data-lp-brand="company">{companyName}</span>. All rights
            reserved.
          </p>
          <p className="text-sm text-[var(--lp-site-dimmed)]">
            Built with{' '}
            <a
              href="https://padlift.dev"
              className="text-[var(--lp-site-muted)] transition-colors hover:text-[var(--lp-site-heading)]"
            >
              Padlift
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
