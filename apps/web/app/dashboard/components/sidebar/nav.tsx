'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Globe,
  Paintbrush,
  Users,
  BarChart3,
  FlaskConical,
  Settings,
  ChevronLeft,
  Sparkles,
  Shield,
  ImageIcon,
  CreditCard,
  Settings2,
  MessageSquareQuote,
  Lightbulb,
  MessageCircle,
  DollarSign,
} from 'lucide-react';
import { isAdmin } from '@/lib/admin';
import { useSiteContext } from '../site-context';

const globalNav = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/sites', label: 'Sites', icon: Globe },
  { href: '/dashboard/templates', label: 'Templates', icon: Sparkles },
  { href: '/dashboard/media', label: 'Media', icon: ImageIcon },
];

const siteNav = [
  { segment: '', label: 'Overview', icon: LayoutDashboard, exact: true },
  { segment: '/edit', label: 'Editor', icon: Paintbrush },
  { segment: '/waitlist', label: 'Waitlist', icon: Users },
  { segment: '/analytics', label: 'Analytics', icon: BarChart3 },
  { segment: '/ab-tests', label: 'A/B Tests', icon: FlaskConical },
  { segment: '/settings', label: 'Settings', icon: Settings },
];

const adminNav = [
  { segment: '', label: 'Overview', icon: LayoutDashboard, exact: true },
  { segment: '/users', label: 'Users', icon: Users },
  { segment: '/sites', label: 'Sites', icon: Globe },
  { segment: '/billing', label: 'Billing', icon: CreditCard },
  { segment: '/plans', label: 'Plans', icon: Settings2 },
  { segment: '/pricing-experiments', label: 'Pricing', icon: DollarSign },
  { segment: '/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { segment: '/feature-requests', label: 'Requests', icon: Lightbulb },
  { segment: '/support', label: 'Support', icon: MessageCircle },
  { segment: '/settings', label: 'Settings', icon: Shield },
];

function NavLink({ href, isActive, icon: Icon, label }: {
  href: string;
  isActive: boolean;
  icon: typeof LayoutDashboard;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`sidebar-nav-link ${isActive ? 'sidebar-nav-link-active' : 'sidebar-nav-link-inactive'}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

export function SidebarNav({ email }: { email: string }) {
  const pathname = usePathname();
  const siteContext = useSiteContext();

  const siteBase = siteContext ? `/dashboard/sites/${siteContext.id}` : null;
  const isAdminSection = pathname.startsWith('/dashboard/admin');
  const adminBase = '/dashboard/admin';

  return (
    <nav className="sidebar-nav">
      <div className="space-y-0.5">
        {globalNav.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return <NavLink key={item.href} href={item.href} isActive={isActive} icon={item.icon} label={item.label} />;
        })}
      </div>

      {isAdminSection && isAdmin(email) && (
        <div className="mt-4">
          <div className="sidebar-section-divider">
            <Link href="/dashboard" className="sidebar-back-link">
              <ChevronLeft className="h-3 w-3" />
              Back to dashboard
            </Link>
            <p className="sidebar-section-title">Admin</p>
          </div>
          <div className="space-y-0.5">
            {adminNav.map((item) => {
              const href = `${adminBase}${item.segment}`;
              const isActive = item.exact
                ? pathname === adminBase
                : pathname === href || pathname.startsWith(href + '/');
              return <NavLink key={item.segment} href={href} isActive={isActive} icon={item.icon} label={item.label} />;
            })}
          </div>
        </div>
      )}

      {!isAdminSection && siteBase && siteContext && (
        <div className="mt-4">
          <div className="sidebar-section-divider">
            <Link href="/dashboard/sites" className="sidebar-back-link">
              <ChevronLeft className="h-3 w-3" />
              Back to sites
            </Link>
            <p className="sidebar-section-title">{siteContext.name}</p>
          </div>
          <div className="space-y-0.5">
            {siteNav.map((item) => {
              const href = `${siteBase}${item.segment}`;
              const isActive = item.exact
                ? pathname === siteBase
                : pathname === href || pathname.startsWith(href + '/');
              return <NavLink key={item.segment} href={href} isActive={isActive} icon={item.icon} label={item.label} />;
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
