import { Type } from 'class-transformer';
import { IsDateString, IsNumber } from 'class-validator';

export default class GetMonthStatusDto {
  @Type(() => Number)
  @IsNumber()
  month: number;

  @Type(() => Number)
  @IsNumber()
  year: number;

  @IsDateString()
  calculatePlannedFromDate: string;
}
