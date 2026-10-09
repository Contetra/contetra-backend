import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreatePolicyBindingDto {
  @IsUUID()
  @IsNotEmpty()
  policy_id!: string;

  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsOptional()
  @IsUUID()
  role_id?: string;
}
