ALTER TABLE "cart" ADD COLUMN "product_id" integer;--> statement-breakpoint
ALTER TABLE "cart" ADD COLUMN "subscription_plan_id" integer;--> statement-breakpoint
ALTER TABLE "cart" ADD COLUMN "quantity" integer DEFAULT 1;