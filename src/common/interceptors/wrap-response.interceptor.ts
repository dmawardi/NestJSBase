import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    // Uses call handler to handle route (next.handle())
    // This can be used further to manipulate the stream
    return next.handle().pipe(tap((data) => console.log('After...', data)));
  }
}
