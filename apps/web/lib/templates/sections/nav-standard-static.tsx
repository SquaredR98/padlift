import type { BlockComponentProps } from '../block-types';

interface NavLink {
  label: string;
  href: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export function NavStandardStatic({ branding, content, styles }: BlockComponentProps) {
  const logoUrl = content.logoUrl as string | undefined;
  const ctaText = content.ctaText as string ?? 'Get Started';
  const ctaUrl = content.ctaUrl as string ?? '#';
  const rawLinks = (content.links ?? DEFAULT_LINKS) as Record<string, unknown>[];
  const links = rawLinks.map((l) => ({
    label: (l.label as string) ?? '',
    href: (l.href as string) ?? '#',
  }));

  return (
    <header
      data-lp-section="nav-standard"
      className="relative z-50 bg-[var(--lp-site-bg)] border-b border-[var(--lp-site-border-subtle)]"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo / Company name */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          {logoUrl ? (
            <img src={logoUrl} alt={branding.companyName} className="h-8 w-auto" />
          ) : (
            <span className="text-lg font-bold text-[var(--lp-site-heading)]">{branding.companyName}</span>
          )}
        </a>

        {/* Links */}
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[var(--lp-site-body)] hover:text-[var(--lp-site-heading)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href={ctaUrl}
          className="rounded-lg px-5 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: branding.primaryColor }}
        >
          {ctaText}
        </a>
      </nav>
    </header>
  );
}
