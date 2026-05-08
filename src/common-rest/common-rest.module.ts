import { Module } from '@nestjs/common';
import { CommonRestService } from './common-rest.service';
import { CommonRestController } from './common-rest.controller';
import { DrizzleModule } from 'src/common/drizzle/drizzle.module';
import { BunnyModule } from 'src/common/bunny/bunny.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [DrizzleModule, EmailModule, BunnyModule],
  controllers: [CommonRestController],
  providers: [CommonRestService],
})
export class CommonRestModule {}
