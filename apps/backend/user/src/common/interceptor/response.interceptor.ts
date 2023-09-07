import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponseHttp } from '@types';
import { RESPONSE_MESSAGE } from '@decorators';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IResponseHttp<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponseHttp<T>> {
    const { data } = context.getArgs()[0];
    context.getArgs()[0] = data;
    return next.handle().pipe(
      map(({ data, code }: { data: any; code: number }) => ({
        code: code ?? 200,
        message:
          this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler()) ||
          'success',
        success: true,
        data: data ?? null,
      })),
    );
  }
}
