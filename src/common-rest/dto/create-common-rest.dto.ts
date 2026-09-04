import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateAuthors {
  @IsUUID()
  @IsNotEmpty()
  author_id: string;
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

export class CreateContactCtac {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  city: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  training_for_multiple_members: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  training_interests: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  work_email: string;

  @IsUUID()
  @IsNotEmpty()
  form_id: string;
}
