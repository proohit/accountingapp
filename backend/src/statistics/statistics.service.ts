import {
  CategoryBalanceDataDto,
  DailyDataDto,
  MonthlyDataDto,
  MonthStatusDataDto,
} from '@accountingapp/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Between, LessThan, Repository } from 'typeorm';
import Record from '../record/entities/record.entity';
import { RecurrentRecordService } from '../record/recurrent-record/recurrent-record.service';
import { WalletService } from '../wallet/wallet.service';
dayjs.extend(isBetween);

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Record)
    private readonly recordsRepository: Repository<Record>,
    private readonly recurrentRecordsService: RecurrentRecordService,
    private readonly walletService: WalletService,
  ) {}

  async getDailyDataForMonth(
    username: string,
    month: number,
    year: number,
  ): Promise<DailyDataDto[]> {
    const recordsRepo = this.recordsRepository;
    const walletsService = this.walletService;

    const recordsUntilMonth = await recordsRepo.find({
      where: {
        timestamp: LessThan(
          dayjs().date(1).year(year).month(month).toISOString(),
        ),
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
      const recordsOfWalletBeforeMonth = recordsBeforeMonth.filter(
        (record) => record.walletId === wallet.id,
      );
      const balanceOfWalletBeforeMonth = recordsOfWalletBeforeMonth.reduce(
        (sum, record) => sum + record.value,
        wallet.balance,
      );
      return { walletId: wallet.id, balance: balanceOfWalletBeforeMonth };
    });

    const daysStatistics = this.getDaysInMonth(month, year);
    daysStatistics.unshift(lastDayOfPreviousMonth.format('YYYY-MM-DD'));

    const walletsDayData = [];
    for (const wallet of walletsOfUser) {
      const walletData: DailyDataDto = {
        walletName: wallet.name,
        data: [],
      };
      for (const day of daysStatistics) {
        const recordsForDayForWallet = recordsInMonth.filter(
          (record) =>
            dayjs(record.timestamp).isSame(dayjs(day), 'date') &&
            record.walletId === wallet.id,
        );
        const balanceOfWalletBeforeMonth =
          balancesBeforeMonth.find(
            (balanceData) => balanceData.walletId === wallet.id,
          )?.balance || wallet.balance;
        const balanceOfDay = recordsForDayForWallet.reduce(
          (balance, record) => balance + record.value,
          walletData.data[walletData.data.length - 1]?.balance ||
            balanceOfWalletBeforeMonth,
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

  async getMonthlyDataForYear(
    username: string,
    year: number,
  ): Promise<MonthlyDataDto[]> {
    const recordsRepo = this.recordsRepository;
    const endOfYear = dayjs().year(year).endOf('year');
    const recordsUntilYear = await recordsRepo.find({
      where: {
        timestamp: LessThan(endOfYear.toISOString()),
        ownerUsername: username,
      },
      order: { timestamp: 'DESC' },
    });
    const beginningOfYear = dayjs().year(year).startOf('year');
    const recordsBeforeYear = recordsUntilYear.filter((record) =>
      dayjs(record.timestamp).isBefore(beginningOfYear),
    );
    const userWallets = await this.walletService.getByUser(username);
    const initialWalletBalances = userWallets.reduce(
      (balances, wallet) => wallet.balance + balances,
      0,
    );
    const totalStatusBeforeYear = recordsBeforeYear.reduce(
      (totalStatus, record) => totalStatus + record.value,
      initialWalletBalances,
    );

    const monthlyData: MonthlyDataDto[] = [];

    const months = 12;
    for (let month = 1; month <= months; month++) {
      const currentMonth = dayjs().month(month - 1);
      const recordsInMonth = recordsUntilYear.filter((record) =>
        dayjs(record.timestamp).isSame(currentMonth, 'month'),
      );
      const totalStatusAfterMonth = recordsInMonth.reduce(
        (totalStatus, record) => totalStatus + record.value,
        monthlyData[monthlyData.length - 1]?.totalBalance ||
          totalStatusBeforeYear,
      );
      monthlyData.push({ month, totalBalance: totalStatusAfterMonth });
    }

    return monthlyData;
  }

  async getMonthCategoryData(
    username: string,
    month: number,
    year: number,
  ): Promise<CategoryBalanceDataDto[]> {
    const recordsRepo = this.recordsRepository;
    const fromDay = dayjs().year(year).month(month).startOf('month');
    const untilDay = dayjs().year(year).month(month).endOf('month');
    const recordsForMonth = await recordsRepo.find({
      where: {
        timestamp: Between(fromDay.toISOString(), untilDay.toISOString()),
        ownerUsername: username,
      },
      order: { timestamp: 'DESC' },
    });

    const categoryIdsForMonth = [
      ...new Set(recordsForMonth.map((record) => record.categoryId)),
    ];

    const monthlyCategoryData: CategoryBalanceDataDto[] = [];
    for (const categoryId of categoryIdsForMonth) {
      const recordsForCategory = recordsForMonth.filter(
        (record) => record.categoryId === categoryId,
      );
      const categoryBalance = recordsForCategory.reduce(
        (balance, record) => balance + record.value,
        0,
      );
      monthlyCategoryData.push({
        category: categoryId,
        balance: categoryBalance,
      });
    }
    return monthlyCategoryData;
  }

  async getMonthStatusData(
    username: string,
    month: number,
    year: number,
    calculatePlannedFromDate: string,
  ): Promise<MonthStatusDataDto> {
    const fromDay = dayjs().year(year).month(month).startOf('month');
    const untilDay = dayjs().year(year).month(month).endOf('month');

    const requestedRecords = await this.recordsRepository.find({
      where: {
        timestamp: Between(fromDay.toISOString(), untilDay.toISOString()),
        ownerUsername: username,
      },
      order: { timestamp: 'DESC' },
    });

    const totalBalance = requestedRecords.reduce(
      (balance, record) => balance + record.value,
      0,
    );

    const nextRecurrentRecords =
      await this.recurrentRecordsService.getNextInvocationsByUserForMonth(
        username,
        month,
        year,
      );

    const relevantNextRecurrentRecords = nextRecurrentRecords.filter((record) =>
      dayjs(record.nextInvocation).isAfter(dayjs(calculatePlannedFromDate)),
    );

    const totalPlannedOutcomes = relevantNextRecurrentRecords
      .filter((record) => record.value < 0)
      .reduce((balance, record) => balance + record.value, 0);

    const totalPlannedIncome = relevantNextRecurrentRecords
      .filter((record) => record.value > 0)
      .reduce((balance, record) => balance + record.value, 0);

    return {
      balance: totalBalance,
      plannedOutcomes: totalPlannedOutcomes,
      plannedIncomes: totalPlannedIncome,
    };
  }

  private getDaysInMonth = (month: number, year: number, format?: string) => {
    const daysInMonth = dayjs()
      .year(year)
      .month(month - 1)
      .daysInMonth();
    const daysStatistics = [];
    for (let day = 1; day <= daysInMonth; day++) {
      daysStatistics.push(
        dayjs()
          .year(year)
          .month(month - 1)
          .date(day)
          .format(format || 'YYYY-MM-DD'),
      );
    }
    return daysStatistics;
  };
}
