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

@Controller('rbac')
export class RbacController {
  constructor(private readonly rbacService: RbacService) {}

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
