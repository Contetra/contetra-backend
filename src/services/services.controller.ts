import { Controller, Post, Body } from '@nestjs/common';
import { ServicesService } from './services.service';
import {
  CreateServiceDtoTaigasOne,
  CreateServiceDtoTaigasTwo,
  CreateServiceDtoEisOne,
  CreateServiceDtoEisTwo,
  CreateServiceDtoSt,
  CreateServiceDtoOas,
  CreateServiceDtoOasTwo,
  CreateServiceDtoCtOne,
  CreateServiceDtoIr,
  CreateServiceDtoFrcOne,
  CreateServiceDtoSbfms,
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

  @Post('eisTwo')
  @Public()
  @CaptchaProtected()
  eisTwo(@Body() createServiceDtoEisTwo: CreateServiceDtoEisTwo) {
    return this.servicesService.eisTwo(createServiceDtoEisTwo);
  }

  @Post('st')
  @Public()
  @CaptchaProtected()
  st(@Body() createServiceDtoSt: CreateServiceDtoSt) {
    return this.servicesService.st(createServiceDtoSt);
  }

  @Post('oasOne')
  @Public()
  @CaptchaProtected()
  oasOne(@Body() createServiceDtoOas: CreateServiceDtoOas) {
    return this.servicesService.oasOne(createServiceDtoOas);
  }

  @Post('oasTwo')
  @Public()
  @CaptchaProtected()
  oasTwo(@Body() createServiceDtoOasTwo: CreateServiceDtoOasTwo) {
    return this.servicesService.oasTwo(createServiceDtoOasTwo);
  }

  @Post('ctOne')
  @Public()
  @CaptchaProtected()
  ctOne(@Body() createServiceDtoCtOne: CreateServiceDtoCtOne) {
    return this.servicesService.ctOne(createServiceDtoCtOne);
  }

  @Post('ir')
  @Public()
  @CaptchaProtected()
  ir(@Body() createServiceDtoIr: CreateServiceDtoIr) {
    return this.servicesService.ir(createServiceDtoIr);
  }

  @Post('frcOne')
  @Public()
  @CaptchaProtected()
  frcOne(@Body() createServiceDtoFrcOne: CreateServiceDtoFrcOne) {
    return this.servicesService.frcOne(createServiceDtoFrcOne);
  }

  @Post('sbfms')
  @Public()
  @CaptchaProtected()
  sbfms(@Body() createServiceDtoSbfms: CreateServiceDtoSbfms) {
    return this.servicesService.sbfms(createServiceDtoSbfms);
  }
}
