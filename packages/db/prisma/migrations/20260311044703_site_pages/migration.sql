/*
  Warnings:

  - A unique constraint covering the columns `[site_id,slug]` on the table `pages` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "pages" ADD COLUMN     "slug" TEXT,
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Home';

-- CreateIndex
CREATE UNIQUE INDEX "pages_site_id_slug_key" ON "pages"("site_id", "slug");
