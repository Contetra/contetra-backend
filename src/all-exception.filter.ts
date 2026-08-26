import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { MyLoggerService } from './my-logger/my-logger.service';
import { DrizzleError } from 'drizzle-orm';

type MyResponseObj = {
  statusCode: number;
  // timestamp: string;
  // path: string;
  response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    const myResponseObj: MyResponseObj = {
      statusCode: 200,
      // timestamp: new Date().toISOString(),
      // path: request.url,
      response: '',
    };

    // Add more Prisma Error Types if you want
    if (exception instanceof HttpException) {
      myResponseObj.statusCode = exception.getStatus();
      myResponseObj.response = exception.getResponse();
    } else if (exception instanceof DrizzleError) {
      myResponseObj.statusCode = 422;
      myResponseObj.response = exception.message.replaceAll(/\n/g, ' ');
    } else {
      myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      if (exception instanceof Error) {
        myResponseObj.response = exception.message;

        console.error('ERROR:', exception.message);
        console.error('STACK:', exception.stack);
        if (exception.cause) {
          console.error('CAUSE:', exception.cause);
        }
      } else {
        myResponseObj.response = 'Internal Server Error';

        console.error('UNKNOWN ERROR:', exception);
      }
    }

    response.status(myResponseObj.statusCode).json(myResponseObj);

    this.logger.error(myResponseObj.response, AllExceptionsFilter.name);
  }
}
