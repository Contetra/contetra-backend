import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateAuthors,
  CreateCategories,
  CreateContactCtac,
  CreateContactUs,
} from './dto/create-common-rest.dto';
import { DRIZZLE } from 'src/common/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  authorTable,
  categoriesTable,
  formsTable,
  formSubmissionsTable,
  formTypesTable,
  userTable,
} from 'src/common/drizzle/schema';
import { and, eq, ilike, inArray, or } from 'drizzle-orm';
import { EMAIL_RECIPIENTS } from 'src/email/email-recipients';
import { EmailService } from 'src/email/email.service';
import { EmailTemplateService } from 'src/email/email-template.service';
import {
  CreateFormDto,
  GetFormsQueryDto,
  UpdateFormDto,
} from './dto/forms.dto';
import {
  CreateFormTypeDto,
  GetFormTypesQueryDto,
  UpdateFormTypeDto,
} from './dto/form-types.dto';

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

  async getForms(query: GetFormsQueryDto) {
    try {
      const forms = await this.db
        .select({
          id: formsTable.id,
          form_name: formsTable.form_name,
          form_type_id: formsTable.form_type_id,
          created_at: formsTable.created_at,
          updated_at: formsTable.updated_at,
        })
        .from(formsTable)
        .where(
          and(
            query.formid ? eq(formsTable.id, query.formid) : undefined,
            query.search
              ? ilike(formsTable.form_name, `%${query.search}%`)
              : undefined,
          ),
        );

      return forms;
    } catch (error: unknown) {
      console.error('Error fetching forms:', error);
      throw error;
    }
  }

  async createForm(createFormDto: CreateFormDto) {
    try {
      const [form] = await this.db
        .insert(formsTable)
        .values({
          form_name: createFormDto.form_name,
          form_type_id: createFormDto.form_type_id,
        })
        .returning();

      if (!form) {
        throw new Error('Form creation failed');
      }

      return form;
    } catch (error: unknown) {
      console.error('Error creating form:', error);
      throw error;
    }
  }

  async updateForm(id: string, updateFormDto: UpdateFormDto) {
    try {
      if (
        updateFormDto.form_name === undefined &&
        updateFormDto.form_type_id === undefined
      ) {
        throw new BadRequestException('At least one field must be provided');
      }

      const [form] = await this.db
        .update(formsTable)
        .set({
          ...(updateFormDto.form_name !== undefined && {
            form_name: updateFormDto.form_name,
          }),
          ...(updateFormDto.form_type_id !== undefined && {
            form_type_id: updateFormDto.form_type_id,
          }),
          updated_at: new Date(),
        })
        .where(eq(formsTable.id, id))
        .returning();

      if (!form) {
        throw new NotFoundException('Form not found');
      }

      return form;
    } catch (error: unknown) {
      console.error('Error updating form:', error);
      throw error;
    }
  }

  async deleteForm(id: string) {
    try {
      return await this.db.transaction(async (tx) => {
        await tx
          .delete(formSubmissionsTable)
          .where(eq(formSubmissionsTable.form_id, id));

        const [deletedForm] = await tx
          .delete(formsTable)
          .where(eq(formsTable.id, id))
          .returning({ id: formsTable.id });

        if (!deletedForm) {
          throw new NotFoundException('Form not found');
        }

        return { message: 'Form deleted successfully' };
      });
    } catch (error: unknown) {
      console.error('Error deleting form:', error);
      throw error;
    }
  }

  async getFormTypes(query: GetFormTypesQueryDto) {
    try {
      const formTypes = await this.db
        .select({
          id: formTypesTable.id,
          name: formTypesTable.name,
          created_at: formTypesTable.created_at,
          updated_at: formTypesTable.updated_at,
        })
        .from(formTypesTable)
        .where(
          and(
            query.formtypeid
              ? eq(formTypesTable.id, query.formtypeid)
              : undefined,
            query.search
              ? ilike(formTypesTable.name, `%${query.search}%`)
              : undefined,
          ),
        );

      return formTypes;
    } catch (error: unknown) {
      console.error('Error fetching form types:', error);
      throw error;
    }
  }

  async createFormType(createFormTypeDto: CreateFormTypeDto) {
    try {
      const [formType] = await this.db
        .insert(formTypesTable)
        .values({ name: createFormTypeDto.name })
        .returning();

      if (!formType) {
        throw new Error('Form type creation failed');
      }

      return formType;
    } catch (error: unknown) {
      console.error('Error creating form type:', error);
      throw error;
    }
  }

  async updateFormType(id: string, updateFormTypeDto: UpdateFormTypeDto) {
    try {
      if (updateFormTypeDto.name === undefined) {
        throw new BadRequestException('At least one field must be provided');
      }

      const [formType] = await this.db
        .update(formTypesTable)
        .set({
          name: updateFormTypeDto.name,
          updated_at: new Date(),
        })
        .where(eq(formTypesTable.id, id))
        .returning();

      if (!formType) {
        throw new NotFoundException('Form type not found');
      }

      return formType;
    } catch (error: unknown) {
      console.error('Error updating form type:', error);
      throw error;
    }
  }

  async deleteFormType(id: string) {
    try {
      return await this.db.transaction(async (tx) => {
        const relatedForms = await tx
          .select({ id: formsTable.id })
          .from(formsTable)
          .where(eq(formsTable.form_type_id, id));

        if (relatedForms.length > 0) {
          await tx.delete(formSubmissionsTable).where(
            inArray(
              formSubmissionsTable.form_id,
              relatedForms.map((form) => form.id),
            ),
          );
        }

        await tx.delete(formsTable).where(eq(formsTable.form_type_id, id));

        const [deletedFormType] = await tx
          .delete(formTypesTable)
          .where(eq(formTypesTable.id, id))
          .returning({ id: formTypesTable.id });

        if (!deletedFormType) {
          throw new NotFoundException('Form type not found');
        }

        return { message: 'Form type deleted successfully' };
      });
    } catch (error: unknown) {
      console.error('Error deleting form type:', error);
      throw error;
    }
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

  async contactCtac(createContactCtac: CreateContactCtac) {
    try {
      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createContactCtac.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createContactCtac.full_name,
            company: createContactCtac.company,
            city: createContactCtac.city,
            training_for_multiple_members:
              createContactCtac.training_for_multiple_members,
            training_interests: createContactCtac.training_interests,
            phone_number: createContactCtac.phone_number,
            work_email: createContactCtac.work_email,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('contact_ctac_template', {
        full_name: createContactCtac.full_name,
        phone_number: createContactCtac.phone_number,
        work_email: createContactCtac.work_email,
        company: createContactCtac.company,
        city: createContactCtac.city,
        training_for_multiple_members:
          createContactCtac.training_for_multiple_members,
        training_interests: createContactCtac.training_interests,
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'corporate trainings at contetra',
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
