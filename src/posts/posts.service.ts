import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { DRIZZLE } from 'src/common/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  authorTable,
  categoriesTable,
  postsAuthorsTable,
  postsCategoriesTable,
  postsTable,
  userTable,
} from 'src/common/drizzle/schema';
import { JwtPayload } from 'src/types/auth';
import { and, asc, desc, eq, ilike, inArray, SQL, sql } from 'drizzle-orm';
import { UpdatePostDto } from './dto/update-post.dto';

export type Post = typeof postsTable.$inferSelect;
export type NewPost = typeof postsTable.$inferInsert;

@Injectable()
export class PostsService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase) {}

  async create(createPostDto: CreatePostDto, user: JwtPayload) {
    const exists = await this.db
      .select({ slug: postsTable.slug })
      .from(postsTable)
      .where(eq(postsTable.slug, createPostDto.slug));

    if (exists.length > 0) {
      throw new ConflictException('Slug already exists');
    }

    try {
      return await this.db.transaction(async (tx) => {
        const [insertedPost] = await tx
          .insert(postsTable)
          .values({
            title: createPostDto.title,
            slug: createPostDto.slug,
            content: createPostDto.content,
            feature_image_url: createPostDto.feature_image_url,
            excerpt: createPostDto.excerpt,
            created_by: user.userId,
            created_at: createPostDto.created_at,
          })
          .returning({ id: postsTable.id });

        if (!insertedPost) {
          throw new Error('Post insertion failed');
        }

        const postId = insertedPost.id;

        await tx.insert(postsAuthorsTable).values({
          post_id: postId,
          author_id: createPostDto.author_id,
        });

        await tx.insert(postsCategoriesTable).values({
          post_id: postId,
          category_id: createPostDto.category_id,
        });

        return {
          message: 'Post created successfully',
          post_id: postId,
        };
      });
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }

  async updateBlog(updatePostDto: UpdatePostDto) {
    const { id, content } = updatePostDto;

    await this.db
      .update(postsTable)
      .set({ content })
      .where(eq(postsTable.id, id));

    return {
      message: 'Post updated successfully',
    };
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    sortOrder: 'asc' | 'desc' = 'desc',
  ) {
    const offset = (page - 1) * limit;

    const orderDirection =
      sortOrder === 'asc'
        ? asc(postsTable.created_at)
        : desc(postsTable.created_at);

    // 🔥 Only search condition now
    const whereConditions = search
      ? ilike(postsTable.title, `${search}%`)
      : undefined;

    // Count with search applied
    const [{ count }] = await this.db
      .select({
        count: sql<number>`count(*)`.as('count'),
      })
      .from(postsTable)
      .where(whereConditions);

    const posts = await this.db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        slug: postsTable.slug,
        feature_image_url: postsTable.feature_image_url,
        created_at: postsTable.created_at,
        excerpt: postsTable.excerpt,

        authors: sql<string[]>`
        array_remove(array_agg(DISTINCT ${userTable.name}), NULL)
      `.as('authors'),

        categories: sql<string[]>`
        array_remove(array_agg(DISTINCT ${categoriesTable.name}), NULL)
      `.as('categories'),
      })
      .from(postsTable)
      .leftJoin(postsAuthorsTable, eq(postsTable.id, postsAuthorsTable.post_id))
      .leftJoin(authorTable, eq(postsAuthorsTable.author_id, authorTable.id))
      .leftJoin(userTable, eq(authorTable.author_id, userTable.id))
      .leftJoin(
        postsCategoriesTable,
        eq(postsTable.id, postsCategoriesTable.post_id),
      )
      .leftJoin(
        categoriesTable,
        eq(postsCategoriesTable.category_id, categoriesTable.id),
      )
      // .where(whereConditions)
      .groupBy(postsTable.id)
      .orderBy(orderDirection)
      .limit(limit)
      .offset(offset);

    return {
      data: posts,
      meta: {
        total: Number(count),
        page,
        limit,
        totalPages: Math.ceil(Number(count) / limit),
        isNext: offset + posts.length < Number(count),
        isPrev: page > 1,
      },
    };
  }

  async findAllPosts(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    sortOrder: 'asc' | 'desc' = 'desc',
    authors: string[] = [],
    categories: string[] = [],
  ) {
    const offset = (page - 1) * limit;

    const orderDirection =
      sortOrder === 'asc'
        ? asc(postsTable.created_at)
        : desc(postsTable.created_at);

    // Build dynamic conditions
    const conditions: SQL[] = [];

    // Always filter published
    conditions.push(eq(postsTable.status, 'Published'));

    // Search by title
    if (search?.trim()) {
      conditions.push(ilike(postsTable.title, `%${search.trim()}%`));
    }

    // Filter by authors
    if (authors.length > 0) {
      conditions.push(inArray(postsAuthorsTable.author_id, authors));
    }

    // Filter by categories
    if (categories.length > 0) {
      conditions.push(inArray(postsCategoriesTable.category_id, categories));
    }

    // Count query (IMPORTANT: distinct to avoid duplicate rows from joins)
    const [{ count }] = await this.db
      .select({
        count: sql<number>`count(distinct ${postsTable.id})`.as('count'),
      })
      .from(postsTable)
      .leftJoin(postsAuthorsTable, eq(postsTable.id, postsAuthorsTable.post_id))
      .leftJoin(
        postsCategoriesTable,
        eq(postsTable.id, postsCategoriesTable.post_id),
      )
      .where(and(...conditions));

    // Main query
    const posts = await this.db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        slug: postsTable.slug,
        feature_image_url: postsTable.feature_image_url,
        created_at: postsTable.created_at,
        excerpt: postsTable.excerpt,

        authors: sql<string[]>`
        array_remove(array_agg(DISTINCT ${userTable.name}), NULL)
      `.as('authors'),

        categories: sql<string[]>`
        array_remove(array_agg(DISTINCT ${categoriesTable.name}), NULL)
      `.as('categories'),
      })
      .from(postsTable)
      .leftJoin(postsAuthorsTable, eq(postsTable.id, postsAuthorsTable.post_id))
      .leftJoin(authorTable, eq(postsAuthorsTable.author_id, authorTable.id))
      .leftJoin(userTable, eq(authorTable.author_id, userTable.id))
      .leftJoin(
        postsCategoriesTable,
        eq(postsTable.id, postsCategoriesTable.post_id),
      )
      .leftJoin(
        categoriesTable,
        eq(postsCategoriesTable.category_id, categoriesTable.id),
      )
      .where(and(...conditions))
      .groupBy(postsTable.id)
      .orderBy(orderDirection)
      .limit(limit)
      .offset(offset);

    return {
      data: posts,
      meta: {
        total: Number(count),
        page,
        limit,
        totalPages: Math.ceil(Number(count) / limit),
        isNext: offset + posts.length < Number(count),
        isPrev: page > 1,
      },
    };
  }

  getBlogContent(id: string) {
    const postsContent = this.db
      .select({
        content: postsTable.content,
      })
      .from(postsTable)
      .where(eq(postsTable.id, id));

    return postsContent;
  }

  async getBlogData(slug: string) {
    // Fetch main blog with full details

    const blogResult = await this.db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        slug: postsTable.slug,
        content: postsTable.content,
        feature_image_url: postsTable.feature_image_url,
        created_at: postsTable.created_at,
        excerpt: postsTable.excerpt,

        author_ids: sql<string[]>`
        array_remove(array_agg(DISTINCT ${authorTable.id}), NULL)
      `.as('author_ids'),

        authors: sql<string[]>`
        array_remove(array_agg(DISTINCT ${userTable.name}), NULL)
      `.as('authors'),

        category_ids: sql<string[]>`
        array_remove(array_agg(DISTINCT ${categoriesTable.id}), NULL)
      `.as('category_ids'),

        categories: sql<string[]>`
        array_remove(array_agg(DISTINCT ${categoriesTable.name}), NULL)
      `.as('categories'),
      })
      .from(postsTable)
      .leftJoin(postsAuthorsTable, eq(postsTable.id, postsAuthorsTable.post_id))
      .leftJoin(authorTable, eq(postsAuthorsTable.author_id, authorTable.id))
      .leftJoin(userTable, eq(authorTable.author_id, userTable.id))
      .leftJoin(
        postsCategoriesTable,
        eq(postsTable.id, postsCategoriesTable.post_id),
      )
      .leftJoin(
        categoriesTable,
        eq(postsCategoriesTable.category_id, categoriesTable.id),
      )
      .where(eq(postsTable.slug, slug))
      .groupBy(postsTable.id)
      .limit(1);

    if (!blogResult.length) return null;

    const blog = blogResult[0];

    if (!blog.category_ids?.length) {
      return {
        blog,
        relatedBlogs: [],
      };
    }

    // Fetch related blogs (only title + image + slug)
    const relatedBlogs = await this.db
      .select({
        title: postsTable.title,
        slug: postsTable.slug,
        feature_image_url: postsTable.feature_image_url,
      })
      .from(postsTable)
      .leftJoin(
        postsCategoriesTable,
        eq(postsTable.id, postsCategoriesTable.post_id),
      )
      .where(and(inArray(postsCategoriesTable.category_id, blog.category_ids)))
      .groupBy(postsTable.id)
      .orderBy(desc(postsTable.created_at))
      .limit(5);

    return {
      blog,
      relatedBlogs,
    };
  }

  async getLatestBlog() {
    const latestPost = await this.db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        slug: postsTable.slug,
        feature_image_url: postsTable.feature_image_url,
        created_at: postsTable.created_at,
        excerpt: postsTable.excerpt,

        authors: sql<string[]>`
        array_remove(array_agg(DISTINCT ${userTable.name}), NULL)
      `.as('authors'),

        categories: sql<string[]>`
        array_remove(array_agg(DISTINCT ${categoriesTable.name}), NULL)
      `.as('categories'),
      })
      .from(postsTable)

      .leftJoin(postsAuthorsTable, eq(postsTable.id, postsAuthorsTable.post_id))
      .leftJoin(authorTable, eq(postsAuthorsTable.author_id, authorTable.id))
      .leftJoin(userTable, eq(authorTable.author_id, userTable.id))

      .leftJoin(
        postsCategoriesTable,
        eq(postsTable.id, postsCategoriesTable.post_id),
      )
      .leftJoin(
        categoriesTable,
        eq(postsCategoriesTable.category_id, categoriesTable.id),
      )

      .where(eq(postsTable.status, 'Published'))

      .groupBy(postsTable.id)
      .orderBy(desc(postsTable.created_at))
      .limit(1);
    return latestPost[0] ?? null;
  }

  async getAllBlogsForSitemap() {
    return this.db
      .select({
        slug: postsTable.slug,
        updated_at: postsTable.updated_at,
      })
      .from(postsTable)
      .where(eq(postsTable.status, 'Published'))
      .orderBy(desc(postsTable.updated_at));
  }
}
