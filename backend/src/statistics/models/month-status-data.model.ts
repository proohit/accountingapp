import { StatisticsResult } from './statistics-result.model';
import { StatisticsType } from './statistics-type.model';

export interface MonthStatusStatisticsResult extends StatisticsResult {
  type: StatisticsType.MONTH_STATUS;
  month: number;
  data: MonthStatusData;
}
export interface MonthStatusData {
  balance: number;
}
