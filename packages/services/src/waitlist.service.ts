import type { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { ConflictError, NotFoundError } from './errors';
import { randomBytes } from 'crypto';

export const JoinWaitlistInput = z.object({
  siteId: z.string().uuid(),
  email: z.string().email(),
  referralCode: z.string().optional(),
});

export type JoinWaitlistInput = z.infer<typeof JoinWaitlistInput>;

export class WaitlistService {
  constructor(private db: PrismaClient) {}

  async join(input: JoinWaitlistInput) {
    const data = JoinWaitlistInput.parse(input);

    // Check site exists
    const site = await this.db.site.findUnique({ where: { id: data.siteId } });
    if (!site) throw new NotFoundError('Site', data.siteId);

    // Check for duplicate
    const existing = await this.db.waitlistEntry.findUnique({
      where: { siteId_email: { siteId: data.siteId, email: data.email } },
    });
    if (existing) {
      throw new ConflictError('This email is already on the waitlist');
    }

    // Resolve referrer if referral code provided
    let referredById: string | null = null;
    if (data.referralCode) {
      const referrer = await this.db.waitlistEntry.findUnique({
        where: { referralCode: data.referralCode },
      });
      if (referrer && referrer.siteId === data.siteId) {
        referredById = referrer.id;
      }
    }

    // Get next position
    const lastEntry = await this.db.waitlistEntry.findFirst({
      where: { siteId: data.siteId },
      orderBy: { position: 'desc' },
      select: { position: true },
    });
    const position = (lastEntry?.position ?? 0) + 1;

    // Generate unique referral code
    const referralCode = randomBytes(6).toString('base64url');

    const entry = await this.db.waitlistEntry.create({
      data: {
        siteId: data.siteId,
        email: data.email,
        referralCode,
        referredById,
        position,
      },
    });

    // Increment referrer's referral count
    if (referredById) {
      await this.db.waitlistEntry.update({
        where: { id: referredById },
        data: { referralCount: { increment: 1 } },
      });
    }

    return {
      position: entry.position,
      referralCode: entry.referralCode,
      totalEntries: position,
    };
  }

  async getEntries(siteId: string, opts?: { limit?: number; offset?: number; search?: string }) {
    const limit = opts?.limit ?? 50;
    const offset = opts?.offset ?? 0;

    const where: { siteId: string; email?: { contains: string; mode: 'insensitive' } } = { siteId };
    if (opts?.search) {
      where.email = { contains: opts.search, mode: 'insensitive' };
    }

    const [entries, total] = await Promise.all([
      this.db.waitlistEntry.findMany({
        where,
        orderBy: { position: 'asc' },
        take: limit,
        skip: offset,
      }),
      this.db.waitlistEntry.count({ where }),
    ]);

    return { entries, total };
  }

  async getCount(siteId: string): Promise<number> {
    return this.db.waitlistEntry.count({ where: { siteId } });
  }
}
