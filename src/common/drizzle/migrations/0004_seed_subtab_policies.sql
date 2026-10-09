-- Extends ABAC gating from top-level admin tabs down to their sub-items
-- (e.g. Blog -> All Blogs / Add a new blog / Authors / Categories).
-- Deliberately does NOT create any policy_bindings here, unlike
-- 0003_seed_abac_policies.sql — these start fully default-deny, to be
-- granted explicitly via the RBAC -> Policy Bindings admin UI.
INSERT INTO "resource_types" ("name", "description") VALUES
  ('admin_tab:blog:all-blogs', 'Blog sub-tab: All Blogs.'),
  ('admin_tab:blog:add-a-new-blog', 'Blog sub-tab: Add a new blog.'),
  ('admin_tab:blog:authors', 'Blog sub-tab: Authors.'),
  ('admin_tab:blog:categories', 'Blog sub-tab: Categories.'),
  ('admin_tab:emails:all-emails', 'Emails sub-tab: All Emails.'),
  ('admin_tab:settings:forms', 'Settings sub-tab: Forms.'),
  ('admin_tab:settings:form-types', 'Settings sub-tab: Form Types.'),
  ('admin_tab:settings:team', 'Settings sub-tab: Team.'),
  ('admin_tab:settings:departments', 'Settings sub-tab: Departments.'),
  ('admin_tab:settings:designations', 'Settings sub-tab: Designations.')
ON CONFLICT ("name") DO NOTHING;
--> statement-breakpoint
INSERT INTO "policies" ("id", "name", "description", "effect", "action", "resource_type", "condition") VALUES
  ('fd397d2d-953f-4bc9-9c25-d76eb670a1cc', 'view-admin-tab-blog-all-blogs', 'Can see Blog -> All Blogs.', 'allow', 'view', 'admin_tab:blog:all-blogs', '{}'),
  ('3f74d1c4-7c82-4328-b103-8789f467a930', 'view-admin-tab-blog-add-a-new-blog', 'Can see Blog -> Add a new blog.', 'allow', 'view', 'admin_tab:blog:add-a-new-blog', '{}'),
  ('678acc8c-653f-4ec2-a337-e3e5b0dd01f8', 'view-admin-tab-blog-authors', 'Can see Blog -> Authors.', 'allow', 'view', 'admin_tab:blog:authors', '{}'),
  ('c7295e9c-5f03-49e1-8ed1-04e771f0f16a', 'view-admin-tab-blog-categories', 'Can see Blog -> Categories.', 'allow', 'view', 'admin_tab:blog:categories', '{}'),
  ('327c5834-a797-42e9-9106-cc6cc3ca9b83', 'view-admin-tab-emails-all-emails', 'Can see Emails -> All Emails.', 'allow', 'view', 'admin_tab:emails:all-emails', '{}'),
  ('0940c963-495a-476a-83ba-0028e6ef4eed', 'view-admin-tab-settings-forms', 'Can see Settings -> Forms.', 'allow', 'view', 'admin_tab:settings:forms', '{}'),
  ('09c3029d-3cb0-4cb4-8701-9185d844ebdb', 'view-admin-tab-settings-form-types', 'Can see Settings -> Form Types.', 'allow', 'view', 'admin_tab:settings:form-types', '{}'),
  ('767fa472-50e5-416f-9901-3111a4276217', 'view-admin-tab-settings-team', 'Can see Settings -> Team.', 'allow', 'view', 'admin_tab:settings:team', '{}'),
  ('e2cd78ee-e5e3-44c3-80f9-6d30431a5c30', 'view-admin-tab-settings-departments', 'Can see Settings -> Departments.', 'allow', 'view', 'admin_tab:settings:departments', '{}'),
  ('bab58ceb-da4f-4f6f-b370-d5f1306a8bcc', 'view-admin-tab-settings-designations', 'Can see Settings -> Designations.', 'allow', 'view', 'admin_tab:settings:designations', '{}')
ON CONFLICT ("id") DO NOTHING;
