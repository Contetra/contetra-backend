ALTER TABLE "posts_authors" ADD CONSTRAINT "posts_authors_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
