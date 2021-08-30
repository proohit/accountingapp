import { ControllerFunction } from '../../shared/models/BaseController';
import { MessageResult } from '../../shared/models/RouteResult';

export interface UserController {
    getCurrentUser: ControllerFunction<{ username: string }>;
    changePassword: ControllerFunction<MessageResult>;
}
