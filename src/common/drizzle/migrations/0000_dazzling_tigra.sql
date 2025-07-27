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
CREATE TABLE "e_books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"image" "bytea",
	"image_url" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "e_books_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "meta_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"postId" uuid,
	"pageId" uuid,
	"eBookId" uuid,
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
	CONSTRAINT "page_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "posts_categories" (
	"postId" uuid NOT NULL,
	"categoryId" uuid NOT NULL,
	"parentCategoryId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"content" varchar(1000) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "blog_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"userId" uuid NOT NULL,
	"roleId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"user_name" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"2fa_status" varchar(50) DEFAULT 'disabled' NOT NULL,
	"email" varchar(255) NOT NULL,
	"profile_picture" "bytea",
	"profile_picture_url" varchar(255),
	"last_login" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "meta_data" ADD CONSTRAINT "meta_data_postId_blog_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."blog"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meta_data" ADD CONSTRAINT "meta_data_pageId_page_id_fk" FOREIGN KEY ("pageId") REFERENCES "public"."page"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meta_data" ADD CONSTRAINT "meta_data_eBookId_e_books_id_fk" FOREIGN KEY ("eBookId") REFERENCES "public"."e_books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_categories" ADD CONSTRAINT "posts_categories_postId_blog_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."blog"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_categories" ADD CONSTRAINT "posts_categories_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_categories" ADD CONSTRAINT "posts_categories_parentCategoryId_categories_id_fk" FOREIGN KEY ("parentCategoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "titleIndex" ON "blog" USING btree ("title");--> statement-breakpoint
CREATE INDEX "userIdIndex" ON "user" USING btree ("id");--> statement-breakpoint
CREATE INDEX "userEmailIndex" ON "user" USING btree ("email");