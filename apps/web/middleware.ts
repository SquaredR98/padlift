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

// ── In-memory domain → slug cache (5 min TTL) ──
// Prevents an internal fetch on every request for the same custom domain.
const DOMAIN_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const domainCache = new Map<string, { slug: string | null; expiresAt: number }>();

function getCachedSlug(domain: string): string | null | undefined {
  const entry = domainCache.get(domain);
  if (!entry) return undefined; // cache miss
  if (Date.now() > entry.expiresAt) {
    domainCache.delete(domain);
    return undefined; // expired
  }
  return entry.slug; // cache hit (may be null = domain not found)
}

function setCachedSlug(domain: string, slug: string | null) {
  // Cap cache size to prevent memory abuse from many unique domains
  if (domainCache.size > 500) {
    // Evict oldest entries
    const keys = domainCache.keys();
    for (let i = 0; i < 100; i++) {
      const k = keys.next();
      if (k.done) break;
      domainCache.delete(k.value);
    }
  }
  domainCache.set(domain, { slug, expiresAt: Date.now() + DOMAIN_CACHE_TTL });
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

      // Check in-memory cache first
      const cached = getCachedSlug(domain);
      if (cached !== undefined) {
        if (cached) {
          const url = request.nextUrl.clone();
          url.pathname = `/s/${cached}`;
          return NextResponse.rewrite(url);
        }
        return new NextResponse('Site not found', { status: 404 });
      }

      try {
        // Resolve custom domain → slug via internal API
        const lookupUrl = new URL(
          `/api/internal/domain-lookup?d=${encodeURIComponent(domain)}`,
          request.nextUrl.origin,
        );
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const res = await fetch(lookupUrl.toString(), { signal: controller.signal });
        clearTimeout(timeout);
        const data = await res.json();

        setCachedSlug(domain, data.slug || null);

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
