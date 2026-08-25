import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';

export class ReorderUsersDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  user_ids: string[];
}
