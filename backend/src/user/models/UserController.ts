import { User } from '../../entity/User';
import { ControllerFunction } from '../../shared/models/BaseController';
import { MessageResult } from '../../shared/models/RouteResult';

export interface UserController {
    getCurrentUser: ControllerFunction<User>;
    changePassword: ControllerFunction<MessageResult>;
}
