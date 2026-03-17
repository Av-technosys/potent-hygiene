CREATE TABLE "featured_product_variant" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_variant_id" uuid
);
--> statement-breakpoint
CREATE TABLE "product_variant_attribute" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_variant_id" uuid,
	"attribute" varchar,
	"value" varchar
);
--> statement-breakpoint
CREATE TABLE "product_variant_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_variant_id" uuid,
	"media_type" varchar,
	"media_url" varchar
);
--> statement-breakpoint
ALTER TABLE "featured_category" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "featured_product_varient" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "product_varient_attribute" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "product_varient_media" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "featured_category" CASCADE;--> statement-breakpoint
DROP TABLE "featured_product_varient" CASCADE;--> statement-breakpoint
DROP TABLE "product_varient_attribute" CASCADE;--> statement-breakpoint
DROP TABLE "product_varient_media" CASCADE;--> statement-breakpoint
ALTER TABLE "categories" DROP CONSTRAINT "categories_parent_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "order" DROP CONSTRAINT "order_subscription_id_subscription_plans_id_fk";
--> statement-breakpoint
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_product_varient_id_product_variant_id_fk";
--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_product_varient_id_product_variant_id_fk";
--> statement-breakpoint
ALTER TABLE "cart" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "cart" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_item" ALTER COLUMN "cart_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_item" ALTER COLUMN "quantity" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_item" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "parent_count" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order_item" ALTER COLUMN "order_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order_item" ALTER COLUMN "product_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order_item" ALTER COLUMN "product_slug" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order_item" ALTER COLUMN "product_price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "payment" ALTER COLUMN "order_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "payment" ALTER COLUMN "payment_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "payment" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product_category" ALTER COLUMN "product_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product_category" ALTER COLUMN "category_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant" ALTER COLUMN "is_in_stock" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant" ALTER COLUMN "is_returnable" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant" ALTER COLUMN "is_cancelable" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant" ALTER COLUMN "is_replacement" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant" ALTER COLUMN "return_days" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant" ALTER COLUMN "replacement_days" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant" ALTER COLUMN "rating" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant" ALTER COLUMN "review_count" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant" ALTER COLUMN "is_free_delivery" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "rating" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "is_admin_approved" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "review_media" ALTER COLUMN "review_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "review_media" ALTER COLUMN "media_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "review_media" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription_plans" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription_plans" ALTER COLUMN "interval_months" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription_plans" ALTER COLUMN "price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "plan_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "next_billing_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN "subscription_plan_id" integer;--> statement-breakpoint
ALTER TABLE "order_item" ADD COLUMN "product_variant_id" uuid;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "product_variant_id" uuid;--> statement-breakpoint
ALTER TABLE "featured_product_variant" ADD CONSTRAINT "featured_product_variant_product_variant_id_product_variant_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variant_attribute" ADD CONSTRAINT "product_variant_attribute_product_variant_id_product_variant_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variant_media" ADD CONSTRAINT "product_variant_media_product_variant_id_product_variant_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_subscription_plan_id_subscription_plans_id_fk" FOREIGN KEY ("subscription_plan_id") REFERENCES "public"."subscription_plans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_variant_id_product_variant_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_variant_id_product_variant_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_subscription_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."subscription_plans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart" DROP COLUMN "product_id";--> statement-breakpoint
ALTER TABLE "cart" DROP COLUMN "subscription_plan_id";--> statement-breakpoint
ALTER TABLE "cart" DROP COLUMN "quantity";--> statement-breakpoint
ALTER TABLE "cart" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "cart_item" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN "latitude";--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN "longitude";--> statement-breakpoint
ALTER TABLE "order_item" DROP COLUMN "product_varient_id";--> statement-breakpoint
ALTER TABLE "payment" DROP COLUMN "payment_description";--> statement-breakpoint
ALTER TABLE "payment" DROP COLUMN "payment_metadata";--> statement-breakpoint
ALTER TABLE "payment" DROP COLUMN "payment_gateway_order_id";--> statement-breakpoint
ALTER TABLE "payment" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "product_varient_id";