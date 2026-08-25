import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserPhotoDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}
