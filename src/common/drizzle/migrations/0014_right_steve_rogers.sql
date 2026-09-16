CREATE INDEX "authorIdIndex" ON "authors" USING btree ("id");--> statement-breakpoint
CREATE INDEX "authorUserIdIndex" ON "authors" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "categoriesIdIndex" ON "categories" USING btree ("id");--> statement-breakpoint
CREATE INDEX "formSubmissionsIdIndex" ON "form_submissions" USING btree ("id");--> statement-breakpoint
CREATE INDEX "formSubmissionsFormIdIndex" ON "form_submissions" USING btree ("form_id");--> statement-breakpoint
CREATE INDEX "formTypesIdIndex" ON "form_types" USING btree ("id");--> statement-breakpoint
CREATE INDEX "formsIdIndex" ON "forms" USING btree ("id");--> statement-breakpoint
CREATE INDEX "formsFormTypeIdIndex" ON "forms" USING btree ("form_type_id");--> statement-breakpoint
CREATE INDEX "postsAuthorsPostIdIndex" ON "posts_authors" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "postsAuthorsAuthorIdIndex" ON "posts_authors" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "postsCategoriesPostIdIndex" ON "posts_categories" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "postsCategoriesCategoryIdIndex" ON "posts_categories" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "postsIdIndex" ON "posts" USING btree ("id");--> statement-breakpoint
CREATE INDEX "postsSlugIndex" ON "posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "postsCreatedByIndex" ON "posts" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "postsTagsPostIdIndex" ON "posts_tags" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "postsTagsTagIdIndex" ON "posts_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "tagsIdIndex" ON "tags" USING btree ("id");