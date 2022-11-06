import {
  ApiRoutes,
  DailyStatisticsResultDto,
  MonthCategoryStatisticsResultDto,
  MonthlyStatisticsResultDto,
  MonthStatusStatisticsResultDto,
  StatisticsType,
} from '@accountingapp/shared';
import { BASE_API } from '../../shared/models/Api';

export interface StatisticsApi {
  getMonthlyData(
    month: number,
    year: number
  ): Promise<DailyStatisticsResultDto>;
  getYearlyData(year: number): Promise<MonthlyStatisticsResultDto>;
  getMonthCategoryData(
    month: number,
    year: number
  ): Promise<MonthCategoryStatisticsResultDto>;
  getMonthStatusData(
    month: number,
    year: number
  ): Promise<MonthStatusStatisticsResultDto>;
}

export class StatisticsApiService implements StatisticsApi {
  getYearlyData(year: number): Promise<MonthlyStatisticsResultDto> {
    return BASE_API.get(ApiRoutes.STATISTICS, [
      ['year', year.toString()],
      ['type', StatisticsType.MONTHLY],
    ]);
  }
  getMonthlyData(
    month: number,
    year: number
  ): Promise<DailyStatisticsResultDto> {
    return BASE_API.get(ApiRoutes.STATISTICS, [
      ['month', month.toString()],
      ['year', year.toString()],
      ['type', StatisticsType.DAILY],
    ]);
  }
  getMonthCategoryData(
    month: number,
    year: number
  ): Promise<MonthCategoryStatisticsResultDto> {
    return BASE_API.get(ApiRoutes.STATISTICS_CATEGORIES, [
      ['month', month.toString()],
      ['year', year.toString()],
      ['type', StatisticsType.CATEGORY_MONTHLY],
    ]);
  }
  getMonthStatusData(
    month: number,
    year: number
  ): Promise<MonthStatusStatisticsResultDto> {
    return BASE_API.get(ApiRoutes.STATISTICS_STATUS, [
      ['month', month.toString()],
      ['year', year.toString()],
      ['type', StatisticsType.MONTH_STATUS],
    ]);
  }
}
