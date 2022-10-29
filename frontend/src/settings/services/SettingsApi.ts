import { API_ROUTES } from '../../shared/constants/ApiRoutes';
import { BASE_API } from '../../shared/models/Api';
import { UserSettings } from '../models/UserSettings';

export interface SettingsApi {
  changePassword(oldPassword: string, newPassword: string): Promise<string>;
}

export class SettingsApiService implements SettingsApi {
  changePassword(oldPassword: string, newPassword: string): Promise<string> {
    return BASE_API.put(API_ROUTES.AUTHENTICATION_CHANGE_PASSWORD, {
      password: oldPassword,
      newPassword,
    });
  }
  getUserSettings(): Promise<UserSettings> {
    return BASE_API.get(API_ROUTES.SETTINGS);
  }
  updateSettings(settings: UserSettings): Promise<UserSettings> {
    return BASE_API.put(API_ROUTES.SETTINGS, settings);
  }
}
