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
  policiesTable,
  policyBindingsTable,
} from 'src/common/drizzle/schema';
import { and, eq, ilike } from 'drizzle-orm';
import {
  CreateRoleDto,
  GetRolesQueryDto,
  UpdateRoleDto,
} from './dto/roles.dto';
import { CreateUserRoleDto, GetUserRolesQueryDto } from './dto/user-roles.dto';
import { CreatePolicyBindingDto } from './dto/policy-bindings.dto';
import { PolicyService } from './policy.service';
import { ALL_ADMIN_RESOURCE_TYPES } from './admin-tabs.constants';

@Injectable()
export class RbacService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase,
    private readonly policyService: PolicyService,
  ) {}

  async getMyPermissions(userId: string) {
    return this.policyService.canMany(userId, 'view', [
      ...ALL_ADMIN_RESOURCE_TYPES,
    ]);
  }

  async getPolicies() {
    try {
      return await this.db.select().from(policiesTable);
    } catch (error: unknown) {
      console.error('Error fetching policies:', error);
      throw error;
    }
  }

  async getPolicyBindings() {
    try {
      return await this.db
        .select({
          id: policyBindingsTable.id,
          policy_id: policyBindingsTable.policy_id,
          policy_name: policiesTable.name,
          action: policiesTable.action,
          resource_type: policiesTable.resource_type,
          effect: policiesTable.effect,
          user_id: policyBindingsTable.user_id,
          user_email: userTable.email,
          role_id: policyBindingsTable.role_id,
          role_name: rolesTable.name,
        })
        .from(policyBindingsTable)
        .innerJoin(
          policiesTable,
          eq(policyBindingsTable.policy_id, policiesTable.id),
        )
        .leftJoin(userTable, eq(policyBindingsTable.user_id, userTable.id))
        .leftJoin(rolesTable, eq(policyBindingsTable.role_id, rolesTable.id));
    } catch (error: unknown) {
      console.error('Error fetching policy bindings:', error);
      throw error;
    }
  }

  async createPolicyBinding(dto: CreatePolicyBindingDto) {
    try {
      if (!dto.user_id && !dto.role_id) {
        throw new BadRequestException(
          'Provide either a user_id or a role_id to grant this permission to.',
        );
      }

      const [binding] = await this.db
        .insert(policyBindingsTable)
        .values({
          policy_id: dto.policy_id,
          user_id: dto.user_id,
          role_id: dto.role_id,
        })
        .returning();

      if (!binding) {
        throw new Error('Policy binding creation failed');
      }

      return binding;
    } catch (error: unknown) {
      console.error('Error creating policy binding:', error);
      throw error;
    }
  }

  async deletePolicyBinding(id: string) {
    try {
      const [deleted] = await this.db
        .delete(policyBindingsTable)
        .where(eq(policyBindingsTable.id, id))
        .returning({ id: policyBindingsTable.id });

      if (!deleted) {
        throw new NotFoundException('Policy binding not found');
      }

      return { message: 'Policy binding removed successfully' };
    } catch (error: unknown) {
      console.error('Error deleting policy binding:', error);
      throw error;
    }
  }

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
