import { BadRequestException } from '@nestjs/common';

export default class DuplicateWalletException extends BadRequestException {
  constructor() {
    super('Wallet with this name already exists');
  }
}
