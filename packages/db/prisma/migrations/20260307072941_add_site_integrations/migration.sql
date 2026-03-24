-- CreateTable
CREATE TABLE "site_integrations" (
    "id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "credentials" JSONB,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "last_sync_at" TIMESTAMP(3),
    "last_sync_error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_integrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "site_integrations_site_id_type_key" ON "site_integrations"("site_id", "type");

-- AddForeignKey
ALTER TABLE "site_integrations" ADD CONSTRAINT "site_integrations_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
