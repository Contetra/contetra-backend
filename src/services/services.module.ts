import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { BunnyModule } from 'src/common/bunny/bunny.module';
import { EmailModule } from 'src/email/email.module';
import { DrizzleModule } from 'src/common/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule, EmailModule, BunnyModule],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
