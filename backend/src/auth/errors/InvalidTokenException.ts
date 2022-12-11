import { BadRequestException } from '@nestjs/common';

export default class InvalidTokenException extends BadRequestException {
  constructor() {
    super('Invalid token');
  }
}
