ALTER TABLE "blog" RENAME TO "posts";--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "blog_slug_unique";--> statement-breakpoint
ALTER TABLE "post_meta_data" DROP CONSTRAINT "post_meta_data_post_id_blog_id_fk";
--> statement-breakpoint
ALTER TABLE "posts_authors" DROP CONSTRAINT "posts_authors_post_id_blog_id_fk";
--> statement-breakpoint
ALTER TABLE "posts_categories" DROP CONSTRAINT "posts_categories_post_id_blog_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "blog_created_by_user_id_fk";
--> statement-breakpoint
ALTER TABLE "posts_tags" DROP CONSTRAINT "posts_tags_post_id_blog_id_fk";
--> statement-breakpoint
ALTER TABLE "post_meta_data" ADD CONSTRAINT "post_meta_data_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_authors" ADD CONSTRAINT "posts_authors_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_categories" ADD CONSTRAINT "posts_categories_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_slug_unique" UNIQUE("slug");