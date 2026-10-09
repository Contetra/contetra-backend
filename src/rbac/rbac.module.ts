import { Module } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { RbacController } from './rbac.controller';
import { PolicyService } from './policy.service';
import { DrizzleModule } from 'src/common/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [RbacController],
  providers: [RbacService, PolicyService],
  exports: [PolicyService],
})
export class RbacModule {}
