ALTER TABLE "policy_bindings" ADD COLUMN "role_id" uuid;--> statement-breakpoint
ALTER TABLE "policy_bindings" ADD CONSTRAINT "policy_bindings_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "policiesActionResourceTypeIndex" ON "policies" USING btree ("action","resource_type");--> statement-breakpoint
CREATE INDEX "policyBindingsPolicyIdIndex" ON "policy_bindings" USING btree ("policy_id");--> statement-breakpoint
CREATE INDEX "policyBindingsUserIdIndex" ON "policy_bindings" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "policyBindingsRoleIdIndex" ON "policy_bindings" USING btree ("role_id");