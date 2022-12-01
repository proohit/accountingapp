import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export default class YearQuery {
  @Type(() => Number)
  @IsNumber()
  year: number;
}
