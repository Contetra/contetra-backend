CREATE TABLE "designation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "designation_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "designation_id" uuid;--> statement-breakpoint
CREATE INDEX "designationIdIndex" ON "designation" USING btree ("id");--> statement-breakpoint
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_designation_id_designation_id_fk" FOREIGN KEY ("designation_id") REFERENCES "public"."designation"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "userDetailsDesignationIdIndex" ON "user_details" USING btree ("designation_id");