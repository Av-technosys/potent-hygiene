CREATE TABLE "featured_category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "featured_product_varient" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_varient_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_varient_attribute" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_varient_id" uuid NOT NULL,
	"attribute" varchar NOT NULL,
	"value" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_varient_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_varient_id" uuid NOT NULL,
	"media_type" varchar NOT NULL,
	"media_url" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "featured_category" ADD CONSTRAINT "featured_category_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "featured_product_varient" ADD CONSTRAINT "featured_product_varient_product_varient_id_product_variant_id_fk" FOREIGN KEY ("product_varient_id") REFERENCES "public"."product_variant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_varient_attribute" ADD CONSTRAINT "product_varient_attribute_product_varient_id_product_variant_id_fk" FOREIGN KEY ("product_varient_id") REFERENCES "public"."product_variant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_varient_media" ADD CONSTRAINT "product_varient_media_product_varient_id_product_variant_id_fk" FOREIGN KEY ("product_varient_id") REFERENCES "public"."product_variant"("id") ON DELETE no action ON UPDATE no action;