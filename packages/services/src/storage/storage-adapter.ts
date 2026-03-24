/**
 * Abstract storage interface. Implementations handle
 * local disk (dev) or cloud object storage (prod).
 */
export interface StorageAdapter {
  /** Upload a file and return its public URL. */
  upload(key: string, body: Buffer, contentType: string): Promise<string>;

  /** Delete a file by key. */
  delete(key: string): Promise<void>;

  /** Get the public URL for a stored file. */
  getPublicUrl(key: string): string;
}
