import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common/interfaces';

import { catchError, map, Observable, throwError } from 'rxjs';

export interface Response<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<Response<T>> {
  constructor() {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((res: Response<T>) => this.responseHandler(res, context)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }
  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode = response.statusCode;
    const message = res?.message || '';
    delete res.message;
    return {
      status: true,
      statusCode,
      message: message,
      data: res.data ?? res,
      errors: null,
    };
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage: string;
    if (typeof exception.getResponse != 'undefined') {
      const errResp = JSON.parse(JSON.stringify(exception.getResponse()));
      if (Object.keys(errResp).includes('message')) {
        errorMessage = errResp.message;
      } else {
        errorMessage = errResp;
      }
    } else {
      errorMessage = exception.message;
    }
    console.log({
      message: errorMessage,
      originalError: exception,
      data: request?.body,
      // stack: exception?.stack,
    });
    response.status(status).json({
      status: false,
      statusCode: status,
      message: errorMessage || 'Some internal error',
      data: {},
      errors: exception,
    });
  }
}
