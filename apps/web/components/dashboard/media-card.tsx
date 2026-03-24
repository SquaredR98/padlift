'use client';

import { useState } from 'react';
import { Trash2, Copy, Check, ImageIcon } from 'lucide-react';

interface MediaFile {
  id: string;
  filename: string;
  url: string;
  contentType: string;
  size: number;
}

interface MediaCardProps {
  file: MediaFile;
  onDelete: (id: string) => void;
  formatSize: (bytes: number) => string;
}

export function MediaCard({ file, onDelete, formatSize }: MediaCardProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.origin + file.url);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition hover:border-muted-foreground/30">
      <div className="relative aspect-square bg-muted">
        {file.contentType === 'image/svg+xml' ? (
          <div className="flex h-full items-center justify-center">
            <ImageIcon className="h-8 w-8 text-dimmed-foreground" />
          </div>
        ) : (
          <img src={file.url} alt={file.filename} className="h-full w-full object-cover" />
        )}

        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition group-hover:opacity-100">
          <button onClick={copyUrl} className="rounded-lg bg-muted p-2 text-foreground transition hover:bg-muted" title="Copy URL">
            {copiedId === file.id ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          </button>
          <button onClick={() => setDeleteConfirm(true)} className="rounded-lg bg-muted p-2 text-red-400 transition hover:bg-red-900/50" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-2">
        <p className="truncate text-xs font-medium text-foreground">{file.filename}</p>
        <p className="text-xs text-dimmed-foreground">{formatSize(file.size)}</p>
      </div>

      {deleteConfirm && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-card/95 p-4">
          <p className="text-center text-xs text-foreground">Delete this image?</p>
          <div className="flex gap-2">
            <button onClick={() => { onDelete(file.id); setDeleteConfirm(false); }} className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-500">
              Delete
            </button>
            <button onClick={() => setDeleteConfirm(false)} className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
