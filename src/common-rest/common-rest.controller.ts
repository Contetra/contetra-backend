import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommonRestService } from './common-rest.service';
import {
  CreateAuthors,
  CreateCategories,
  CreateContactCtac,
  CreateContactUs,
} from './dto/create-common-rest.dto';
import { Public } from 'src/common/decorators/public.decorator';
import {
  CreateFormDto,
  GetFormsQueryDto,
  UpdateFormDto,
} from './dto/forms.dto';
import {
  CreateFormTypeDto,
  GetFormTypesQueryDto,
  UpdateFormTypeDto,
} from './dto/form-types.dto';

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

  @Get('get-forms')
  @Public()
  async getForms(@Query() query: GetFormsQueryDto) {
    return this.commonRestService.getForms(query);
  }

  @Post('post-forms')
  async createForm(@Body() createFormDto: CreateFormDto) {
    return this.commonRestService.createForm(createFormDto);
  }

  @Patch('update-forms/:id')
  async updateForm(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFormDto: UpdateFormDto,
  ) {
    return this.commonRestService.updateForm(id, updateFormDto);
  }

  @Delete('delete-forms/:id')
  async deleteForm(@Param('id', ParseUUIDPipe) id: string) {
    return this.commonRestService.deleteForm(id);
  }

  @Get('get-form-types')
  @Public()
  async getFormTypes(@Query() query: GetFormTypesQueryDto) {
    return this.commonRestService.getFormTypes(query);
  }

  @Post('post-form-types')
  async createFormType(@Body() createFormTypeDto: CreateFormTypeDto) {
    return this.commonRestService.createFormType(createFormTypeDto);
  }

  @Patch('update-form-types/:id')
  async updateFormType(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFormTypeDto: UpdateFormTypeDto,
  ) {
    return this.commonRestService.updateFormType(id, updateFormTypeDto);
  }

  @Delete('delete-form-types/:id')
  async deleteFormType(@Param('id', ParseUUIDPipe) id: string) {
    return this.commonRestService.deleteFormType(id);
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
