import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  );
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // reflector.get can retrieve metadata but requires "target object context"
    // for second parameter. The getHandler is the context's handler
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    // If isPublic is true in metadata
    if (isPublic) {
      return true;
    }

    // else proceed to grab request from context
    const request = context.switchToHttp().getRequest<Request>();

    // Grab header
    const authHeader = request.header('Authorization');

    // Checks if auth header is equal to api key
    // using configservice instead of process.env
    return authHeader === this.configService.get('API_KEY');
  }
}
