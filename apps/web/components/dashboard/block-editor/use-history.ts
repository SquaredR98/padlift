'use client';

import { useState, useCallback, useRef } from 'react';
import type { PageData } from '@/lib/templates/block-types';

const MAX_HISTORY = 50;

export interface HistoryEntry {
  pageData: PageData;
  selectedBlockId: string | null;
}

export function useHistory(_initial: PageData) {
  const [past, setPast] = useState<HistoryEntry[]>([]);
  const [future, setFuture] = useState<HistoryEntry[]>([]);
  const skipNextPush = useRef(false);

  const push = useCallback((entry: HistoryEntry) => {
    if (skipNextPush.current) {
      skipNextPush.current = false;
      return;
    }
    setPast((prev) => {
      const next = [...prev, entry];
      if (next.length > MAX_HISTORY) next.shift();
      return next;
    });
    setFuture([]);
  }, []);

  const undo = useCallback(
    (current: HistoryEntry): HistoryEntry | null => {
      if (past.length === 0) return null;
      const prev = past[past.length - 1];
      setPast((p) => p.slice(0, -1));
      setFuture((f) => [...f, current]);
      skipNextPush.current = true;
      return prev;
    },
    [past],
  );

  const redo = useCallback(
    (current: HistoryEntry): HistoryEntry | null => {
      if (future.length === 0) return null;
      const next = future[future.length - 1];
      setFuture((f) => f.slice(0, -1));
      setPast((p) => [...p, current]);
      skipNextPush.current = true;
      return next;
    },
    [future],
  );

  return { push, undo, redo, canUndo: past.length > 0, canRedo: future.length > 0 };
}
