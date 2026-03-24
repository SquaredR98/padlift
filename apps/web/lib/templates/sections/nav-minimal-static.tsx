import type { BlockComponentProps } from '../block-types';

interface NavLink {
  label: string;
  href: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
];

export function NavMinimalStatic({ branding, content, styles }: BlockComponentProps) {
  const logoUrl = content.logoUrl as string | undefined;
  const rawLinks = (content.links ?? DEFAULT_LINKS) as Record<string, unknown>[];
  const links = rawLinks.map((l) => ({
    label: (l.label as string) ?? '',
    href: (l.href as string) ?? '#',
  }));

  return (
    <header
      data-lp-section="nav-minimal"
      className="relative z-50 bg-[var(--lp-site-bg)]"
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        {/* Logo / Company name */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          {logoUrl ? (
            <img src={logoUrl} alt={branding.companyName} className="h-7 w-auto" />
          ) : (
            <span className="text-base font-semibold text-[var(--lp-site-heading)]">{branding.companyName}</span>
          )}
        </a>

        {/* Links */}
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[var(--lp-site-body)] hover:text-[var(--lp-site-heading)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
