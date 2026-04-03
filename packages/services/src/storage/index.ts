export type { StorageAdapter } from './storage-adapter';
export { LocalStorageAdapter } from './local-adapter';

import { LocalStorageAdapter } from './local-adapter';
import type { StorageAdapter } from './storage-adapter';

/**
 * Create a storage adapter. Returns LocalStorageAdapter synchronously for dev,
 * or a lazy proxy that loads R2StorageAdapter on first use for production.
 */
export function createStorageAdapter(): StorageAdapter {
  const provider = process.env.STORAGE_PROVIDER || 'local';

  if (provider === 'r2') {
    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const bucket = process.env.R2_BUCKET_NAME;
    const publicUrl = process.env.R2_PUBLIC_URL;

    if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicUrl) {
      throw new Error('R2 storage requires R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, and R2_PUBLIC_URL env vars');
    }

    // Lazy-load R2 adapter on first call to avoid bundler pulling in @aws-sdk at build time
    let r2: StorageAdapter | undefined;
    const loadR2 = async (): Promise<StorageAdapter> => {
      if (r2) return r2;
      const mod = await (Function('p', 'return import(p)')('./r2-adapter') as Promise<any>);
      r2 = new mod.R2StorageAdapter({ accountId, accessKeyId, secretAccessKey, bucket, publicUrl }) as StorageAdapter;
      return r2;
    };

    // Return a proxy that lazily initialises the real adapter
    return {
      async upload(key, body, contentType) {
        const adapter = await loadR2();
        return adapter.upload(key, body, contentType);
      },
      async delete(key) {
        const adapter = await loadR2();
        return adapter.delete(key);
      },
      getPublicUrl(key) {
        return `${publicUrl}/${key}`;
      },
    };
  }

  const uploadDir = process.env.UPLOAD_DIR || 'public/uploads';
  return new LocalStorageAdapter(uploadDir);
}
