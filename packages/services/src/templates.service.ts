import type { PrismaClient } from '@prisma/client';
import { ConflictError, NotFoundError } from './errors';

export class TemplatesService {
  constructor(private db: PrismaClient) {}

  /** List all templates with claim status */
  async list() {
    return this.db.template.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        category: true,
        thumbnail: true,
        claimedByProfileId: true,
        claimedAt: true,
        claimedSiteId: true,
      },
    });
  }

  /** Check if a template is available (unclaimed) */
  async isAvailable(slug: string): Promise<boolean> {
    const tpl = await this.db.template.findUnique({
      where: { slug },
      select: { claimedByProfileId: true },
    });
    if (!tpl) return true; // no DB row yet = unclaimed
    return tpl.claimedByProfileId === null;
  }

  /** Claim a template — marks it as owned by profileId */
  async claim(slug: string, profileId: string, siteId: string) {
    // Upsert: create the DB row if it doesn't exist, then claim
    const existing = await this.db.template.findUnique({ where: { slug } });

    if (existing) {
      if (existing.claimedByProfileId) {
        throw new ConflictError('This template has already been claimed');
      }
      return this.db.template.update({
        where: { slug },
        data: {
          claimedByProfileId: profileId,
          claimedAt: new Date(),
          claimedSiteId: siteId,
        },
      });
    }

    // Row doesn't exist yet — create it with claim
    return this.db.template.create({
      data: {
        slug,
        name: slug,
        contentJson: {},
        claimedByProfileId: profileId,
        claimedAt: new Date(),
        claimedSiteId: siteId,
      },
    });
  }

  /** Seed template rows (idempotent) */
  async seed(templates: Array<{ slug: string; name: string; description: string; category: string }>) {
    for (const t of templates) {
      await this.db.template.upsert({
        where: { slug: t.slug },
        create: {
          slug: t.slug,
          name: t.name,
          description: t.description,
          category: t.category,
          contentJson: {},
        },
        update: {
          name: t.name,
          description: t.description,
          category: t.category,
        },
      });
    }
  }
}
