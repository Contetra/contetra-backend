import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CommonRestService } from './common-rest.service';
import {
  CreateAuthors,
  CreateCategories,
  CreateContactCtac,
  CreateContactUs,
} from './dto/create-common-rest.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('common-rest')
export class CommonRestController {
  constructor(private readonly commonRestService: CommonRestService) {}

  @Post('create-category')
  async createCategory(@Body() createCategories: CreateCategories) {
    return this.commonRestService.createCategory(createCategories);
  }

  @Post('create-author')
  async createAuthor(@Body() createAuthors: CreateAuthors) {
    return this.commonRestService.createAuthor(createAuthors);
  }

  @Get('categories')
  @Public()
  async getAllCategories() {
    return this.commonRestService.getAllCategories();
  }

  @Get('authors')
  @Public()
  async getAllAuthors() {
    return this.commonRestService.getAllAuthors();
  }

  @Get('forms')
  @Public()
  async getForms(@Query('formid') formid?: string) {
    return await this.commonRestService.getForms(formid);
  }

  @Post('contact-us')
  @Public()
  async contactUs(@Body() createContactUs: CreateContactUs) {
    return this.commonRestService.contactUs(createContactUs);
  }

  @Post('contact-ctac')
  @Public()
  async contactCtac(@Body() createContactCtac: CreateContactCtac) {
    return this.commonRestService.contactCtac(createContactCtac);
  }
}
