import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Between, LessThan } from 'typeorm';
import { repositories } from '../../shared/repositories/database';
import { services } from '../../shared/services/services';
import { getDaysInMonth } from '../../shared/utils/dateUtils';
import { CategoryBalanceData, DailyData, MonthlyData, MonthStatusData } from '../models/StatisticsResult';
dayjs.extend(isBetween);
export class StatisticsService {
    async getDailyDataForMonth(username: string, month: number, year: number): Promise<DailyData[]> {
        const recordsRepo = repositories.records();
        const walletsService = services().walletService;

        const recordsUntilMonth = await recordsRepo.find({
            where: {
                timestamp: dayjs(LessThan(dayjs().date(1).year(year).month(month).toISOString()).value).toDate(),
                ownerUsername: username,
            },
            order: { timestamp: 'DESC' },
        });

        const lastDayOfPreviousMonth = dayjs()
            .year(year)
            .month(month - 2)
            .endOf('month');
        const lastDayOfMonth = dayjs()
            .year(year)
            .month(month - 1)
            .endOf('month');
        const recordsBeforeMonth = recordsUntilMonth.filter((record) =>
            dayjs(record.timestamp).isBefore(lastDayOfPreviousMonth),
        );
        const recordsInMonth = recordsUntilMonth.filter((record) =>
            dayjs(record.timestamp).isBetween(lastDayOfPreviousMonth, lastDayOfMonth),
        );
        const walletsOfUser = await walletsService.getByUser(username);
        const balancesBeforeMonth = walletsOfUser.map((wallet) => {
            const recordsOfWalletBeforeMonth = recordsBeforeMonth.filter((record) => record.walletId === wallet.id);
            const balanceOfWalletBeforeMonth = recordsOfWalletBeforeMonth.reduce(
                (sum, record) => sum + record.value,
                wallet.balance,
            );
            return { walletId: wallet.id, balance: balanceOfWalletBeforeMonth };
        });

        const daysStatistics = getDaysInMonth(month, year);
        daysStatistics.unshift(lastDayOfPreviousMonth.format('YYYY-MM-DD'));

        const walletsDayData = [];
        for (const wallet of walletsOfUser) {
            const walletData: DailyData = {
                walletName: wallet.name,
                data: [],
            };
            for (const day of daysStatistics) {
                const recordsForDayForWallet = recordsInMonth.filter(
                    (record) => dayjs(record.timestamp).isSame(dayjs(day), 'date') && record.walletId === wallet.id,
                );
                const balanceOfWalletBeforeMonth =
                    balancesBeforeMonth.find((balanceData) => balanceData.walletId === wallet.id)?.balance ||
                    wallet.balance;
                const balanceOfDay = recordsForDayForWallet.reduce(
                    (balance, record) => balance + record.value,
                    walletData.data[walletData.data.length - 1]?.balance || balanceOfWalletBeforeMonth,
                );
                walletData.data.push({
                    day,
                    balance: balanceOfDay,
                });
            }
            walletsDayData.push(walletData);
        }
        return walletsDayData;
    }

    async getMonthlyDataForYear(username: string, year: number): Promise<MonthlyData[]> {
        const recordsRepo = repositories.records();
        const endOfYear = dayjs().year(year).endOf('year');
        const recordsUntilYear = await recordsRepo.find({
            where: {
                timestamp: dayjs(LessThan(endOfYear.toISOString()).value).toDate(),
                ownerUsername: username,
            },
            order: { timestamp: 'DESC' },
        });
        const beginningOfYear = dayjs().year(year).startOf('year');
        const recordsBeforeYear = recordsUntilYear.filter((record) =>
            dayjs(record.timestamp).isBefore(beginningOfYear),
        );
        const userWallets = await services().walletService.getByUser(username);
        const initialWalletBalances = userWallets.reduce((balances, wallet) => wallet.balance + balances, 0);
        const totalStatusBeforeYear = recordsBeforeYear.reduce(
            (totalStatus, record) => totalStatus + record.value,
            initialWalletBalances,
        );

        const monthlyData: MonthlyData[] = [];

        const months = 12;
        for (let month = 1; month <= months; month++) {
            const currentMonth = dayjs().month(month - 1);
            const recordsInMonth = recordsUntilYear.filter((record) =>
                dayjs(record.timestamp).isSame(currentMonth, 'month'),
            );
            const totalStatusAfterMonth = recordsInMonth.reduce(
                (totalStatus, record) => totalStatus + record.value,
                monthlyData[monthlyData.length - 1]?.totalBalance || totalStatusBeforeYear,
            );
            monthlyData.push({ month, totalBalance: totalStatusAfterMonth });
        }

        return monthlyData;
    }

    async getMonthCategoryData(username: string, month: number, year: number): Promise<CategoryBalanceData[]> {
        const recordsRepo = repositories.records();
        const fromDay = dayjs().year(year).month(month).startOf('month');
        const untilDay = dayjs().year(year).month(month).endOf('month');
        const recordsForMonth = await recordsRepo.find({
            where: {
                timestamp: dayjs(Between(fromDay.toISOString(), untilDay.toISOString()).value).toDate(),
                ownerUsername: username,
            },
            order: { timestamp: 'DESC' },
        });

        const categoryIdsForMonth = [...new Set(recordsForMonth.map((record) => record.categoryId))];

        const monthlyCategoryData: CategoryBalanceData[] = [];
        for (const categoryId of categoryIdsForMonth) {
            const recordsForCategory = recordsForMonth.filter((record) => record.categoryId === categoryId);
            const categoryBalance = recordsForCategory.reduce((balance, record) => balance + record.value, 0);
            monthlyCategoryData.push({ category: categoryId, balance: categoryBalance });
        }
        return monthlyCategoryData;
    }

    async getMonthStatusData(username: string, month: number, year: number): Promise<MonthStatusData> {
        const recordsRepo = repositories.records();
        const fromDay = dayjs().year(year).month(month).startOf('month');
        const untilDay = dayjs().year(year).month(month).endOf('month');
        const recordsForMonth = await recordsRepo.find({
            where: {
                timestamp: dayjs(Between(fromDay.toISOString(), untilDay.toISOString()).value).toDate(),
                ownerUsername: username,
            },
            order: { timestamp: 'DESC' },
        });

        const totalBalance = recordsForMonth.reduce((balance, record) => balance + record.value, 0);

        return { balance: totalBalance };
    }
}
