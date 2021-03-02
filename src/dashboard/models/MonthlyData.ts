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
