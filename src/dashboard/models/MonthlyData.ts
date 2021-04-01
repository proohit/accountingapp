import { StatisticsType } from './StatisticsType';

export interface MonthlyData {
  month: number;
  totalBalance: number;
}
export interface MonthlyStatisticsData {
  type: StatisticsType.MONTHLY;
  year: number;
  data: MonthlyData[];
}

export interface MonthCategoryData {
  type: StatisticsType.CATEGORY_MONTHLY;
  month: number;
  data: CategoryBalanceData[];
}

export interface CategoryBalanceData {
  category: string;
  balance: number;
}
