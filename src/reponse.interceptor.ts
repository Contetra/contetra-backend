import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    // const ctx = context.switchToHttp();
    // const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((data: T) => ({
        statusCode: response.statusCode,
        response: data,
      })),
    );
  }
}
