import { ApiRoutes, UserDto } from '@accountingapp/shared';
import { BASE_API } from '../../shared/models/Api';
import { LoginRequest, RegisterRequest } from '../models/Requests';

export interface AuthenticationApi {
  login: (username: string, password: string) => Promise<UserDto>;
  register: (
    username: string,
    password: string,
    email: string
  ) => Promise<UserDto>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<UserDto>;
}

export const AUTHENTICATION_API: AuthenticationApi = {
  login: async (username, password) => {
    return BASE_API.post<LoginRequest, UserDto>(
      ApiRoutes.AUTHENTICATION_LOGIN,
      { username, password }
    );
  },
  register: async (username, password, email) => {
    return BASE_API.post<RegisterRequest, UserDto>(
      ApiRoutes.AUTHENTICATION_REGISTER,
      { username, password, email }
    );
  },
  logout: () => {
    return BASE_API.post(ApiRoutes.AUTHENTICATION_LOGOUT, {});
  },
  getCurrentUser: () => {
    return BASE_API.get(ApiRoutes.AUTHENTICATION_ME);
  },
};
