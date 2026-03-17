CREATE TABLE "review_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"review_id" uuid NOT NULL,
	"media_type" varchar NOT NULL,
	"media_url" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_plan_id_subscription_plans_id_fk";
--> statement-breakpoint
ALTER TABLE "address" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription_plans" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "plan_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "product_varient_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "name" varchar;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "email" varchar;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "message" varchar;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "is_admin_approved" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "review_media" ADD CONSTRAINT "review_media_review_id_reviews_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_subscription_id_subscription_plans_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscription_plans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_varient_id_product_variant_id_fk" FOREIGN KEY ("product_varient_id") REFERENCES "public"."product_variant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "product_name";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "order_id";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "comment";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "delivered_date";