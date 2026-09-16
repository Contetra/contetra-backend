CREATE TABLE "department" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "department_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "department_id" uuid NOT NULL;--> statement-breakpoint
CREATE INDEX "departmentIdIndex" ON "department" USING btree ("id");--> statement-breakpoint
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_department_id_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."department"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "userDetailsDepartmentIdIndex" ON "user_details" USING btree ("department_id");--> statement-breakpoint
ALTER TABLE "user_details" DROP COLUMN "department";