import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DrizzleModule } from 'src/common/drizzle/drizzle.module';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { EmailTemplateService } from './email-template.service';

@Module({
  imports: [HttpModule, DrizzleModule],
  controllers: [EmailController],
  providers: [EmailService, EmailTemplateService],
  exports: [EmailService, EmailTemplateService],
})
export class EmailModule {}
