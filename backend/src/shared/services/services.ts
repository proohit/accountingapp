import { CategoryService } from '../../category/services/CategoryService';
import { RecordService } from '../../record/services/RecordService';
import { StatisticsService } from '../../statistics/services/StatisticsService';
import UserService from '../../user/services/UserService';
import WalletService from '../../wallet/services/WalletService';
import { AuthenticationService } from './AuthenticationService';

export const services = {
    recordService: new RecordService(),
    categoryService: new CategoryService(),
    walletService: new WalletService(),
    userService: new UserService(),
    statisticsService: new StatisticsService(),
    authenticationService: new AuthenticationService(),
};
