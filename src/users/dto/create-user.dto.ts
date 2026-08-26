import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  user_name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsStrongPassword()
  password?: string;

  @IsOptional()
  @IsUUID()
  department_id?: string;

  @IsOptional()
  @IsUUID()
  designation_id?: string;

  @IsOptional()
  @IsBoolean()
  show_on_website?: boolean;

  @IsOptional()
  @ValidateIf((_, value) => value !== null && value !== '')
  @Matches(/^\//, {
    message: 'Profile picture path must start with /',
  })
  @MaxLength(255)
  profile_picture_url?: string | null;
}
