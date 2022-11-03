import { StatisticsResult } from './statistics-result.model';
import { StatisticsType } from './statistics-type.model';

export interface MonthlyStatisticsResult extends StatisticsResult {
  type: StatisticsType.MONTHLY;
  year: number;
  data: MonthlyData[];
}

export interface MonthlyData {
  month: number;
  totalBalance: number;
}
