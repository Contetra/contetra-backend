import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { BunnyModule } from 'src/common/bunny/bunny.module';
import { EmailModule } from 'src/email/email.module';
import { DrizzleModule } from 'src/common/drizzle/drizzle.module';
import { MulterModule } from '@nestjs/platform-express';
import { GoogleSheetsService } from 'src/common/google/google-sheets.service';

@Module({
  imports: [DrizzleModule, EmailModule, BunnyModule, MulterModule],
  controllers: [ServicesController],
  providers: [ServicesService, GoogleSheetsService],
})
export class ServicesModule {}
