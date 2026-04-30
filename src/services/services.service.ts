import { Inject, Injectable } from '@nestjs/common';
import {
  CreateServiceDtoEisOne,
  CreateServiceDtoTaigasOne,
  CreateServiceDtoTaigasTwo,
} from './dto/create-service.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { EmailService } from 'src/email/email.service';
import { EmailTemplateService } from 'src/email/email-template.service';
import { BunnyService } from 'src/common/bunny/bunny.service';
import { DRIZZLE } from 'src/common/drizzle/drizzle.module';
import { formSubmissionsTable } from 'src/common/drizzle/schema';
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
        '/services/Financial Reporting Bundle.zip',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createServiceDtoTaigasOne.form_id,
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
        .returning({ id: formSubmissionsTable.id });

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
            .update(formSubmissionsTable)
            .set({ email_sent: true })
            .where(eq(formSubmissionsTable.id, id));
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
        '/services/Financial Reporting Bundle.zip',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createServiceDtoTaigasTwo.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createServiceDtoTaigasTwo.full_name,
            mobile_number: createServiceDtoTaigasTwo.phone_number,
            email: createServiceDtoTaigasTwo.email,
            company: createServiceDtoTaigasTwo.company,
            service: createServiceDtoTaigasTwo.service,
          },
        })
        .returning({ id: formSubmissionsTable.id });

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
            .update(formSubmissionsTable)
            .set({ email_sent: true })
            .where(eq(formSubmissionsTable.id, id));
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

  async eisOne(createServiceDtoEisOne: CreateServiceDtoEisOne) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/services/ERP-Brochure.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createServiceDtoEisOne.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            name: createServiceDtoEisOne.name,
            work_email: createServiceDtoEisOne.work_email,
            company: createServiceDtoEisOne.company,
            designation: createServiceDtoEisOne.designation,
            industry: createServiceDtoEisOne.industry,
            phone_number: createServiceDtoEisOne.phone_number,
            accounting_system: createServiceDtoEisOne.accounting_system,
            help_topic: createServiceDtoEisOne.help_topic,
            turnover: createServiceDtoEisOne.turnover,
            currency: createServiceDtoEisOne.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('eis_service_template_one', {
        name: createServiceDtoEisOne.name,
        work_email: createServiceDtoEisOne.work_email,
        company: createServiceDtoEisOne.company,
        designation: createServiceDtoEisOne.designation,
        industry: createServiceDtoEisOne.industry,
        phone_number: createServiceDtoEisOne.phone_number,
        accounting_system: createServiceDtoEisOne.accounting_system,
        help_topic: createServiceDtoEisOne.help_topic,
        turnover: createServiceDtoEisOne.turnover,
        currency: createServiceDtoEisOne.currency,
        service_name: 'ERP Implementation Solutions',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'ERP Implementation Solutions',
          html,
        })
        .then(async () => {
          await this.db
            .update(formSubmissionsTable)
            .set({ email_sent: true })
            .where(eq(formSubmissionsTable.id, id));
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

  async eisTwo(createServiceDtoEisOne: CreateServiceDtoEisOne) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/services/ERP-Brochure.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createServiceDtoEisOne.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            name: createServiceDtoEisOne.name,
            work_email: createServiceDtoEisOne.work_email,
            company: createServiceDtoEisOne.company,
            designation: createServiceDtoEisOne.designation,
            industry: createServiceDtoEisOne.industry,
            phone_number: createServiceDtoEisOne.phone_number,
            accounting_system: createServiceDtoEisOne.accounting_system,
            help_topic: createServiceDtoEisOne.help_topic,
            turnover: createServiceDtoEisOne.turnover,
            currency: createServiceDtoEisOne.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('eis_service_template_one', {
        name: createServiceDtoEisOne.name,
        work_email: createServiceDtoEisOne.work_email,
        company: createServiceDtoEisOne.company,
        designation: createServiceDtoEisOne.designation,
        industry: createServiceDtoEisOne.industry,
        phone_number: createServiceDtoEisOne.phone_number,
        accounting_system: createServiceDtoEisOne.accounting_system,
        help_topic: createServiceDtoEisOne.help_topic,
        turnover: createServiceDtoEisOne.turnover,
        currency: createServiceDtoEisOne.currency,
        service_name: 'ERP Implementation Solutions',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'ERP Implementation Solutions',
          html,
        })
        .then(async () => {
          await this.db
            .update(formSubmissionsTable)
            .set({ email_sent: true })
            .where(eq(formSubmissionsTable.id, id));
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
