import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export const CATEGORY_STATUSES = ['Draft', 'Published'] as const;
export type CategoryStatus = (typeof CATEGORY_STATUSES)[number];

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  slug!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsIn(CATEGORY_STATUSES)
  status?: CategoryStatus;
}

export class GetCategoriesQueryDto {
  @IsOptional()
  @IsUUID()
  categoryid?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  search?: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  slug?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsIn(CATEGORY_STATUSES)
  status?: CategoryStatus;
}
