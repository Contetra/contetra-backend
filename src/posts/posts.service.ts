import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { DRIZZLE } from 'src/common/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  authorTable,
  categoriesTable,
  postMetaDataTable,
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
export type NewPostMetaData = typeof postMetaDataTable.$inferInsert;

const toNullableString = (value: unknown): string | null => {
  if (value === null || typeof value === 'string') return value;
  throw new BadRequestException('Metadata values must be strings or null');
};

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
    const {
      id,
      title,
      slug,
      content,
      feature_image_url,
      excerpt,
      status,
      author_id,
      category_id,
      created_at,
      meta_title,
      meta_description,
      meta_keywords,
      meta_og_title,
      meta_og_description,
    } = updatePostDto;

    const hasUpdates = [
      title,
      slug,
      content,
      feature_image_url,
      excerpt,
      status,
      author_id,
      category_id,
      created_at,
      meta_title,
      meta_description,
      meta_keywords,
      meta_og_title,
      meta_og_description,
    ].some((field) => field !== undefined);

    if (!hasUpdates) {
      throw new BadRequestException(
        'At least one field must be provided to update',
      );
    }

    const [existing] = await this.db
      .select({ id: postsTable.id })
      .from(postsTable)
      .where(eq(postsTable.id, id));

    if (!existing) {
      throw new NotFoundException('Post not found');
    }

    try {
      return await this.db.transaction(async (tx) => {
        const updateData: Partial<NewPost> = {
          updated_at: new Date(),
        };

        if (title !== undefined) updateData.title = title;
        if (slug !== undefined) updateData.slug = slug;
        if (content !== undefined) updateData.content = content;
        if (feature_image_url !== undefined) {
          updateData.feature_image_url = feature_image_url;
        }
        if (excerpt !== undefined) updateData.excerpt = excerpt;
        if (status !== undefined) updateData.status = status;
        if (created_at !== undefined) updateData.created_at = created_at;

        await tx
          .update(postsTable)
          .set(updateData)
          .where(eq(postsTable.id, id));

        if (author_id !== undefined) {
          await tx
            .delete(postsAuthorsTable)
            .where(eq(postsAuthorsTable.post_id, id));
          await tx.insert(postsAuthorsTable).values({
            post_id: id,
            author_id,
          });
        }

        if (category_id !== undefined) {
          await tx
            .delete(postsCategoriesTable)
            .where(eq(postsCategoriesTable.post_id, id));
          await tx.insert(postsCategoriesTable).values({
            post_id: id,
            category_id,
          });
        }

        const hasMetadataUpdates = [
          meta_title,
          meta_description,
          meta_keywords,
          meta_og_title,
          meta_og_description,
        ].some((field) => field !== undefined);

        if (hasMetadataUpdates) {
          const metadataUpdate = {
            updated_at: new Date(),
            ...(meta_title !== undefined && {
              title: toNullableString(meta_title),
            }),
            ...(meta_description !== undefined && {
              description: toNullableString(meta_description),
            }),
            ...(meta_keywords !== undefined && {
              keywords: toNullableString(meta_keywords),
            }),
            ...(meta_og_title !== undefined && {
              ogTitle: toNullableString(meta_og_title),
            }),
            ...(meta_og_description !== undefined && {
              ogDescription: toNullableString(meta_og_description),
            }),
          } satisfies Partial<NewPostMetaData>;

          const updatedMetadata = await tx
            .update(postMetaDataTable)
            .set(metadataUpdate)
            .where(eq(postMetaDataTable.post_id, id))
            .returning({ id: postMetaDataTable.id });

          if (!updatedMetadata.length) {
            await tx.insert(postMetaDataTable).values({
              post_id: id,
              ...metadataUpdate,
            });
          }
        }

        return {
          message: 'Post updated successfully',
          post_id: id,
        };
      });
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    }
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
        status: postsTable.status,

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
        meta_title: postMetaDataTable.title,
        meta_description: postMetaDataTable.description,
        meta_keywords: postMetaDataTable.keywords,
        og_title: postMetaDataTable.ogTitle,
        og_description: postMetaDataTable.ogDescription,

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
      .leftJoin(postMetaDataTable, eq(postsTable.id, postMetaDataTable.post_id))
      .where(eq(postsTable.slug, slug))
      .groupBy(postsTable.id, postMetaDataTable.id)
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
