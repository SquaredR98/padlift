/**
 * Simple in-memory sliding-window rate limiter.
 * Suitable for serverless — each instance tracks its own window.
 * For multi-instance deployments, this provides per-instance protection
 * which is sufficient for basic abuse prevention.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const stores = new Map<string, Map<string, RateLimitEntry>>();

interface RateLimitConfig {
  /** Unique name for this limiter (e.g. "analytics", "waitlist") */
  name: string;
  /** Max requests per window */
  limit: number;
  /** Window size in milliseconds */
  windowMs: number;
}

/**
 * Check if a request should be rate-limited.
 * Returns { limited: false } if allowed, or { limited: true, retryAfter } if blocked.
 */
export function checkRateLimit(
  config: RateLimitConfig,
  key: string,
): { limited: false } | { limited: true; retryAfter: number } {
  let store = stores.get(config.name);
  if (!store) {
    store = new Map();
    stores.set(config.name, store);
  }

  const now = Date.now();
  const entry = store.get(key);

  // Evict stale entries periodically (every 1000 checks)
  if (store.size > 5000) {
    for (const [k, v] of store) {
      if (now > v.resetAt) store.delete(k);
    }
  }

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + config.windowMs });
    return { limited: false };
  }

  entry.count++;

  if (entry.count > config.limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { limited: true, retryAfter };
  }

  return { limited: false };
}

/**
 * Extract client IP from request headers.
 */
export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}
