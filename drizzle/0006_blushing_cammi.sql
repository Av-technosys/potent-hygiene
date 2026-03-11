ALTER TABLE "reviews" DROP CONSTRAINT "reviews_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "order_id" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "delivered_date" SET DATA TYPE varchar(100);