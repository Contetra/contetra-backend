-- Reference data for the ABAC admin-panel gating feature. Migrations only
-- create schema, so without this, every environment starts with empty
-- policy tables — under default-deny that hides every admin-panel tab from
-- every user, including admins, until this runs.
INSERT INTO "actions" ("name", "description") VALUES
  ('view', 'Can see/view the resource.'),
  ('edit', 'Can create or modify the resource.'),
  ('delete', 'Can delete the resource.'),
  ('download', 'Can download/export the resource.')
ON CONFLICT ("name") DO NOTHING;
--> statement-breakpoint
INSERT INTO "resource_types" ("name", "description") VALUES
  ('admin_tab:dashboard', 'Admin panel Dashboard tab.'),
  ('admin_tab:blog', 'Admin panel Blog tab.'),
  ('admin_tab:emails', 'Admin panel Emails tab.'),
  ('admin_tab:settings', 'Admin panel Settings tab.'),
  ('admin_tab:rbac', 'Admin panel RBAC/policy management tab.')
ON CONFLICT ("name") DO NOTHING;
--> statement-breakpoint
INSERT INTO "policies" ("id", "name", "description", "effect", "action", "resource_type", "condition") VALUES
  ('981d462c-9f2a-40bb-8c31-538d838ff0c4', 'view-admin-tab-dashboard', 'Can see the Dashboard tab in the admin panel.', 'allow', 'view', 'admin_tab:dashboard', '{}'),
  ('92b136eb-c458-411e-b64c-7959a5bbabd5', 'view-admin-tab-blog', 'Can see the Blog tab in the admin panel.', 'allow', 'view', 'admin_tab:blog', '{}'),
  ('fe8da43c-032b-4636-a953-543f41913683', 'view-admin-tab-emails', 'Can see the Emails tab in the admin panel.', 'allow', 'view', 'admin_tab:emails', '{}'),
  ('c3af5f8c-2af3-4f8a-ab75-4193f3bd3b4c', 'view-admin-tab-settings', 'Can see the Settings tab in the admin panel.', 'allow', 'view', 'admin_tab:settings', '{}'),
  ('5cbf3909-5baa-42ba-ab93-067be960a799', 'view-admin-tab-rbac', 'Can see the RBAC tab in the admin panel.', 'allow', 'view', 'admin_tab:rbac', '{}'),
  ('c52210a7-2791-4e56-86cc-0bfa42ed1b33', 'edit-admin-tab-rbac', 'Can manage RBAC/policy configuration in the admin panel.', 'allow', 'edit', 'admin_tab:rbac', '{}')
ON CONFLICT ("id") DO NOTHING;
--> statement-breakpoint
-- Grant every admin_tab policy to the "admin" role, and the blog tab to "author".
-- policy_bindings has no natural unique constraint, so NOT EXISTS guards idempotency.
INSERT INTO "policy_bindings" ("policy_id", "role_id")
SELECT p.id, r.id FROM "policies" p, "roles" r
WHERE (p.name, r.name) IN (
  ('view-admin-tab-dashboard', 'admin'),
  ('view-admin-tab-blog', 'admin'),
  ('view-admin-tab-emails', 'admin'),
  ('view-admin-tab-settings', 'admin'),
  ('view-admin-tab-rbac', 'admin'),
  ('edit-admin-tab-rbac', 'admin'),
  ('view-admin-tab-blog', 'author')
)
AND NOT EXISTS (
  SELECT 1 FROM "policy_bindings" pb WHERE pb.policy_id = p.id AND pb.role_id = r.id
);
--> statement-breakpoint
-- Defensive: guarantee this account has the admin role on every environment,
-- so it never loses admin-panel access to a gap in role seeding again.
-- Safe no-op if the grant already exists or the account doesn't exist here.
INSERT INTO "user_roles" ("user_id", "role_id")
SELECT u.id, r.id FROM "user" u, "roles" r
WHERE u.email = 'ssoni608@gmail.com' AND r.name = 'admin'
ON CONFLICT ("user_id", "role_id") DO NOTHING;
