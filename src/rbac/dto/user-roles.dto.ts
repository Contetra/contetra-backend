import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateUserRoleDto {
  @IsUUID()
  @IsNotEmpty()
  user_id!: string;

  @IsUUID()
  @IsNotEmpty()
  role_id!: string;
}

export class GetUserRolesQueryDto {
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsOptional()
  @IsUUID()
  role_id?: string;
}
