import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export const POST_STATUSES = ['Draft', 'Published'] as const;
export type PostStatus = (typeof POST_STATUSES)[number];

export class UpdatePostDto {
  @IsUUID()
  @IsNotEmpty()
  id!: string;

  @IsOptional()
  @IsUUID()
  author_id?: string;

  @IsOptional()
  @IsUUID()
  category_id?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  created_at?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  slug?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  excerpt?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  content?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  feature_image_url?: string;

  @IsOptional()
  @IsIn(POST_STATUSES)
  @IsString()
  @IsNotEmpty()
  status?: PostStatus;

  @IsOptional()
  @IsString()
  meta_title?: string | null;

  @IsOptional()
  @IsString()
  meta_description?: string | null;

  @IsOptional()
  @IsString()
  meta_keywords?: string | null;

  @IsOptional()
  @IsString()
  meta_og_title?: string | null;

  @IsOptional()
  @IsString()
  meta_og_description?: string | null;
}
