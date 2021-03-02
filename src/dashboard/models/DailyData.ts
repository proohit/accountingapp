import { StatisticsType } from './StatisticsType';

export interface DailyStatisticsData {
  type: StatisticsType.DAILY;
  month: number;
  data: DailyData[];
}

export interface DailyData {
  walletName: string;
  data: { day: string; balance: number }[];
}
