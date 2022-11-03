import { StatisticsResult } from './statistics-result.model';
import { StatisticsType } from './statistics-type.model';

export interface DailyStatisticsResult extends StatisticsResult {
  type: StatisticsType.DAILY;
  month: number;
  data: DailyData[];
}

export interface DailyData {
  walletName: string;
  data: { day: string; balance: number }[];
}
