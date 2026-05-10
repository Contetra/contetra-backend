import { Inject, Injectable } from '@nestjs/common';
import {
  CreateEbookBiiis,
  CreateEbookDecg,
  CreateEbookIetfnbs,
  CreateEbookIpgfcifr,
  CreateEbookTtqyfbpa,
  CreateEbookTyfftoa,
  CreateEbookSbbg,
  CreateEbookUrgtcss,
  CreateEbookBiiin,
  CreateEbookMcanae,
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
          form_id: createEbookBiiis.form_id,
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
          form_id: createEbookIpgfcifr.form_id,
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
          form_id: createEbookIetfnbs.form_id,
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
          form_id: createEbookTtqyfbpa.form_id,
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
          form_id: createEbookTyfftoa.form_id,
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
          form_id: createEbookDecg.form_id,
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
          form_id: createEbookSbbg.form_id,
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

  async urgtcss(createEbookUrgtcss: CreateEbookUrgtcss) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/Unlocking-Revenue-Boost.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createEbookUrgtcss.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookUrgtcss.full_name,
            mobile_number: createEbookUrgtcss.mobile_number,
            email: createEbookUrgtcss.email,
            company: createEbookUrgtcss.company,
            designation: createEbookUrgtcss.designation,
            business_industry: createEbookUrgtcss.business_industry,
            annual_turnover: createEbookUrgtcss.annual_turnover,
            currency: createEbookUrgtcss.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbbg_service_template', {
        full_name: createEbookUrgtcss.full_name,
        mobile_number: createEbookUrgtcss.mobile_number,
        email: createEbookUrgtcss.email,
        company: createEbookUrgtcss.company,
        designation: createEbookUrgtcss.designation,
        business_industry: createEbookUrgtcss.business_industry,
        annual_turnover: createEbookUrgtcss.annual_turnover,
        currency: createEbookUrgtcss.currency,
        service_name:
          'Ebook - Unlocking 200% Revenue Growth : The CHHABI Success Story',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject:
            'Ebook - Unlocking 200% Revenue Growth : The CHHABI Success Story',
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

  async biiin(createEbookBiiin: CreateEbookBiiin) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/Business-Insights-IFRS-9.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createEbookBiiin.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookBiiin.full_name,
            mobile_number: createEbookBiiin.mobile_number,
            email: createEbookBiiin.email,
            company: createEbookBiiin.company,
            designation: createEbookBiiin.designation,
            business_industry: createEbookBiiin.business_industry,
            annual_turnover: createEbookBiiin.annual_turnover,
            currency: createEbookBiiin.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbbg_service_template', {
        full_name: createEbookBiiin.full_name,
        mobile_number: createEbookBiiin.mobile_number,
        email: createEbookBiiin.email,
        company: createEbookBiiin.company,
        designation: createEbookBiiin.designation,
        business_industry: createEbookBiiin.business_industry,
        annual_turnover: createEbookBiiin.annual_turnover,
        currency: createEbookBiiin.currency,
        service_name: 'Ebook - Business insights into ifrs 9',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: ' Ebook - Business insights into ifrs 9',
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

  async mcanae(createEbookMcanae: CreateEbookMcanae) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/Amendments-in-delayed-payment-to-MSME-vendor.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createEbookMcanae.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookMcanae.full_name,
            mobile_number: createEbookMcanae.mobile_number,
            email: createEbookMcanae.email,
            company: createEbookMcanae.company,
            designation: createEbookMcanae.designation,
            business_industry: createEbookMcanae.business_industry,
            annual_turnover: createEbookMcanae.annual_turnover,
            currency: createEbookMcanae.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbbg_service_template', {
        full_name: createEbookMcanae.full_name,
        mobile_number: createEbookMcanae.mobile_number,
        email: createEbookMcanae.email,
        company: createEbookMcanae.company,
        designation: createEbookMcanae.designation,
        business_industry: createEbookMcanae.business_industry,
        annual_turnover: createEbookMcanae.annual_turnover,
        currency: createEbookMcanae.currency,
        service_name:
          'Ebook - MSME Collection Advantage: New Amendment Explained',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject:
            ' Ebook - MSME Collection Advantage: New Amendment Explained',
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

  async yeccfbo(createEbookYeccfbo: CreateEbookYeccfbo) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/Financial-Year-End-Closing-Checklist-23-24-1.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createEbookYeccfbo.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookYeccfbo.full_name,
            mobile_number: createEbookYeccfbo.mobile_number,
            email: createEbookYeccfbo.email,
            company: createEbookYeccfbo.company,
            designation: createEbookYeccfbo.designation,
            business_industry: createEbookYeccfbo.business_industry,
            annual_turnover: createEbookYeccfbo.annual_turnover,
            currency: createEbookYeccfbo.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbbg_service_template', {
        full_name: createEbookYeccfbo.full_name,
        mobile_number: createEbookYeccfbo.mobile_number,
        email: createEbookYeccfbo.email,
        company: createEbookYeccfbo.company,
        designation: createEbookYeccfbo.designation,
        business_industry: createEbookYeccfbo.business_industry,
        annual_turnover: createEbookYeccfbo.annual_turnover,
        currency: createEbookYeccfbo.currency,
        service_name: 'Ebook - Year-end Closure Checklist for Business Owners',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: ' Ebook - Year-end Closure Checklist for Business Owners',
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

  async bgc(createEbookBgc: CreateEbookBgc) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/Business-growth-Compliance-New-Financial-Year-Key-Points.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createEbookBgc.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookBgc.full_name,
            mobile_number: createEbookBgc.mobile_number,
            email: createEbookBgc.email,
            company: createEbookBgc.company,
            designation: createEbookBgc.designation,
            business_industry: createEbookBgc.business_industry,
            annual_turnover: createEbookBgc.annual_turnover,
            currency: createEbookBgc.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbbg_service_template', {
        full_name: createEbookBgc.full_name,
        mobile_number: createEbookBgc.mobile_number,
        email: createEbookBgc.email,
        company: createEbookBgc.company,
        designation: createEbookBgc.designation,
        business_industry: createEbookBgc.business_industry,
        annual_turnover: createEbookBgc.annual_turnover,
        currency: createEbookBgc.currency,
        service_name: 'Ebook - Business Growth & Compliance',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: ' Ebook - Business Growth & Compliance',
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

  async eiu(createEbookEiu: CreateEbookEiu) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/ERP-Implementation-decoded.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createEbookEiu.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookEiu.full_name,
            mobile_number: createEbookEiu.mobile_number,
            email: createEbookEiu.email,
            company: createEbookEiu.company,
            designation: createEbookEiu.designation,
            business_industry: createEbookEiu.business_industry,
            annual_turnover: createEbookEiu.annual_turnover,
            currency: createEbookEiu.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbbg_service_template', {
        full_name: createEbookEiu.full_name,
        mobile_number: createEbookEiu.mobile_number,
        email: createEbookEiu.email,
        company: createEbookEiu.company,
        designation: createEbookEiu.designation,
        business_industry: createEbookEiu.business_industry,
        annual_turnover: createEbookEiu.annual_turnover,
        currency: createEbookEiu.currency,
        service_name: 'Ebook - ERP Implementation Unveiled',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: ' Ebook - ERP Implementation Unveiled',
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

  async rdtwc(createEbookRdtwc: CreateEbookRdtwc) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/ROI-Driven-Trainings-with-Contetra.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createEbookRdtwc.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookRdtwc.full_name,
            mobile_number: createEbookRdtwc.mobile_number,
            email: createEbookRdtwc.email,
            company: createEbookRdtwc.company,
            designation: createEbookRdtwc.designation,
            business_industry: createEbookRdtwc.business_industry,
            annual_turnover: createEbookRdtwc.annual_turnover,
            currency: createEbookRdtwc.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbbg_service_template', {
        full_name: createEbookRdtwc.full_name,
        mobile_number: createEbookRdtwc.mobile_number,
        email: createEbookRdtwc.email,
        company: createEbookRdtwc.company,
        designation: createEbookRdtwc.designation,
        business_industry: createEbookRdtwc.business_industry,
        annual_turnover: createEbookRdtwc.annual_turnover,
        currency: createEbookRdtwc.currency,
        service_name: 'Ebook - Roi-Driven Trainings With Contetra',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: ' Ebook - Roi-Driven Trainings With Contetra',
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

  async htoycacgag(createEbookHtoycacgag: CreateEbookHtoycacgag) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/How-to-optimise-your-customers-a-Comprehensive-Guide-to-Achieve-10X-Growth.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createEbookHtoycacgag.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookHtoycacgag.full_name,
            mobile_number: createEbookHtoycacgag.mobile_number,
            email: createEbookHtoycacgag.email,
            company: createEbookHtoycacgag.company,
            designation: createEbookHtoycacgag.designation,
            business_industry: createEbookHtoycacgag.business_industry,
            annual_turnover: createEbookHtoycacgag.annual_turnover,
            currency: createEbookHtoycacgag.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbbg_service_template', {
        full_name: createEbookHtoycacgag.full_name,
        mobile_number: createEbookHtoycacgag.mobile_number,
        email: createEbookHtoycacgag.email,
        company: createEbookHtoycacgag.company,
        designation: createEbookHtoycacgag.designation,
        business_industry: createEbookHtoycacgag.business_industry,
        annual_turnover: createEbookHtoycacgag.annual_turnover,
        currency: createEbookHtoycacgag.currency,
        service_name:
          'Ebook - HOW TO OPTIMISE YOUR CUSTOMERS: A Comprehensive Guide Achieve 10X Growth',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject:
            ' Ebook - HOW TO OPTIMISE YOUR CUSTOMERS: A Comprehensive Guide Achieve 10X Growth',
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

  async eastipate(createEbookEastipate: CreateEbookEastipate) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/8-Actionable-Strategies-to-Improve-Profit-After-Tax.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createEbookEastipate.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookEastipate.full_name,
            mobile_number: createEbookEastipate.mobile_number,
            email: createEbookEastipate.email,
            company: createEbookEastipate.company,
            designation: createEbookEastipate.designation,
            business_industry: createEbookEastipate.business_industry,
            annual_turnover: createEbookEastipate.annual_turnover,
            currency: createEbookEastipate.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbbg_service_template', {
        full_name: createEbookEastipate.full_name,
        mobile_number: createEbookEastipate.mobile_number,
        email: createEbookEastipate.email,
        company: createEbookEastipate.company,
        designation: createEbookEastipate.designation,
        business_industry: createEbookEastipate.business_industry,
        annual_turnover: createEbookEastipate.annual_turnover,
        currency: createEbookEastipate.currency,
        service_name:
          'Ebook - 8 Actionable Strategies to Improve Profit After Tax',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject:
            ' Ebook - 8 Actionable Strategies to Improve Profit After Tax',
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

  async tcgtcecstsobe(createEbookTcgtcecstsobe: CreateEbookTcgtcecstsobe) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/Unlock-the-secrets-to-mastering-ERP-Costs.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createEbookTcgtcecstsobe.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookTcgtcecstsobe.full_name,
            mobile_number: createEbookTcgtcecstsobe.mobile_number,
            email: createEbookTcgtcecstsobe.email,
            company: createEbookTcgtcecstsobe.company,
            designation: createEbookTcgtcecstsobe.designation,
            business_industry: createEbookTcgtcecstsobe.business_industry,
            annual_turnover: createEbookTcgtcecstsobe.annual_turnover,
            currency: createEbookTcgtcecstsobe.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbbg_service_template', {
        full_name: createEbookTcgtcecstsobe.full_name,
        mobile_number: createEbookTcgtcecstsobe.mobile_number,
        email: createEbookTcgtcecstsobe.email,
        company: createEbookTcgtcecstsobe.company,
        designation: createEbookTcgtcecstsobe.designation,
        business_industry: createEbookTcgtcecstsobe.business_industry,
        annual_turnover: createEbookTcgtcecstsobe.annual_turnover,
        currency: createEbookTcgtcecstsobe.currency,
        service_name:
          'Ebook - The CFO guide to Controlling ERP Costs: 6 Strategies to Stay on Budget',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject:
            ' Ebook - The CFOs guide to Controlling ERP Costs:6 Strategies to Stay on Budget',
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

  async biirr(createEbookBiirr: CreateEbookBiirr) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/Business-Insights-into-Revenue-Recognition.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createEbookBiirr.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookBiirr.full_name,
            mobile_number: createEbookBiirr.mobile_number,
            email: createEbookBiirr.email,
            company: createEbookBiirr.company,
            designation: createEbookBiirr.designation,
            business_industry: createEbookBiirr.business_industry,
            annual_turnover: createEbookBiirr.annual_turnover,
            currency: createEbookBiirr.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbbg_service_template', {
        full_name: createEbookBiirr.full_name,
        mobile_number: createEbookBiirr.mobile_number,
        email: createEbookBiirr.email,
        company: createEbookBiirr.company,
        designation: createEbookBiirr.designation,
        business_industry: createEbookBiirr.business_industry,
        annual_turnover: createEbookBiirr.annual_turnover,
        currency: createEbookBiirr.currency,
        service_name: 'Ebook - Business Insights into Revenue Recognition',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: ' Ebook - Business Insights into Revenue Recognition',
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

  async pcc(createEbookPcc: CreateEbookPcc) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/Period-closure-checklist.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createEbookPcc.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookPcc.full_name,
            mobile_number: createEbookPcc.mobile_number,
            email: createEbookPcc.email,
            company: createEbookPcc.company,
            designation: createEbookPcc.designation,
            business_industry: createEbookPcc.business_industry,
            annual_turnover: createEbookPcc.annual_turnover,
            currency: createEbookPcc.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbbg_service_template', {
        full_name: createEbookPcc.full_name,
        mobile_number: createEbookPcc.mobile_number,
        email: createEbookPcc.email,
        company: createEbookPcc.company,
        designation: createEbookPcc.designation,
        business_industry: createEbookPcc.business_industry,
        annual_turnover: createEbookPcc.annual_turnover,
        currency: createEbookPcc.currency,
        service_name: 'Ebook - Period closure checklist',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: ' Ebook - Period closure checklist',
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

  async rruasioam(createEbookRruasioam: CreateEbookRruasioam) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/Revamping-Revenue.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createEbookRruasioam.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookRruasioam.full_name,
            mobile_number: createEbookRruasioam.mobile_number,
            email: createEbookRruasioam.email,
            company: createEbookRruasioam.company,
            designation: createEbookRruasioam.designation,
            business_industry: createEbookRruasioam.business_industry,
            annual_turnover: createEbookRruasioam.annual_turnover,
            currency: createEbookRruasioam.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbbg_service_template', {
        full_name: createEbookRruasioam.full_name,
        mobile_number: createEbookRruasioam.mobile_number,
        email: createEbookRruasioam.email,
        company: createEbookRruasioam.company,
        designation: createEbookRruasioam.designation,
        business_industry: createEbookRruasioam.business_industry,
        annual_turnover: createEbookRruasioam.annual_turnover,
        currency: createEbookRruasioam.currency,
        service_name:
          'Ebook - Revamping Revenue unveiling ASC 606 Implications on Acquisition memo',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject:
            ' Ebook - Revamping Revenue unveiling ASC 606 Implications on Acquisition memo',
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

  async yfpfe(createEbookYfpfe: CreateEbookYfpfe) {
    try {
      const link = this.bunnyService.generateSignedUrl(
        '/ebooks/Your-Financial-Playbook-fy-2026-27-edition.pdf',
        1800,
      );

      const [inserted] = await this.db
        .insert(formSubmissionsTable)
        .values({
          form_id: createEbookYfpfe.form_id,
          sent_to: EMAIL_RECIPIENTS.COMMON_CONTETRA?.join(', '),
          payload: {
            full_name: createEbookYfpfe.full_name,
            mobile_number: createEbookYfpfe.mobile_number,
            email: createEbookYfpfe.email,
            company: createEbookYfpfe.company,
            designation: createEbookYfpfe.designation,
            business_industry: createEbookYfpfe.business_industry,
            annual_turnover: createEbookYfpfe.annual_turnover,
            currency: createEbookYfpfe.currency,
          },
        })
        .returning({ id: formSubmissionsTable.id });

      if (!inserted) {
        throw new Error('Insertion failed');
      }

      const id = inserted.id;

      const html = this.templateService.render('sbbg_service_template', {
        full_name: createEbookYfpfe.full_name,
        mobile_number: createEbookYfpfe.mobile_number,
        email: createEbookYfpfe.email,
        company: createEbookYfpfe.company,
        designation: createEbookYfpfe.designation,
        business_industry: createEbookYfpfe.business_industry,
        annual_turnover: createEbookYfpfe.annual_turnover,
        currency: createEbookYfpfe.currency,
        service_name: 'Ebook - Your Financial Playbook fy 2025-26 edition',
      });

      void this.emailService
        .sendEmail({
          to: EMAIL_RECIPIENTS.COMMON_CONTETRA,
          subject: 'Ebook - Your Financial Playbook fy 2025-26 edition',
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
