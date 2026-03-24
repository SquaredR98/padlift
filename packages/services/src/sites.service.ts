import type { PrismaClient, Prisma, SiteMode } from '@prisma/client';
import { z } from 'zod';
import { NotFoundError, ConflictError } from './errors';

export const CreateSiteInput = z.object({
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, 'Slug must be lowercase alphanumeric with hyphens'),
  profileId: z.string().uuid(),
  templateId: z.string().max(100).optional(),
});

export const UpdateSiteInput = z.object({
  name: z.string().min(1).max(100).optional(),
  customDomain: z.string().optional().nullable(),
  ga4MeasurementId: z.string().optional().nullable(),
  gtmContainerId: z.string().optional().nullable(),
  clarityProjectId: z.string().optional().nullable(),
});

export type CreateSiteInput = z.infer<typeof CreateSiteInput>;
export type UpdateSiteInput = z.infer<typeof UpdateSiteInput>;

export class SitesService {
  constructor(private db: PrismaClient) {}

  async create(input: CreateSiteInput) {
    const data = CreateSiteInput.parse(input);

    const existing = await this.db.site.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      throw new ConflictError(`Slug "${data.slug}" is already taken`);
    }

    return this.db.site.create({
      data: {
        name: data.name,
        slug: data.slug,
        profileId: data.profileId,
        templateId: data.templateId ?? null,
        pages: {
          create: {
            contentJson: {},
            version: 1,
          },
        },
      },
      include: { pages: true },
    });
  }

  async findByProfileId(profileId: string) {
    return this.db.site.findMany({
      where: { profileId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            waitlistEntries: true,
            visitors: true,
            conversions: true,
          },
        },
      },
    });
  }

  async findById(siteId: string) {
    const site = await this.db.site.findUnique({
      where: { id: siteId },
      include: {
        pages: true,
        paymentLinks: { orderBy: { position: 'asc' } },
      },
    });
    if (!site) throw new NotFoundError('Site', siteId);
    return site;
  }

  async findBySlug(slug: string) {
    const site = await this.db.site.findUnique({
      where: { slug },
      include: {
        pages: { where: { status: 'PUBLISHED' } },
        paymentLinks: { orderBy: { position: 'asc' } },
      },
    });
    if (!site) throw new NotFoundError('Site');
    return site;
  }

  async findByCustomDomain(domain: string) {
    const site = await this.db.site.findUnique({
      where: { customDomain: domain },
      select: { slug: true, publishedAt: true },
    });
    return site;
  }

  async update(siteId: string, input: UpdateSiteInput) {
    const data = UpdateSiteInput.parse(input);
    await this.ensureExists(siteId);
    return this.db.site.update({
      where: { id: siteId },
      data,
    });
  }

  async delete(siteId: string) {
    await this.ensureExists(siteId);
    return this.db.site.delete({ where: { id: siteId } });
  }

  async publish(siteId: string) {
    await this.ensureExists(siteId);
    return this.db.site.update({
      where: { id: siteId },
      data: { publishedAt: new Date() },
    });
  }

  async unpublish(siteId: string) {
    await this.ensureExists(siteId);
    return this.db.site.update({
      where: { id: siteId },
      data: { publishedAt: null },
    });
  }

  async toggleMode(siteId: string, mode: SiteMode) {
    await this.ensureExists(siteId);
    return this.db.site.update({
      where: { id: siteId },
      data: { mode },
    });
  }

  async saveTemplateContent(siteId: string, content: Prisma.InputJsonValue) {
    await this.ensureExists(siteId);
    return this.db.site.update({
      where: { id: siteId },
      data: { templateContent: content },
    });
  }

  async getTemplateContent(siteId: string) {
    const site = await this.db.site.findUnique({
      where: { id: siteId },
      select: { templateId: true, templateContent: true },
    });
    if (!site) throw new NotFoundError('Site', siteId);
    return site;
  }

  private async ensureExists(siteId: string) {
    const site = await this.db.site.findUnique({ where: { id: siteId } });
    if (!site) throw new NotFoundError('Site', siteId);
    return site;
  }
}
