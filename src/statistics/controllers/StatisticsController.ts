import { MissingProperty } from '../../shared/models/Errors';
import { services } from '../../shared/services/services';
import { StatisticsController } from '../models/StatisticsController';
import { DailyData, DailyStatisticsResult, StatisticsType } from '../models/StatisticsResult';

const StatisticsControllerImpl: StatisticsController = {
    async getStatistics(ctx) {
        const username = ctx.state.token.username;
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
    },
};

export default StatisticsControllerImpl;
