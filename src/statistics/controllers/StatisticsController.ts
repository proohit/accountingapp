import { MissingProperty } from '../../shared/models/Errors';
import { services } from '../../shared/services/services';
import { StatisticsController } from '../models/StatisticsController';
import { DailyData, DailyStatisticsResult, StatisticsType } from '../models/StatisticsResult';

const StatisticsControllerImpl: StatisticsController = {
    async getStatistics(ctx) {
        const username = ctx.state.user.username;
        const requestedType: StatisticsType = ctx.query.type;
        const month = Number(ctx.query.month);
        const year = Number(ctx.query.year);
        if (!requestedType) {
            throw new MissingProperty(['type']);
        }
        if (requestedType === StatisticsType.DAILY) {
            if (!month) {
                throw new MissingProperty(['month']);
            }
            if (!year) {
                throw new MissingProperty(['year']);
            }
            const dailyData: DailyData[] = await services.statisticsService.getDailyDataForMonth(username, month, year);
            const dailyDataResult: DailyStatisticsResult = { type: StatisticsType.DAILY, month, data: dailyData };
            return { status: 200, data: dailyDataResult };
        }
        if (requestedType === StatisticsType.MONTHLY) {
            if (!year) {
                throw new MissingProperty(['year']);
            }
            const monthlyData = await services.statisticsService.getMonthlyDataForYear(username, year);
            const monthlyDataResult = { type: StatisticsType.MONTHLY, data: monthlyData };
            return { status: 200, data: monthlyDataResult };
        }
    },
    async getCategoryStatistics(ctx) {
        const username = ctx.state.user.username;
        const requestedType: StatisticsType = ctx.query.type;
        const month = Number(ctx.query.month);
        const year = Number(ctx.query.year);
        if (requestedType === StatisticsType.CATEGORY_MONTHLY) {
            if (!month) {
                throw new MissingProperty(['month']);
            }
            if (!year) {
                throw new MissingProperty(['year']);
            }
            const monthlyCategoryData = await services.statisticsService.getMonthCategoryData(username, month, year);
            const monthlyCategoryDataResult = { type: StatisticsType.CATEGORY_MONTHLY, data: monthlyCategoryData };
            return { status: 200, data: monthlyCategoryDataResult };
        }
    },
};

export default StatisticsControllerImpl;
