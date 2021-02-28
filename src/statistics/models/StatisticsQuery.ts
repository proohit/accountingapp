import { StatisticsType } from './StatisticsResult';

export interface StatisticsQuery {
    type: StatisticsType;
    month?: number;
}
