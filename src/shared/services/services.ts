import { CategoryService } from '../../category/services/CategoryService';
import { RecordService } from '../../record/services/RecordService';

export const services = {
    recordService: new RecordService(),
    categoryService: new CategoryService(),
};
