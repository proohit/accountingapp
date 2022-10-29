import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import InvalidCredentialsException from './errors/InvalidCredentialsException';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (
      !request.body.username ||
      request.body.username === '' ||
      !request.body.password ||
      request.body.password === ''
    ) {
      throw new InvalidCredentialsException();
    }
    const result = (await super.canActivate(context)) as boolean;
    await super.logIn(request);
    return result;
  }
}
