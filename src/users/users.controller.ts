import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReorderUsersDto } from './dto/reorder-users.dto';
import { DeleteUserPhotoDto } from './dto/delete-user-photo.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { profilePhotoMulterOptions } from 'src/common/multer/multer.options';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all-users')
  async findAll(@Query() query: GetUsersQueryDto) {
    return this.usersService.findAllUsers(query);
  }

  @Public()
  @Get('team')
  async findTeam() {
    return this.usersService.findTeam();
  }

  @Post('upload-photo')
  @UseInterceptors(FileInterceptor('image', profilePhotoMulterOptions))
  uploadPhoto(
    @UploadedFile() file?: Express.Multer.File,
    @Body('name') name?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }
    return this.usersService.uploadPhoto(file, name);
  }

  @Post('delete-photo')
  deletePhoto(@Body(ValidationPipe) dto: DeleteUserPhotoDto) {
    return this.usersService.deletePhoto(dto.url);
  }

  @Post('create-user')
  async createUser(@Body(ValidationPipe) dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Patch('reorder-users')
  async reorderUsers(@Body(ValidationPipe) dto: ReorderUsersDto) {
    return this.usersService.reorderUsers(dto);
  }

  @Patch('update-user/:id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) dto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, dto);
  }

  @Delete('delete-user/:id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
