import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  index,
  integer,
} from 'drizzle-orm/pg-core';
import { bytea } from './bytea';

export const userTable = pgTable(
  'user',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    user_name: varchar('user_name', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    two_fa_status: varchar('2fa_status', {
      enum: ['enabled', 'disabled', 'not_allowed'],
      length: 50,
    })
      .notNull()
      .default('disabled'),
    email: varchar('email', { length: 255 }).notNull().unique(),
    profile_picture: bytea('profile_picture'),
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

export const rolesTable = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
});

export const userRolesTable = pgTable('user_roles', {
  userId: uuid('userId')
    .references(() => userTable.id)
    .notNull(),
  roleId: uuid('roleId')
    .references(() => rolesTable.id)
    .notNull(),
});

export const pageTable = pgTable('page', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
});

export const eBooksTable = pgTable('e_books', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  image: bytea('image'),
  image_url: varchar('image_url', { length: 255 }),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const metaDataTable = pgTable('meta_data', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('postId').references(() => postsTable.id),
  pageId: uuid('pageId').references(() => pageTable.id),
  eBookId: uuid('eBookId').references(() => eBooksTable.id),
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

export const categoriesTable = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  description: varchar('description', { length: 500 }),
  level: integer('level').default(0).notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const postsCategoriesTable = pgTable('posts_categories', {
  postId: uuid('postId')
    .references(() => postsTable.id)
    .notNull(),
  categoryId: uuid('categoryId')
    .references(() => categoriesTable.id)
    .notNull(),
  parentCategoryId: uuid('parentCategoryId')
    .references(() => categoriesTable.id)
    .notNull(),
});

export const postsTable = pgTable(
  'blog',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    content: varchar('content', { length: 1000 }).notNull(),
    created_at: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      titleIndex: index('titleIndex').on(table.title),
    };
  },
);
