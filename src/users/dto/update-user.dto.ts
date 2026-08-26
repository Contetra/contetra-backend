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

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  user_name?: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== null && value !== '')
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @IsStrongPassword()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsUUID()
  department_id?: string | null;

  @IsOptional()
  @IsUUID()
  designation_id?: string | null;

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
