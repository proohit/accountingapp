import { CategoryService } from '../../category/services/CategoryService';
import { RecordService } from '../../record/services/RecordService';
import { RecurrentRecordService } from '../../record/services/RecurrentRecordService';
import { StatisticsService } from '../../statistics/services/StatisticsService';
import UserService from '../../user/services/UserService';
import WalletService from '../../wallet/services/WalletService';
import { AuthenticationService } from './AuthenticationService';

export const services = {
    recordService: new RecordService(),
    recurrentRecordService: new RecurrentRecordService(),
    categoryService: new CategoryService(),
    walletService: new WalletService(),
    userService: new UserService(),
    statisticsService: new StatisticsService(),
    authenticationService: new AuthenticationService(),
};
