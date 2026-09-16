ALTER TABLE "posts" ADD COLUMN "feature_image_url" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "status" varchar(50) DEFAULT 'Draft' NOT NULL;