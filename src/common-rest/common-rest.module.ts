import { Module } from '@nestjs/common';
import { CommonRestService } from './common-rest.service';
import { CommonRestController } from './common-rest.controller';
import { DrizzleModule } from 'src/common/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [CommonRestController],
  providers: [CommonRestService],
})
export class CommonRestModule {}
