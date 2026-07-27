DROP TYPE IF EXISTS "public"."subscription_type" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "product_faq" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "product_variants" CASCADE;
--> statement-breakpoint
TRUNCATE TABLE "payment_gateway_subscription" CASCADE;
--> statement-breakpoint
TRUNCATE TABLE "users" CASCADE;
--> statement-breakpoint
CREATE TYPE "public"."subscription_type" AS ENUM('monthly', 'every_2_months', 'cycle_sync');--> statement-breakpoint
CREATE TABLE "product_faq" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product_variants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"sku" varchar NOT NULL,
	"name" varchar NOT NULL,
	"price" integer NOT NULL,
	"strikethrough_price" integer,
	"image" varchar,
	"size" varchar,
	"flow_type" varchar,
	"allow_cycle_sync" boolean DEFAULT false,
	"allow_subscription" boolean DEFAULT false,
	"is_mix_box" boolean DEFAULT false,
	"is_in_stock" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "product_variants_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
DROP TABLE IF EXISTS "product_varient_box" CASCADE;--> statement-breakpoint
DO $$ 
BEGIN 
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='address' AND column_name='street') THEN
    ALTER TABLE "address" RENAME COLUMN "street" TO "street_address_1";
  END IF;
END $$;
--> statement-breakpoint
DO $$ 
BEGIN 
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cart_item' AND column_name='frequency_in_months') THEN
    ALTER TABLE "cart_item" RENAME COLUMN "frequency_in_months" TO "frequency_in_days";
  END IF;
END $$;
--> statement-breakpoint
DO $$ 
BEGIN 
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='payment_gateway_subscription' AND column_name='shour_url') THEN
    ALTER TABLE "payment_gateway_subscription" RENAME COLUMN "shour_url" TO "short_url";
  END IF;
END $$;
--> statement-breakpoint
DO $$ 
BEGIN 
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='subscriptions' AND column_name='frequency_in_months') THEN
    ALTER TABLE "subscriptions" RENAME COLUMN "frequency_in_months" TO "frequency_in_days";
  END IF;
END $$;
--> statement-breakpoint
DO $$ 
BEGIN 
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='email_verified') THEN
    ALTER TABLE "users" RENAME COLUMN "email_verified" TO "is_email_verified";
  END IF;
END $$;--> statement-breakpoint
ALTER TABLE "cart_item" DROP CONSTRAINT IF EXISTS "cart_item_product_varient_box_id_product_varient_box_id_fk";
--> statement-breakpoint
ALTER TABLE "payment_gateway_plans" ALTER COLUMN "frequency_type" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "payment_gateway_plans" ALTER COLUMN "frequency_type" SET DATA TYPE "public"."subscription_type" USING "frequency_type"::"public"."subscription_type";--> statement-breakpoint
ALTER TABLE "payment_gateway_plans" ALTER COLUMN "frequency_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "address" ADD COLUMN IF NOT EXISTS "street_address_2" text;--> statement-breakpoint
ALTER TABLE "blog" ADD COLUMN IF NOT EXISTS "description" text;--> statement-breakpoint
ALTER TABLE "blog" ADD COLUMN IF NOT EXISTS "meta_title" varchar;--> statement-breakpoint
ALTER TABLE "blog" ADD COLUMN IF NOT EXISTS "author_image" varchar;--> statement-breakpoint
ALTER TABLE "blog" ADD COLUMN IF NOT EXISTS "author_name" varchar;--> statement-breakpoint
ALTER TABLE "blog" ADD COLUMN IF NOT EXISTS "is_published" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN IF NOT EXISTS "product_variant_id" uuid;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN IF NOT EXISTS "mix_box_recipe" jsonb;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN IF NOT EXISTS "total_pads" integer;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN IF NOT EXISTS "box_count" integer;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN IF NOT EXISTS "free_liners" integer;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN IF NOT EXISTS "purchase_type" varchar;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN IF NOT EXISTS "subscription_type" "subscription_type";--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN IF NOT EXISTS "cycle_length" integer;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN IF NOT EXISTS "period_length" integer;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN IF NOT EXISTS "last_period_date" timestamp;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN IF NOT EXISTS "next_period_date" timestamp;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN IF NOT EXISTS "arrival_date" timestamp;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN IF NOT EXISTS "charge_date" timestamp;--> statement-breakpoint
ALTER TABLE "featured_category" ADD COLUMN IF NOT EXISTS "priority" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "featured_product" ADD COLUMN IF NOT EXISTS "priority" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "order_item" ADD COLUMN IF NOT EXISTS "product_variant_id" uuid;--> statement-breakpoint
ALTER TABLE "order_item" ADD COLUMN IF NOT EXISTS "mix_box_recipe" jsonb;--> statement-breakpoint
ALTER TABLE "order_item" ADD COLUMN IF NOT EXISTS "total_pads" integer;--> statement-breakpoint
ALTER TABLE "order_item" ADD COLUMN IF NOT EXISTS "box_count" integer;--> statement-breakpoint
ALTER TABLE "order_item" ADD COLUMN IF NOT EXISTS "free_liners" integer;--> statement-breakpoint
ALTER TABLE "order_item" ADD COLUMN IF NOT EXISTS "purchase_type" varchar;--> statement-breakpoint
ALTER TABLE "order_item" ADD COLUMN IF NOT EXISTS "subscription_type" "subscription_type";--> statement-breakpoint
ALTER TABLE "payment_gateway_subscription" ADD COLUMN IF NOT EXISTS "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "payment_gateway_subscription" ADD COLUMN IF NOT EXISTS "subscription_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "payment_gateway_subscription" ADD COLUMN IF NOT EXISTS "gateway_subscription_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "product_id" uuid;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "product_variant_id" uuid;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "subscription_type" "subscription_type";--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "mix_box_recipe" jsonb;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "cycle_length" integer;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "period_length" integer;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "last_period_date" timestamp;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "next_period_date" timestamp;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "arrival_date" timestamp;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN IF NOT EXISTS "charge_date" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "cognito_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "product_faq" ADD CONSTRAINT "product_faq_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_product_variant_id_product_variants_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_variant_id_product_variants_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_gateway_subscription" ADD CONSTRAINT "payment_gateway_subscription_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_gateway_subscription" ADD CONSTRAINT "payment_gateway_subscription_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_product_variant_id_product_variants_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "address" DROP COLUMN IF EXISTS "full_name";--> statement-breakpoint
ALTER TABLE "address" DROP COLUMN IF EXISTS "phone";--> statement-breakpoint
ALTER TABLE "address" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "address" DROP COLUMN IF EXISTS "locality";--> statement-breakpoint
ALTER TABLE "blog" DROP COLUMN IF EXISTS "user_image";--> statement-breakpoint
ALTER TABLE "blog" DROP COLUMN IF EXISTS "user_name";--> statement-breakpoint
ALTER TABLE "blog" DROP COLUMN IF EXISTS "is_visible";--> statement-breakpoint
ALTER TABLE "cart_item" DROP COLUMN IF EXISTS "product_varient_box_id";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "base_price";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "strikethrough_price";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "password";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "otp";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "otp_expires_at";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_cognito_id_unique" UNIQUE("cognito_id");