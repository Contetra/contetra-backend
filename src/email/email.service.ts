import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { and, asc, desc, eq, SQL, sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from 'src/common/drizzle/drizzle.module';
import {
  formSubmissionsTable,
  formsTable,
  formTypesTable,
} from 'src/common/drizzle/schema';
import { GetFormSubmissionsQueryDto } from './dto/get-form-submissions.dto';
import { MicrosoftTokenResponse, SendEmailOptions } from './types';
import { Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase,
    private readonly httpService: HttpService,
  ) {}

  private readonly logger = new Logger(EmailService.name);

  private cachedToken: string | null = null;
  private tokenExpiry = 0;

  private readonly tenantId = process.env.TENANT_ID ?? '';
  private readonly clientId = process.env.CLIENT_ID ?? '';
  private readonly clientSecret = process.env.CLIENT_SECRET ?? '';
  private readonly senderEmail = process.env.SENDER_EMAIL ?? '';

  private formatPayload(
    payload: Record<string, unknown> | null,
  ): Record<string, unknown>[] {
    if (!payload) {
      return [];
    }

    return Object.entries(payload).map(([key, value]) => ({ [key]: value }));
  }

  private async getAccessToken(): Promise<string> {
    if (this.cachedToken && Date.now() < this.tokenExpiry) {
      return this.cachedToken;
    }

    const params = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    });

    try {
      const { data } = await firstValueFrom(
        this.httpService.post<MicrosoftTokenResponse>(
          `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`,
          params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        ),
      );

      if (!data.access_token) {
        throw new Error('No access token returned');
      }

      this.cachedToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;

      return this.cachedToken;
    } catch (error: unknown) {
      this.logger.error('Failed to obtain access token', error);
      throw new InternalServerErrorException('Failed to obtain access token');
    }
  }

  async getFormSubmissions(
    getFormSubmissionsQueryDto: GetFormSubmissionsQueryDto,
  ) {
    try {
      const page = getFormSubmissionsQueryDto.page ?? 1;
      const limit = getFormSubmissionsQueryDto.limit ?? 10;
      const sortOrder = getFormSubmissionsQueryDto.sortOrder ?? 'desc';
      const offset = (page - 1) * limit;

      const orderDirection =
        sortOrder === 'asc'
          ? asc(formSubmissionsTable.created_at)
          : desc(formSubmissionsTable.created_at);

      const conditions: SQL<unknown>[] = [];
      if (getFormSubmissionsQueryDto.form_id) {
        conditions.push(
          eq(formSubmissionsTable.form_id, getFormSubmissionsQueryDto.form_id),
        );
      }
      if (getFormSubmissionsQueryDto.form_type) {
        conditions.push(
          eq(formTypesTable.name, getFormSubmissionsQueryDto.form_type),
        );
      }

      const whereClause = conditions.length ? and(...conditions) : undefined;

      const [{ count }] = await this.db
        .select({
          count: sql<number>`count(*)`.as('count'),
        })
        .from(formSubmissionsTable)
        .innerJoin(formsTable, eq(formsTable.id, formSubmissionsTable.form_id))
        .innerJoin(
          formTypesTable,
          eq(formTypesTable.id, formsTable.form_type_id),
        )
        .where(whereClause);

      const submissions = await this.db
        .select({
          id: formSubmissionsTable.id,
          form_name: formsTable.form_name,
          form_type: formTypesTable.name,
          payload: formSubmissionsTable.payload,
          created_at: formSubmissionsTable.created_at,
        })
        .from(formSubmissionsTable)
        .innerJoin(formsTable, eq(formsTable.id, formSubmissionsTable.form_id))
        .innerJoin(
          formTypesTable,
          eq(formTypesTable.id, formsTable.form_type_id),
        )
        .where(whereClause)
        .orderBy(orderDirection)
        .limit(limit)
        .offset(offset);

      return {
        data: submissions.map((submission) => ({
          ...submission,
          payload: this.formatPayload(submission.payload),
        })),
        meta: {
          total: Number(count),
          page,
          limit,
          totalPages: Math.ceil(Number(count) / limit),
          isNext: offset + submissions.length < Number(count),
          isPrev: page > 1,
        },
      };
    } catch (error) {
      console.error('Failed to fetch form submissions:', error);
      throw error;
    }
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    const token = await this.getAccessToken();
    const { to, subject, html, attachments = [] } = options;

    const recipients = to.map((email) => ({
      emailAddress: {
        address: email,
      },
    }));

    try {
      await firstValueFrom(
        this.httpService.post(
          `https://graph.microsoft.com/v1.0/users/${this.senderEmail}/sendMail`,
          {
            message: {
              subject,
              body: {
                contentType: 'HTML',
                content: html,
              },
              from: {
                emailAddress: {
                  address: this.senderEmail,
                  name: 'Contetra',
                },
              },
              toRecipients: recipients,
              attachments,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
    } catch (error: unknown) {
      this.logger.error('Failed to send email', error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
