ALTER TABLE "cart" DROP CONSTRAINT "cart_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "cart" ALTER COLUMN "product_id" SET DATA TYPE integer;