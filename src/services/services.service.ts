import { Inject, Injectable } from '@nestjs/common';
import {
  CreateServiceDtoCtOne,
  CreateServiceDtoEisOne,
  CreateServiceDtoEisTwo,
  CreateServiceDtoFrcOne,
  CreateServiceDtoIr,
  CreateServiceDtoOas,
  CreateServiceDtoOasTwo,
  CreateServiceDtoSbfms,
  CreateServiceDtoSt,
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

  async eisTwo(createServiceDtoEisTwo: CreateServiceDtoEisTwo) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/services/ERP-Brochure.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createServiceDtoEisTwo.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            name: createServiceDtoEisTwo.name,
            work_email: createServiceDtoEisTwo.work_email,
            company: createServiceDtoEisTwo.company,
            phone_number: createServiceDtoEisTwo.phone_number,
            accounting_system: createServiceDtoEisTwo.accounting_system,
            help_topic: createServiceDtoEisTwo.help_topic,
            turnover: createServiceDtoEisTwo.turnover,
            currency: createServiceDtoEisTwo.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('eis_service_template_two', {
        name: createServiceDtoEisTwo.name,
        work_email: createServiceDtoEisTwo.work_email,
        company: createServiceDtoEisTwo.company,
        phone_number: createServiceDtoEisTwo.phone_number,
        accounting_system: createServiceDtoEisTwo.accounting_system,
        help_topic: createServiceDtoEisTwo.help_topic,
        turnover: createServiceDtoEisTwo.turnover,
        currency: createServiceDtoEisTwo.currency,
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

  async st(createServiceDtoSt: CreateServiceDtoSt) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/services/Client-Name-Strike-off-Companies-Report-2.xlsx',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createServiceDtoSt.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            name: createServiceDtoSt.name,
            work_email: createServiceDtoSt.work_email,
            phone_number: createServiceDtoSt.phone_number,
            company_name: createServiceDtoSt.company_name,
            designation: createServiceDtoSt.designation,
            state: createServiceDtoSt.state,
            city: createServiceDtoSt.city,
            hear_about: createServiceDtoSt.hear_about,
            list_items: createServiceDtoSt.list_items,
            message: createServiceDtoSt.message,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('st_service_template', {
        name: createServiceDtoSt.name,
        work_email: createServiceDtoSt.work_email,
        phone_number: createServiceDtoSt.phone_number,
        company_name: createServiceDtoSt.company_name,
        designation: createServiceDtoSt.designation,
        state: createServiceDtoSt.state,
        city: createServiceDtoSt.city,
        hear_about: createServiceDtoSt.hear_about,
        list_items: createServiceDtoSt.list_items,
        message: createServiceDtoSt.message,
        service_name: 'Strike That',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'Strike That',
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

  async oasOne(createServiceDtoOas: CreateServiceDtoOas) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/services/Offshore-Accounting-Material.zip',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createServiceDtoOas.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            first_name: createServiceDtoOas.first_name,
            last_name: createServiceDtoOas.last_name,
            work_email: createServiceDtoOas.work_email,
            phone_number: createServiceDtoOas.phone_number,
            company: createServiceDtoOas.company,
            designation: createServiceDtoOas.designation,
            city: createServiceDtoOas.city,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('oas_service_template', {
        first_name: createServiceDtoOas.first_name,
        last_name: createServiceDtoOas.last_name,
        work_email: createServiceDtoOas.work_email,
        phone_number: createServiceDtoOas.phone_number,
        company: createServiceDtoOas.company,
        designation: createServiceDtoOas.designation,
        city: createServiceDtoOas.city,
        service_name: 'Offshore Accounting Services',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'Offshore Accounting Services',
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

  async oasTwo(createServiceDtoOasTwo: CreateServiceDtoOasTwo) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/services/Offshore-Accounting-Material.zip',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createServiceDtoOasTwo.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            name: createServiceDtoOasTwo.name,
            company: createServiceDtoOasTwo.company,
            help_with: createServiceDtoOasTwo.help_with,
            phone_number: createServiceDtoOasTwo.phone_number,
            email: createServiceDtoOasTwo.email,
            designation: createServiceDtoOasTwo.designation,
            city: createServiceDtoOasTwo.city,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('oas_service_template_two', {
        name: createServiceDtoOasTwo.name,
        company: createServiceDtoOasTwo.company,
        help_with: createServiceDtoOasTwo.help_with,
        phone_number: createServiceDtoOasTwo.phone_number,
        email: createServiceDtoOasTwo.email,
        designation: createServiceDtoOasTwo.designation,
        city: createServiceDtoOasTwo.city,
        service_name: 'Offshore Accounting Services',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'Offshore Accounting Services',
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

  async ctOne(createServiceDtoCtOne: CreateServiceDtoCtOne) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/services/Training-Lead-magnet.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createServiceDtoCtOne.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createServiceDtoCtOne.full_name,
            work_email: createServiceDtoCtOne.work_email,
            company: createServiceDtoCtOne.company,
            designation: createServiceDtoCtOne.designation,
            phone_number: createServiceDtoCtOne.phone_number,
            training_mode: createServiceDtoCtOne.training_mode,
            help_topic: createServiceDtoCtOne.help_topic,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('ct_service_template_one', {
        full_name: createServiceDtoCtOne.full_name,
        work_email: createServiceDtoCtOne.work_email,
        company: createServiceDtoCtOne.company,
        designation: createServiceDtoCtOne.designation,
        phone_number: createServiceDtoCtOne.phone_number,
        training_mode: createServiceDtoCtOne.training_mode,
        help_topic: createServiceDtoCtOne.help_topic,
        service_name: 'Contetra Training',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'Contetra Training',
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

  async ir(createServiceDtoIr: CreateServiceDtoIr) {
    try {
      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createServiceDtoIr.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            first_name: createServiceDtoIr.first_name,
            last_name: createServiceDtoIr.last_name,
            work_email: createServiceDtoIr.work_email,
            organization_name: createServiceDtoIr.organization_name,
            annual_revenue: createServiceDtoIr.annual_revenue,
            phone_number: createServiceDtoIr.phone_number,
            help_topic: createServiceDtoIr.help_topic,
            message: createServiceDtoIr.message,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('ir_service_template_one', {
        first_name: createServiceDtoIr.first_name,
        last_name: createServiceDtoIr.last_name,
        work_email: createServiceDtoIr.work_email,
        organization_name: createServiceDtoIr.organization_name,
        annual_revenue: createServiceDtoIr.annual_revenue,
        phone_number: createServiceDtoIr.phone_number,
        help_topic: createServiceDtoIr.help_topic,
        message: createServiceDtoIr.message,
        service_name: 'IPO Readiness',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'IPO Readiness',
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
      };
    } catch (error) {
      console.error('Insert failed:', error);
      throw error;
    }
  }

  async frcOne(createServiceDtoFrcOne: CreateServiceDtoFrcOne) {
    try {
      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createServiceDtoFrcOne.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            name: createServiceDtoFrcOne.name,
            work_email: createServiceDtoFrcOne.work_email,
            company: createServiceDtoFrcOne.company,
            designation: createServiceDtoFrcOne.designation,
            help_topic: createServiceDtoFrcOne.how_can_we_help,
            message: createServiceDtoFrcOne.finance_team_size,
            phone_number: createServiceDtoFrcOne.phone_number,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('frc_service_template_one', {
        name: createServiceDtoFrcOne.name,
        work_email: createServiceDtoFrcOne.work_email,
        company: createServiceDtoFrcOne.company,
        designation: createServiceDtoFrcOne.designation,
        help_topic: createServiceDtoFrcOne.how_can_we_help,
        finance_team_size: createServiceDtoFrcOne.finance_team_size,
        phone_number: createServiceDtoFrcOne.phone_number,
        service_name: 'Financial Reporting Consulting',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'Financial Reporting Consulting',
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
      };
    } catch (error) {
      console.error('Insert failed:', error);
      throw error;
    }
  }

  async sbfms(createServiceDtoSbfms: CreateServiceDtoSbfms) {
    try {
      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createServiceDtoSbfms.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            annual_turnover: createServiceDtoSbfms.annual_turnover,
            business_industry: createServiceDtoSbfms.business_industry,
            business_vision: createServiceDtoSbfms.business_vision,
            city: createServiceDtoSbfms.city,
            commitment: createServiceDtoSbfms.commitment,
            company_name: createServiceDtoSbfms.company_name,
            currency: createServiceDtoSbfms.currency,
            designation: createServiceDtoSbfms.designation,
            financial_comfort: createServiceDtoSbfms.financial_comfort,
            full_name: createServiceDtoSbfms.full_name,
            mentor_preference: createServiceDtoSbfms.mentor_preference,
            phone_number: createServiceDtoSbfms.phone_number,
            planning_process: createServiceDtoSbfms.planning_process,
            primary_reason: createServiceDtoSbfms.primary_reason,
            support_type: createServiceDtoSbfms.support_type,
            work_email: createServiceDtoSbfms.work_email,
            form_id: createServiceDtoSbfms.form_id,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbfms_service_template', {
        annual_turnover: createServiceDtoSbfms.annual_turnover,
        business_industry: createServiceDtoSbfms.business_industry,
        business_vision: createServiceDtoSbfms.business_vision,
        city: createServiceDtoSbfms.city,
        commitment: createServiceDtoSbfms.commitment,
        company_name: createServiceDtoSbfms.company_name,
        currency: createServiceDtoSbfms.currency,
        designation: createServiceDtoSbfms.designation,
        financial_comfort: createServiceDtoSbfms.financial_comfort,
        full_name: createServiceDtoSbfms.full_name,
        mentor_preference: createServiceDtoSbfms.mentor_preference,
        phone_number: createServiceDtoSbfms.phone_number,
        planning_process: createServiceDtoSbfms.planning_process,
        primary_reason: createServiceDtoSbfms.primary_reason,
        support_type: createServiceDtoSbfms.support_type,
        work_email: createServiceDtoSbfms.work_email,
        service_name: 'Strategic business financial management solutions',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'Strategic business financial management solutions',
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
      };
    } catch (error) {
      console.error('Insert failed:', error);
      throw error;
    }
  }
}
