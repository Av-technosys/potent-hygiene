CREATE TYPE "public"."product_brand" AS ENUM('ovy', 'loway');--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "brand" "product_brand" DEFAULT 'ovy';