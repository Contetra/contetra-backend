import { Controller, Post, Body } from '@nestjs/common';
import { EbookService } from './ebook.service';
import {
  CreateEbookBiiis,
  CreateEbookDecg,
  CreateEbookIetfnbs,
  CreateEbookIpgfcifr,
  CreateEbookSbbg,
  CreateEbookTtqyfbpa,
  CreateEbookTyfftoa,
} from './dto/create-ebook.dto';
import { CaptchaProtected } from 'src/common/decorators/captcha-protected.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('ebook')
export class EbookController {
  constructor(private readonly ebookService: EbookService) {}

  @Post('biiis')
  @Public()
  @CaptchaProtected()
  biiis(@Body() createEbookBiiis: CreateEbookBiiis) {
    return this.ebookService.biiis(createEbookBiiis);
  }

  @Post('ipgfcifr')
  @Public()
  @CaptchaProtected()
  ipgfcifr(@Body() createEbookIpgfcifr: CreateEbookIpgfcifr) {
    return this.ebookService.ipgfcifr(createEbookIpgfcifr);
  }

  @Post('ietfnbs')
  @Public()
  @CaptchaProtected()
  ietfnbs(@Body() createEbookIetfnbs: CreateEbookIetfnbs) {
    return this.ebookService.ietfnbs(createEbookIetfnbs);
  }

  @Post('ttqyfbpa')
  @Public()
  @CaptchaProtected()
  ttqyfbpa(@Body() createEbookTtqyfbpa: CreateEbookTtqyfbpa) {
    return this.ebookService.ttqyfbpa(createEbookTtqyfbpa);
  }

  @Post('tyfftoa')
  @Public()
  @CaptchaProtected()
  tyfftoa(@Body() createEbookTyfftoa: CreateEbookTyfftoa) {
    return this.ebookService.tyfftoa(createEbookTyfftoa);
  }

  // Maximise Profitability, Choose the right ERP
  @Post('decg')
  @Public()
  @CaptchaProtected()
  decg(@Body() createEbookDecg: CreateEbookDecg) {
    return this.ebookService.decg(createEbookDecg);
  }

  @Post('sbbg')
  @Public()
  @CaptchaProtected()
  sbbg(@Body() createEbookSbbg: CreateEbookSbbg) {
    return this.ebookService.sbbg(createEbookSbbg);
  }
}
