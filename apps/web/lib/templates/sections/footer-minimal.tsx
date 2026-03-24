import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function FooterMinimal({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const links = (content.links as Array<{ label: string; href: string }>) ?? [
    { label: 'Privacy', href: '#privacy' },
    { label: 'Terms', href: '#terms' },
  ];

  return (
    <footer
      data-lp-section="footer-minimal"
      className="border-t border-[var(--lp-site-border)] bg-[var(--lp-site-bg)] px-6 py-6"
    >
      <div className={cn('mx-auto flex flex-col items-center justify-between gap-3 sm:flex-row', tokens.maxWidth)}>
        <p className="text-sm text-[var(--lp-site-muted)]">
          &copy; {new Date().getFullYear()}{' '}
          <span data-lp-brand="company">{branding.companyName}</span>. All rights reserved.
        </p>
        {links.length > 0 && (
          <nav className="flex gap-4">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm text-[var(--lp-site-muted)] transition-colors hover:text-[var(--lp-site-heading)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
