-- Remove Lemon Squeezy fields from profiles
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "ls_subscription_id";
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "ls_customer_id";

-- Remove Lemon Squeezy fields from plan_configs
ALTER TABLE "plan_configs" DROP COLUMN IF EXISTS "ls_variant_id";
ALTER TABLE "plan_configs" DROP COLUMN IF EXISTS "ls_product_id";

-- Add Gumroad membership tier name to plan_configs
ALTER TABLE "plan_configs" ADD COLUMN "gumroad_tier_name" TEXT;
