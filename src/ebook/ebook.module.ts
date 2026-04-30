import { Module } from '@nestjs/common';
import { EbookService } from './ebook.service';
import { EbookController } from './ebook.controller';
import { DrizzleModule } from 'src/common/drizzle/drizzle.module';
import { EmailModule } from 'src/email/email.module';
import { BunnyModule } from 'src/common/bunny/bunny.module';

@Module({
  imports: [DrizzleModule, EmailModule, BunnyModule],
  controllers: [EbookController],
  providers: [EbookService],
})
export class EbookModule {}
