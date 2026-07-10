import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
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

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/multer/multer.options';
import { CreateKycDto } from 'src/ebook/dto/create-ebook.dto';
import { CreateAutomationServiceDto } from './dto/create-automation-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post('kyc')
  @Public()
  @CaptchaProtected()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'pan_upload', maxCount: 5 },
        { name: 'gst_upload', maxCount: 5 },
        { name: 'signed_nda', maxCount: 5 },
        { name: 'signed_engagement_letter', maxCount: 5 },
      ],
      multerOptions,
    ),
  )
  kyc(
    @Body()
    createKycDto: CreateKycDto,

    @UploadedFiles()
    files: {
      pan_upload?: Express.Multer.File[];
      gst_upload?: Express.Multer.File[];
      signed_nda?: Express.Multer.File[];
      signed_engagement_letter?: Express.Multer.File[];
    },
  ) {
    return this.servicesService.kyc(createKycDto, files);
  }

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

  @Post('automation')
  @Public()
  @CaptchaProtected()
  automation(@Body() createAutomationServiceDto: CreateAutomationServiceDto) {
    return this.servicesService.automation(createAutomationServiceDto);
  }
}
