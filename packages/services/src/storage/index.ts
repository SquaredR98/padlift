export type { StorageAdapter } from './storage-adapter';
export { LocalStorageAdapter } from './local-adapter';

import { LocalStorageAdapter } from './local-adapter';
import type { StorageAdapter } from './storage-adapter';

export function createStorageAdapter(): StorageAdapter {
  const provider = process.env.STORAGE_PROVIDER || 'local';

  if (provider === 'r2') {
    // Use Function constructor to hide require() from bundler static analysis
    // This prevents webpack/turbopack from trying to bundle @aws-sdk/client-s3
    const loadModule = new Function('m', 'return require(m)');
    const mod = loadModule('./r2-adapter');
    const { R2StorageAdapter } = mod;

    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const bucket = process.env.R2_BUCKET_NAME;
    const publicUrl = process.env.R2_PUBLIC_URL;

    if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicUrl) {
      throw new Error('R2 storage requires R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, and R2_PUBLIC_URL env vars');
    }

    return new R2StorageAdapter({ accountId, accessKeyId, secretAccessKey, bucket, publicUrl });
  }

  const uploadDir = process.env.UPLOAD_DIR || 'public/uploads';
  return new LocalStorageAdapter(uploadDir);
}
