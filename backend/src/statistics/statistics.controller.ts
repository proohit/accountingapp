import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { LoggedInUser } from '../auth/user.decorator';
import { SecureUser } from '../users/entities/secure-user';
import GetStatisticsQueryDto from './dtos/get-statistics-query.dto';
import { DailyData, DailyStatisticsResult } from './models/daily-data.model';
import { StatisticsType } from './models/statistics-type.model';
import { StatisticsService } from './statistics.service';

@UseGuards(AuthenticatedGuard)
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  async getStatistics(
    @Query() query: GetStatisticsQueryDto,
    @LoggedInUser() user: SecureUser,
  ) {
    const username = user.username;
    const { type: requestedType, month, year } = query;

    if (requestedType === StatisticsType.DAILY) {
      const dailyData: DailyData[] =
        await this.statisticsService.getDailyDataForMonth(
          username,
          month,
          year,
        );
      const dailyDataResult: DailyStatisticsResult = {
        type: StatisticsType.DAILY,
        month,
        data: dailyData,
      };
      return dailyDataResult;
    }

    if (requestedType === StatisticsType.MONTHLY) {
      const monthlyData = await this.statisticsService.getMonthlyDataForYear(
        username,
        year,
      );
      const monthlyDataResult = {
        type: StatisticsType.MONTHLY,
        data: monthlyData,
      };
      return monthlyDataResult;
    }
  }

  @Get('categories')
  async getCategoryStatistics(
    @LoggedInUser() user: SecureUser,
    @Query() query: GetStatisticsQueryDto,
  ) {
    const username = user.username;

    const { type: requestedType, month, year } = query;
    if (requestedType === StatisticsType.CATEGORY_MONTHLY) {
      const monthlyCategoryData =
        await this.statisticsService.getMonthCategoryData(
          username,
          month,
          year,
        );
      const monthlyCategoryDataResult = {
        type: StatisticsType.CATEGORY_MONTHLY,
        data: monthlyCategoryData,
      };
      return monthlyCategoryDataResult;
    }
  }

  @Get('month-status')
  async getMonthStatus(
    @LoggedInUser() user: SecureUser,
    @Query() query: GetStatisticsQueryDto,
  ) {
    const username = user.username;
    const { type: requestedType, month, year } = query;
    if (requestedType === StatisticsType.MONTH_STATUS) {
      const monthlyStatusData = await this.statisticsService.getMonthStatusData(
        username,
        month,
        year,
      );
      const monthlyStatusDataResult = {
        type: StatisticsType.MONTH_STATUS,
        month,
        data: monthlyStatusData,
      };
      return monthlyStatusDataResult;
    }
  }
}
