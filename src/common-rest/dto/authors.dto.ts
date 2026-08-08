import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class GetAuthorsQueryDto {
  @IsOptional()
  @IsUUID()
  authorid?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  search?: string;
}
