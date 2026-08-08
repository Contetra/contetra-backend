import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DRIZZLE } from 'src/common/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  accessLogsTable,
  departmentTable,
  designationTable,
  eBooksTable,
  pageTable,
  policyBindingsTable,
  postsAuthorsTable,
  postsTable,
  userAttributesTable,
  userDetailsTable,
  userRolesTable,
  userTable,
} from 'src/common/drizzle/schema';
import { and, desc, eq, ilike, ne, or } from 'drizzle-orm';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

type NewUser = typeof userTable.$inferInsert;
type NewUserDetails = typeof userDetailsTable.$inferInsert;

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase) {}

  async findAllUsers(query: GetUsersQueryDto) {
    const search = query.search?.trim();

    const users = await this.db
      .select({
        id: userTable.id,
        name: userTable.name,
        user_name: userTable.user_name,
        email: userTable.email,
        department: departmentTable.name,
        department_id: departmentTable.id,
        designation: designationTable.name,
        designation_id: designationTable.id,
        profile_picture_url: userTable.profile_picture_url,
        two_fa_status: userTable.two_fa_status,
        last_login: userTable.last_login,
        created_at: userTable.created_at,
        updated_at: userTable.updated_at,
      })
      .from(userTable)
      .leftJoin(userDetailsTable, eq(userDetailsTable.user_id, userTable.id))
      .leftJoin(
        departmentTable,
        eq(departmentTable.id, userDetailsTable.department_id),
      )
      .leftJoin(
        designationTable,
        eq(designationTable.id, userDetailsTable.designation_id),
      )
      .where(
        search
          ? or(
              ilike(userTable.name, `%${search}%`),
              ilike(userTable.user_name, `%${search}%`),
              ilike(userTable.email, `%${search}%`),
            )
          : undefined,
      )
      .orderBy(desc(userTable.created_at));

    return users;
  }

  async createUser(dto: CreateUserDto) {
    const exists = await this.db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.email, dto.email));
    if (exists.length > 0) throw new ConflictException('Email already exists');

    const existsUserName = await this.db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.user_name, dto.user_name));
    if (existsUserName.length > 0)
      throw new ConflictException('Username already exists');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    return this.db.transaction(async (tx) => {
      const [createdUser] = await tx
        .insert(userTable)
        .values({
          name: dto.name,
          user_name: dto.user_name,
          email: dto.email,
          password: hashedPassword,
        })
        .returning({ id: userTable.id });

      if (!createdUser) {
        throw new Error('User creation failed');
      }

      if (dto.department_id) {
        await tx.insert(userDetailsTable).values({
          user_id: createdUser.id,
          department_id: dto.department_id,
          ...(dto.designation_id ? { designation_id: dto.designation_id } : {}),
        });
      }

      return {
        message: 'User created successfully',
        user_id: createdUser.id,
      };
    });
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const [existing] = await this.db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.id, id));
    if (!existing) throw new NotFoundException('User not found');

    const hasUpdates = [
      dto.name,
      dto.user_name,
      dto.email,
      dto.password,
      dto.department_id,
      dto.designation_id,
    ].some((field) => field !== undefined);
    if (!hasUpdates) {
      throw new BadRequestException(
        'At least one field must be provided to update',
      );
    }

    if (dto.email !== undefined) {
      const [conflict] = await this.db
        .select({ id: userTable.id })
        .from(userTable)
        .where(and(eq(userTable.email, dto.email), ne(userTable.id, id)));
      if (conflict) throw new ConflictException('Email already exists');
    }

    if (dto.user_name !== undefined) {
      const [conflict] = await this.db
        .select({ id: userTable.id })
        .from(userTable)
        .where(
          and(eq(userTable.user_name, dto.user_name), ne(userTable.id, id)),
        );
      if (conflict) throw new ConflictException('Username already exists');
    }

    return this.db.transaction(async (tx) => {
      const updateData: Partial<NewUser> = { updated_at: new Date() };
      if (dto.name !== undefined) updateData.name = dto.name;
      if (dto.user_name !== undefined) updateData.user_name = dto.user_name;
      if (dto.email !== undefined) updateData.email = dto.email;
      if (dto.password !== undefined) {
        const salt = await bcrypt.genSalt();
        updateData.password = await bcrypt.hash(dto.password, salt);
      }

      await tx.update(userTable).set(updateData).where(eq(userTable.id, id));

      if (dto.department_id !== undefined || dto.designation_id !== undefined) {
        if (dto.department_id === null) {
          await tx
            .delete(userDetailsTable)
            .where(eq(userDetailsTable.user_id, id));
        } else {
          const [existingDetails] = await tx
            .select({
              id: userDetailsTable.id,
              department_id: userDetailsTable.department_id,
            })
            .from(userDetailsTable)
            .where(eq(userDetailsTable.user_id, id));

          const nextDepartmentId =
            dto.department_id ?? existingDetails?.department_id;
          if (!nextDepartmentId) {
            throw new BadRequestException(
              'Department must be set before assigning a designation',
            );
          }

          const detailsUpdate: Partial<NewUserDetails> = {
            updated_at: new Date(),
          };
          if (dto.department_id !== undefined) {
            detailsUpdate.department_id = dto.department_id;
          }
          if (dto.designation_id !== undefined) {
            detailsUpdate.designation_id = dto.designation_id;
          }

          if (existingDetails) {
            await tx
              .update(userDetailsTable)
              .set(detailsUpdate)
              .where(eq(userDetailsTable.user_id, id));
          } else {
            await tx.insert(userDetailsTable).values({
              user_id: id,
              department_id: nextDepartmentId,
              ...(dto.designation_id !== undefined
                ? { designation_id: dto.designation_id }
                : {}),
            });
          }
        }
      }

      return {
        message: 'User updated successfully',
        user_id: id,
      };
    });
  }

  async deleteUser(id: string) {
    const [existing] = await this.db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.id, id));
    if (!existing) throw new NotFoundException('User not found');

    return this.db.transaction(async (tx) => {
      const [hasPosts] = await tx
        .select({ id: postsTable.id })
        .from(postsTable)
        .where(eq(postsTable.created_by, id))
        .limit(1);
      if (hasPosts) {
        throw new ConflictException(
          'Cannot delete a user who has authored posts',
        );
      }

      const [hasPages] = await tx
        .select({ id: pageTable.id })
        .from(pageTable)
        .where(eq(pageTable.created_by, id))
        .limit(1);
      if (hasPages) {
        throw new ConflictException(
          'Cannot delete a user who has authored pages',
        );
      }

      const [hasEbooks] = await tx
        .select({ id: eBooksTable.id })
        .from(eBooksTable)
        .where(eq(eBooksTable.created_by, id))
        .limit(1);
      if (hasEbooks) {
        throw new ConflictException(
          'Cannot delete a user who has authored ebooks',
        );
      }

      const [hasAuthoredPosts] = await tx
        .select({ post_id: postsAuthorsTable.post_id })
        .from(postsAuthorsTable)
        .where(eq(postsAuthorsTable.author_id, id))
        .limit(1);
      if (hasAuthoredPosts) {
        throw new ConflictException(
          'Cannot delete a user who is credited as an author on a post',
        );
      }

      await tx.delete(userDetailsTable).where(eq(userDetailsTable.user_id, id));
      await tx.delete(userRolesTable).where(eq(userRolesTable.user_id, id));
      await tx
        .delete(userAttributesTable)
        .where(eq(userAttributesTable.user_id, id));
      await tx
        .update(policyBindingsTable)
        .set({ user_id: null })
        .where(eq(policyBindingsTable.user_id, id));
      await tx
        .update(accessLogsTable)
        .set({ user_id: null })
        .where(eq(accessLogsTable.user_id, id));

      const [deletedUser] = await tx
        .delete(userTable)
        .where(eq(userTable.id, id))
        .returning({ id: userTable.id });
      if (!deletedUser) throw new NotFoundException('User not found');

      return { message: 'User deleted successfully' };
    });
  }
}
