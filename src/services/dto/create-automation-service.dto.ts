import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAutomationServiceDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  work_email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  company!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  department!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  process_to_automate!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  tools_involved!: string;

  @IsUUID()
  @IsNotEmpty()
  form_id!: string;
}
