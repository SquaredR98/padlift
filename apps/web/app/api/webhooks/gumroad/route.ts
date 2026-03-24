import { NextRequest } from 'next/server';
import { db } from '@launchpad/db';
import type { Plan } from '@prisma/client';

/**
 * Gumroad Ping Webhook Handler
 *
 * Gumroad sends x-www-form-urlencoded POST data on purchase/subscription events.
 * Key fields: seller_id, email, product_id, subscription_id, refunded,
 *             resource_name, variants (JSON with tier info for memberships)
 *
 * For membership products, all tiers share the same product_id. We match
 * the tier using the `variants` JSON field (e.g. {"Tier": "Pro"}) against
 * PlanConfig.gumroadTierName. Falls back to product_id matching for
 * simple (non-membership) products.
 *
 * Flow:
 * 1. Verify seller_id matches env GUMROAD_SELLER_ID
 * 2. Parse variants JSON to extract tier name
 * 3. Look up PlanConfig by gumroadTierName or gumroadProductId
 * 4. Find user by email
 * 5. Upgrade/downgrade plan accordingly
 */
export async function POST(req: NextRequest) {
  const sellerId = process.env.GUMROAD_SELLER_ID;
  if (!sellerId) {
    console.error('[Gumroad Webhook] GUMROAD_SELLER_ID not configured');
    return new Response('Server configuration error', { status: 500 });
  }

  // Gumroad sends form-urlencoded data
  const formData = await req.formData();
  const data: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    data[key] = String(value);
  }

  // Verify seller_id
  if (data.seller_id !== sellerId) {
    console.warn('[Gumroad Webhook] Invalid seller_id:', data.seller_id);
    return new Response('Forbidden', { status: 403 });
  }

  const email = data.email?.toLowerCase().trim();
  const productId = data.product_id;
  const subscriptionId = data.subscription_id || null;
  const isRefunded = data.refunded === 'true';
  const isCancelled = data.cancelled === 'true' || data.resource_name === 'cancellation';
  const isEnded = data.resource_name === 'subscription_ended';
  const resourceName = data.resource_name; // "sale", "cancellation", "subscription_ended", etc.

  // Parse variants JSON — Gumroad sends membership tier info here
  // e.g. {"Tier": "Pro"} or "(Pro)" depending on product setup
  let variantTierName: string | null = null;
  try {
    if (data.variants) {
      const parsed = JSON.parse(data.variants);
      if (typeof parsed === 'object' && parsed !== null) {
        // Look for a "Tier" key (case-insensitive)
        for (const [key, val] of Object.entries(parsed)) {
          if (key.toLowerCase() === 'tier' && typeof val === 'string') {
            variantTierName = val.trim();
            break;
          }
        }
      }
    }
  } catch {
    // variants might be a plain string like "(Pro)" — extract the name
    if (typeof data.variants === 'string') {
      const match = data.variants.match(/\(([^)]+)\)/);
      if (match) variantTierName = match[1].trim();
    }
  }

  if (!email) {
    console.warn('[Gumroad Webhook] Missing email');
    return new Response('Bad request', { status: 400 });
  }

  console.log(
    `[Gumroad Webhook] ${resourceName} | email=${email} product=${productId} ` +
    `variant=${variantTierName} refunded=${isRefunded} cancelled=${isCancelled} sub=${subscriptionId}`,
  );

  try {
    // Cancellation or subscription ended → downgrade to FREE
    if (isCancelled || isEnded) {
      await downgradeUser(email);
      return new Response('OK', { status: 200 });
    }

    // Refund → downgrade to FREE
    if (isRefunded) {
      await downgradeUser(email);
      return new Response('OK', { status: 200 });
    }

    // Purchase/renewal → find the matching plan
    let planConfig = null;

    // Strategy 1: Match by tier name (for membership products)
    if (variantTierName) {
      planConfig = await db.planConfig.findFirst({
        where: {
          gumroadTierName: {
            equals: variantTierName,
            mode: 'insensitive',
          },
        },
      });
    }

    // Strategy 2: Fall back to product_id matching (simple products)
    if (!planConfig && productId) {
      planConfig = await db.planConfig.findFirst({
        where: { gumroadProductId: productId },
      });
    }

    if (!planConfig) {
      console.warn(
        `[Gumroad Webhook] No plan config found for tier="${variantTierName}" product="${productId}"`,
      );
      return new Response('OK', { status: 200 });
    }

    // Find the user by email
    const profile = await db.profile.findUnique({ where: { email } });
    if (!profile) {
      console.warn(`[Gumroad Webhook] No user found for email: ${email}`);
      return new Response('OK', { status: 200 });
    }

    // Upgrade to the matched plan tier
    await db.profile.update({
      where: { id: profile.id },
      data: {
        plan: planConfig.tier as Plan,
        gumroadSubscriptionId: subscriptionId,
        gumroadCustomerId: data.purchaser_id || null,
        planExpiresAt: null, // Active subscription — no expiry
      },
    });

    console.log(`[Gumroad Webhook] Upgraded ${email} to ${planConfig.tier}`);
    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('[Gumroad Webhook] Error processing webhook:', err);
    return new Response('Internal error', { status: 500 });
  }
}

/** Downgrade user to FREE and clear Gumroad fields */
async function downgradeUser(email: string) {
  const profile = await db.profile.findUnique({ where: { email } });
  if (!profile) {
    console.warn(`[Gumroad Webhook] Downgrade: no user found for email=${email}`);
    return;
  }

  await db.profile.update({
    where: { id: profile.id },
    data: {
      plan: 'FREE',
      gumroadSubscriptionId: null,
      gumroadCustomerId: null,
      planExpiresAt: null,
    },
  });

  console.log(`[Gumroad Webhook] Downgraded ${profile.email} to FREE`);
}
