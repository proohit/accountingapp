import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import NotLoggedInException from './errors/not-logged-in-exception.error';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = request.isAuthenticated();
    if (!isAuthenticated) {
      throw new NotLoggedInException();
    }
    return isAuthenticated;
  }
}
