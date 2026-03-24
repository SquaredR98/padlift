import { NextRequest, NextResponse } from 'next/server';
import { db } from '@launchpad/db';

/**
 * Public pricing experiment assignment.
 *
 * GET /api/pricing-experiment?eid=<experimentId>
 *   — Returning visitor: fetch their assigned experiment
 * GET /api/pricing-experiment
 *   — New visitor: weighted-random assignment from active experiments, increment views
 */
export async function GET(req: NextRequest) {
  const eid = req.nextUrl.searchParams.get('eid');

  // Returning visitor — serve their stored experiment
  if (eid) {
    try {
      const exp = await db.pricingExperiment.findUnique({ where: { id: eid } });
      if (exp) {
        return NextResponse.json({
          experimentId: exp.id,
          variants: exp.variants,
        });
      }
    } catch {
      // fall through to default
    }
    return NextResponse.json({ experimentId: null, variants: [] });
  }

  // New visitor — pick a random active experiment weighted by `weight`
  try {
    const experiments = await db.pricingExperiment.findMany({
      where: { isActive: true },
    });

    if (experiments.length === 0) {
      return NextResponse.json({ experimentId: null, variants: [] });
    }

    // Weighted random selection
    const totalWeight = experiments.reduce((sum, e) => sum + e.weight, 0);
    let rand = Math.random() * totalWeight;
    let selected = experiments[0];
    for (const exp of experiments) {
      rand -= exp.weight;
      if (rand <= 0) {
        selected = exp;
        break;
      }
    }

    // Increment views (fire-and-forget)
    db.pricingExperiment
      .update({ where: { id: selected.id }, data: { views: { increment: 1 } } })
      .catch(() => {});

    return NextResponse.json({
      experimentId: selected.id,
      variants: selected.variants,
    });
  } catch {
    return NextResponse.json({ experimentId: null, variants: [] });
  }
}
