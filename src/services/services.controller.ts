import { Controller, Post, Body } from '@nestjs/common';
import { ServicesService } from './services.service';
import {
  CreateServiceDtoTaigasOne,
  CreateServiceDtoTaigasTwo,
  CreateServiceDtoEisOne,
} from './dto/create-service.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { CaptchaProtected } from 'src/common/decorators/captcha-protected.decorator';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post('taigasOne')
  @Public()
  @CaptchaProtected()
  taigasOne(@Body() createServiceDtoTaigasOne: CreateServiceDtoTaigasOne) {
    return this.servicesService.taigasOne(createServiceDtoTaigasOne);
  }

  @Post('taigasTwo')
  @Public()
  @CaptchaProtected()
  taigasTwo(@Body() createServiceDtoTaigasTwo: CreateServiceDtoTaigasTwo) {
    return this.servicesService.taigasTwo(createServiceDtoTaigasTwo);
  }

  @Post('eisOne')
  @Public()
  @CaptchaProtected()
  eisOne(@Body() createServiceDtoEisOne: CreateServiceDtoEisOne) {
    return this.servicesService.eisOne(createServiceDtoEisOne);
  }
}
