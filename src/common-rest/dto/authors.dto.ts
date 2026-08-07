import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { AuthorRole } from './create-common-rest.dto';

export class GetAuthorsQueryDto {
  @IsOptional()
  @IsUUID()
  authorid?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  search?: string;
}

export class UpdateAuthorDto {
  @IsOptional()
  @IsEnum(AuthorRole)
  role?: AuthorRole;
}
