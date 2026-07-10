import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateFormTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;
}

export class GetFormTypesQueryDto {
  @IsOptional()
  @IsUUID()
  formtypeid?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  search?: string;
}

export class UpdateFormTypeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name?: string;
}
