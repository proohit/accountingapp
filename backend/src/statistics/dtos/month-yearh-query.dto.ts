import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export default class MonthYearQuery {
  @Type(() => Number)
  @IsNumber()
  month: number;

  @Type(() => Number)
  @IsNumber()
  year: number;
}
