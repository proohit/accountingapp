import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SecureUser } from '../users/entities/secure-user';

export const LoggedInUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as SecureUser;
  },
);
