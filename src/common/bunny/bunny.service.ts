import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BunnyService {
  constructor(private config: ConfigService) {}

  generateSignedUrl(filePath: string, expiry = 600): string {
    const tokenKey = this.config.get<string>('BUNNY_TOKEN_KEY');
    const baseUrl = this.config.get<string>('BUNNY_CDN_URL');

    if (!tokenKey || !baseUrl) {
      throw new Error('Bunny CDN config missing');
    }

    const expiration = Math.floor(Date.now() / 1000) + expiry;
    const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
    const path = `/${filePath.replace(/^\/+/, '')}`;

    const hashable = `${tokenKey}${path}${expiration}`;

    const signature = crypto
      .createHash('sha256')
      .update(hashable)
      .digest()
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    return `${cleanBaseUrl}${path}?token=${signature}&expires=${expiration}`;
  }
}
