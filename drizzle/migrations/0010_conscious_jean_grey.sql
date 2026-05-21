ALTER TABLE "products" DROP COLUMN "size";
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "size" varchar[];
--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "flow_type";
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "flow_type" varchar[];
-- statement-breakpoint
ALTER TABLE "products" ADD COLUMN "type" varchar;