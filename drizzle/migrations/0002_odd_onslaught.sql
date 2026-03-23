ALTER TABLE "product_category" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_category" ALTER COLUMN "category_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant_subscription_plan" ALTER COLUMN "product_variant_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant_subscription_plan" ALTER COLUMN "subscription_plan_id" SET NOT NULL;