DROP TABLE IF EXISTS "fish_comments";
--> statement-breakpoint
DROP TABLE IF EXISTS "fish_ratings";
--> statement-breakpoint
DROP TABLE IF EXISTS "fish_photos";
--> statement-breakpoint
CREATE TABLE "fish_photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"image_url" text NOT NULL,
	"caption" text,
	"archived" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fish_ratings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"photo_id" uuid NOT NULL,
	"clerk_user_id" text NOT NULL,
	"stars" smallint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "fish_ratings_photo_user_unique" UNIQUE("photo_id","clerk_user_id")
);
--> statement-breakpoint
CREATE TABLE "fish_comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"photo_id" uuid NOT NULL,
	"clerk_user_id" text NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "fish_ratings" ADD CONSTRAINT "fish_ratings_photo_id_fish_photos_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."fish_photos"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "fish_comments" ADD CONSTRAINT "fish_comments_photo_id_fish_photos_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."fish_photos"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "fish_ratings_photo_id_idx" ON "fish_ratings" USING btree ("photo_id");
--> statement-breakpoint
CREATE INDEX "fish_comments_photo_id_idx" ON "fish_comments" USING btree ("photo_id");
