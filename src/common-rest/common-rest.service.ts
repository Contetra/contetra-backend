import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  CreateAuthors,
  CreateCategories,
  CreateContactUs,
} from './dto/create-common-rest.dto';
import { DRIZZLE } from 'src/common/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  authorTable,
  categoriesTable,
  formsTable,
  formSubmissionsTable,
  userTable,
} from 'src/common/drizzle/schema';
import { eq, or } from 'drizzle-orm';
import { EMAIL_RECIPIENTS } from 'src/email/email-recipients';
import { EmailService } from 'src/email/email.service';
import { EmailTemplateService } from 'src/email/email-template.service';

@Injectable()
export class CommonRestService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase,
    private readonly emailService: EmailService,
    private readonly templateService: EmailTemplateService,
  ) {}

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

  async getAllCategories() {
    const categories = await this.db
      .select({
        name: categoriesTable.name,
        category_id: categoriesTable.id,
      })
      .from(categoriesTable);
    return categories;
  }

  async getAllAuthors() {
    const authors = await this.db
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

  async getForms(formid?: string) {
    const forms = await this.db
      .select({
        id: formsTable.id,
        form_name: formsTable.form_name,
      })
      .from(formsTable)
      .where(formid ? eq(formsTable.id, formid) : undefined);
    return forms;
  }

  async contactUs(createContactUs: CreateContactUs) {
    try {
      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createContactUs.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            first_name: createContactUs.first_name,
            last_name: createContactUs.last_name,
            phone_number: createContactUs.phone_number,
            work_email: createContactUs.work_email,
            company: createContactUs.company,
            designation: createContactUs.designation,
            message: createContactUs.message,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('contact_us_template', {
        first_name: createContactUs.first_name,
        last_name: createContactUs.last_name,
        phone_number: createContactUs.phone_number,
        work_email: createContactUs.work_email,
        company: createContactUs.company,
        designation: createContactUs.designation,
        message: createContactUs.message,
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'Contact Us Form Submission',
          html,
        })
        .then(async () => {
          await this.db
            .update(formSubmissionsTable)
            .set({ email_sent: true })
            .where(eq(formSubmissionsTable.id, id));
        })
        .catch((err) => {
          console.error('ACTUAL EMAIL ERROR:', err);
        });

      return {
        message: 'Message sent successfully!',
      };
    } catch (error) {
      console.error('Insert failed:', error);
      throw error;
    }
  }
}
