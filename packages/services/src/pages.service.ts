import type { PrismaClient, Prisma } from '@prisma/client';
import { NotFoundError, ConflictError, ValidationError } from './errors';

export class PagesService {
  constructor(private db: PrismaClient) {}

  async findById(pageId: string) {
    const page = await this.db.page.findUnique({ where: { id: pageId } });
    if (!page) throw new NotFoundError('Page');
    return page;
  }

  async save(siteId: string, contentJson: Prisma.InputJsonValue) {
    const existing = await this.db.page.findFirst({
      where: { siteId },
      orderBy: { version: 'desc' },
    });

    if (existing) {
      return this.db.page.update({
        where: { id: existing.id },
        data: {
          contentJson,
          version: { increment: 1 },
        },
      });
    }

    return this.db.page.create({
      data: {
        siteId,
        contentJson,
        version: 1,
      },
    });
  }

  async saveById(pageId: string, contentJson: Prisma.InputJsonValue) {
    return this.db.page.update({
      where: { id: pageId },
      data: {
        contentJson,
        version: { increment: 1 },
      },
    });
  }

  async load(siteId: string) {
    const page = await this.db.page.findFirst({
      where: { siteId },
      orderBy: { version: 'desc' },
    });
    if (!page) throw new NotFoundError('Page');
    return page;
  }

  async loadPublished(siteId: string) {
    const page = await this.db.page.findFirst({
      where: { siteId, status: 'PUBLISHED' },
      orderBy: { version: 'desc' },
    });
    if (!page) throw new NotFoundError('Published page');
    return page;
  }

  async publishPage(pageId: string, html: string, css: string, js: string) {
    return this.db.page.update({
      where: { id: pageId },
      data: {
        publishedHtml: html,
        publishedCss: css,
        publishedJs: js,
        status: 'PUBLISHED',
      },
    });
  }

  async applyTemplate(siteId: string, templateId: string, contentJson: Prisma.InputJsonValue) {
    return this.db.page.create({
      data: {
        siteId,
        templateId,
        contentJson,
        version: 1,
      },
    });
  }

  // ─── Multi-page CRUD ────────────────────────────────────────

  /** List all pages for a site, ordered by creation */
  async listBySite(siteId: string) {
    return this.db.page.findMany({
      where: { siteId },
      orderBy: { createdAt: 'asc' },
      select: { id: true, slug: true, title: true, status: true, version: true, createdAt: true, updatedAt: true },
    });
  }

  /** Create a new sub-page for a site */
  async createPage(siteId: string, slug: string, title: string) {
    if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug) || slug.length < 2 || slug.length > 50) {
      throw new ValidationError('Slug must be 2-50 lowercase alphanumeric characters with hyphens');
    }
    const existing = await this.db.page.findFirst({ where: { siteId, slug } });
    if (existing) throw new ConflictError(`Page slug "${slug}" already exists`);

    return this.db.page.create({
      data: {
        siteId,
        slug,
        title,
        contentJson: { blocks: [] },
        version: 1,
      },
    });
  }

  /** Find a page by site ID and slug (null slug = homepage) */
  async findBySlug(siteId: string, slug: string | null) {
    const page = await this.db.page.findFirst({
      where: { siteId, slug },
    });
    if (!page) throw new NotFoundError('Page');
    return page;
  }

  /** Delete a page (cannot delete homepage) */
  async deletePage(pageId: string) {
    const page = await this.db.page.findUnique({ where: { id: pageId } });
    if (!page) throw new NotFoundError('Page');
    if (page.slug === null) throw new ValidationError('Cannot delete the homepage');
    return this.db.page.delete({ where: { id: pageId } });
  }

  /** Update page title or slug */
  async updatePageMeta(pageId: string, data: { title?: string; slug?: string }) {
    return this.db.page.update({
      where: { id: pageId },
      data,
    });
  }
}
