import { CategoryService } from '../../category/services/CategoryService';
import { RecordService } from '../../record/services/RecordService';
import { RecurrentRecordService } from '../../record/services/RecurrentRecordService';
import SettingsService from '../../settings/services/SettingsService';
import { StatisticsService } from '../../statistics/services/StatisticsService';
import UserService from '../../user/services/UserService';
import WalletService from '../../wallet/services/WalletService';
import { AuthenticationService } from './AuthenticationService';

type Services = {
    categoryService: CategoryService;
    recordService: RecordService;
    recurrentRecordService: RecurrentRecordService;
    settingsService: SettingsService;
    statisticsService: StatisticsService;
    userService: UserService;
    walletService: WalletService;
    authenticationService: AuthenticationService;
};

let localServices: Services = null;

export const services = () => {
    if (!localServices) {
        localServices = {
            recordService: new RecordService(),
            recurrentRecordService: new RecurrentRecordService(),
            categoryService: new CategoryService(),
            walletService: new WalletService(),
            userService: new UserService(),
            statisticsService: new StatisticsService(),
            authenticationService: new AuthenticationService(),
            settingsService: new SettingsService(),
        };
        return localServices;
    }
    return localServices;
};
