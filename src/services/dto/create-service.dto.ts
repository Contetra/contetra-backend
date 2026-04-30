import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateServiceDto {}

export class CreateServiceDtoTaigasOne {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  last_name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  designation!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id!: string;
}

export class CreateServiceDtoTaigasTwo {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  full_name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  service!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id!: string;
}

export class CreateServiceDtoEisOne {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  work_email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  company!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  designation!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  industry!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  phone_number!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  accounting_system!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  help_topic!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  turnover!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  currency!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  form_id!: string;
}
