import { type NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

/**
 * Hosts that belong to the Padlift app itself (not customer custom domains).
 * Add your production domain here when deploying.
 */
const APP_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  ...(process.env.APP_DOMAINS?.split(',').map((d) => d.trim()).filter(Boolean) ?? []),
]);

function isAppHost(host: string): boolean {
  // Strip port for comparison (e.g. "localhost:3001" → "localhost")
  const hostname = host.split(':')[0];
  if (APP_HOSTS.has(hostname)) return true;
  // Auto-recognize Vercel preview/production domains
  if (hostname.endsWith('.vercel.app')) return true;
  return false;
}

async function customDomainHandler(request: NextRequest) {
  const host = request.headers.get('host') ?? '';

  // ── Custom domain handling ──
  // If the host doesn't belong to the app, it's a customer's custom domain.
  // Look up the slug via internal API and rewrite to /s/[slug].
  if (host && !isAppHost(host)) {
    const pathname = request.nextUrl.pathname;

    // Only rewrite root and simple paths — don't intercept assets or app routes
    if (
      pathname === '/' ||
      pathname === '' ||
      (!pathname.startsWith('/_next') &&
        !pathname.startsWith('/api') &&
        !pathname.startsWith('/s/') &&
        !pathname.startsWith('/dashboard') &&
        !pathname.startsWith('/login') &&
        !pathname.startsWith('/signup') &&
        !pathname.startsWith('/auth') &&
        !pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|css|js|woff2?)$/))
    ) {
      const domain = host.split(':')[0];

      try {
        // Resolve custom domain → slug via internal API
        const lookupUrl = new URL(
          `/api/internal/domain-lookup?d=${encodeURIComponent(domain)}`,
          request.nextUrl.origin,
        );
        const res = await fetch(lookupUrl.toString());
        const data = await res.json();

        if (data.slug) {
          const url = request.nextUrl.clone();
          url.pathname = `/s/${data.slug}`;
          return NextResponse.rewrite(url);
        }
      } catch {
        // Domain lookup failed — fall through to 404
      }

      return new NextResponse('Site not found', { status: 404 });
    }
  }

  return null; // No custom domain handling needed
}

// Wrap auth() to add custom domain logic
export default auth(async (req) => {
  // First check custom domain
  const customResponse = await customDomainHandler(req);
  if (customResponse) return customResponse;

  // Then let Auth.js handle the request (via authorized callback)
  return;
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public assets (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
