import { NextRequest, NextResponse } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { testimonialsService } from '@/lib/service-container';

// GET /api/testimonials — public, returns approved + featured
export async function GET() {
  const testimonials = await testimonialsService.getApprovedFeatured();
  return NextResponse.json({ testimonials });
}

// POST /api/testimonials — auth'd users submit a testimonial
export async function POST(req: NextRequest) {
  const profile = await getAuthProfile();
  if (!profile) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { quote, rating } = body;

  if (!quote || typeof quote !== 'string' || quote.trim().length < 10) {
    return NextResponse.json({ error: 'Quote must be at least 10 characters' }, { status: 400 });
  }

  const r = typeof rating === 'number' ? Math.min(5, Math.max(1, Math.round(rating))) : 5;

  const testimonial = await testimonialsService.submit({
    name: profile.name ?? 'Anonymous',
    quote: quote.trim(),
    rating: r,
    role: body.role?.trim() || undefined,
    company: body.company?.trim() || undefined,
    profileId: profile.id,
  });

  return NextResponse.json({ testimonial }, { status: 201 });
}
