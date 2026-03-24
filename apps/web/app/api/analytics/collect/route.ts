import { NextRequest } from 'next/server';
import { db } from '@launchpad/db';
import { createHash } from 'crypto';

/**
 * Analytics collection endpoint — called from published sites.
 * No auth required (public endpoint).
 *
 * POST { siteId, path, referrer, ua }
 * Returns 204 No Content.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { siteId, path, referrer, ua } = body;

    if (!siteId || typeof siteId !== 'string') {
      return new Response(null, { status: 204 });
    }

    // Generate a privacy-safe visitor hash from IP + UA (no PII stored)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'unknown';
    const raw = `${ip}:${ua || ''}:${new Date().toISOString().slice(0, 10)}`;
    const visitorHash = createHash('sha256').update(raw).digest('hex').slice(0, 32);

    // Detect device type from UA
    const uaStr = (ua || '').toLowerCase();
    const deviceType = /mobile|android|iphone|ipad/i.test(uaStr)
      ? (/ipad|tablet/i.test(uaStr) ? 'tablet' : 'mobile')
      : 'desktop';

    // Clean referrer
    const cleanReferrer = referrer && referrer !== '' && !referrer.includes(siteId)
      ? referrer.slice(0, 500)
      : null;

    // Parse UTM params from referrer or query
    const refUrl = cleanReferrer ? safeParseUrl(cleanReferrer) : null;
    const utmSource = refUrl?.searchParams.get('utm_source') || extractDomain(cleanReferrer);
    const utmMedium = refUrl?.searchParams.get('utm_medium') || null;
    const utmCampaign = refUrl?.searchParams.get('utm_campaign') || null;

    // Upsert visitor (dedupe by hash per day via the unique constraint)
    const visitor = await db.visitor.upsert({
      where: { siteId_visitorHash: { siteId, visitorHash } },
      create: {
        siteId,
        visitorHash,
        deviceType,
        referrer: cleanReferrer,
        utmSource,
        utmMedium,
        utmCampaign,
      },
      update: {
        lastSeen: new Date(),
      },
    });

    // Create page_view event
    await db.analyticsEvent.create({
      data: {
        siteId,
        visitorId: visitor.id,
        eventName: 'page_view',
        propertiesJson: { path: (path || '/').slice(0, 500) },
      },
    });

    return new Response(null, { status: 204 });
  } catch (err) {
    // Don't fail the published site — silently handle errors
    console.error('[Analytics Collect] Error:', err);
    return new Response(null, { status: 204 });
  }
}

function safeParseUrl(url: string): URL | null {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

function extractDomain(url: string | null): string | null {
  if (!url) return null;
  const parsed = safeParseUrl(url);
  return parsed?.hostname || null;
}
