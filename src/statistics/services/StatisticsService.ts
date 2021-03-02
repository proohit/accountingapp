import { LessThan } from 'typeorm';
import { repositories } from '../../shared/repositories/database';
import { services } from '../../shared/services/services';
import { DailyData } from '../models/StatisticsResult';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
export class StatisticsService {
    async getDailyDataForMonth(username: string, month: number, year: number): Promise<DailyData[]> {
        const recordsRepo = repositories.records();
        const walletsService = services.walletService;

        const recordsUntilMonth = await recordsRepo.find({
            where: {
                timestamp: LessThan(dayjs().date(1).year(year).month(month).toISOString()),
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
        const daysInMonth = dayjs()
            .year(year)
            .month(month - 1)
            .daysInMonth();
        const daysStatistics = [];
        daysStatistics.push(lastDayOfPreviousMonth.format('YYYY-MM-DD'));
        for (let day = 1; day <= daysInMonth; day++) {
            daysStatistics.push(
                dayjs()
                    .year(year)
                    .month(month - 1)
                    .date(day)
                    .format('YYYY-MM-DD'),
            );
        }
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
}
