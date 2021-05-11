import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Add a timeout to the call handler
    return next.handle().pipe(
      timeout(3000),

      // additional argument can be passed for error handler;
      catchError((err) => {
        // if error is a timeout error (vars from rxjs)
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        // else, return error
        return throwError(err);
      }),
    );
  }
}
