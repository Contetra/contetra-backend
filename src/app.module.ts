import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './common/drizzle/drizzle.module';
import { PostsModule } from './posts/posts.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.gaurd';
import { APP_GUARD } from '@nestjs/core';
import { CommonRestModule } from './common-rest/common-rest.module';
import { EmailModule } from './email/email.module';
import { EbookModule } from './ebook/ebook.module';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';
import { RbacModule } from './rbac/rbac.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes config accessible throughout the application
      envFilePath: '.env', // Optional: specify the path to your .env file
    }),
    DrizzleModule,
    PostsModule,
    MyLoggerModule,
    AuthModule,
    CommonRestModule,
    EmailModule,
    EbookModule,
    ServicesModule,
    UsersModule,
    RbacModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
