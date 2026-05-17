import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class UpdatePostDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

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
}
