import { StatisticsResultDto } from './statistics-result.dto';
import { StatisticsType } from './statistics-type.enum';

export class DailyStatisticsResultDto extends StatisticsResultDto {
  type: StatisticsType.DAILY;
  month: number;
  data: DailyDataDto[];
}

export class DailyDataDto {
  walletName: string;
  data: { day: string; balance: number }[];
}
