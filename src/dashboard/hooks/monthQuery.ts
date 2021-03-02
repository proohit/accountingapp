import { useQuery } from 'react-query';
import { DailyStatisticsData } from '../models/DailyData';
import { MonthlyStatisticsData } from '../models/MonthlyData';
import { StatisticsApiService } from '../services/StatisticsApi';

const statisticsApi = new StatisticsApiService();

export const useDailyStatisticsQuery = (month: number, year: number) => {
  return useQuery<DailyStatisticsData>(
    ['getDailyData', month, year],
    () => statisticsApi.getMonthlyData(month, year),
    { initialData: null }
  );
};

export const useMonthlyStatisticsQuery = (year: number) => {
  return useQuery<MonthlyStatisticsData>(
    ['getMonthlyData', year],
    () => statisticsApi.getYearlyData(year),
    { initialData: null }
  );
};
