import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateCategories {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  slug: string;

  @IsString()
  description: string;
}

export enum AuthorRole {
  User = 'User',
  Author = 'Author',
}

export class CreateAuthors {
  @IsUUID()
  @IsNotEmpty()
  author_id: string;

  @IsEnum(AuthorRole)
  role: AuthorRole;
}
