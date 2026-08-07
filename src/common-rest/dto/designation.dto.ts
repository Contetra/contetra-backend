import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateDesignationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;
}

export class GetDesignationsQueryDto {
  @IsOptional()
  @IsUUID()
  designationid?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  search?: string;
}

export class UpdateDesignationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name?: string;
}
