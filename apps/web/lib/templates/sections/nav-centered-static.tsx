import type { BlockComponentProps } from '../block-types';

interface NavLink { label: string; href: string; }

export function NavCenteredStatic({ branding, content }: BlockComponentProps) {
  const ctaText = (content.ctaText as string) ?? 'Get Started';
  const ctaUrl = (content.ctaUrl as string) ?? '#';
  const rawLinks = (content.links ?? []) as Record<string, unknown>[];
  const links: NavLink[] = rawLinks.map((l) => ({ label: (l.label as string) ?? '', href: (l.href as string) ?? '#' }));

  const half = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, half);
  const rightLinks = links.slice(half);

  return (
    <header
      data-lp-section="nav-centered"
      className="relative z-50 border-b border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-bg)]"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="hidden flex-1 items-center justify-end gap-6 lg:flex">
          {leftLinks.map((link, i) => (
            <a key={i} href={link.href} className="text-sm font-medium text-[var(--lp-site-body)]">
              {link.label}
            </a>
          ))}
        </div>
        <a href="/" className="mx-6 shrink-0 text-xl font-bold text-[var(--lp-site-heading)]" data-lp-brand="company">
          {branding.companyName}
        </a>
        <div className="hidden flex-1 items-center gap-6 lg:flex">
          {rightLinks.map((link, i) => (
            <a key={i} href={link.href} className="text-sm font-medium text-[var(--lp-site-body)]">
              {link.label}
            </a>
          ))}
          <a
            href={ctaUrl}
            className="ml-auto rounded-lg px-5 py-2 text-sm font-semibold text-white"
            style={{ backgroundColor: branding.primaryColor }}
          >
            {ctaText}
          </a>
        </div>
      </nav>
    </header>
  );
}
