# Media Library

## Overview
Users upload images for use in their site blocks (hero backgrounds, logos, gallery images, etc.). Files are stored via a pluggable storage adapter and tracked in the `MediaFile` database table.

## Key Files

| File | Purpose |
|------|---------|
| `packages/services/src/media.service.ts` | Upload, list, delete operations |
| `packages/services/src/storage/storage-adapter.ts` | Storage interface |
| `packages/services/src/storage/local-adapter.ts` | Local filesystem adapter |
| `packages/services/src/storage/r2-adapter.ts` | Cloudflare R2 adapter |
| `apps/web/app/api/media/route.ts` | Upload + list API (with quota checks) |
| `apps/web/app/api/media/[mediaId]/route.ts` | Delete API |
| `apps/web/app/dashboard/media/page.tsx` | Media library UI |
| `apps/web/app/dashboard/sites/[siteId]/edit/_components/ImageField.tsx` | Image field in block editor |

## Upload Flow

1. **User drags/drops or selects a file** in the media library or an ImageField
2. **Client sends** `POST /api/media` with `FormData` (file + optional siteId)
3. **Server checks:**
   - File type is allowed (JPEG, PNG, WebP, SVG, GIF)
   - File size <= 5 MB
   - User hasn't exceeded their plan's storage quota
4. **If quota exceeded:** returns `403` with `{ code: 'STORAGE_LIMIT', usedBytes, maxBytes }`
5. **If OK:** delegates to `MediaService.upload()`:
   - Generates storage key: `{userId}/{folder}/{timestamp}-{safeName}`
   - Calls `storageAdapter.upload(key, buffer, contentType)`
   - Creates `MediaFile` record in DB
6. **Returns** the media object with public URL

## Storage Adapters

### Interface
```typescript
interface StorageAdapter {
  upload(key: string, body: Buffer, contentType: string): Promise<string>;
  delete(key: string): Promise<void>;
  getPublicUrl(key: string): string;
}
```

### Local Adapter (development)
- Writes files to `public/uploads/` directory
- Public URLs are `/uploads/{key}`
- Creates nested directories as needed
- Set via `STORAGE_PROVIDER=local` (default)

### R2 Adapter (production)
- Uses Cloudflare R2 via AWS S3 SDK
- Dynamic import of `@aws-sdk/client-s3` to avoid Turbopack static analysis issues
- Env vars: `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL`
- Set via `STORAGE_PROVIDER=r2`

### Factory
`createStorageAdapter()` in `service-container.ts` reads `STORAGE_PROVIDER` env var and instantiates the appropriate adapter.

## Plan-Based Storage Quotas

### Quota Limits
Configurable per plan via `PlanConfig.maxStorageMb`:
- FREE: 50 MB
- PRO: 500 MB
- BUSINESS: 5,000 MB

### Enforcement
The upload API calculates total used storage via a Prisma aggregate query on `MediaFile.size`:
```sql
SELECT SUM(size) FROM media_files WHERE user_id = ?
```

If `usedBytes + newFile.size > maxBytes`, the upload is rejected with a `STORAGE_LIMIT` error.

## Media Library UI

### Storage Bar
A visual progress bar showing used/total storage:
- **Blue** when < 80% full
- **Yellow** when 80-99% full
- **Red** when 100% full

### Near-Limit Warning (80%+)
Yellow alert with tips:
- Compress images with TinyPNG or Squoosh
- Use WebP format (smaller file sizes)
- Use external image URLs instead of uploading
- Delete unused images

### At-Limit Block (100%)
- Upload button disabled
- Drop zone grayed out
- Full modal with compression tips + "Upgrade Plan" link

### File Grid
Responsive grid of uploaded images with:
- Image thumbnail preview
- Filename and file size
- Copy URL button
- Delete button

## ImageField (Block Editor)

The `ImageField` component in the block editor supports two modes:

### Upload Mode
Standard file upload — opens the browser file picker, uploads via `/api/media`.

### URL Mode
Direct URL input — user enters an external image URL (e.g., from Unsplash, their CDN).
- No storage quota consumed
- URL is stored directly as the block content value
- Inline text input with "Use URL" / "Cancel" buttons
- Keyboard support: Enter to submit, Escape to cancel

### Empty State
Two side-by-side buttons:
1. **Upload** (large) — opens file picker
2. **URL** (small) — reveals inline URL input

### Preview State
Shows the image with a hover overlay offering:
- Re-upload (replace image)
- Delete (clear value)

## Allowed File Types

| MIME Type | Extension |
|-----------|-----------|
| `image/jpeg` | .jpg, .jpeg |
| `image/png` | .png |
| `image/webp` | .webp |
| `image/svg+xml` | .svg |
| `image/gif` | .gif |

Maximum file size: **5 MB per file**.
