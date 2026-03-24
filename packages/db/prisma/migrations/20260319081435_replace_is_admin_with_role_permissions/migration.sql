-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- AlterTable: add new columns
ALTER TABLE "profiles" ADD COLUMN "role" "AdminRole" NOT NULL DEFAULT 'USER';
ALTER TABLE "profiles" ADD COLUMN "admin_permissions" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Migrate data: if is_admin was true, set role to SUPER_ADMIN
UPDATE "profiles" SET "role" = 'SUPER_ADMIN' WHERE "is_admin" = true;

-- DropColumn
ALTER TABLE "profiles" DROP COLUMN "is_admin";
