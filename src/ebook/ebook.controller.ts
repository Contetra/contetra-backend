import { Controller, Post, Body } from '@nestjs/common';
import { EbookService } from './ebook.service';
import {
  CreateEbookBiiin,
  CreateEbookBiiis,
  CreateEbookDecg,
  CreateEbookIetfnbs,
  CreateEbookIpgfcifr,
  CreateEbookMcanae,
  CreateEbookSbbg,
  CreateEbookTtqyfbpa,
  CreateEbookTyfftoa,
  CreateEbookUrgtcss,
  CreateEbookYeccfbo,
  CreateEbookBgc,
  CreateEbookEiu,
  CreateEbookRdtwc,
  CreateEbookHtoycacgag,
  CreateEbookEastipate,
  CreateEbookTcgtcecstsobe,
  CreateEbookBiirr,
  CreateEbookPcc,
  CreateEbookRruasioam,
  CreateEbookYfpfe,
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

  @Post('urgtcss')
  @Public()
  @CaptchaProtected()
  urgtcss(@Body() createEbookUrgtcss: CreateEbookUrgtcss) {
    return this.ebookService.urgtcss(createEbookUrgtcss);
  }

  @Post('biiin')
  @Public()
  @CaptchaProtected()
  biiin(@Body() createEbookBiiin: CreateEbookBiiin) {
    return this.ebookService.biiin(createEbookBiiin);
  }

  @Post('mcanae')
  @Public()
  @CaptchaProtected()
  mcanae(@Body() createEbookMcanae: CreateEbookMcanae) {
    return this.ebookService.mcanae(createEbookMcanae);
  }

  @Post('yeccfbo')
  @Public()
  @CaptchaProtected()
  yeccfbo(@Body() createEbookYeccfbo: CreateEbookYeccfbo) {
    return this.ebookService.yeccfbo(createEbookYeccfbo);
  }

  @Post('bgc')
  @Public()
  @CaptchaProtected()
  bgc(@Body() createEbookBgc: CreateEbookBgc) {
    return this.ebookService.bgc(createEbookBgc);
  }

  @Post('eiu')
  @Public()
  @CaptchaProtected()
  eiu(@Body() createEbookEiu: CreateEbookEiu) {
    return this.ebookService.eiu(createEbookEiu);
  }

  @Post('rdtwc')
  @Public()
  @CaptchaProtected()
  rdtwc(@Body() createEbookRdtwc: CreateEbookRdtwc) {
    return this.ebookService.rdtwc(createEbookRdtwc);
  }

  @Post('htoycacgag')
  @Public()
  @CaptchaProtected()
  htoycacgag(@Body() createEbookHtoycacgag: CreateEbookHtoycacgag) {
    return this.ebookService.htoycacgag(createEbookHtoycacgag);
  }

  @Post('eastipate')
  @Public()
  @CaptchaProtected()
  eastipate(@Body() createEbookEastipate: CreateEbookEastipate) {
    return this.ebookService.eastipate(createEbookEastipate);
  }

  @Post('tcgtcecstsobe')
  @Public()
  @CaptchaProtected()
  tcgtcecstsobe(@Body() createEbookTcgtcecstsobe: CreateEbookTcgtcecstsobe) {
    return this.ebookService.tcgtcecstsobe(createEbookTcgtcecstsobe);
  }

  @Post('biirr')
  @Public()
  @CaptchaProtected()
  biirr(@Body() createEbookBiirr: CreateEbookBiirr) {
    return this.ebookService.biirr(createEbookBiirr);
  }

  @Post('pcc')
  @Public()
  @CaptchaProtected()
  pcc(@Body() createEbookPcc: CreateEbookPcc) {
    return this.ebookService.pcc(createEbookPcc);
  }

  @Post('rruasioam')
  @Public()
  @CaptchaProtected()
  rruasioam(@Body() createEbookRruasioam: CreateEbookRruasioam) {
    return this.ebookService.rruasioam(createEbookRruasioam);
  }

  @Post('yfpfe')
  @Public()
  @CaptchaProtected()
  yfpfe(@Body() createEbookYfpfe: CreateEbookYfpfe) {
    return this.ebookService.yfpfe(createEbookYfpfe);
  }
}
