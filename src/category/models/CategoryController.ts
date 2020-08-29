import { ControllerFunction } from '../../shared/models/BaseController';
import { MessageResult } from '../../shared/models/RouteResult';
import { Category } from './Category';

export interface CategoryController {
    create: ControllerFunction<Category>;
    getByName: ControllerFunction<Category>;
    delete: ControllerFunction<MessageResult>;
    update: ControllerFunction<Category>;
}
