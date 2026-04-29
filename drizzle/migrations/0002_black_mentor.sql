CREATE TABLE "referral_coin_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"coins" integer NOT NULL,
	"type" varchar,
	"new_user_name" varchar,
	"new_user_id" uuid,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "reward_order_coins_history" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "reward_order_coins_history" CASCADE;--> statement-breakpoint
ALTER TABLE "reward_coins_history" DROP CONSTRAINT "reward_coins_history_new_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "referral_coin_history" ADD CONSTRAINT "referral_coin_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referral_coin_history" ADD CONSTRAINT "referral_coin_history_new_user_id_users_id_fk" FOREIGN KEY ("new_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reward_coins_history" DROP COLUMN "full_name";--> statement-breakpoint
ALTER TABLE "reward_coins_history" DROP COLUMN "new_user_id";