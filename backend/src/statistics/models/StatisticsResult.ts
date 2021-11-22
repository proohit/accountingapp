export enum StatisticsType {
    MONTHLY = 'monthly',
    DAILY = 'daily',
    CATEGORY_MONTHLY = 'category_daily',
    MONTH_STATUS = 'month_status',
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

export interface MonthStatusStatisticsResult extends StatisticsResult {
    type: StatisticsType.MONTH_STATUS;
    month: number;
    data: MonthStatusData;
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

export interface MonthStatusData {
    balance: number;
}
