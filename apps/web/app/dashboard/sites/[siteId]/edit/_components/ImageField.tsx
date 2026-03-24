'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, ImageIcon, Link2 } from 'lucide-react';

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ImageField({ label, value, onChange, placeholder }: ImageFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const media = await res.json();
        onChange(media.url);
      } else {
        const err = await res.json();
        alert(err.error || 'Upload failed');
      }
    } catch {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    e.target.value = '';
  };

  const handleUrlSubmit = () => {
    const url = urlValue.trim();
    if (!url) return;
    onChange(url);
    setUrlValue('');
    setShowUrlInput(false);
  };

  return (
    <div className="block">
      <span className="text-xs font-medium text-[var(--lp-text-muted)] mb-1.5 block">{label}</span>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="relative group rounded-lg border border-[var(--lp-border)] bg-[var(--lp-bg-surface)] overflow-hidden">
          <img
            src={value}
            alt={label}
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 group-hover:opacity-100 transition">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="rounded-lg bg-[var(--lp-bg-surface)] p-2 text-[var(--lp-text)] hover:bg-[var(--lp-bg-hover)] transition"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="rounded-lg bg-[var(--lp-bg-surface)] p-2 text-[var(--lp-error)] hover:bg-red-900/50 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : showUrlInput ? (
        <div className="space-y-2">
          <input
            type="url"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-lg border border-[var(--lp-border)] bg-[var(--lp-bg-surface)] px-3 py-2 text-xs text-[var(--lp-text)] placeholder:text-[var(--lp-text-muted)] focus:border-blue-500 focus:outline-none"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleUrlSubmit();
              if (e.key === 'Escape') setShowUrlInput(false);
            }}
          />
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={handleUrlSubmit}
              disabled={!urlValue.trim()}
              className="flex-1 rounded-md bg-blue-600 px-2 py-1 text-[10px] font-medium text-white hover:bg-blue-500 disabled:opacity-50"
            >
              Use URL
            </button>
            <button
              type="button"
              onClick={() => { setShowUrlInput(false); setUrlValue(''); }}
              className="rounded-md border border-[var(--lp-border)] px-2 py-1 text-[10px] font-medium text-[var(--lp-text-muted)] hover:bg-[var(--lp-bg-hover)]"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex flex-1 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-[var(--lp-border)] bg-[var(--lp-bg-surface)] py-6 text-[var(--lp-text-muted)] hover:border-[var(--lp-text-secondary)] hover:text-[var(--lp-text-secondary)] transition disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ImageIcon className="h-5 w-5" />
            )}
            <span className="text-xs">
              {uploading ? 'Uploading...' : placeholder || 'Upload image'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput(true)}
            className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-[var(--lp-border)] bg-[var(--lp-bg-surface)] px-3 py-6 text-[var(--lp-text-muted)] hover:border-[var(--lp-text-secondary)] hover:text-[var(--lp-text-secondary)] transition"
            title="Use external URL"
          >
            <Link2 className="h-5 w-5" />
            <span className="text-[10px]">URL</span>
          </button>
        </div>
      )}
    </div>
  );
}
