import { createElement } from 'react';
import { cn } from '@/lib/utils';
import sanitizeHtml from 'sanitize-html';
import type { PageData, BlockComponentProps } from './templates/block-types';
import { resolveBlockClasses, resolveBlockInlineStyles } from './templates/block-types';
import { BLOCK_REGISTRY } from './templates/block-registry';
import { resolveAnchorIds } from './templates/block-anchors';

/** Sanitize user-provided HTML in block content before publishing. */
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['iframe', 'img', 'video', 'source', 'picture']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    iframe: ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen', 'loading', 'title', 'style'],
    img: ['src', 'alt', 'width', 'height', 'loading', 'style'],
    video: ['src', 'controls', 'width', 'height', 'autoplay', 'muted', 'loop', 'poster'],
    source: ['src', 'type'],
    '*': ['class', 'style', 'id'],
  },
  allowedIframeHostnames: ['www.youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com', 'open.spotify.com', 'codepen.io', 'codesandbox.io'],
  disallowedTagsMode: 'discard',
};

/**
 * Render a PageData (block-based) site to static HTML for publishing.
 *
 * Uses SSR-safe components from the block registry.
 * Applies Tailwind classes for layout/spacing and inline styles
 * only for dynamic brand colors.
 *
 * react-dom/server is dynamically imported to avoid Turbopack restrictions.
 */
export async function renderPageToHtml(pageData: PageData): Promise<string> {
  const branding = {
    companyName: pageData.branding.companyName || 'My Company',
    tagline: pageData.branding.tagline || '',
    primaryColor: pageData.branding.primaryColor || '#3b82f6',
    secondaryColor: pageData.branding.secondaryColor || '#8b5cf6',
    logoUrl: pageData.branding.logoUrl,
    headingFont: pageData.branding.headingFont || pageData.branding.fontFamily || 'Inter',
    bodyFont: pageData.branding.bodyFont || pageData.branding.fontFamily || 'Inter',
    defaultTheme: pageData.branding.defaultTheme || 'dark',
  };

  const anchorIds = resolveAnchorIds(pageData.blocks);

  const blockElements = pageData.blocks.map((block, i) => {
    const entry = BLOCK_REGISTRY[block.blockType];
    if (!entry) return null;

    // Use SSR component if available (for blocks with client hooks)
    const Component = entry.ssrComponent || entry.component;

    // Tailwind classes for layout, inline styles only for dynamic values
    const wrapperClassName = cn('relative', resolveBlockClasses(block));
    const wrapperStyle = resolveBlockInlineStyles(block, branding);

    // Merge accent color override into branding for this block
    const effectiveBranding = block.styles.accentColor
      ? { ...branding, primaryColor: block.styles.accentColor }
      : branding;

    // Sanitize user-provided HTML fields to prevent XSS in published sites
    const safeContent = { ...block.content };
    if (safeContent.htmlContent && typeof safeContent.htmlContent === 'string') {
      safeContent.htmlContent = sanitizeHtml(safeContent.htmlContent, SANITIZE_OPTIONS);
    }
    if (safeContent.embedCode && typeof safeContent.embedCode === 'string') {
      safeContent.embedCode = sanitizeHtml(safeContent.embedCode, SANITIZE_OPTIONS);
    }

    const props: BlockComponentProps = {
      branding: effectiveBranding,
      content: safeContent,
      styles: block.styles,
    };

    // Background overlay element
    const overlayEl =
      block.styles.backgroundOverlay && block.styles.backgroundImage
        ? createElement('div', {
            className: 'absolute inset-0 z-0',
            style: { backgroundColor: block.styles.backgroundOverlay },
            'aria-hidden': 'true',
          })
        : null;

    return createElement(
      'div',
      {
        key: i,
        id: anchorIds.get(block.id) ?? undefined,
        className: wrapperClassName,
        style: wrapperStyle,
        'data-lp-section': block.blockType,
      },
      overlayEl,
      createElement('div', { className: overlayEl ? 'relative z-10' : undefined },
        createElement(Component as any, props),
      ),
    );
  });

  const pageEl = createElement(
    'div',
    {
      className: 'min-h-screen bg-[var(--lp-site-bg)]',
      'data-site-theme': branding.defaultTheme,
    },
    ...blockElements.filter(Boolean),
  );

  // Dynamic import to avoid Turbopack static-import restriction
  const { renderToStaticMarkup } = await import('react-dom/server');
  return renderToStaticMarkup(pageEl);
}
