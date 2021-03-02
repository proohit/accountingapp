import { API_ROUTES } from '../../shared/constants/ApiRoutes';
import { BASE_API } from '../../shared/models/Api';
import { DailyStatisticsData } from '../models/DailyData';
import { MonthlyStatisticsData } from '../models/MonthlyData';
import { StatisticsType } from '../models/StatisticsType';

export interface WalletsApi {
  getMonthlyData(month: number, year: number): Promise<DailyStatisticsData>;
  getYearlyData(year: number): Promise<MonthlyStatisticsData>;
}

export class StatisticsApiService implements WalletsApi {
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
}
