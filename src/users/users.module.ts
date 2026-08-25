import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DrizzleModule } from 'src/common/drizzle/drizzle.module';
import { BunnyModule } from 'src/common/bunny/bunny.module';

@Module({
  imports: [DrizzleModule, BunnyModule, MulterModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
