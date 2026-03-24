import type { PrismaClient, MediaFile } from '@prisma/client';
import { z } from 'zod';
import { NotFoundError, ValidationError, ForbiddenError } from './errors';
import type { StorageAdapter } from './storage/storage-adapter';

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/gif',
]);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export class MediaService {
  constructor(
    private db: PrismaClient,
    private storage: StorageAdapter,
  ) {}

  async upload(
    userId: string,
    siteId: string | null,
    file: { name: string; type: string; buffer: Buffer },
  ): Promise<MediaFile> {
    if (!ALLOWED_TYPES.has(file.type)) {
      throw new ValidationError(`Unsupported file type: ${file.type}. Allowed: ${[...ALLOWED_TYPES].join(', ')}`);
    }

    if (file.buffer.length > MAX_FILE_SIZE) {
      throw new ValidationError(`File too large: ${(file.buffer.length / 1024 / 1024).toFixed(1)}MB. Max: 5MB`);
    }

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const folder = siteId || 'shared';
    const key = `${userId}/${folder}/${timestamp}-${safeName}`;

    const url = await this.storage.upload(key, file.buffer, file.type);

    return this.db.mediaFile.create({
      data: {
        userId,
        siteId,
        filename: file.name,
        key,
        url,
        contentType: file.type,
        size: file.buffer.length,
      },
    });
  }

  async list(userId: string, siteId?: string): Promise<MediaFile[]> {
    return this.db.mediaFile.findMany({
      where: {
        userId,
        ...(siteId ? { siteId } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(userId: string, mediaId: string): Promise<void> {
    const media = await this.db.mediaFile.findUnique({ where: { id: mediaId } });
    if (!media) throw new NotFoundError('MediaFile', mediaId);
    if (media.userId !== userId) throw new ForbiddenError('You do not own this file');

    await this.storage.delete(media.key);
    await this.db.mediaFile.delete({ where: { id: mediaId } });
  }
}
