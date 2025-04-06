import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common/interfaces';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Reflector } from '@nestjs/core/services/reflector.service';
import { Observable } from 'rxjs';
import { CACHE_CONTROL_KEY } from './../helpers/cache.decorator';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const maxAge = this.reflector.get<number>(
      CACHE_CONTROL_KEY,
      context.getHandler(),
    );
    if (maxAge) {
      const response = context.switchToHttp().getResponse();
      response.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    }

    return next.handle();
  }
}
