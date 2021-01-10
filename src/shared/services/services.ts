import { CategoryService } from '../../category/services/CategoryService';
import { RecordService } from '../../record/services/RecordService';
import WalletService from '../../wallet/services/WalletService';

export const services = {
    recordService: new RecordService(),
    categoryService: new CategoryService(),
    walletService: new WalletService(),
};
