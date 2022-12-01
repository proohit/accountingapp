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
    () => statisticsApi.getDailyData(month, year),
    { staleTime: 15000 }
  );
};

export const useMonthlyStatisticsQuery = (year: number) => {
  return useQuery<MonthlyStatisticsResultDto>(
    ['getMonthlyData', year],
    () => statisticsApi.getMonthlyData(year),
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

export const useMonthStatusStatisticsQuery = (
  month: number,
  year: number,
  calculatePlannedFromDate: string
) => {
  return useQuery<MonthStatusStatisticsResultDto>(
    ['getMonthStatusData', month, year, calculatePlannedFromDate],
    () =>
      statisticsApi.getMonthStatusData(month, year, calculatePlannedFromDate),
    { staleTime: 15000 }
  );
};
