'use client';

import { useEffect, useCallback } from 'react';

interface InlineEditLayerProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  blockId: string;
  onInlineEdit: (blockId: string, key: string, value: string) => void;
}

export function InlineEditLayer({ wrapperRef, blockId, onInlineEdit }: InlineEditLayerProps) {
  const handleBlur = useCallback(
    (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      const key = target.getAttribute('data-lp-editable');
      if (!key) return;
      const text = target.innerText.trim();
      onInlineEdit(blockId, key, text);
      target.removeAttribute('contenteditable');
      target.style.removeProperty('outline');
      target.style.removeProperty('outline-offset');
      target.style.removeProperty('border-radius');
      target.style.removeProperty('cursor');
      target.style.removeProperty('min-height');
    },
    [blockId, onInlineEdit],
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
    if (e.key === 'Escape') {
      (e.target as HTMLElement).blur();
    }
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const editables = wrapper.querySelectorAll<HTMLElement>('[data-lp-editable]');
    const handlers: Array<{ el: HTMLElement; click: (e: MouseEvent) => void }> = [];

    editables.forEach((el) => {
      el.style.cursor = 'text';

      const clickHandler = (e: MouseEvent) => {
        e.stopPropagation();
        if (el.isContentEditable) return;
        el.contentEditable = 'true';
        el.style.outline = '2px solid rgba(59, 130, 246, 0.5)';
        el.style.outlineOffset = '2px';
        el.style.borderRadius = '4px';
        el.style.minHeight = '1em';
        el.focus();
      };

      el.addEventListener('click', clickHandler);
      el.addEventListener('blur', handleBlur as EventListener);
      el.addEventListener('keydown', handleKeyDown as EventListener);
      handlers.push({ el, click: clickHandler });
    });

    return () => {
      handlers.forEach(({ el, click }) => {
        el.removeAttribute('contenteditable');
        el.style.removeProperty('outline');
        el.style.removeProperty('outline-offset');
        el.style.removeProperty('border-radius');
        el.style.removeProperty('cursor');
        el.style.removeProperty('min-height');
        el.removeEventListener('click', click);
        el.removeEventListener('blur', handleBlur as EventListener);
        el.removeEventListener('keydown', handleKeyDown as EventListener);
      });
    };
  }, [wrapperRef, handleBlur, handleKeyDown]);

  return null;
}
