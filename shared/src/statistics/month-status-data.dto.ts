import { StatisticsResultDto } from './statistics-result.dto';
import { StatisticsType } from './statistics-type.enum';

export class MonthStatusStatisticsResultDto extends StatisticsResultDto {
  type: StatisticsType.MONTH_STATUS;
  month: number;
  data: MonthStatusDataDto;
}
export class MonthStatusDataDto {
  balance: number;
}
