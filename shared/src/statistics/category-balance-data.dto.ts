import { StatisticsResultDto } from './statistics-result.dto';
import { StatisticsType } from './statistics-type.enum';

export class MonthCategoryStatisticsResultDto extends StatisticsResultDto {
  type: StatisticsType.CATEGORY_MONTHLY;
  month: number;
  data: CategoryBalanceDataDto[];
}

export class CategoryBalanceDataDto {
  category: string;
  balance: number;
}
