import { StatisticsResultDto } from './statistics-result.dto';
import { StatisticsType } from './statistics-type.enum';

export interface MonthlyStatisticsResultDto extends StatisticsResultDto {
  type: StatisticsType.MONTHLY;
  year: number;
  data: MonthlyDataDto[];
}

export class MonthlyDataDto {
  month: number;
  totalBalance: number;
}
