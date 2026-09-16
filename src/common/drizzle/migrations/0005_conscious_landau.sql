ALTER TABLE "posts_categories" DROP CONSTRAINT "posts_categories_parent_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN "level";--> statement-breakpoint
ALTER TABLE "posts_categories" DROP COLUMN "parent_category_id";