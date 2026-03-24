-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "gumroad_customer_id" TEXT,
ADD COLUMN     "gumroad_subscription_id" TEXT,
ADD COLUMN     "plan_expires_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "plan_configs" (
    "id" TEXT NOT NULL,
    "tier" "Plan" NOT NULL,
    "display_name" TEXT NOT NULL,
    "price_monthly" INTEGER NOT NULL DEFAULT 0,
    "price_yearly" INTEGER NOT NULL DEFAULT 0,
    "gumroad_product_id" TEXT,
    "gumroad_monthly_url" TEXT,
    "gumroad_yearly_url" TEXT,
    "max_sites" INTEGER NOT NULL DEFAULT 1,
    "max_waitlist_entries" INTEGER NOT NULL DEFAULT 100,
    "max_pages" INTEGER NOT NULL DEFAULT 1,
    "max_payment_links" INTEGER NOT NULL DEFAULT 0,
    "custom_domain" BOOLEAN NOT NULL DEFAULT false,
    "remove_branding" BOOLEAN NOT NULL DEFAULT false,
    "google_sheets" BOOLEAN NOT NULL DEFAULT false,
    "webhooks" BOOLEAN NOT NULL DEFAULT false,
    "analytics" BOOLEAN NOT NULL DEFAULT false,
    "ab_testing" BOOLEAN NOT NULL DEFAULT false,
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "position" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plan_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "plan_configs_tier_key" ON "plan_configs"("tier");
