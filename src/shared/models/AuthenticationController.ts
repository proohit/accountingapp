import { ControllerFunction } from './BaseController';
import { LoginToken } from './Login';

export interface AuthenticationController {
    login: ControllerFunction<LoginToken>;
    logout: ControllerFunction<{ message: string }>;
    register: ControllerFunction<{ username: string }>;
}
