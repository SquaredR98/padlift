'use client';

import { useCallback, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import type { PageData, BlockInstance } from '@/lib/templates/block-types';
import { BLOCK_REGISTRY } from '@/lib/templates/block-registry';
import { useHistory } from './use-history';

export function useBlockOperations(initialPageData: PageData, siteId: string, pageId: string) {
  const [pageData, setPageData] = useState<PageData>(initialPageData);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const pageDataRef = useRef(pageData);
  pageDataRef.current = pageData;

  const history = useHistory(initialPageData);

  const pushHistory = useCallback(() => {
    history.push({ pageData: structuredClone(pageDataRef.current), selectedBlockId });
  }, [history, selectedBlockId]);

  const handleUndo = useCallback(() => {
    const entry = history.undo({ pageData: structuredClone(pageDataRef.current), selectedBlockId });
    if (entry) { setPageData(entry.pageData); setSelectedBlockId(entry.selectedBlockId); }
  }, [history, selectedBlockId]);

  const handleRedo = useCallback(() => {
    const entry = history.redo({ pageData: structuredClone(pageDataRef.current), selectedBlockId });
    if (entry) { setPageData(entry.pageData); setSelectedBlockId(entry.selectedBlockId); }
  }, [history, selectedBlockId]);

  const selectedBlock = selectedBlockId
    ? pageData.blocks.find((b) => b.id === selectedBlockId) ?? null
    : null;

  // ─── Save ───────────────────────────────────────────────
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const save = useCallback(async () => {
    setSaveStatus('saving');
    try {
      const current = pageDataRef.current;
      const res = await fetch(`/api/sites/${siteId}/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId, branding: current.branding, blocks: { blocks: current.blocks } }),
      });
      setSaveStatus(res.ok ? 'saved' : 'error');
    } catch {
      setSaveStatus('error');
    }
  }, [siteId, pageId]);

  const scheduleAutoSave = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(save, 2000);
    setSaveStatus('idle');
  }, [save]);

  // ─── Block mutations ──────────────────────────────────────
  const addBlock = useCallback((blockType: string) => {
    const entry = BLOCK_REGISTRY[blockType];
    if (!entry) return;
    pushHistory();
    const newBlock: BlockInstance = { id: nanoid(), blockType, content: { ...entry.defaultContent }, styles: { ...entry.defaultStyles } };
    setPageData((prev) => {
      const blocks = [...prev.blocks];
      const idx = selectedBlockId ? blocks.findIndex((b) => b.id === selectedBlockId) : -1;
      if (idx >= 0) { blocks.splice(idx + 1, 0, newBlock); } else { blocks.push(newBlock); }
      return { ...prev, blocks };
    });
    setSelectedBlockId(newBlock.id);
    scheduleAutoSave();
  }, [scheduleAutoSave, selectedBlockId, pushHistory]);

  const moveBlock = useCallback((blockId: string, direction: 'up' | 'down') => {
    pushHistory();
    setPageData((prev) => {
      const blocks = [...prev.blocks];
      const idx = blocks.findIndex((b) => b.id === blockId);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= blocks.length) return prev;
      [blocks[idx], blocks[targetIdx]] = [blocks[targetIdx], blocks[idx]];
      return { ...prev, blocks };
    });
    scheduleAutoSave();
  }, [scheduleAutoSave, pushHistory]);

  const duplicateBlock = useCallback((blockId: string) => {
    pushHistory();
    setPageData((prev) => {
      const idx = prev.blocks.findIndex((b) => b.id === blockId);
      if (idx === -1) return prev;
      const duplicate: BlockInstance = { ...structuredClone(prev.blocks[idx]), id: nanoid() };
      const blocks = [...prev.blocks];
      blocks.splice(idx + 1, 0, duplicate);
      return { ...prev, blocks };
    });
    scheduleAutoSave();
  }, [scheduleAutoSave, pushHistory]);

  const deleteBlock = useCallback((blockId: string) => {
    pushHistory();
    setPageData((prev) => ({ ...prev, blocks: prev.blocks.filter((b) => b.id !== blockId) }));
    if (selectedBlockId === blockId) setSelectedBlockId(null);
    scheduleAutoSave();
  }, [selectedBlockId, scheduleAutoSave, pushHistory]);

  const reorderBlocks = useCallback((activeId: string, overId: string) => {
    pushHistory();
    setPageData((prev) => {
      const blocks = [...prev.blocks];
      const oldIdx = blocks.findIndex((b) => b.id === activeId);
      const newIdx = blocks.findIndex((b) => b.id === overId);
      if (oldIdx === -1 || newIdx === -1) return prev;
      const [moved] = blocks.splice(oldIdx, 1);
      blocks.splice(newIdx, 0, moved);
      return { ...prev, blocks };
    });
    scheduleAutoSave();
  }, [scheduleAutoSave, pushHistory]);

  const updateBlockContent = useCallback((blockId: string, key: string, value: unknown) => {
    pushHistory();
    setPageData((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => b.id === blockId ? { ...b, content: { ...b.content, [key]: value } } : b),
    }));
    scheduleAutoSave();
  }, [scheduleAutoSave, pushHistory]);

  const updateBlockStyle = useCallback((blockId: string, key: string, value: unknown) => {
    pushHistory();
    setPageData((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => b.id === blockId ? { ...b, styles: { ...b.styles, [key]: value } } : b),
    }));
    scheduleAutoSave();
  }, [scheduleAutoSave, pushHistory]);

  const updateBranding = useCallback((key: string, value: unknown) => {
    pushHistory();
    setPageData((prev) => ({ ...prev, branding: { ...prev.branding, [key]: value } }));
    scheduleAutoSave();
  }, [scheduleAutoSave, pushHistory]);

  const handleInlineEdit = useCallback((blockId: string, key: string, value: string) => {
    pushHistory();
    setPageData((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => b.id === blockId ? { ...b, content: { ...b.content, [key]: value } } : b),
    }));
    scheduleAutoSave();
  }, [scheduleAutoSave, pushHistory]);

  const deselectBlock = useCallback(() => { setSelectedBlockId(null); }, []);

  return {
    pageData, selectedBlockId, setSelectedBlockId, selectedBlock,
    saveStatus, save, saveTimer, scheduleAutoSave,
    history, pushHistory, handleUndo, handleRedo,
    addBlock, moveBlock, duplicateBlock, deleteBlock, reorderBlocks,
    updateBlockContent, updateBlockStyle, updateBranding, handleInlineEdit, deselectBlock,
  };
}
