import {
  DailyStatisticsResultDto,
  MonthCategoryStatisticsResultDto,
  MonthlyStatisticsResultDto,
  MonthStatusStatisticsResultDto,
} from '@accountingapp/shared';
import { useQuery } from 'react-query';
import { StatisticsApiService } from '../services/StatisticsApi';

const statisticsApi = new StatisticsApiService();

export const useDailyStatisticsQuery = (month: number, year: number) => {
  return useQuery<DailyStatisticsResultDto>(
    ['getDailyData', month, year],
    () => statisticsApi.getMonthlyData(month, year),
    { staleTime: 15000 }
  );
};

export const useMonthlyStatisticsQuery = (year: number) => {
  return useQuery<MonthlyStatisticsResultDto>(
    ['getMonthlyData', year],
    () => statisticsApi.getYearlyData(year),
    { staleTime: 15000 }
  );
};

export const useMonthlyCategoryStatisticsQuery = (
  month: number,
  year: number
) => {
  return useQuery<MonthCategoryStatisticsResultDto>(
    ['getMonthlyCategoryData', month, year],
    () => statisticsApi.getMonthCategoryData(month, year),
    { staleTime: 15000 }
  );
};

export const useMonthStatusStatisticsQuery = (month: number, year: number) => {
  return useQuery<MonthStatusStatisticsResultDto>(
    ['getMonthStatusData', month, year],
    () => statisticsApi.getMonthStatusData(month, year),
    { staleTime: 15000 }
  );
};
