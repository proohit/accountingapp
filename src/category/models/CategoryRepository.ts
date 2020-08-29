import { Repository } from '../../shared/models/Repository';
import { MessageResult } from '../../shared/models/RouteResult';
import { Category } from './Category';
import { User } from '../../user/models/User';

export interface CategoryRepository extends Repository {
    create: (username: User['username'], name: Category['name']) => Promise<Category>;
    getByName: (username: User['username'], name: Category['name']) => Promise<Category>;
    delete: (username: User['username'], name: Category['name']) => Promise<MessageResult>;
    update: (username: User['username'], oldName: Category['name'], newName: Category['name']) => Promise<Category>;
    getByUser: (username: User['username']) => Promise<Category[]>;
}
