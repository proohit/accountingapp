import { API_ROUTES } from '../../shared/constants/ApiRoutes';
import { BASE_API } from '../../shared/models/Api';

export interface SettingsApi {
  changePassword(oldPassword: string, newPassword: string): Promise<string>;
}

export class SettingsApiService implements SettingsApi {
  changePassword(oldPassword: string, newPassword: string): Promise<string> {
    return BASE_API.put(API_ROUTES.USERS_CHANGE_PASSWORD, {
      password: oldPassword,
      newPassword,
    });
  }
}
