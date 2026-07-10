import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  form_name!: string;

  @IsUUID()
  @IsNotEmpty()
  form_type_id!: string;
}

export class GetFormsQueryDto {
  @IsOptional()
  @IsUUID()
  formid?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  search?: string;
}

export class UpdateFormDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  form_name?: string;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  form_type_id?: string;
}
