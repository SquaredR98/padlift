/*
  Warnings:

  - You are about to drop the column `supabase_user_id` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[claimed_site_id]` on the table `templates` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password_hash` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "profiles_supabase_user_id_key";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "supabase_user_id",
ADD COLUMN     "onboarding_complete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "templates" ADD COLUMN     "claimed_at" TIMESTAMP(3),
ADD COLUMN     "claimed_by_profile_id" TEXT,
ADD COLUMN     "claimed_site_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "templates_claimed_site_id_key" ON "templates"("claimed_site_id");

-- AddForeignKey
ALTER TABLE "templates" ADD CONSTRAINT "templates_claimed_by_profile_id_fkey" FOREIGN KEY ("claimed_by_profile_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
