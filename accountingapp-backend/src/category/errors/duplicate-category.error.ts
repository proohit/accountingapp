import { BadRequestException } from '@nestjs/common';

export class DuplicateCategoryError extends BadRequestException {
  constructor() {
    super('Category already exists');
  }
}
