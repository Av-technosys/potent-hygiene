CREATE TABLE "coupon" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(20) NOT NULL,
	"description" varchar(100),
	"code" varchar(20) NOT NULL,
	"is_discount_percentage" boolean DEFAULT false NOT NULL,
	"discount_percentage" integer,
	"discount_fixed_amount" integer,
	"minimum_order_value" integer DEFAULT 0 NOT NULL,
	"maximum_discount_amount" integer DEFAULT 0 NOT NULL,
	"use_once" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "coupon_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "coupon_transaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"coupon_id" uuid NOT NULL,
	"code" varchar(20) NOT NULL,
	"is_discount_percentage" boolean DEFAULT false NOT NULL,
	"discount_percentage" integer,
	"discount_fixed_amount" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "coupon_transaction" ADD CONSTRAINT "coupon_transaction_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coupon_transaction" ADD CONSTRAINT "coupon_transaction_coupon_id_coupon_id_fk" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupon"("id") ON DELETE no action ON UPDATE no action;