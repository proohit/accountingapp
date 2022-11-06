import { StatisticsType } from '@accountingapp/shared';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export default class GetStatisticsQueryDto {
  @IsEnum(StatisticsType)
  @IsNotEmpty()
  type: StatisticsType;

  @IsNumberString()
  @IsOptional()
  @ValidateIf(
    (o) =>
      o.type === StatisticsType.DAILY ||
      o.type === StatisticsType.CATEGORY_MONTHLY ||
      o.type === StatisticsType.MONTH_STATUS,
  )
  month?: number;

  @IsNumberString()
  @IsOptional()
  @ValidateIf(
    (o) =>
      o.type === StatisticsType.DAILY ||
      o.type === StatisticsType.MONTHLY ||
      o.type === StatisticsType.CATEGORY_MONTHLY ||
      o.type === StatisticsType.MONTH_STATUS,
  )
  year?: number;
}
