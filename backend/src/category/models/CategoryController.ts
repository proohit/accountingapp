import { ControllerFunction } from '../../shared/models/BaseController';
import { MessageResult } from '../../shared/models/RouteResult';
import { Category } from '../../entity/Category';
export interface CategoryController {
    create: ControllerFunction<Category>;
    getById: ControllerFunction<Category>;
    getByUser: ControllerFunction<Category[]>;
    delete: ControllerFunction<MessageResult>;
    update: ControllerFunction<Category>;
}
