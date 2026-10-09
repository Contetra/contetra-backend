// Seeds a fresh database with a snapshot of local dev data.
// Usage: npm run seed
import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import {
  rolesTable,
  userTable,
  userRolesTable,
  categoriesTable,
  authorTable,
  postsTable,
  postMetaDataTable,
  postsAuthorsTable,
  postsCategoriesTable,
  formTypesTable,
  formsTable,
  formSubmissionsTable,
  actionsTable,
  resourceTypesTable,
  policiesTable,
  policyBindingsTable,
} from '../schema';

// Default login password for every seeded user. Real password hashes are
// never committed to source control — change this after seeding if needed.
const SEED_USER_PASSWORD = 'Password@123';

const dataDir = path.join(__dirname, 'data');

function loadJson<T>(fileName: string): T {
  const filePath = path.join(dataDir, fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
}

type RoleRow = { id: string; name: string; description: string };
type UserRow = {
  id: string;
  name: string;
  user_name: string;
  '2fa_status': 'enabled' | 'disabled' | 'not_allowed';
  email: string;
  profile_picture_url: string | null;
  last_login: string;
  created_at: string;
  updated_at: string;
};
type UserRoleRow = { role_name: string; user_email: string };
type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  status: 'Draft' | 'Published';
  created_at: string;
  updated_at: string;
};
type AuthorRow = {
  id: string;
  author_id: string;
  role: 'User' | 'Author';
  created_at: string;
  updated_at: string;
};
type PostRow = {
  id: string;
  title: string;
  slug: string;
  created_by: string;
  content: string;
  excerpt: string | null;
  feature_image_url: string | null;
  status: 'Draft' | 'Published';
  created_at: string;
  updated_at: string;
};
type PostMetaDataRow = {
  id: string;
  post_id: string | null;
  title: string | null;
  description: string | null;
  keywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  created_at: string;
  updated_at: string;
};
type PostsAuthorRow = {
  post_id: string;
  author_id: string;
  created_at: string;
  updated_at: string;
};
type PostsCategoryRow = {
  post_id: string;
  category_id: string;
  created_at: string;
  updated_at: string;
};
type FormTypeRow = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};
type FormRow = {
  id: string;
  form_name: string;
  form_type_id: string;
  created_at: string;
  updated_at: string;
};
type FormSubmissionRow = {
  id: string;
  form_id: string;
  sent_to: string;
  email_sent: boolean;
  payload: Record<string, unknown> | null;
  created_at: string;
};
type ActionRow = { name: string; description: string | null };
type ResourceTypeRow = { name: string; description: string | null };
type PolicyRow = {
  id: string;
  name: string;
  description: string | null;
  effect: 'allow' | 'deny';
  action: string;
  resource_type: string;
  condition: string;
};
type PolicyBindingRow = { policy_name: string; role_name: string };

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(pool, { logger: false });

  try {
    console.log('Seeding database...');

    const roles = loadJson<RoleRow[]>('roles.json');
    if (roles.length) {
      await db.insert(rolesTable).values(roles).onConflictDoNothing();
      console.log(`  roles: ${roles.length}`);
    }

    const users = loadJson<UserRow[]>('user.json');
    if (users.length) {
      const hashedPassword = await bcrypt.hash(
        SEED_USER_PASSWORD,
        await bcrypt.genSalt(),
      );
      await db
        .insert(userTable)
        .values(
          users.map((u) => ({
            id: u.id,
            name: u.name,
            user_name: u.user_name,
            password: hashedPassword,
            two_fa_status: u['2fa_status'],
            email: u.email,
            profile_picture_url: u.profile_picture_url,
            last_login: new Date(u.last_login),
            created_at: new Date(u.created_at),
            updated_at: new Date(u.updated_at),
          })),
        )
        .onConflictDoNothing();
      console.log(
        `  user: ${users.length} (default password: ${SEED_USER_PASSWORD})`,
      );
    }

    const userRoles = loadJson<UserRoleRow[]>('user_roles.json');
    if (userRoles.length) {
      // Roles/users may already exist with different ids than this snapshot
      // (e.g. migrations that backfill a default role), so resolve the
      // current ids by their natural keys instead of trusting the dump.
      const allRoles = await db
        .select({ id: rolesTable.id, name: rolesTable.name })
        .from(rolesTable);
      const roleIdByName = new Map(allRoles.map((r) => [r.name, r.id]));

      const allUsers = await db
        .select({ id: userTable.id, email: userTable.email })
        .from(userTable);
      const userIdByEmail = new Map(allUsers.map((u) => [u.email, u.id]));

      const rows = userRoles
        .map((ur) => ({
          user_id: userIdByEmail.get(ur.user_email),
          role_id: roleIdByName.get(ur.role_name),
        }))
        .filter(
          (r): r is { user_id: string; role_id: string } =>
            !!r.user_id && !!r.role_id,
        );

      if (rows.length) {
        await db.insert(userRolesTable).values(rows).onConflictDoNothing();
      }
      console.log(`  user_roles: ${rows.length}`);
    }

    const actions = loadJson<ActionRow[]>('actions.json');
    if (actions.length) {
      await db.insert(actionsTable).values(actions).onConflictDoNothing();
      console.log(`  actions: ${actions.length}`);
    }

    const resourceTypes = loadJson<ResourceTypeRow[]>('resource_types.json');
    if (resourceTypes.length) {
      await db
        .insert(resourceTypesTable)
        .values(resourceTypes)
        .onConflictDoNothing();
      console.log(`  resource_types: ${resourceTypes.length}`);
    }

    const policies = loadJson<PolicyRow[]>('policies.json');
    if (policies.length) {
      await db.insert(policiesTable).values(policies).onConflictDoNothing();
      console.log(`  policies: ${policies.length}`);
    }

    const policyBindings = loadJson<PolicyBindingRow[]>(
      'policy_bindings.json',
    );
    if (policyBindings.length) {
      // policy_bindings has no natural unique constraint (unlike user_roles),
      // so re-seeding must check for existing rows itself to stay idempotent.
      const allPolicies = await db
        .select({ id: policiesTable.id, name: policiesTable.name })
        .from(policiesTable);
      const policyIdByName = new Map(allPolicies.map((p) => [p.name, p.id]));

      const allRoles = await db
        .select({ id: rolesTable.id, name: rolesTable.name })
        .from(rolesTable);
      const roleIdByName = new Map(allRoles.map((r) => [r.name, r.id]));

      const existingBindings = await db
        .select({
          policy_id: policyBindingsTable.policy_id,
          role_id: policyBindingsTable.role_id,
        })
        .from(policyBindingsTable);
      const existingKeys = new Set(
        existingBindings
          .filter((b) => b.role_id !== null)
          .map((b) => `${b.policy_id}:${b.role_id}`),
      );

      const rows = policyBindings
        .map((pb) => ({
          policy_id: policyIdByName.get(pb.policy_name),
          role_id: roleIdByName.get(pb.role_name),
        }))
        .filter(
          (r): r is { policy_id: string; role_id: string } =>
            !!r.policy_id &&
            !!r.role_id &&
            !existingKeys.has(`${r.policy_id}:${r.role_id}`),
        );

      if (rows.length) {
        await db.insert(policyBindingsTable).values(rows);
      }
      console.log(`  policy_bindings: ${rows.length}`);
    }

    const categories = loadJson<CategoryRow[]>('categories.json');
    if (categories.length) {
      await db
        .insert(categoriesTable)
        .values(
          categories.map((c) => ({
            ...c,
            created_at: new Date(c.created_at),
            updated_at: new Date(c.updated_at),
          })),
        )
        .onConflictDoNothing();
      console.log(`  categories: ${categories.length}`);
    }

    const authors = loadJson<AuthorRow[]>('authors.json');
    if (authors.length) {
      await db
        .insert(authorTable)
        .values(
          authors.map((a) => ({
            ...a,
            created_at: new Date(a.created_at),
            updated_at: new Date(a.updated_at),
          })),
        )
        .onConflictDoNothing();
      console.log(`  authors: ${authors.length}`);
    }

    const posts = loadJson<PostRow[]>('posts.json');
    if (posts.length) {
      await db
        .insert(postsTable)
        .values(
          posts.map((p) => ({
            ...p,
            created_at: new Date(p.created_at),
            updated_at: new Date(p.updated_at),
          })),
        )
        .onConflictDoNothing();
      console.log(`  posts: ${posts.length}`);
    }

    const postMetaData = loadJson<PostMetaDataRow[]>('post_meta_data.json');
    if (postMetaData.length) {
      await db
        .insert(postMetaDataTable)
        .values(
          postMetaData.map((m) => ({
            ...m,
            created_at: new Date(m.created_at),
            updated_at: new Date(m.updated_at),
          })),
        )
        .onConflictDoNothing();
      console.log(`  post_meta_data: ${postMetaData.length}`);
    }

    const postsAuthors = loadJson<PostsAuthorRow[]>('posts_authors.json');
    if (postsAuthors.length) {
      await db
        .insert(postsAuthorsTable)
        .values(
          postsAuthors.map((pa) => ({
            ...pa,
            created_at: new Date(pa.created_at),
            updated_at: new Date(pa.updated_at),
          })),
        )
        .onConflictDoNothing();
      console.log(`  posts_authors: ${postsAuthors.length}`);
    }

    const postsCategories = loadJson<PostsCategoryRow[]>(
      'posts_categories.json',
    );
    if (postsCategories.length) {
      await db
        .insert(postsCategoriesTable)
        .values(
          postsCategories.map((pc) => ({
            ...pc,
            created_at: new Date(pc.created_at),
            updated_at: new Date(pc.updated_at),
          })),
        )
        .onConflictDoNothing();
      console.log(`  posts_categories: ${postsCategories.length}`);
    }

    const formTypes = loadJson<FormTypeRow[]>('form_types.json');
    if (formTypes.length) {
      await db
        .insert(formTypesTable)
        .values(
          formTypes.map((ft) => ({
            ...ft,
            created_at: new Date(ft.created_at),
            updated_at: new Date(ft.updated_at),
          })),
        )
        .onConflictDoNothing();
      console.log(`  form_types: ${formTypes.length}`);
    }

    const forms = loadJson<FormRow[]>('forms.json');
    if (forms.length) {
      await db
        .insert(formsTable)
        .values(
          forms.map((f) => ({
            ...f,
            created_at: new Date(f.created_at),
            updated_at: new Date(f.updated_at),
          })),
        )
        .onConflictDoNothing();
      console.log(`  forms: ${forms.length}`);
    }

    const formSubmissions = loadJson<FormSubmissionRow[]>(
      'form_submissions.json',
    );
    if (formSubmissions.length) {
      await db
        .insert(formSubmissionsTable)
        .values(
          formSubmissions.map((fs2) => ({
            ...fs2,
            created_at: new Date(fs2.created_at),
          })),
        )
        .onConflictDoNothing();
      console.log(`  form_submissions: ${formSubmissions.length}`);
    }

    console.log('Seeding complete.');
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
