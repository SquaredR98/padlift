import type { PrismaClient, TicketStatus, TicketPriority } from '@prisma/client';
import { NotFoundError, ForbiddenError } from './errors';

export class SupportService {
  constructor(private db: PrismaClient) {}

  async createTicket(input: { subject: string; message: string; profileId: string }) {
    return this.db.supportTicket.create({
      data: {
        subject: input.subject,
        profileId: input.profileId,
        messages: {
          create: {
            sender: 'USER',
            body: input.message,
          },
        },
      },
      include: { messages: true },
    });
  }

  async listTickets(opts?: { profileId?: string; status?: TicketStatus; page?: number; pageSize?: number }) {
    const page = opts?.page ?? 1;
    const pageSize = Math.min(50, Math.max(1, opts?.pageSize ?? 25));
    const where: Record<string, unknown> = {};
    if (opts?.profileId) where.profileId = opts.profileId;
    if (opts?.status) where.status = opts.status;

    const [items, total] = await Promise.all([
      this.db.supportTicket.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          profile: { select: { name: true, email: true } },
          _count: { select: { messages: true } },
        },
      }),
      this.db.supportTicket.count({ where }),
    ]);

    return { items, total };
  }

  async getTicket(id: string, profileId?: string) {
    const ticket = await this.db.supportTicket.findUnique({
      where: { id },
      include: {
        profile: { select: { name: true, email: true } },
        messages: { orderBy: { createdAt: 'asc' } },
      },
    });
    if (!ticket) throw new NotFoundError('SupportTicket', id);
    if (profileId && ticket.profileId !== profileId) {
      throw new ForbiddenError('You can only view your own tickets');
    }
    return ticket;
  }

  async reply(ticketId: string, sender: 'USER' | 'ADMIN', body: string, profileId?: string) {
    const ticket = await this.db.supportTicket.findUnique({ where: { id: ticketId } });
    if (!ticket) throw new NotFoundError('SupportTicket', ticketId);
    if (sender === 'USER' && profileId && ticket.profileId !== profileId) {
      throw new ForbiddenError('You can only reply to your own tickets');
    }

    const message = await this.db.supportMessage.create({
      data: { ticketId, sender, body },
    });

    await this.db.supportTicket.update({
      where: { id: ticketId },
      data: { updatedAt: new Date() },
    });

    return message;
  }

  async updateStatus(ticketId: string, status: TicketStatus) {
    const ticket = await this.db.supportTicket.findUnique({ where: { id: ticketId } });
    if (!ticket) throw new NotFoundError('SupportTicket', ticketId);
    return this.db.supportTicket.update({ where: { id: ticketId }, data: { status } });
  }

  async updatePriority(ticketId: string, priority: TicketPriority) {
    const ticket = await this.db.supportTicket.findUnique({ where: { id: ticketId } });
    if (!ticket) throw new NotFoundError('SupportTicket', ticketId);
    return this.db.supportTicket.update({ where: { id: ticketId }, data: { priority } });
  }
}
