import { ControllerFunction } from '../../shared/models/BaseController';
import { MessageResult } from '../../shared/models/RouteResult';
import { Category } from '../../entity/Category';

type ManipulateCategory = {
    name: Category['name'];
};

export interface CategoryController {
    create: ControllerFunction<Category, ManipulateCategory>;
    getById: ControllerFunction<Category>;
    getByUser: ControllerFunction<Category[]>;
    delete: ControllerFunction<MessageResult>;
    update: ControllerFunction<Category, ManipulateCategory>;
}
