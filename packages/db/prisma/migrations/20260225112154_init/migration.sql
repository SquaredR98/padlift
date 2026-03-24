-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PRO', 'BUSINESS');

-- CreateEnum
CREATE TYPE "SiteMode" AS ENUM ('WAITLIST', 'LIVE');

-- CreateEnum
CREATE TYPE "PageStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "AbTestStatus" AS ENUM ('DRAFT', 'RUNNING', 'PAUSED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "AbTestScope" AS ENUM ('FULL_PAGE', 'SECTION');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WAITLIST_SIGNUP', 'CHECKOUT_START', 'PURCHASE');

-- CreateEnum
CREATE TYPE "ChangelogCategory" AS ENUM ('NEW', 'IMPROVED', 'FIXED');

-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('MONTHLY', 'YEARLY');

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "supabase_user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar_url" TEXT,
    "plan" "Plan" NOT NULL DEFAULT 'FREE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sites" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "custom_domain" TEXT,
    "mode" "SiteMode" NOT NULL DEFAULT 'WAITLIST',
    "published_at" TIMESTAMP(3),
    "ga4_measurement_id" TEXT,
    "gtm_container_id" TEXT,
    "clarity_project_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "content_json" JSONB NOT NULL,
    "published_html" TEXT,
    "published_css" TEXT,
    "published_js" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "template_id" TEXT,
    "status" "PageStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "category" TEXT NOT NULL DEFAULT 'general',
    "content_json" JSONB NOT NULL,
    "is_builtin" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_links" (
    "id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "plan_name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "billing_cycle" "BillingCycle" NOT NULL,
    "stripe_url" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waitlist_entries" (
    "id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "referral_code" TEXT NOT NULL,
    "referred_by_id" TEXT,
    "position" INTEGER NOT NULL,
    "referral_count" INTEGER NOT NULL DEFAULT 0,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notified_at" TIMESTAMP(3),

    CONSTRAINT "waitlist_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitors" (
    "id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "visitor_hash" TEXT NOT NULL,
    "first_seen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_seen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "device_type" TEXT,
    "referrer" TEXT,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversions" (
    "id" TEXT NOT NULL,
    "visitor_id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "event_type" "EventType" NOT NULL,
    "plan_name" TEXT,
    "estimated_value" DECIMAL(10,2),
    "variant_id" TEXT,
    "attributed_source" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ab_tests" (
    "id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hypothesis" TEXT,
    "scope" "AbTestScope" NOT NULL DEFAULT 'FULL_PAGE',
    "status" "AbTestStatus" NOT NULL DEFAULT 'DRAFT',
    "traffic_split" JSONB,
    "winner_variant_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3),

    CONSTRAINT "ab_tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ab_variants" (
    "id" TEXT NOT NULL,
    "test_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content_json" JSONB,
    "visitors_count" INTEGER NOT NULL DEFAULT 0,
    "conversions_count" INTEGER NOT NULL DEFAULT 0,
    "revenue_total" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ab_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "changelog_entries" (
    "id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body_md" TEXT NOT NULL,
    "category" "ChangelogCategory" NOT NULL DEFAULT 'NEW',
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "changelog_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics_events" (
    "id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "visitor_id" TEXT,
    "event_name" TEXT NOT NULL,
    "properties_json" JSONB,
    "variant_id" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_supabase_user_id_key" ON "profiles"("supabase_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sites_slug_key" ON "sites"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "sites_custom_domain_key" ON "sites"("custom_domain");

-- CreateIndex
CREATE INDEX "sites_profile_id_idx" ON "sites"("profile_id");

-- CreateIndex
CREATE INDEX "pages_site_id_idx" ON "pages"("site_id");

-- CreateIndex
CREATE UNIQUE INDEX "templates_slug_key" ON "templates"("slug");

-- CreateIndex
CREATE INDEX "payment_links_site_id_idx" ON "payment_links"("site_id");

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_entries_referral_code_key" ON "waitlist_entries"("referral_code");

-- CreateIndex
CREATE INDEX "waitlist_entries_site_id_idx" ON "waitlist_entries"("site_id");

-- CreateIndex
CREATE INDEX "waitlist_entries_referral_code_idx" ON "waitlist_entries"("referral_code");

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_entries_site_id_email_key" ON "waitlist_entries"("site_id", "email");

-- CreateIndex
CREATE INDEX "visitors_site_id_idx" ON "visitors"("site_id");

-- CreateIndex
CREATE UNIQUE INDEX "visitors_site_id_visitor_hash_key" ON "visitors"("site_id", "visitor_hash");

-- CreateIndex
CREATE INDEX "conversions_site_id_idx" ON "conversions"("site_id");

-- CreateIndex
CREATE INDEX "conversions_variant_id_idx" ON "conversions"("variant_id");

-- CreateIndex
CREATE INDEX "ab_tests_site_id_idx" ON "ab_tests"("site_id");

-- CreateIndex
CREATE INDEX "ab_variants_test_id_idx" ON "ab_variants"("test_id");

-- CreateIndex
CREATE INDEX "changelog_entries_site_id_idx" ON "changelog_entries"("site_id");

-- CreateIndex
CREATE INDEX "analytics_events_site_id_timestamp_idx" ON "analytics_events"("site_id", "timestamp");

-- CreateIndex
CREATE INDEX "analytics_events_event_name_idx" ON "analytics_events"("event_name");

-- AddForeignKey
ALTER TABLE "sites" ADD CONSTRAINT "sites_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_links" ADD CONSTRAINT "payment_links_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "waitlist_entries" ADD CONSTRAINT "waitlist_entries_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "waitlist_entries" ADD CONSTRAINT "waitlist_entries_referred_by_id_fkey" FOREIGN KEY ("referred_by_id") REFERENCES "waitlist_entries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversions" ADD CONSTRAINT "conversions_visitor_id_fkey" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversions" ADD CONSTRAINT "conversions_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversions" ADD CONSTRAINT "conversions_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "ab_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ab_tests" ADD CONSTRAINT "ab_tests_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ab_variants" ADD CONSTRAINT "ab_variants_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "ab_tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "changelog_entries" ADD CONSTRAINT "changelog_entries_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_visitor_id_fkey" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "ab_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
