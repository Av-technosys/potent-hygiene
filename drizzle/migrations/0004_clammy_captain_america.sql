ALTER TABLE "product_variant" ADD COLUMN "rateing_5_star" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "product_variant" ADD COLUMN "rateing_4_star" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "product_variant" ADD COLUMN "rateing_3_star" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "product_variant" ADD COLUMN "rateing_2_star" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "product_variant" ADD COLUMN "rateing_1_star" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "product_variant" DROP COLUMN "rating";--> statement-breakpoint
ALTER TABLE "product_variant" DROP COLUMN "review_count";