import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { diskStorage, Options } from 'multer';

import { extname } from 'path';

import { Request } from 'express';

import { FileFilterCallback } from 'multer';

const allowedMimeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

@Injectable()
export class MulterService {
  constructor(private readonly config: ConfigService) {}

  multerOptions: Options = {
    storage: diskStorage({
      destination: './uploads',

      filename: (_req: Request, file: Express.Multer.File, cb): void => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);

        cb(null, `${uniqueName}${extname(file.originalname)}`);
      },
    }),

    limits: {
      fileSize: 10 * 1024 * 1024,
      files: 20,
    },

    fileFilter: (
      _req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback,
    ): void => {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        cb(
          new BadRequestException(
            `Unsupported file type: ${file.originalname}`,
          ),
        );

        return;
      }

      cb(null, true);
    },
  };
}
