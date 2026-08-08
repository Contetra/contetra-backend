import { Module } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { RbacController } from './rbac.controller';
import { DrizzleModule } from 'src/common/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [RbacController],
  providers: [RbacService],
})
export class RbacModule {}
