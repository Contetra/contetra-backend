import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsUUID,
  IsDate,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  slug!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  excerpt!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  content!: string;

  @IsUUID()
  @IsNotEmpty()
  author_id!: string;

  @IsUUID()
  @IsNotEmpty()
  category_id!: string;

  @IsString()
  @IsNotEmpty()
  feature_image_url!: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  created_at!: Date;
}
