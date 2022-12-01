import {
  DailyDataDto,
  DailyStatisticsResultDto,
  MonthlyStatisticsResultDto,
  MonthStatusStatisticsResultDto,
  StatisticsType,
} from '@accountingapp/shared';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { LoggedInUser } from '../auth/user.decorator';
import { SecureUser } from '../users/entities/secure-user';
import GetMonthStatusDto from './dtos/get-month-status.dto';
import MonthYearQuery from './dtos/month-yearh-query.dto';
import YearQuery from './dtos/year-query.dto';
import { StatisticsService } from './statistics.service';

@UseGuards(AuthenticatedGuard)
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('daily')
  async getDailyStatistics(
    @Query() query: MonthYearQuery,
    @LoggedInUser() user: SecureUser,
  ): Promise<MonthlyStatisticsResultDto | DailyStatisticsResultDto> {
    const username = user.username;
    const { month, year } = query;

    const dailyData: DailyDataDto[] =
      await this.statisticsService.getDailyDataForMonth(username, month, year);
    const dailyDataResult: DailyStatisticsResultDto = {
      type: StatisticsType.DAILY,
      month,
      data: dailyData,
    };
    return dailyDataResult;
  }

  @Get('monthly')
  async getMonthlyStatistics(
    @Query() query: YearQuery,
    @LoggedInUser() user: SecureUser,
  ): Promise<MonthlyStatisticsResultDto | DailyStatisticsResultDto> {
    const username = user.username;
    const { year } = query;

    const monthlyData = await this.statisticsService.getMonthlyDataForYear(
      username,
      year,
    );
    const monthlyDataResult: MonthlyStatisticsResultDto = {
      type: StatisticsType.MONTHLY,
      data: monthlyData,
      year,
    };
    return monthlyDataResult;
  }

  @Get('categories')
  async getCategoryStatistics(
    @LoggedInUser() user: SecureUser,
    @Query() query: MonthYearQuery,
  ) {
    const username = user.username;

    const { month, year } = query;
    const monthlyCategoryData =
      await this.statisticsService.getMonthCategoryData(username, month, year);
    const monthlyCategoryDataResult = {
      type: StatisticsType.CATEGORY_MONTHLY,
      data: monthlyCategoryData,
    };
    return monthlyCategoryDataResult;
  }

  @Get('month-status')
  async getMonthStatus(
    @LoggedInUser() user: SecureUser,
    @Query() query: GetMonthStatusDto,
  ): Promise<MonthStatusStatisticsResultDto> {
    const username = user.username;
    const { month, year, calculatePlannedFromDate } = query;
    const monthlyStatusData = await this.statisticsService.getMonthStatusData(
      username,
      month,
      year,
      calculatePlannedFromDate,
    );
    const monthlyStatusDataResult: MonthStatusStatisticsResultDto = {
      type: StatisticsType.MONTH_STATUS,
      month,
      data: monthlyStatusData,
    };
    return monthlyStatusDataResult;
  }
}
