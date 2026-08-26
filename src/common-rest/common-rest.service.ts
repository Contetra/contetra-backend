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
import { CreateErpReadinessChecklistDto } from './dto/create-erp-readiness-checklist.dto';
import { DRIZZLE } from 'src/common/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  categoriesTable,
  departmentTable,
  designationTable,
  formsTable,
  formSubmissionsTable,
  formTypesTable,
  rolesTable,
  userDetailsTable,
  userRolesTable,
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
import {
  CreateDepartmentDto,
  GetDepartmentsQueryDto,
  UpdateDepartmentDto,
} from './dto/department.dto';
import {
  CreateDesignationDto,
  GetDesignationsQueryDto,
  UpdateDesignationDto,
} from './dto/designation.dto';
import { GetAuthorsQueryDto } from './dto/authors.dto';

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

  private async getAuthorRoleId(): Promise<string> {
    const [role] = await this.db
      .select({ id: rolesTable.id })
      .from(rolesTable)
      .where(eq(rolesTable.name, 'author'));

    if (!role) {
      throw new Error('Author role is not configured');
    }

    return role.id;
  }

  async createAuthor(createAuthors: CreateAuthors) {
    try {
      const authorRoleId = await this.getAuthorRoleId();

      const exists = await this.db
        .select({ user_id: userRolesTable.user_id })
        .from(userRolesTable)
        .where(
          and(
            eq(userRolesTable.user_id, createAuthors.author_id),
            eq(userRolesTable.role_id, authorRoleId),
          ),
        );

      if (exists.length > 0) {
        throw new ConflictException('User is already an author');
      }

      await this.db.insert(userRolesTable).values({
        user_id: createAuthors.author_id,
        role_id: authorRoleId,
      });

      return { message: 'Author created successfully' };
    } catch (error: unknown) {
      console.error('Error inserting author:', error);
      throw error;
    }
  }

  async getAuthorsList(query: GetAuthorsQueryDto) {
    try {
      const search = query.search?.trim();
      const authorRoleId = await this.getAuthorRoleId();

      const authors = await this.db
        .select({
          user_id: userRolesTable.user_id,
          name: userTable.name,
          email: userTable.email,
        })
        .from(userRolesTable)
        .innerJoin(userTable, eq(userRolesTable.user_id, userTable.id))
        .where(
          and(
            eq(userRolesTable.role_id, authorRoleId),
            query.authorid
              ? eq(userRolesTable.user_id, query.authorid)
              : undefined,
            search
              ? or(
                  ilike(userTable.name, `%${search}%`),
                  ilike(userTable.email, `%${search}%`),
                )
              : undefined,
          ),
        );

      return authors;
    } catch (error: unknown) {
      console.error('Error fetching authors:', error);
      throw error;
    }
  }

  async deleteAuthor(id: string) {
    try {
      const authorRoleId = await this.getAuthorRoleId();

      const [deletedAuthor] = await this.db
        .delete(userRolesTable)
        .where(
          and(
            eq(userRolesTable.user_id, id),
            eq(userRolesTable.role_id, authorRoleId),
          ),
        )
        .returning({ user_id: userRolesTable.user_id });

      if (!deletedAuthor) {
        throw new NotFoundException('Author not found');
      }

      return { message: 'Author deleted successfully' };
    } catch (error: unknown) {
      console.error('Error deleting author:', error);
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
    const authorRoleId = await this.getAuthorRoleId();

    const authors = await this.db
      .select({
        author_id: userRolesTable.user_id,
        name: userTable.name,
      })
      .from(userRolesTable)
      .innerJoin(userTable, eq(userRolesTable.user_id, userTable.id))
      .where(eq(userRolesTable.role_id, authorRoleId));
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

  async getDepartments(query: GetDepartmentsQueryDto) {
    try {
      const departments = await this.db
        .select({
          id: departmentTable.id,
          name: departmentTable.name,
          created_at: departmentTable.created_at,
          updated_at: departmentTable.updated_at,
        })
        .from(departmentTable)
        .where(
          and(
            query.departmentid
              ? eq(departmentTable.id, query.departmentid)
              : undefined,
            query.search
              ? ilike(departmentTable.name, `%${query.search}%`)
              : undefined,
          ),
        );

      return departments;
    } catch (error: unknown) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  }

  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    try {
      const exists = await this.db
        .select({ id: departmentTable.id })
        .from(departmentTable)
        .where(eq(departmentTable.name, createDepartmentDto.name));

      if (exists.length > 0) {
        throw new ConflictException('Department name already exists');
      }

      const [department] = await this.db
        .insert(departmentTable)
        .values({ name: createDepartmentDto.name })
        .returning();

      if (!department) {
        throw new Error('Department creation failed');
      }

      return department;
    } catch (error: unknown) {
      console.error('Error creating department:', error);
      throw error;
    }
  }

  async updateDepartment(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      if (updateDepartmentDto.name === undefined) {
        throw new BadRequestException('At least one field must be provided');
      }

      const [department] = await this.db
        .update(departmentTable)
        .set({
          name: updateDepartmentDto.name,
          updated_at: new Date(),
        })
        .where(eq(departmentTable.id, id))
        .returning();

      if (!department) {
        throw new NotFoundException('Department not found');
      }

      return department;
    } catch (error: unknown) {
      console.error('Error updating department:', error);
      throw error;
    }
  }

  async deleteDepartment(id: string) {
    try {
      return await this.db.transaction(async (tx) => {
        const assignedUsers = await tx
          .select({ id: userDetailsTable.id })
          .from(userDetailsTable)
          .where(eq(userDetailsTable.department_id, id));

        if (assignedUsers.length > 0) {
          throw new ConflictException(
            'Cannot delete a department assigned to users',
          );
        }

        const [deletedDepartment] = await tx
          .delete(departmentTable)
          .where(eq(departmentTable.id, id))
          .returning({ id: departmentTable.id });

        if (!deletedDepartment) {
          throw new NotFoundException('Department not found');
        }

        return { message: 'Department deleted successfully' };
      });
    } catch (error: unknown) {
      console.error('Error deleting department:', error);
      throw error;
    }
  }

  async getDesignations(query: GetDesignationsQueryDto) {
    try {
      const designations = await this.db
        .select({
          id: designationTable.id,
          name: designationTable.name,
          created_at: designationTable.created_at,
          updated_at: designationTable.updated_at,
        })
        .from(designationTable)
        .where(
          and(
            query.designationid
              ? eq(designationTable.id, query.designationid)
              : undefined,
            query.search
              ? ilike(designationTable.name, `%${query.search}%`)
              : undefined,
          ),
        );

      return designations;
    } catch (error: unknown) {
      console.error('Error fetching designations:', error);
      throw error;
    }
  }

  async createDesignation(createDesignationDto: CreateDesignationDto) {
    try {
      const exists = await this.db
        .select({ id: designationTable.id })
        .from(designationTable)
        .where(eq(designationTable.name, createDesignationDto.name));

      if (exists.length > 0) {
        throw new ConflictException('Designation name already exists');
      }

      const [designation] = await this.db
        .insert(designationTable)
        .values({ name: createDesignationDto.name })
        .returning();

      if (!designation) {
        throw new Error('Designation creation failed');
      }

      return designation;
    } catch (error: unknown) {
      console.error('Error creating designation:', error);
      throw error;
    }
  }

  async updateDesignation(
    id: string,
    updateDesignationDto: UpdateDesignationDto,
  ) {
    try {
      if (updateDesignationDto.name === undefined) {
        throw new BadRequestException('At least one field must be provided');
      }

      const [designation] = await this.db
        .update(designationTable)
        .set({
          name: updateDesignationDto.name,
          updated_at: new Date(),
        })
        .where(eq(designationTable.id, id))
        .returning();

      if (!designation) {
        throw new NotFoundException('Designation not found');
      }

      return designation;
    } catch (error: unknown) {
      console.error('Error updating designation:', error);
      throw error;
    }
  }

  async deleteDesignation(id: string) {
    try {
      return await this.db.transaction(async (tx) => {
        const assignedUsers = await tx
          .select({ id: userDetailsTable.id })
          .from(userDetailsTable)
          .where(eq(userDetailsTable.designation_id, id));

        if (assignedUsers.length > 0) {
          throw new ConflictException(
            'Cannot delete a designation assigned to users',
          );
        }

        const [deletedDesignation] = await tx
          .delete(designationTable)
          .where(eq(designationTable.id, id))
          .returning({ id: designationTable.id });

        if (!deletedDesignation) {
          throw new NotFoundException('Designation not found');
        }

        return { message: 'Designation deleted successfully' };
      });
    } catch (error: unknown) {
      console.error('Error deleting designation:', error);
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

  erpReadinessChecklist(dto: CreateErpReadinessChecklistDto) {
    const score = dto.checked_items.length;

    const html = this.templateService.render(
      'erp_readiness_checklist_template',
      {
        company_name: dto.company_name,
        turnover: dto.turnover,
        score,
        total: 16,
        checked_items: dto.checked_items,
      },
    );

    void this.emailService
      .sendEmail({
        to: EMAIL_RECIPIENTS.READINESS,
        subject: `ERP Readiness Checklist — ${dto.company_name} (Score ${score}/16)`,
        html,
      })
      .catch((err) => {
        console.error('ACTUAL EMAIL ERROR:', err);
      });

    return { message: 'Submitted successfully', score };
  }
}
