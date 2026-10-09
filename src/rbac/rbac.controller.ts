import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RbacService } from './rbac.service';
import {
  CreateRoleDto,
  GetRolesQueryDto,
  UpdateRoleDto,
} from './dto/roles.dto';
import { CreateUserRoleDto, GetUserRolesQueryDto } from './dto/user-roles.dto';
import { CreatePolicyBindingDto } from './dto/policy-bindings.dto';
import { CheckPolicy } from 'src/common/decorators/check-policy.decorator';
import { User } from 'src/common/decorators/user.decorator';

@Controller('rbac')
export class RbacController {
  constructor(private readonly rbacService: RbacService) {}

  @Get('my-permissions')
  async getMyPermissions(@User('userId') userId: string) {
    return this.rbacService.getMyPermissions(userId);
  }

  // Proof-of-concept route for PolicyGuard — not a real feature route.
  // See plan: real routes aren't gated this round (middlewareBaseQuery.ts
  // treats 403 as a logout trigger, which would need fixing first).
  @Get('_policy-guard-check')
  @CheckPolicy('edit', 'admin_tab:rbac')
  policyGuardCheck() {
    return { ok: true };
  }

  // Not @CheckPolicy-gated on purpose: this is how a logged-in admin grants
  // permissions in the first place, including recovering their own access,
  // so it can't require a permission to reach it.
  @Get('get-policies')
  async getPolicies() {
    return this.rbacService.getPolicies();
  }

  @Get('get-policy-bindings')
  async getPolicyBindings() {
    return this.rbacService.getPolicyBindings();
  }

  @Post('post-policy-bindings')
  async createPolicyBinding(@Body() dto: CreatePolicyBindingDto) {
    return this.rbacService.createPolicyBinding(dto);
  }

  @Delete('delete-policy-bindings/:id')
  async deletePolicyBinding(@Param('id', ParseUUIDPipe) id: string) {
    return this.rbacService.deletePolicyBinding(id);
  }

  @Get('get-roles')
  async getRoles(@Query() query: GetRolesQueryDto) {
    return this.rbacService.getRoles(query);
  }

  @Post('post-roles')
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rbacService.createRole(createRoleDto);
  }

  @Patch('update-roles/:id')
  async updateRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rbacService.updateRole(id, updateRoleDto);
  }

  @Delete('delete-roles/:id')
  async deleteRole(@Param('id', ParseUUIDPipe) id: string) {
    return this.rbacService.deleteRole(id);
  }

  @Get('get-user-roles')
  async getUserRoles(@Query() query: GetUserRolesQueryDto) {
    return this.rbacService.getUserRoles(query);
  }

  @Post('post-user-roles')
  async createUserRole(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.rbacService.createUserRole(createUserRoleDto);
  }

  @Delete('delete-user-roles/:userId/:roleId')
  async deleteUserRole(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('roleId', ParseUUIDPipe) roleId: string,
  ) {
    return this.rbacService.deleteUserRole(userId, roleId);
  }
}
