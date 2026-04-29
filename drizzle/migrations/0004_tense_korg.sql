ALTER TABLE "payment_gateway_subscription" DROP CONSTRAINT "payment_gateway_subscription_plan_id_payment_gateway_plans_id_fk";
--> statement-breakpoint
ALTER TABLE "payment_gateway_subscription" ALTER COLUMN "plan_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "payment_gateway_subscription" ALTER COLUMN "plan_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_item" ADD COLUMN "client_cart_item_id" uuid;--> statement-breakpoint
ALTER TABLE "payment_gateway_plans" ADD COLUMN "plan_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "payment_gateway_plans" ADD CONSTRAINT "payment_gateway_plans_plan_id_unique" UNIQUE("plan_id");
ALTER TABLE "payment_gateway_subscription" ADD CONSTRAINT "payment_gateway_subscription_plan_id_payment_gateway_plans_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."payment_gateway_plans"("plan_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint