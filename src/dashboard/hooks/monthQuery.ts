import { useQuery } from 'react-query';
import { DailyStatisticsData } from '../models/DailyData';
import { StatisticsApiService } from '../services/StatisticsApi';

const statisticsApi = new StatisticsApiService();

export const useMonthlyStatisticsQuery = (month: number, year: number) => {
  return useQuery<DailyStatisticsData>(
    ['getMonthlyData', month, year],
    () => statisticsApi.getMonthlyData(month, year),
    { initialData: null }
  );
};
