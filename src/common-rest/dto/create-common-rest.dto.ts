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
export class CreateContactUs {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  work_email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  designation: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  message: string;

  @IsUUID()
  @IsNotEmpty()
  form_id: string;
}
