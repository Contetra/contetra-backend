import {
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

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsUUID()
  department_id?: string;

  @IsNotEmpty()
  @IsUUID()
  designation_id: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== null && value !== '')
  @Matches(/^\//, {
    message: 'Profile picture path must start with /',
  })
  @MaxLength(255)
  profile_picture_url?: string | null;
}
