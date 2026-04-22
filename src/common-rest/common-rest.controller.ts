import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommonRestService } from './common-rest.service';
import { CreateAuthors, CreateCategories } from './dto/create-common-rest.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('common-rest')
export class CommonRestController {
  constructor(private readonly commonRestService: CommonRestService) {}

  @Post('create-category')
  createCategory(@Body() createCategories: CreateCategories) {
    return this.commonRestService.createCategory(createCategories);
  }

  @Post('create-author')
  createAuthor(@Body() createAuthors: CreateAuthors) {
    return this.commonRestService.createAuthor(createAuthors);
  }

  @Get('categories')
  @Public()
  getAllCategories() {
    return this.commonRestService.getAllCategories();
  }

  @Get('authors')
  @Public()
  getAllAuthors() {
    return this.commonRestService.getAllAuthors();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commonRestService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commonRestService.remove(+id);
  }
}
