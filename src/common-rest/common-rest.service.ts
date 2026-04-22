import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateAuthors, CreateCategories } from './dto/create-common-rest.dto';
import { DRIZZLE } from 'src/common/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  authorTable,
  categoriesTable,
  userTable,
} from 'src/common/drizzle/schema';
import { eq, or } from 'drizzle-orm';

@Injectable()
export class CommonRestService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase) {}

  async createCategory(createCategories: CreateCategories) {
    const exists = await this.db
      .select()
      .from(categoriesTable)
      .where(
        or(
          eq(categoriesTable.slug, createCategories.slug),
          eq(categoriesTable.name, createCategories.name),
        ),
      );

    if (exists.length > 0) {
      throw new ConflictException('Name or Slug already exists');
    }

    const newCategory = {
      name: createCategories.name,
      slug: createCategories.slug,
      description: createCategories.description,
    };

    try {
      await this.db.insert(categoriesTable).values(newCategory);

      return { message: 'Category created successfully' };
    } catch (error) {
      console.error('Error inserting post:', error);
      throw error;
    }
  }

  async createAuthor(createAuthors: CreateAuthors) {
    const exists = await this.db
      .select()
      .from(authorTable)
      .where(or(eq(authorTable.author_id, createAuthors.author_id)));

    if (exists.length > 0) {
      throw new ConflictException('Name or Slug already exists');
    }

    const newAuthor = {
      role: createAuthors.role,
      author_id: createAuthors.author_id,
    };

    try {
      await this.db.insert(authorTable).values(newAuthor);

      return { message: 'Author created successfully' };
    } catch (error: unknown) {
      console.error('Error inserting post:', error);
      throw error;
    }
  }

  getAllCategories() {
    const categories = this.db
      .select({
        name: categoriesTable.name,
        category_id: categoriesTable.id,
      })
      .from(categoriesTable);
    return categories;
  }

  getAllAuthors() {
    const authors = this.db
      .select({
        author_id: authorTable.id,
        name: userTable.name,
      })
      .from(authorTable)
      .innerJoin(userTable, eq(authorTable.author_id, userTable.id));
    return authors;
  }

  findOne(id: number) {
    return `This action returns a #${id} commonRest`;
  }

  remove(id: number) {
    return `This action removes a #${id} commonRest`;
  }
}
