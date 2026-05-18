import { Module } from '@nestjs/common';
import { MulterService } from './multer.service';

@Module({
  providers: [MulterService],
  exports: [MulterService], // IMPORTANT
})
export class BunnyModule {}
