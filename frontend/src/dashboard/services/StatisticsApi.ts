import { API_ROUTES } from '../../shared/constants/ApiRoutes';
import { BASE_API } from '../../shared/models/Api';
import { DailyStatisticsData } from '../models/DailyData';
import {
  MonthCategoryData,
  MonthlyStatisticsData,
  MonthStatusData,
} from '../models/MonthlyData';
import { StatisticsType } from '../models/StatisticsType';

export interface StatisticsApi {
  getMonthlyData(month: number, year: number): Promise<DailyStatisticsData>;
  getYearlyData(year: number): Promise<MonthlyStatisticsData>;
  getMonthCategoryData(month: number, year: number): Promise<MonthCategoryData>;
  getMonthStatusData(month: number, year: number): Promise<MonthStatusData>;
}

export class StatisticsApiService implements StatisticsApi {
  getYearlyData(year: number): Promise<MonthlyStatisticsData> {
    return BASE_API.get(API_ROUTES.STATISTICS, [
      ['year', year.toString()],
      ['type', StatisticsType.MONTHLY],
    ]);
  }
  getMonthlyData(month: number, year: number): Promise<DailyStatisticsData> {
    return BASE_API.get(API_ROUTES.STATISTICS, [
      ['month', month.toString()],
      ['year', year.toString()],
      ['type', StatisticsType.DAILY],
    ]);
  }
  getMonthCategoryData(
    month: number,
    year: number
  ): Promise<MonthCategoryData> {
    return BASE_API.get(API_ROUTES.STATISTICS_CATEGORIES, [
      ['month', month.toString()],
      ['year', year.toString()],
      ['type', StatisticsType.CATEGORY_MONTHLY],
    ]);
  }
  getMonthStatusData(month: number, year: number): Promise<MonthStatusData> {
    return BASE_API.get(API_ROUTES.STATISTICS_STATUS, [
      ['month', month.toString()],
      ['year', year.toString()],
      ['type', StatisticsType.MONTH_STATUS],
    ]);
  }
}
