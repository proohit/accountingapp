import { ApiRoutes, UserSettingsDto } from '@accountingapp/shared';
import { BASE_API } from '../../shared/models/Api';

export interface SettingsApi {
  changePassword(oldPassword: string, newPassword: string): Promise<string>;
}

export class SettingsApiService implements SettingsApi {
  changePassword(oldPassword: string, newPassword: string): Promise<string> {
    return BASE_API.put(ApiRoutes.AUTHENTICATION_CHANGE_PASSWORD, {
      password: oldPassword,
      newPassword,
    });
  }
  resetPassword(
    username: string,
    token: string,
    newPassword: string
  ): Promise<string> {
    return BASE_API.put(ApiRoutes.AUTHENTICATION_RESET_PASSWORD, {
      username,
      token,
      newPassword,
    });
  }
  sendResetToken(username: string): Promise<void> {
    return BASE_API.put(ApiRoutes.AUTHENTICATION_REQUEST_RESET_TOKEN, {
      username,
    });
  }
  getUserSettings(): Promise<UserSettingsDto> {
    return BASE_API.get(ApiRoutes.SETTINGS);
  }
  updateSettings(settings: UserSettingsDto): Promise<UserSettingsDto> {
    return BASE_API.put(ApiRoutes.SETTINGS, settings);
  }
}
