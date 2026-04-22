import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

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
}
