import type { PrismaClient, TestimonialStatus } from '@prisma/client';
import { NotFoundError } from './errors';

export class TestimonialsService {
  constructor(private db: PrismaClient) {}

  async submit(input: { name: string; quote: string; rating?: number; role?: string; company?: string; profileId?: string }) {
    return this.db.testimonial.create({
      data: {
        name: input.name,
        quote: input.quote,
        rating: input.rating ?? 5,
        role: input.role,
        company: input.company,
        profileId: input.profileId,
      },
    });
  }

  async list(opts?: { status?: TestimonialStatus; page?: number; pageSize?: number }) {
    const page = opts?.page ?? 1;
    const pageSize = Math.min(50, Math.max(1, opts?.pageSize ?? 25));
    const where = opts?.status ? { status: opts.status } : {};

    const [items, total] = await Promise.all([
      this.db.testimonial.findMany({
        where,
        orderBy: [{ position: 'asc' }, { createdAt: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.db.testimonial.count({ where }),
    ]);

    return { items, total };
  }

  async getApprovedFeatured() {
    return this.db.testimonial.findMany({
      where: { status: 'APPROVED', featured: true },
      orderBy: { position: 'asc' },
    });
  }

  async approve(id: string) {
    const t = await this.db.testimonial.findUnique({ where: { id } });
    if (!t) throw new NotFoundError('Testimonial', id);
    return this.db.testimonial.update({ where: { id }, data: { status: 'APPROVED' } });
  }

  async reject(id: string) {
    const t = await this.db.testimonial.findUnique({ where: { id } });
    if (!t) throw new NotFoundError('Testimonial', id);
    return this.db.testimonial.update({ where: { id }, data: { status: 'REJECTED' } });
  }

  async toggleFeatured(id: string) {
    const t = await this.db.testimonial.findUnique({ where: { id } });
    if (!t) throw new NotFoundError('Testimonial', id);
    return this.db.testimonial.update({ where: { id }, data: { featured: !t.featured } });
  }

  async updatePosition(id: string, position: number) {
    const t = await this.db.testimonial.findUnique({ where: { id } });
    if (!t) throw new NotFoundError('Testimonial', id);
    return this.db.testimonial.update({ where: { id }, data: { position } });
  }

  async delete(id: string) {
    const t = await this.db.testimonial.findUnique({ where: { id } });
    if (!t) throw new NotFoundError('Testimonial', id);
    return this.db.testimonial.delete({ where: { id } });
  }
}
