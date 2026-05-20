CREATE TABLE "contact_us" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"number" varchar,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
