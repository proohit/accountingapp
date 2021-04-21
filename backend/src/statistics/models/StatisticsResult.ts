export enum StatisticsType {
    MONTHLY = 'monthly',
    DAILY = 'daily',
    CATEGORY_MONTHLY = 'category_daily',
}

export interface DailyStatisticsResult extends StatisticsResult {
    type: StatisticsType.DAILY;
    month: number;
    data: DailyData[];
}

export interface MonthlyStatisticsResult extends StatisticsResult {
    type: StatisticsType.MONTHLY;
    year: number;
    data: MonthlyData[];
}

export interface MonthCategoryStatisticsResult extends StatisticsResult {
    type: StatisticsType.CATEGORY_MONTHLY;
    month: number;
    data: CategoryBalanceData[];
}

export interface StatisticsResult {
    type: StatisticsType;
}

export interface DailyData {
    walletName: string;
    data: { day: string; balance: number }[];
}

export interface MonthlyData {
    month: number;
    totalBalance: number;
}

export interface CategoryBalanceData {
    category: string;
    balance: number;
}
