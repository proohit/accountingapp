import {
  ApiRoutes,
  DailyStatisticsResultDto,
  MonthCategoryStatisticsResultDto,
  MonthlyStatisticsResultDto,
  MonthStatusStatisticsResultDto,
  StatisticsType,
} from '@accountingapp/shared';
import { BASE_API } from '../../shared/models/Api';

export class StatisticsApiService {
  getMonthlyData(year: number): Promise<MonthlyStatisticsResultDto> {
    return BASE_API.get(ApiRoutes.STATISTICS_MONTHLY, [
      ['year', year.toString()],
      ['type', StatisticsType.MONTHLY],
    ]);
  }
  getDailyData(month: number, year: number): Promise<DailyStatisticsResultDto> {
    return BASE_API.get(ApiRoutes.STATISTICS_DAILY, [
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
    year: number,
    calculatePlannedFromDate: string
  ): Promise<MonthStatusStatisticsResultDto> {
    return BASE_API.get(ApiRoutes.STATISTICS_STATUS, [
      ['month', month.toString()],
      ['year', year.toString()],
      ['calculatePlannedFromDate', calculatePlannedFromDate],
    ]);
  }
}
