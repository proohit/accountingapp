export interface DailyStatisticsData {
  type: StatisticsType.DAILY;
  month: number;
  data: DailyData[];
}

export interface DailyData {
  walletName: string;
  data: { day: string; balance: number }[];
}
export enum StatisticsType {
  MONTHLY = 'monthly',
  DAILY = 'daily',
}
