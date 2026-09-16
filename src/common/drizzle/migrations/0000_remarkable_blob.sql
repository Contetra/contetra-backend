CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"slug" varchar(50) NOT NULL,
	"description" varchar(500),
	"level" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "eBook_meta_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"eBook_id" uuid,
	"title" varchar(255),
	"description" varchar(1000),
	"keywords" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ebooks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"created_by" uuid NOT NULL,
	"image_url" varchar(255),
	"attachment_url" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ebooks_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "page_meta_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"page_id" uuid,
	"title" varchar(255),
	"description" varchar(1000),
	"keywords" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "page" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"slug" varchar(50) NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "page_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "post_meta_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid,
	"title" varchar(255),
	"description" varchar(1000),
	"keywords" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts_authors" (
	"post_id" uuid NOT NULL,
	"author_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts_categories" (
	"post_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"parent_category_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"created_by" uuid NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "blog_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "posts_tags" (
	"post_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" varchar(255) NOT NULL,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" uuid NOT NULL,
	"role_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"user_name" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"2fa_status" varchar(50) DEFAULT 'disabled' NOT NULL,
	"email" varchar(255) NOT NULL,
	"profile_picture_url" varchar(255),
	"last_login" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_name_unique" UNIQUE("name"),
	CONSTRAINT "user_user_name_unique" UNIQUE("user_name"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "eBook_meta_data" ADD CONSTRAINT "eBook_meta_data_eBook_id_ebooks_id_fk" FOREIGN KEY ("eBook_id") REFERENCES "public"."ebooks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ebooks" ADD CONSTRAINT "ebooks_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page_meta_data" ADD CONSTRAINT "page_meta_data_page_id_page_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page" ADD CONSTRAINT "page_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_meta_data" ADD CONSTRAINT "post_meta_data_post_id_blog_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_authors" ADD CONSTRAINT "posts_authors_post_id_blog_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_authors" ADD CONSTRAINT "posts_authors_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_categories" ADD CONSTRAINT "posts_categories_post_id_blog_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_categories" ADD CONSTRAINT "posts_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_categories" ADD CONSTRAINT "posts_categories_parent_category_id_categories_id_fk" FOREIGN KEY ("parent_category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog" ADD CONSTRAINT "blog_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_post_id_blog_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "titleIndex" ON "blog" USING btree ("title");--> statement-breakpoint
CREATE UNIQUE INDEX "unique_user_role" ON "user_roles" USING btree ("user_id","role_id");--> statement-breakpoint
CREATE INDEX "userIdIndex" ON "user" USING btree ("id");--> statement-breakpoint
CREATE INDEX "userEmailIndex" ON "user" USING btree ("email");