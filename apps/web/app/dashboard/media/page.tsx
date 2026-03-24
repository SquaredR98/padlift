'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Upload,
  Loader2,
  ImageIcon,
  AlertTriangle,
  ArrowUpRight,
  HardDrive,
} from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '../components/ui/page-header';
import { MediaCard } from '@/components/dashboard/media-card';

interface MediaFile {
  id: string;
  filename: string;
  url: string;
  contentType: string;
  size: number;
  createdAt: string;
}

interface StorageInfo {
  usedBytes: number;
  maxBytes: number;
  fileCount: number;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [storage, setStorage] = useState<StorageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const [limitMessage, setLimitMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch('/api/media');
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files);
        setStorage(data.storage);
      }
    } catch {
      /* silently fail */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/media', { method: 'POST', body: formData });
      if (res.ok) {
        const media = await res.json();
        setFiles((prev) => [media, ...prev]);
        if (storage) {
          setStorage({
            ...storage,
            usedBytes: storage.usedBytes + file.size,
            fileCount: storage.fileCount + 1,
          });
        }
      } else {
        const err = await res.json();
        if (err.code === 'STORAGE_LIMIT') {
          setLimitMessage(err.error);
          setShowLimitPopup(true);
        } else {
          alert(err.error || 'Upload failed');
        }
      }
    } catch {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const handleDelete = async (id: string) => {
    const file = files.find((f) => f.id === id);
    try {
      const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFiles((prev) => prev.filter((f) => f.id !== id));
        if (storage && file) {
          setStorage({
            ...storage,
            usedBytes: Math.max(0, storage.usedBytes - file.size),
            fileCount: Math.max(0, storage.fileCount - 1),
          });
        }
      }
    } catch {
      alert('Delete failed');
    }
  };

  // Storage calculations
  const usedMb = storage ? (storage.usedBytes / (1024 * 1024)).toFixed(1) : '0';
  const maxMb = storage ? (storage.maxBytes / (1024 * 1024)).toFixed(0) : '50';
  const usagePercent = storage
    ? Math.min(100, (storage.usedBytes / storage.maxBytes) * 100)
    : 0;
  const isNearLimit = usagePercent >= 80;
  const isAtLimit = usagePercent >= 100;

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Media Library"
        description="Upload and manage images for your sites"
        actions={
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || isAtLimit}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Upload
          </button>
        }
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex-1 overflow-y-auto p-5">
        {/* Storage usage bar */}
        {storage && (
          <div className="mb-5 rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Storage</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {usedMb} MB / {maxMb} MB
                <span className="ml-2 text-xs text-dimmed-foreground">
                  ({storage.fileCount} file{storage.fileCount !== 1 ? 's' : ''})
                </span>
              </span>
            </div>
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${
                  isAtLimit
                    ? 'bg-red-500'
                    : isNearLimit
                      ? 'bg-yellow-500'
                      : 'bg-blue-500'
                }`}
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            {isNearLimit && !isAtLimit && (
              <p className="mt-2 text-xs text-yellow-400">
                You&apos;re running low on storage. Compress images before uploading
                or upgrade your plan.
              </p>
            )}
            {isAtLimit && (
              <div className="mt-2 flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                <p className="text-xs text-red-400">
                  Storage limit reached. Delete files, compress your images, or{' '}
                  <Link
                    href="/dashboard/settings"
                    className="underline hover:text-red-300"
                  >
                    upgrade your plan
                  </Link>{' '}
                  for more space.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Drop zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !isAtLimit && fileInputRef.current?.click()}
          className={`mb-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition ${
            isAtLimit
              ? 'cursor-not-allowed border-border bg-card/30 opacity-60'
              : dragOver
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-border bg-card/50 hover:border-muted-foreground/50 hover:bg-card'
          }`}
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
          ) : (
            <Upload className="h-8 w-8 text-dimmed-foreground" />
          )}
          <p className="mt-2 text-sm text-muted-foreground">
            {isAtLimit
              ? 'Storage limit reached — compress images or upgrade'
              : uploading
                ? 'Uploading...'
                : 'Drag & drop an image or click to browse'}
          </p>
          <p className="mt-1 text-xs text-dimmed-foreground">
            JPEG, PNG, WebP, SVG, GIF — max 5 MB per file
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-dimmed-foreground" />
          </div>
        )}

        {!loading && files.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ImageIcon className="h-12 w-12 text-border" />
            <p className="mt-3 text-sm text-muted-foreground">
              No images uploaded yet
            </p>
            <p className="mt-1 text-xs text-dimmed-foreground">
              Upload images to use in your templates
            </p>
          </div>
        )}

        {!loading && files.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {files.map((file) => (
              <MediaCard
                key={file.id}
                file={file}
                onDelete={handleDelete}
                formatSize={formatSize}
              />
            ))}
          </div>
        )}
      </div>

      {/* Storage Limit Popup */}
      {showLimitPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                Storage Limit Reached
              </h3>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">{limitMessage}</p>

            <div className="mb-5 space-y-3 rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-dimmed-foreground">
                Tips to free up space
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-400">1.</span>
                  <span>
                    <strong className="text-foreground">Compress images</strong>{' '}
                    before uploading — tools like{' '}
                    <a
                      href="https://tinypng.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 underline"
                    >
                      TinyPNG
                    </a>{' '}
                    or{' '}
                    <a
                      href="https://squoosh.app"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 underline"
                    >
                      Squoosh
                    </a>{' '}
                    can reduce file sizes by 60–80%.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-400">2.</span>
                  <span>
                    <strong className="text-foreground">Use WebP format</strong>{' '}
                    instead of PNG/JPEG for much smaller files.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-400">3.</span>
                  <span>
                    <strong className="text-foreground">
                      Use an external URL
                    </strong>{' '}
                    — host images on Imgur, Cloudinary, or Unsplash and paste the
                    URL directly.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-blue-400">4.</span>
                  <span>
                    <strong className="text-foreground">
                      Delete unused images
                    </strong>{' '}
                    from your media library.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex gap-2">
              <Link
                href="/dashboard/settings"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
              >
                Upgrade Plan
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <button
                onClick={() => setShowLimitPopup(false)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
