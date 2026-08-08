import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DRIZZLE } from 'src/common/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  rolesTable,
  userRolesTable,
  userTable,
} from 'src/common/drizzle/schema';
import { and, eq, ilike } from 'drizzle-orm';
import {
  CreateRoleDto,
  GetRolesQueryDto,
  UpdateRoleDto,
} from './dto/roles.dto';
import { CreateUserRoleDto, GetUserRolesQueryDto } from './dto/user-roles.dto';

@Injectable()
export class RbacService {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase) {}

  async getRoles(query: GetRolesQueryDto) {
    try {
      const roles = await this.db
        .select({
          id: rolesTable.id,
          name: rolesTable.name,
          description: rolesTable.description,
        })
        .from(rolesTable)
        .where(
          and(
            query.roleid ? eq(rolesTable.id, query.roleid) : undefined,
            query.search
              ? ilike(rolesTable.name, `%${query.search}%`)
              : undefined,
          ),
        );

      return roles;
    } catch (error: unknown) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  }

  async createRole(createRoleDto: CreateRoleDto) {
    try {
      const exists = await this.db
        .select({ id: rolesTable.id })
        .from(rolesTable)
        .where(eq(rolesTable.name, createRoleDto.name));

      if (exists.length > 0) {
        throw new ConflictException('Role name already exists');
      }

      const [role] = await this.db
        .insert(rolesTable)
        .values({
          name: createRoleDto.name,
          description: createRoleDto.description,
        })
        .returning();

      if (!role) {
        throw new Error('Role creation failed');
      }

      return role;
    } catch (error: unknown) {
      console.error('Error creating role:', error);
      throw error;
    }
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      if (
        updateRoleDto.name === undefined &&
        updateRoleDto.description === undefined
      ) {
        throw new BadRequestException('At least one field must be provided');
      }

      const [role] = await this.db
        .update(rolesTable)
        .set({
          ...(updateRoleDto.name !== undefined && {
            name: updateRoleDto.name,
          }),
          ...(updateRoleDto.description !== undefined && {
            description: updateRoleDto.description,
          }),
        })
        .where(eq(rolesTable.id, id))
        .returning();

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      return role;
    } catch (error: unknown) {
      console.error('Error updating role:', error);
      throw error;
    }
  }

  async deleteRole(id: string) {
    try {
      return await this.db.transaction(async (tx) => {
        const assignedUsers = await tx
          .select({ user_id: userRolesTable.user_id })
          .from(userRolesTable)
          .where(eq(userRolesTable.role_id, id));

        if (assignedUsers.length > 0) {
          throw new ConflictException('Cannot delete a role assigned to users');
        }

        const [deletedRole] = await tx
          .delete(rolesTable)
          .where(eq(rolesTable.id, id))
          .returning({ id: rolesTable.id });

        if (!deletedRole) {
          throw new NotFoundException('Role not found');
        }

        return { message: 'Role deleted successfully' };
      });
    } catch (error: unknown) {
      console.error('Error deleting role:', error);
      throw error;
    }
  }

  async getUserRoles(query: GetUserRolesQueryDto) {
    try {
      const userRoles = await this.db
        .select({
          user_id: userRolesTable.user_id,
          role_id: userRolesTable.role_id,
          user_name: userTable.name,
          user_email: userTable.email,
          role_name: rolesTable.name,
          role_description: rolesTable.description,
        })
        .from(userRolesTable)
        .innerJoin(userTable, eq(userRolesTable.user_id, userTable.id))
        .innerJoin(rolesTable, eq(userRolesTable.role_id, rolesTable.id))
        .where(
          and(
            query.user_id
              ? eq(userRolesTable.user_id, query.user_id)
              : undefined,
            query.role_id
              ? eq(userRolesTable.role_id, query.role_id)
              : undefined,
          ),
        );

      return userRoles;
    } catch (error: unknown) {
      console.error('Error fetching user roles:', error);
      throw error;
    }
  }

  async createUserRole(createUserRoleDto: CreateUserRoleDto) {
    try {
      const exists = await this.db
        .select({ user_id: userRolesTable.user_id })
        .from(userRolesTable)
        .where(
          and(
            eq(userRolesTable.user_id, createUserRoleDto.user_id),
            eq(userRolesTable.role_id, createUserRoleDto.role_id),
          ),
        );

      if (exists.length > 0) {
        throw new ConflictException('User already has this role');
      }

      const [userRole] = await this.db
        .insert(userRolesTable)
        .values({
          user_id: createUserRoleDto.user_id,
          role_id: createUserRoleDto.role_id,
        })
        .returning();

      if (!userRole) {
        throw new Error('User role assignment failed');
      }

      return userRole;
    } catch (error: unknown) {
      console.error('Error creating user role:', error);
      throw error;
    }
  }

  async deleteUserRole(userId: string, roleId: string) {
    try {
      const [deletedUserRole] = await this.db
        .delete(userRolesTable)
        .where(
          and(
            eq(userRolesTable.user_id, userId),
            eq(userRolesTable.role_id, roleId),
          ),
        )
        .returning({
          user_id: userRolesTable.user_id,
          role_id: userRolesTable.role_id,
        });

      if (!deletedUserRole) {
        throw new NotFoundException('User role assignment not found');
      }

      return { message: 'User role removed successfully' };
    } catch (error: unknown) {
      console.error('Error deleting user role:', error);
      throw error;
    }
  }
}
