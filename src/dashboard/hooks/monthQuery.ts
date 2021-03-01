import { useQuery } from 'react-query';
import { DailyStatisticsData } from '../models/DailyData';
import { StatisticsApiService } from '../services/StatisticsApi';

const statisticsApi = new StatisticsApiService();

export const useMonthlyStatisticsQuery = (
  token: string,
  month: number,
  year: number
) => {
  return useQuery<DailyStatisticsData>(
    ['getMonthlyData', token, month, year],
    () => statisticsApi.getMonthlyData(token, month, year),
    { initialData: null }
  );
};
