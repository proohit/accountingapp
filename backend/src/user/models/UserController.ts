import { ControllerFunction } from '../../shared/models/BaseController';

export interface UserController {
    getCurrentUser: ControllerFunction<{ username: string }>;
}
