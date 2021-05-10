import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Grab request from context
    const request = context.switchToHttp().getRequest<Request>();

    // Grab header
    const authHeader = request.header('Authorization');
    // Checks if auth header is equal to api key
    return authHeader === process.env.API_KEY;
  }
}
