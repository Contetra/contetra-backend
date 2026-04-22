import { Module } from '@nestjs/common';
import { BunnyService } from './bunny.service';

@Module({
  providers: [BunnyService],
  exports: [BunnyService], // IMPORTANT
})
export class BunnyModule {}
