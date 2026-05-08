import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  index,
  uniqueIndex,
  text,
  jsonb,
  boolean,
} from 'drizzle-orm/pg-core';

export const userTable = pgTable(
  'user',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).unique().notNull(),
    user_name: varchar('user_name', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    two_fa_status: varchar('2fa_status', {
      enum: ['enabled', 'disabled', 'not_allowed'],
      length: 50,
    })
      .notNull()
      .default('disabled'),
    email: varchar('email', { length: 255 }).notNull().unique(),
    profile_picture_url: varchar('profile_picture_url', { length: 255 }),
    last_login: timestamp('last_login', { withTimezone: true })
      .defaultNow()
      .notNull(),
    created_at: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      userIdIndex: index('userIdIndex').on(table.id),
      userEmailIndex: index('userEmailIndex').on(table.email),
    };
  },
);

export const userDetailsTable = pgTable(
  'user_details',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    user_id: uuid('user_id')
      .references(() => userTable.id)
      .notNull(),
    department: varchar('department', { length: 100 }).notNull(),
    created_at: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      userDetailsIdIndex: index('userDetailsIdIndex').on(table.id),
    };
  },
);

export const rolesTable = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).unique().notNull(),
  description: varchar('description', { length: 255 }).notNull(),
});

export const userRolesTable = pgTable(
  'user_roles',
  {
    user_id: uuid('user_id')
      .references(() => userTable.id)
      .notNull(),
    role_id: uuid('role_id')
      .references(() => rolesTable.id)
      .notNull(),
  },
  (table) => ({
    uniqueUserRole: uniqueIndex('unique_user_role').on(
      table.user_id,
      table.role_id,
    ),
  }),
);

export const pageTable = pgTable('page', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  created_by: uuid('created_by')
    .references(() => userTable.id)
    .notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const eBooksTable = pgTable('ebooks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  created_by: uuid('created_by')
    .references(() => userTable.id)
    .notNull(),
  image_url: varchar('image_url', { length: 255 }),
  attachment_url: varchar('attachment_url', { length: 255 }),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const postsTable = pgTable(
  'posts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    created_by: uuid('created_by')
      .references(() => userTable.id)
      .notNull(),
    content: text('content').notNull(),
    excerpt: text('excerpt'),
    feature_image_url: text('feature_image_url'),
    status: varchar('status', {
      enum: ['Draft', 'Published'],
      length: 50,
    })
      .notNull()
      .default('Draft'),
    created_at: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      postsIdIndex: index('postsIdIndex').on(table.id),
      titleIndex: index('titleIndex').on(table.title),
      postsSlugIndex: index('postsSlugIndex').on(table.slug),
      postsCreatedByIndex: index('postsCreatedByIndex').on(table.created_by),
    };
  },
);

export const postMetaDataTable = pgTable('post_meta_data', {
  id: uuid('id').primaryKey().defaultRandom(),
  post_id: uuid('post_id').references(() => postsTable.id),
  title: varchar('title', { length: 255 }),
  description: varchar('description', { length: 1000 }),
  keywords: varchar('keywords', { length: 500 }),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const pageMetaDataTable = pgTable('page_meta_data', {
  id: uuid('id').primaryKey().defaultRandom(),
  page_id: uuid('page_id').references(() => pageTable.id),
  title: varchar('title', { length: 255 }),
  description: varchar('description', { length: 1000 }),
  keywords: varchar('keywords', { length: 500 }),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const eBookMetaDataTable = pgTable('eBook_meta_data', {
  id: uuid('id').primaryKey().defaultRandom(),
  eBook_id: uuid('eBook_id').references(() => eBooksTable.id),
  title: varchar('title', { length: 255 }),
  description: varchar('description', { length: 1000 }),
  keywords: varchar('keywords', { length: 500 }),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const categoriesTable = pgTable(
  'categories',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 50 }).notNull().unique(),
    slug: varchar('slug', { length: 50 }).notNull().unique(),
    description: varchar('description', { length: 500 }),
    status: varchar('status', {
      enum: ['Draft', 'Published'],
      length: 50,
    })
      .notNull()
      .default('Published'),
    created_at: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      categoriesIdIndex: index('categoriesIdIndex').on(table.id),
    };
  },
);

export const authorTable = pgTable(
  'authors',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    author_id: uuid('author_id')
      .references(() => userTable.id)
      .notNull(),
    role: varchar('role', {
      enum: ['User', 'Author'],
      length: 50,
    })
      .notNull()
      .default('Author'),
    created_at: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      authorIdIndex: index('authorIdIndex').on(table.id),
      authorUserIdIndex: index('authorUserIdIndex').on(table.author_id),
    };
  },
);

export const postsCategoriesTable = pgTable(
  'posts_categories',
  {
    post_id: uuid('post_id')
      .references(() => postsTable.id)
      .notNull(),
    category_id: uuid('category_id')
      .references(() => categoriesTable.id)
      .notNull(),
    created_at: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      postsCategoriesPostIdIndex: index('postsCategoriesPostIdIndex').on(
        table.post_id,
      ),
      postsCategoriesCategoryIdIndex: index(
        'postsCategoriesCategoryIdIndex',
      ).on(table.category_id),
    };
  },
);

export const postsAuthorsTable = pgTable(
  'posts_authors',
  {
    post_id: uuid('post_id')
      .references(() => postsTable.id)
      .notNull(),
    author_id: uuid('author_id')
      .references(() => authorTable.id)
      .notNull(),
    created_at: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      postsAuthorsPostIdIndex: index('postsAuthorsPostIdIndex').on(
        table.post_id,
      ),
      postsAuthorsAuthorIdIndex: index('postsAuthorsAuthorIdIndex').on(
        table.author_id,
      ),
    };
  },
);

export const tagsTable = pgTable(
  'tags',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 50 }).notNull().unique(),
    created_at: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      tagsIdIndex: index('tagsIdIndex').on(table.id),
    };
  },
);

export const postsTagsTable = pgTable(
  'posts_tags',
  {
    post_id: uuid('post_id')
      .references(() => postsTable.id)
      .notNull(),
    tag_id: uuid('tag_id')
      .references(() => tagsTable.id)
      .notNull(),
    created_at: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      postsTagsPostIdIndex: index('postsTagsPostIdIndex').on(table.post_id),
      postsTagsTagIdIndex: index('postsTagsTagIdIndex').on(table.tag_id),
    };
  },
);

export const userAttributesTable = pgTable('user_attributes', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id')
    .references(() => userTable.id)
    .notNull(),
  key: varchar('key', { length: 100 }).notNull(), // e.g., "department", "region", "job_title"
  value: varchar('value', { length: 255 }).notNull(), // e.g., "marketing", "US", "editor"
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const policiesTable = pgTable('policies', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  effect: varchar('effect', { enum: ['allow', 'deny'], length: 10 }).notNull(),
  action: varchar('action', { length: 100 }).notNull(), // e.g., "read", "edit", "delete", "view_button"
  resource_type: varchar('resource_type', { length: 50 }).notNull(), // e.g., "page", "post"
  condition: text('condition').notNull(), // JSON logic, e.g. {"user.department": "marketing", "resource.status": "published"}
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const actionsTable = pgTable('actions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(), // "view", "edit", "delete", "download"
  description: text('description'),
});

export const resourceTypesTable = pgTable('resource_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(), // "page", "post", "email"
  description: text('description'),
});

export const policyBindingsTable = pgTable('policy_bindings', {
  id: uuid('id').primaryKey().defaultRandom(),
  policy_id: uuid('policy_id')
    .references(() => policiesTable.id)
    .notNull(),
  user_id: uuid('user_id').references(() => userTable.id), // optional
  resource_id: uuid('resource_id'), // optional
});

export const accessLogsTable = pgTable('access_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').references(() => userTable.id),
  action: varchar('action', { length: 100 }).notNull(),
  resource_type: varchar('resource_type', { length: 50 }).notNull(),
  resource_id: uuid('resource_id'),
  decision: varchar('decision', {
    enum: ['allow', 'deny'],
    length: 10,
  }).notNull(),
  reason: text('reason'), // e.g. "user.department=marketing matched policy P1"
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const formTypesTable = pgTable(
  'form_types',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull().unique(),
    created_at: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      formTypesIdIndex: index('formTypesIdIndex').on(table.id),
    };
  },
);

export const formsTable = pgTable(
  'forms',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    form_name: varchar('form_name', { length: 255 }).notNull(),
    form_type_id: uuid('form_type_id')
      .references(() => formTypesTable.id)
      .notNull(),
    created_at: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      formsIdIndex: index('formsIdIndex').on(table.id),
      formsFormTypeIdIndex: index('formsFormTypeIdIndex').on(
        table.form_type_id,
      ),
    };
  },
);

export const formSubmissionsTable = pgTable(
  'form_submissions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    form_id: uuid('form_id')
      .references(() => formsTable.id)
      .notNull(),
    sent_to: text('sent_to').notNull(),
    email_sent: boolean('email_sent').default(false).notNull(),
    payload: jsonb('payload').$type<Record<string, unknown>>(),
    created_at: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      formSubmissionsIdIndex: index('formSubmissionsIdIndex').on(table.id),
      formSubmissionsFormIdIndex: index('formSubmissionsFormIdIndex').on(
        table.form_id,
      ),
    };
  },
);
