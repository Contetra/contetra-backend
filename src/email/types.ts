export interface MicrosoftTokenResponse {
  token_type: string;
  expires_in: number;
  ext_expires_in: number;
  access_token: string;
}

export interface EmailAttachment {
  '@odata.type': '#microsoft.graph.fileAttachment';
  name: string;
  contentType: string;
  contentBytes: string;
}

export interface SendEmailOptions {
  to: string[];
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
}
