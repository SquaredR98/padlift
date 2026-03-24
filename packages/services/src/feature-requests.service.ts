import type { PrismaClient, FeatureStatus } from '@prisma/client';
import { NotFoundError } from './errors';

export class FeatureRequestsService {
  constructor(private db: PrismaClient) {}

  async submit(input: { title: string; description: string; profileId?: string }) {
    return this.db.featureRequest.create({
      data: {
        title: input.title,
        description: input.description,
        profileId: input.profileId,
      },
    });
  }

  async list(opts?: { status?: FeatureStatus; sort?: 'votes' | 'newest'; page?: number; pageSize?: number }) {
    const page = opts?.page ?? 1;
    const pageSize = Math.min(50, Math.max(1, opts?.pageSize ?? 25));
    const where = opts?.status ? { status: opts.status } : {};
    const orderBy = opts?.sort === 'newest'
      ? { createdAt: 'desc' as const }
      : { voteCount: 'desc' as const };

    const [items, total] = await Promise.all([
      this.db.featureRequest.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          profile: { select: { name: true, email: true } },
          _count: { select: { votes: true } },
        },
      }),
      this.db.featureRequest.count({ where }),
    ]);

    return { items, total };
  }

  async vote(requestId: string, profileId: string) {
    const request = await this.db.featureRequest.findUnique({ where: { id: requestId } });
    if (!request) throw new NotFoundError('FeatureRequest', requestId);

    const existing = await this.db.featureVote.findUnique({
      where: { requestId_profileId: { requestId, profileId } },
    });

    if (existing) {
      await this.db.featureVote.delete({ where: { id: existing.id } });
      await this.db.featureRequest.update({
        where: { id: requestId },
        data: { voteCount: { decrement: 1 } },
      });
      return { voted: false };
    }

    await this.db.featureVote.create({ data: { requestId, profileId } });
    await this.db.featureRequest.update({
      where: { id: requestId },
      data: { voteCount: { increment: 1 } },
    });
    return { voted: true };
  }

  async hasVoted(requestId: string, profileId: string) {
    const vote = await this.db.featureVote.findUnique({
      where: { requestId_profileId: { requestId, profileId } },
    });
    return !!vote;
  }

  async getUserVotes(profileId: string) {
    const votes = await this.db.featureVote.findMany({
      where: { profileId },
      select: { requestId: true },
    });
    return new Set(votes.map((v) => v.requestId));
  }

  async updateStatus(id: string, status: FeatureStatus) {
    const r = await this.db.featureRequest.findUnique({ where: { id } });
    if (!r) throw new NotFoundError('FeatureRequest', id);
    return this.db.featureRequest.update({ where: { id }, data: { status } });
  }

  async delete(id: string) {
    const r = await this.db.featureRequest.findUnique({ where: { id } });
    if (!r) throw new NotFoundError('FeatureRequest', id);
    return this.db.featureRequest.delete({ where: { id } });
  }
}
