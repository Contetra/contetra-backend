import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { MicrosoftTokenResponse, SendEmailOptions } from './types';
import { Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger(EmailService.name);

  private cachedToken: string | null = null;
  private tokenExpiry = 0;

  private readonly tenantId = process.env.TENANT_ID ?? '';
  private readonly clientId = process.env.CLIENT_ID ?? '';
  private readonly clientSecret = process.env.CLIENT_SECRET ?? '';
  private readonly senderEmail = process.env.SENDER_EMAIL ?? '';

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
