import type { StorageAdapter } from './storage-adapter';

export interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  publicUrl: string;
}

/**
 * Cloudflare R2 storage adapter using S3-compatible API.
 * Uses @aws-sdk/client-s3 loaded at runtime to avoid bundling when not used.
 */
export class R2StorageAdapter implements StorageAdapter {
  private s3: any;
  private bucket: string;
  private publicUrl: string;

  constructor(private config: R2Config) {
    this.bucket = config.bucket;
    this.publicUrl = config.publicUrl;
  }

  private async getClient() {
    if (!this.s3) {
      // Use opaque require to prevent bundler static analysis
      const sdkModule = 'client-s3';
      const pkg = `@aws-sdk/${sdkModule}`;
      const sdk = await (Function('p', 'return import(p)')(pkg) as Promise<any>);
      this.s3 = new sdk.S3Client({
        region: 'auto',
        endpoint: `https://${this.config.accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: this.config.accessKeyId,
          secretAccessKey: this.config.secretAccessKey,
        },
      });
    }
    return this.s3;
  }

  async upload(key: string, body: Buffer, contentType: string): Promise<string> {
    const sdkModule = 'client-s3';
    const pkg = `@aws-sdk/${sdkModule}`;
    const sdk = await (Function('p', 'return import(p)')(pkg) as Promise<any>);
    const client = await this.getClient();
    await client.send(
      new sdk.PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
    return this.getPublicUrl(key);
  }

  async delete(key: string): Promise<void> {
    const sdkModule = 'client-s3';
    const pkg = `@aws-sdk/${sdkModule}`;
    const sdk = await (Function('p', 'return import(p)')(pkg) as Promise<any>);
    const client = await this.getClient();
    await client.send(
      new sdk.DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }

  getPublicUrl(key: string): string {
    return `${this.publicUrl}/${key}`;
  }
}
