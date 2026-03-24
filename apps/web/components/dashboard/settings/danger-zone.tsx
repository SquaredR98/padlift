'use client';

import { useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import { SectionCard } from './shared';

interface DangerZoneSectionProps {
  siteName: string;
  onDelete: () => void;
}

export function DangerZoneSection({ siteName, onDelete }: DangerZoneSectionProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <SectionCard title="Danger Zone" icon={AlertTriangle} danger>
      {showConfirm ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-foreground">{siteName}</span>?
            This will permanently delete all pages, waitlist entries, analytics, and
            payment links. This action cannot be undone.
          </p>
          <div className="flex items-center gap-2">
            <button onClick={onDelete} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
              Yes, delete this site
            </button>
            <button onClick={() => setShowConfirm(false)} className="settings-btn-ghost-sm">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Delete this site</p>
            <p className="text-xs text-dimmed-foreground">
              Permanently remove this site and all its data.
            </p>
          </div>
          <button onClick={() => setShowConfirm(true)} className="settings-btn-danger-outline">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      )}
    </SectionCard>
  );
}
