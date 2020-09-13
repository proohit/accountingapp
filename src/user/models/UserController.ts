import { ControllerFunction } from '../../shared/models/BaseController';
import { User } from '../models/User';

export interface UserController {
    getCurrentUser: ControllerFunction<User>;
}
