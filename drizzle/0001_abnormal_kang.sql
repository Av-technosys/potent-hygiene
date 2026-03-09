CREATE TABLE "blog" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar,
	"meta_description" varchar,
	"blog_category" varchar,
	"image" varchar,
	"tags" varchar[],
	"date" varchar,
	"data" text,
	"user_image" varchar,
	"user_name" varchar,
	"slug" varchar,
	"is_visible" boolean DEFAULT true
);
