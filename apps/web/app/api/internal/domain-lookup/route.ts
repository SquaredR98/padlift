import { NextRequest } from 'next/server';
import { sitesService } from '@/lib/service-container';

/**
 * Internal API for custom domain → slug resolution.
 * Called by middleware to resolve custom domains to site slugs.
 * GET /api/internal/domain-lookup?d=example.com
 */
export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get('d');
  if (!domain) {
    return Response.json({ error: 'Missing domain' }, { status: 400 });
  }

  const site = await sitesService.findByCustomDomain(domain);
  if (!site || !site.publishedAt) {
    return Response.json({ slug: null });
  }

  return Response.json({ slug: site.slug });
}
