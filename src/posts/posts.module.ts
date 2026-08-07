import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DrizzleModule } from 'src/common/drizzle/drizzle.module';
import { BunnyModule } from 'src/common/bunny/bunny.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [DrizzleModule, BunnyModule, MulterModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
