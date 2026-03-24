import * as fs from 'fs/promises';
import * as path from 'path';
import type { StorageAdapter } from './storage-adapter';

export class LocalStorageAdapter implements StorageAdapter {
  constructor(
    private uploadDir: string,
    private publicPrefix: string = '/uploads',
  ) {}

  async upload(key: string, body: Buffer, _contentType: string): Promise<string> {
    const filePath = path.join(this.uploadDir, key);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, body);
    return this.getPublicUrl(key);
  }

  async delete(key: string): Promise<void> {
    const filePath = path.join(this.uploadDir, key);
    try {
      await fs.unlink(filePath);
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
    }
  }

  getPublicUrl(key: string): string {
    return `${this.publicPrefix}/${key}`;
  }
}
