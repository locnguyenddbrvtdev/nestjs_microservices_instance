import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IResponseHttpException } from '@types';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log(status, exception.message);
    console.log('data: ' + exception.response.data);
    console.log('');

    const errorResponse: IResponseHttpException<string> = {
      code: status,
      message: exception.message,
      success: false,
      data: exception.response.data ?? null,
      path: request.url,
      timestamp: new Date(),
    };

    response.status(status).json(errorResponse);
  }
}
