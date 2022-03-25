import { ControllerFunction } from '../../shared/models/BaseController';
import { UserSettings } from './Settings';

export interface SettingsController {
    getUserSettings: ControllerFunction<UserSettings>;
    updateSettings: ControllerFunction<UserSettings>;
}
