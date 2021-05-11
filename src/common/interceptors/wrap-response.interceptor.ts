import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    // Uses call handler to handle route (next.handle())
    // This can be used further to manipulate the stream
    // return next.handle().pipe(tap((data) => console.log('After...', data)));
    // The call handler can also be used to map/reshape data
    // Below adds the data as its own key/value in response
    return next.handle().pipe(map((data) => ({ data })));
  }
}
