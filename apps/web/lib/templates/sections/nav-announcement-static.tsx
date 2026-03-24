import type { BlockComponentProps } from '../block-types';

interface NavLink { label: string; href: string; }

export function NavAnnouncementStatic({ branding, content }: BlockComponentProps) {
  const ctaText = (content.ctaText as string) ?? 'Get Started';
  const ctaUrl = (content.ctaUrl as string) ?? '#';
  const rawLinks = (content.links ?? []) as Record<string, unknown>[];
  const links: NavLink[] = rawLinks.map((l) => ({ label: (l.label as string) ?? '', href: (l.href as string) ?? '#' }));
  const announcementText = (content.announcementText as string) ?? 'We just launched v2.0! Check out the new features.';
  const announcementUrl = (content.announcementUrl as string) ?? '';

  return (
    <header data-lp-section="nav-announcement" className="relative z-50">
      {/* Announcement bar */}
      {announcementText && (
        <div className="px-6 py-2 text-center text-sm text-white" style={{ backgroundColor: branding.primaryColor }}>
          {announcementUrl ? (
            <a href={announcementUrl} className="font-medium hover:underline">{announcementText}</a>
          ) : (
            <span className="font-medium">{announcementText}</span>
          )}
        </div>
      )}

      {/* Nav bar */}
      <nav className="border-b border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-bg)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="text-xl font-bold text-[var(--lp-site-heading)]" data-lp-brand="company">
            {branding.companyName}
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link, i) => (
              <a key={i} href={link.href} className="text-sm font-medium text-[var(--lp-site-body)] transition-colors hover:text-[var(--lp-site-heading)]">
                {link.label}
              </a>
            ))}
            <a
              href={ctaUrl}
              className="rounded-lg px-5 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: branding.primaryColor }}
            >
              {ctaText}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
