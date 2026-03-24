import Link from 'next/link';
import { Rocket } from 'lucide-react';
import './styles.css';

const PRODUCT_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Roadmap', href: '/feature-requests' },
];

const RESOURCES_LINKS = [
  { label: 'Feature Requests', href: '/feature-requests' },
  { label: 'Sign In', href: '/login' },
  { label: 'Get Started', href: '/signup' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="mx-auto max-w-6xl px-6">
        <div className="landing-footer-grid">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              <span className="font-semibold text-foreground">Padlift</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Everything you need to launch your SaaS. One dashboard.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Product</h4>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2">
              {RESOURCES_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Padlift. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
