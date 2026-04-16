CREATE TABLE "reward_coins_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"coins" integer NOT NULL,
	"type" varchar,
	"order_id" uuid,
	"full_name" varchar,
	"new_user_id" uuid,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reward_order_coins_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"coins" integer NOT NULL,
	"type" varchar,
	"order_id" uuid,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "reward_order_coins" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "referral_coins" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "reward_coins_history" ADD CONSTRAINT "reward_coins_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reward_coins_history" ADD CONSTRAINT "reward_coins_history_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reward_coins_history" ADD CONSTRAINT "reward_coins_history_new_user_id_users_id_fk" FOREIGN KEY ("new_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reward_order_coins_history" ADD CONSTRAINT "reward_order_coins_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reward_order_coins_history" ADD CONSTRAINT "reward_order_coins_history_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;