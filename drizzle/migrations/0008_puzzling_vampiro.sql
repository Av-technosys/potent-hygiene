ALTER TABLE "contact_us" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_us" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_us" ALTER COLUMN "message" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_us" ALTER COLUMN "created_at" DROP NOT NULL;