import { useQuery } from 'react-query';
import { DailyStatisticsData } from '../models/DailyData';
import {
  MonthCategoryData,
  MonthlyStatisticsData,
  MonthStatusData,
} from '../models/MonthlyData';
import { StatisticsApiService } from '../services/StatisticsApi';

const statisticsApi = new StatisticsApiService();

export const useDailyStatisticsQuery = (month: number, year: number) => {
  return useQuery<DailyStatisticsData>(
    ['getDailyData', month, year],
    () => statisticsApi.getMonthlyData(month, year),
    { staleTime: 15000 }
  );
};

export const useMonthlyStatisticsQuery = (year: number) => {
  return useQuery<MonthlyStatisticsData>(
    ['getMonthlyData', year],
    () => statisticsApi.getYearlyData(year),
    { staleTime: 15000 }
  );
};

export const useMonthlyCategoryStatisticsQuery = (
  month: number,
  year: number
) => {
  return useQuery<MonthCategoryData>(
    ['getMonthlyCategoryData', year],
    () => statisticsApi.getMonthCategoryData(month, year),
    { staleTime: 15000 }
  );
};

export const useMonthStatusStatisticsQuery = (month: number, year: number) => {
  return useQuery<MonthStatusData>(
    ['getMonthStatusData', month, year],
    () => statisticsApi.getMonthStatusData(month, year),
    { staleTime: 15000 }
  );
};
