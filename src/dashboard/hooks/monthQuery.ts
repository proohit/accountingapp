import { useQuery } from 'react-query';
import { DailyStatisticsData } from '../models/DailyData';
import { MonthlyStatisticsData } from '../models/MonthlyData';
import { StatisticsApiService } from '../services/StatisticsApi';

const statisticsApi = new StatisticsApiService();

export const useMonthlyStatisticsQuery = (month: number, year: number) => {
  return useQuery<DailyStatisticsData>(
    ['getMonthlyData', month, year],
    () => statisticsApi.getMonthlyData(month, year),
    { initialData: null }
  );
};

export const useYearlyStatisticsQuery = (year: number) => {
  return useQuery<MonthlyStatisticsData>(
    ['getYearlyData', year],
    () => statisticsApi.getYearlyData(year),
    { initialData: null }
  );
};
