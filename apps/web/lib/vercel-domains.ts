/**
 * Vercel Domains API — auto-register/remove custom domains
 * when users save them in site settings.
 *
 * Requires env vars: VERCEL_PROJECT_ID, VERCEL_API_TOKEN
 * Docs: https://vercel.com/docs/rest-api/endpoints/projects#add-a-domain-to-a-project
 */

const VERCEL_API = 'https://api.vercel.com';

function getConfig() {
  const projectId = process.env.VERCEL_PROJECT_ID;
  const token = process.env.VERCEL_API_TOKEN;
  if (!projectId || !token) return null;
  return { projectId, token };
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

/**
 * Add a custom domain to the Vercel project.
 * Idempotent — if the domain already exists, Vercel returns 409 which we ignore.
 */
export async function addDomainToVercel(domain: string): Promise<{ ok: boolean; error?: string }> {
  const cfg = getConfig();
  if (!cfg) {
    console.warn('[vercel-domains] VERCEL_PROJECT_ID or VERCEL_API_TOKEN not set — skipping domain add');
    return { ok: false, error: 'Vercel env vars not configured' };
  }

  try {
    const res = await fetch(`${VERCEL_API}/v10/projects/${cfg.projectId}/domains`, {
      method: 'POST',
      headers: headers(cfg.token),
      body: JSON.stringify({ name: domain }),
    });

    if (res.ok) {
      console.log(`[vercel-domains] Added domain: ${domain}`);
      return { ok: true };
    }

    // 409 = domain already exists on project — that's fine
    if (res.status === 409) {
      console.log(`[vercel-domains] Domain already exists: ${domain}`);
      return { ok: true };
    }

    const body = await res.json().catch(() => ({}));
    const errMsg = (body as { error?: { message?: string } }).error?.message ?? `HTTP ${res.status}`;
    console.error(`[vercel-domains] Failed to add domain ${domain}: ${errMsg}`);
    return { ok: false, error: errMsg };
  } catch (err) {
    console.error('[vercel-domains] Network error adding domain:', err);
    return { ok: false, error: 'Network error' };
  }
}

/**
 * Remove a custom domain from the Vercel project.
 * Idempotent — if the domain doesn't exist, Vercel returns 404 which we ignore.
 */
export async function removeDomainFromVercel(domain: string): Promise<{ ok: boolean; error?: string }> {
  const cfg = getConfig();
  if (!cfg) {
    console.warn('[vercel-domains] VERCEL_PROJECT_ID or VERCEL_API_TOKEN not set — skipping domain remove');
    return { ok: false, error: 'Vercel env vars not configured' };
  }

  try {
    const res = await fetch(
      `${VERCEL_API}/v9/projects/${cfg.projectId}/domains/${encodeURIComponent(domain)}`,
      {
        method: 'DELETE',
        headers: headers(cfg.token),
      },
    );

    if (res.ok) {
      console.log(`[vercel-domains] Removed domain: ${domain}`);
      return { ok: true };
    }

    // 404 = domain not on project — that's fine
    if (res.status === 404) {
      console.log(`[vercel-domains] Domain not found (already removed): ${domain}`);
      return { ok: true };
    }

    const body = await res.json().catch(() => ({}));
    const errMsg = (body as { error?: { message?: string } }).error?.message ?? `HTTP ${res.status}`;
    console.error(`[vercel-domains] Failed to remove domain ${domain}: ${errMsg}`);
    return { ok: false, error: errMsg };
  } catch (err) {
    console.error('[vercel-domains] Network error removing domain:', err);
    return { ok: false, error: 'Network error' };
  }
}
