import { StatisticsResult } from './statistics-result.model';
import { StatisticsType } from './statistics-type.model';

export interface MonthCategoryStatisticsResult extends StatisticsResult {
  type: StatisticsType.CATEGORY_MONTHLY;
  month: number;
  data: CategoryBalanceData[];
}

export interface CategoryBalanceData {
  category: string;
  balance: number;
}
