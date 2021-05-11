import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Use create param decorator to create parameter
export const Protocol = createParamDecorator(
  // data is arg passed into decorator @Protocol(x)
  (data: string, ctx: ExecutionContext) => {
    console.log({ data });
    // Retrieve request data from context
    const request = ctx.switchToHttp().getRequest();

    return request.protocol;
  },
);
