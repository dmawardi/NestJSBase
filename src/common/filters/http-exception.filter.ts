import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Response } from 'express';

// Takes a single or list of exceptions to catch
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    // The switchtoHttp method gives us access to the native inflight request/response objects
    const ctx = host.switchToHttp();

    // Get underlying response from express package
    const response = ctx.getResponse<Response>();

    // gets status of response
    const status = exception.getStatus();
    // gets raw exception response
    const exceptionResponse = exception.getResponse();
    // Determine whether an error is present
    const error =
      // Is it a string?
      typeof response === 'string'
        ? // If it's a string, put that string inside of an object
          { message: exceptionResponse }
        : // Otherwise, it's already an object, so let it pass
          (exceptionResponse as object);
    // Send back response of the current status
    // json method allows us to pass additional items to be appended
    // to the response
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
