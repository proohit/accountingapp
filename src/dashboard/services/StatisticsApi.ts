import { API_ROUTES } from '../../shared/constants/ApiRoutes';
import { BASE_API } from '../../shared/models/Api';
import { DailyStatisticsData, StatisticsType } from '../models/DailyData';

export interface WalletsApi {
  getMonthlyData(
    token: string,
    month: number,
    year: number
  ): Promise<DailyStatisticsData>;
}

export class StatisticsApiService implements WalletsApi {
  getMonthlyData(
    token: string,
    month: number,
    year: number
  ): Promise<DailyStatisticsData> {
    return BASE_API.get(API_ROUTES.STATISTICS, token, [
      ['month', month.toString()],
      ['year', year.toString()],
      ['type', StatisticsType.DAILY],
    ]);
  }
}
