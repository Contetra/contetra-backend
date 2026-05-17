import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { EmailService } from './email.service';
import { GetFormSubmissionsQueryDto } from './dto/get-form-submissions.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('form-submissions-list')
  getFormSubmissions(
    @Query(ValidationPipe)
    getFormSubmissionsQueryDto: GetFormSubmissionsQueryDto,
  ) {
    return this.emailService.getFormSubmissions(getFormSubmissionsQueryDto);
  }
}
