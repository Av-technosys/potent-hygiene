CREATE TABLE "address" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar,
	"phone" varchar,
	"email" varchar,
	"street" text,
	"locality" varchar,
	"city" varchar,
	"state" varchar,
	"pincode" varchar,
	"country" varchar,
	"is_default" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
