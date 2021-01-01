import { ControllerFunction } from './BaseController';
import { LoginToken } from './Login';

export interface AuthenticationController {
    login: ControllerFunction<LoginToken>;
    register: ControllerFunction<{ username: string }>;
}
