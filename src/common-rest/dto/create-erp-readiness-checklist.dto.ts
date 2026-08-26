import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export const ERP_READINESS_TURNOVER_OPTIONS = [
  '<15 crores',
  '15-30 crores',
  '30-60 crores',
  '60-100 crores',
  '>100 crores',
] as const;

export class CreateErpReadinessChecklistDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  company_name: string;

  @IsIn(ERP_READINESS_TURNOVER_OPTIONS)
  turnover: string;

  @IsArray()
  @ArrayMaxSize(16)
  @IsString({ each: true })
  checked_items: string[];
}
