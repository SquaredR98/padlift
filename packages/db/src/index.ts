import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  });

// Cache in ALL environments — prevents connection exhaustion on serverless
globalForPrisma.prisma = db;

export { PrismaClient };
export type * from '@prisma/client';
