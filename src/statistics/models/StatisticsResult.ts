export enum StatisticsType {
    MONTHLY = 'monthly',
    DAILY = 'daily',
}

export interface DailyStatisticsResult extends StatisticsResult {
    type: StatisticsType.DAILY;
    month: number;
    data: DailyData[];
}

export interface StatisticsResult {
    type: StatisticsType;
}

export interface DailyData {
    walletName: string;
    data: { day: string; balance: number }[];
}
