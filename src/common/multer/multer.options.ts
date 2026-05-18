import { BadRequestException } from '@nestjs/common';

import { diskStorage, Options } from 'multer';

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

export const multerOptions: Options = {
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
      );

      return;
    }

    cb(null, true);
  },
};
