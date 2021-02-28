import { ControllerFunction } from '../../shared/models/BaseController';
import { StatisticsResult } from './StatisticsResult';
export interface StatisticsController {
    getStatistics: ControllerFunction<StatisticsResult>;
}
