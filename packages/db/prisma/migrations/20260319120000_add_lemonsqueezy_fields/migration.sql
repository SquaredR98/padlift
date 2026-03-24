-- Add Lemon Squeezy fields to profiles
ALTER TABLE "profiles" ADD COLUMN "ls_subscription_id" TEXT;
ALTER TABLE "profiles" ADD COLUMN "ls_customer_id" TEXT;

-- Add Lemon Squeezy fields to plan_configs
ALTER TABLE "plan_configs" ADD COLUMN "ls_variant_id" TEXT;
ALTER TABLE "plan_configs" ADD COLUMN "ls_product_id" TEXT;
