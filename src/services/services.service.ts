import { Inject, Injectable } from '@nestjs/common';
import {
  CreateServiceDtoTaigasOne,
  CreateServiceDtoTaigasTwo,
} from './dto/create-service.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { EmailService } from 'src/email/email.service';
import { EmailTemplateService } from 'src/email/email-template.service';
import { BunnyService } from 'src/common/bunny/bunny.service';
import { DRIZZLE } from 'src/common/drizzle/drizzle.module';
import { emails } from 'src/common/drizzle/schema';
import { EMAIL_RECIPIENTS } from 'src/email/email-recipients';
import { eq } from 'drizzle-orm';

@Injectable()
export class ServicesService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase,
    private readonly emailService: EmailService,
    private readonly templateService: EmailTemplateService,
    private readonly bunnyService: BunnyService,
  ) {}

  async taigasOne(createServiceDtoTaigasOne: CreateServiceDtoTaigasOne) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/services/Financial%20Reporting%20Bundle.zip',
        1800,
      );

      const [inserted] = await this.db
        .insert(emails)
        .values({
          type: 'technical-accounting-international-gaap-advisory-services',
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            first_name: createServiceDtoTaigasOne.first_name,
            last_name: createServiceDtoTaigasOne.last_name,
            mobile_number: createServiceDtoTaigasOne.phone_number,
            email: createServiceDtoTaigasOne.email,
            company: createServiceDtoTaigasOne.company,
            designation: createServiceDtoTaigasOne.designation,
          },
        })
        .returning({ id: emails.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('taigas_service_template_one', {
        first_name: createServiceDtoTaigasOne.first_name,
        last_name: createServiceDtoTaigasOne.last_name,
        mobile_number: createServiceDtoTaigasOne.phone_number,
        email: createServiceDtoTaigasOne.email,
        company: createServiceDtoTaigasOne.company,
        designation: createServiceDtoTaigasOne.designation,
        service_name:
          'Technical Accounting International GAAP Advisory Services',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'Technical Accounting International GAAP Advisory Services',
          html,
        })
        .then(async () => {
          await this.db
            .update(emails)
            .set({ email_sent: true })
            .where(eq(emails.id, id));
        })
        .catch((err) => {
          console.error('ACTUAL EMAIL ERROR:', err);
        });

      return {
        message: 'Message sent successfully!',
        link,
      };
    } catch (error) {
      console.error('Insert failed:', error);
      throw error;
    }
  }

  async taigasTwo(createServiceDtoTaigasTwo: CreateServiceDtoTaigasTwo) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/services/Financial%20Reporting%20Bundle.zip',
        1800,
      );

      const [inserted] = await this.db
        .insert(emails)
        .values({
          type: 'technical-accounting-international-gaap-advisory-services',
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createServiceDtoTaigasTwo.full_name,
            mobile_number: createServiceDtoTaigasTwo.phone_number,
            email: createServiceDtoTaigasTwo.email,
            company: createServiceDtoTaigasTwo.company,
            service: createServiceDtoTaigasTwo.service,
          },
        })
        .returning({ id: emails.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('taigas_service_template_two', {
        full_name: createServiceDtoTaigasTwo.full_name,
        mobile_number: createServiceDtoTaigasTwo.phone_number,
        email: createServiceDtoTaigasTwo.email,
        company: createServiceDtoTaigasTwo.company,
        service: createServiceDtoTaigasTwo.service,
        service_name:
          'Technical Accounting International GAAP Advisory Services',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'Technical Accounting International GAAP Advisory Services',
          html,
        })
        .then(async () => {
          await this.db
            .update(emails)
            .set({ email_sent: true })
            .where(eq(emails.id, id));
        })
        .catch((err) => {
          console.error('ACTUAL EMAIL ERROR:', err);
        });

      return {
        message: 'Message sent successfully!',
        link,
      };
    } catch (error) {
      console.error('Insert failed:', error);
      throw error;
    }
  }
}
