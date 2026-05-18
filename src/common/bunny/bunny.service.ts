import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as fs from 'fs';

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

  sanitizeFolderName(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async uploadFile(
    file: Express.Multer.File,

    folderPath: string,
  ): Promise<string> {
    const storageZone = this.config.get<string>('BUNNY_STORAGE_ZONE');

    const apiKey = this.config.get<string>('BUNNY_STORAGE_API_KEY');

    const cdnUrl = this.config.get<string>('BUNNY_CDN_URL');

    const region = this.config.get<string>('BUNNY_STORAGE_REGION') || 'storage';

    if (!storageZone || !apiKey || !cdnUrl) {
      throw new Error('Bunny config missing');
    }

    const cleanFolder = folderPath.replace(/^\/+/, '').replace(/\/+$/, '');

    const remoteFilePath = `${cleanFolder}/${file.filename}`;

    const uploadUrl = `https://${region}.bunnycdn.com/${storageZone}/${remoteFilePath}`;

    try {
      const fileBuffer = fs.readFileSync(file.path);

      await axios.put(
        uploadUrl,

        fileBuffer,

        {
          headers: {
            AccessKey: apiKey,

            'Content-Type': file.mimetype,
          },

          maxBodyLength: Infinity,
        },
      );

      return `${cdnUrl}/${remoteFilePath}`;
    } finally {
      try {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (deleteError) {
        console.error(
          'Failed to delete local file:',
          file.path,

          deleteError,
        );
      }
    }
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],

    folderPath: string,
  ): Promise<string[]> {
    return Promise.all(files.map((file) => this.uploadFile(file, folderPath)));
  }
}
