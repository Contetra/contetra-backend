ALTER TABLE "user_details" ALTER COLUMN "department_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "show_on_website" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;