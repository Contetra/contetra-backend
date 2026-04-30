import { Inject, Injectable } from '@nestjs/common';
import {
  CreateEbookBiiis,
  CreateEbookDecg,
  CreateEbookIetfnbs,
  CreateEbookIpgfcifr,
  CreateEbookTtqyfbpa,
  CreateEbookTyfftoa,
  CreateEbookSbbg,
} from './dto/create-ebook.dto';
import { DRIZZLE } from 'src/common/drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { formSubmissionsTable } from 'src/common/drizzle/schema';
import { EMAIL_RECIPIENTS } from 'src/email/email-recipients';
import { EmailService } from 'src/email/email.service';
import { EmailTemplateService } from 'src/email/email-template.service';
import { eq } from 'drizzle-orm';
import { BunnyService } from 'src/common/bunny/bunny.service';

@Injectable()
export class EbookService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase,
    private readonly emailService: EmailService,
    private readonly templateService: EmailTemplateService,
    private readonly bunnyService: BunnyService,
  ) {}

  async biiis(createEbookBiiis: CreateEbookBiiis) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        'ebooks/Business-Insights-into-IFRS-16.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: 'business-insights-into-ifrs-16',
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookBiiis.full_name,
            mobile_number: createEbookBiiis.mobile_number,
            email: createEbookBiiis.email,
            company: createEbookBiiis.company,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('common_ebook_template', {
        full_name: createEbookBiiis.full_name,
        mobile_number: createEbookBiiis.mobile_number,
        email: createEbookBiiis.email,
        company: createEbookBiiis.company,
        ebook_name: 'Ebook - Business insights into ifrs 16',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'Ebook - Business insights into ifrs 16',
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

  async ipgfcifr(createEbookIpgfcifr: CreateEbookIpgfcifr) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        'ebooks/Interview-Prep-Guide-for-Careers-in-Financial-Reporting.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: 'interview-prep-guide-for-careers-in-financial-reporting',
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookIpgfcifr.full_name,
            mobile_number: createEbookIpgfcifr.mobile_number,
            email: createEbookIpgfcifr.email,
            company: createEbookIpgfcifr.company,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('common_ebook_template', {
        full_name: createEbookIpgfcifr.full_name,
        mobile_number: createEbookIpgfcifr.mobile_number,
        email: createEbookIpgfcifr.email,
        company: createEbookIpgfcifr.company,
        ebook_name:
          'Ebook - interview prep guide for careers in financial reporting',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject:
            'Ebook - interview prep guide for careers in financial reporting',
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

  async ietfnbs(createEbookIetfnbs: CreateEbookIetfnbs) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        'ebooks/ECL-Model-Simplified-Approach-IFRS-9.xlsx',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: 'implementable-ecl-template-for-non-bfsi-sector',
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookIetfnbs.full_name,
            mobile_number: createEbookIetfnbs.mobile_number,
            email: createEbookIetfnbs.email,
            company: createEbookIetfnbs.company,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('common_ebook_template', {
        full_name: createEbookIetfnbs.full_name,
        mobile_number: createEbookIetfnbs.mobile_number,
        email: createEbookIetfnbs.email,
        company: createEbookIetfnbs.company,
        ebook_name: 'Ebook - implementable ecl template for non bfsi sector',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'Ebook - implementable ecl template for non bfsi sector',
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

  async ttqyfbpa(createEbookTtqyfbpa: CreateEbookTtqyfbpa) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        'ebooks/Top-20-Questions-your-FY-2025-26-Business-Plan-must-answer.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: 'top-20-questions-your-fy-22-23-business-plan-must-answer',
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookTtqyfbpa.full_name,
            mobile_number: createEbookTtqyfbpa.mobile_number,
            email: createEbookTtqyfbpa.email,
            company: createEbookTtqyfbpa.company,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('common_ebook_template', {
        full_name: createEbookTtqyfbpa.full_name,
        mobile_number: createEbookTtqyfbpa.mobile_number,
        email: createEbookTtqyfbpa.email,
        company: createEbookTtqyfbpa.company,
        ebook_name:
          'Ebook - top 20 questions your fy 22-23 business plan must answer',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject:
            'Ebook - top 20 questions your fy 22-23 business plan must answer',
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

  async tyfftoa(createEbookTyfftoa: CreateEbookTyfftoa) {
    try {
      const linkSender = this.bunnyService.generateSignedUrl(
        '/ebooks/TURBOCHARGE-YOUR-FINANCE-FUNCTION-THROUGH-OFFSHORE-ACCOUNTING.pdf',
        1800,
      );

      const linkReciever = this.bunnyService.generateSignedUrl(
        '/ebooks/TURBOCHARGE-YOUR-FINANCE-FUNCTION-THROUGH-OFFSHORE-ACCOUNTING.pdf',
        86400,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id:
            'turbocharge-your-finance-function-through-offshore-accounting',
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookTyfftoa.full_name,
            mobile_number: createEbookTyfftoa.mobile_number,
            email: createEbookTyfftoa.email,
            company: createEbookTyfftoa.company,
            city: createEbookTyfftoa.city,
            designation: createEbookTyfftoa.designation,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const htmlSender = this.templateService.render(
        'tyfftoa_email_1_template',
        {
          full_name: createEbookTyfftoa.full_name,
          mobile_number: createEbookTyfftoa.mobile_number,
          email: createEbookTyfftoa.email,
          company: createEbookTyfftoa.company,
          city: createEbookTyfftoa.city,
          designation: createEbookTyfftoa.designation,
          ebook_name:
            'Ebook - turbocharge-your-finance-function-through-offshore-accounting',
        },
      );

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject:
            'Ebook - turbocharge your finance function through offshore accounting',
          html: htmlSender,
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

      const htmlReciever = this.templateService.render(
        'tyfftoa_email_2_template',
        {
          full_name: createEbookTyfftoa.full_name,
          ebook_link: linkReciever,
        },
      );

      void this.emailService
        .sendEmail({
          to: [createEbookTyfftoa.email],
          subject:
            'Ebook - turbocharge your finance function through offshore accounting',
          html: htmlReciever,
        })
        .catch((err) => {
          console.error('ACTUAL EMAIL ERROR:', err);
        });

      return {
        message: 'Message sent successfully!',
        link: linkSender,
      };
    } catch (error) {
      console.error('Insert failed:', error);
      throw error;
    }
  }

  // Maximise Profitability, Choose the right ERP
  async decg(createEbookDecg: CreateEbookDecg) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/Maximise-profitability-choose-the-right-ERP.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: 'maximize-profitability-choose-the-right-erp',
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookDecg.full_name,
            mobile_number: createEbookDecg.mobile_number,
            email: createEbookDecg.email,
            company: createEbookDecg.company,
            designation: createEbookDecg.designation,
            annual_turnover: createEbookDecg.annual_turnover,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('decg_service_template', {
        full_name: createEbookDecg.full_name,
        mobile_number: createEbookDecg.mobile_number,
        email: createEbookDecg.email,
        company: createEbookDecg.company,
        designation: createEbookDecg.designation,
        annual_turnover: createEbookDecg.annual_turnover,
        service_name: 'Ebook - Maximize profitability choose the right erp',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'Ebook - Maximize profitability choose the right erp',
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

  // strategic-business-budget-guide
  async sbbg(createEbookSbbg: CreateEbookSbbg) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/Contetras-Budgeting-Guide-for-Business-Owners.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: 'strategic-business-budget-guide',
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookSbbg.full_name,
            mobile_number: createEbookSbbg.mobile_number,
            email: createEbookSbbg.email,
            company: createEbookSbbg.company,
            designation: createEbookSbbg.designation,
            business_industry: createEbookSbbg.business_industry,
            annual_turnover: createEbookSbbg.annual_turnover,
            currency: createEbookSbbg.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbbg_service_template', {
        full_name: createEbookSbbg.full_name,
        mobile_number: createEbookSbbg.mobile_number,
        email: createEbookSbbg.email,
        company: createEbookSbbg.company,
        designation: createEbookSbbg.designation,
        business_industry: createEbookSbbg.business_industry,
        annual_turnover: createEbookSbbg.annual_turnover,
        currency: createEbookSbbg.currency,
        service_name: 'Ebook - Strategic business budget guide',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'Ebook - Strategic business budget guide',
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
