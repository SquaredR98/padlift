import { db } from '@launchpad/db';

/**
 * Read an app setting by key. Returns null if not found.
 */
export async function getAppSetting(key: string): Promise<string | null> {
  try {
    const row = await db.appSetting.findUnique({ where: { key } });
    return row?.value ?? null;
  } catch {
    return null;
  }
}

/**
 * Write an app setting.
 */
export async function setAppSetting(key: string, value: string): Promise<void> {
  await db.appSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

/**
 * Check if payments are enabled (admin toggle).
 * Defaults to false if not set.
 */
export async function isPaymentsEnabled(): Promise<boolean> {
  const val = await getAppSetting('paymentsEnabled');
  return val === 'true';
}
