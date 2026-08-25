import { BadRequestException } from '@nestjs/common';
import type { MulterModuleOptions } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { extname } from 'path';

const allowedMimeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

export const multerOptions: MulterModuleOptions = {
  storage: diskStorage({
    destination: './uploads',

    filename: (_req, file, cb) => {
      const uniqueName =
        Date.now() +
        '-' +
        Math.round(Math.random() * 1e9) +
        extname(file.originalname);

      cb(null, uniqueName);
    },
  }),

  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 20,
  },

  fileFilter: (_req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      cb(
        new BadRequestException(`Unsupported file type: ${file.originalname}`),
        false,
      );

      return;
    }

    cb(null, true);
  },
};

const allowedImageMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

export const imageMulterOptions: MulterModuleOptions = {
  storage: diskStorage({
    destination: './uploads',

    filename: (_req, file, cb) => {
      const uniqueName =
        Date.now() +
        '-' +
        Math.round(Math.random() * 1e9) +
        extname(file.originalname);

      cb(null, uniqueName);
    },
  }),

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },

  fileFilter: (_req, file, cb) => {
    if (!allowedImageMimeTypes.includes(file.mimetype)) {
      cb(
        new BadRequestException(`Unsupported file type: ${file.originalname}`),
        false,
      );

      return;
    }

    cb(null, true);
  },
};

export const PROFILE_PHOTO_MAX_BYTES = 1 * 1024 * 1024;

export const profilePhotoMulterOptions: MulterModuleOptions = {
  ...imageMulterOptions,

  limits: {
    fileSize: PROFILE_PHOTO_MAX_BYTES,
    files: 1,
  },
};
