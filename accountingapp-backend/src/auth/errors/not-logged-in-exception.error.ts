import { UnauthorizedException } from '@nestjs/common';

export default class NotLoggedInException extends UnauthorizedException {
  constructor() {
    super('Not logged in');
  }
}
