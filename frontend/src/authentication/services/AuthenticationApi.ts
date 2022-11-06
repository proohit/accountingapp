import { ApiRoutes } from '@accountingapp/shared';
import { BASE_API } from '../../shared/models/Api';
import { LoginRequest, RegisterRequest } from '../models/Requests';
import { LoginResponse, RegisterResponse } from '../models/Responses';

export interface AuthenticationApi {
  login: (username: string, password: string) => Promise<LoginResponse>;
  register: (
    username: string,
    password: string,
    email: string
  ) => Promise<RegisterResponse>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<LoginResponse>;
}

export const AUTHENTICATION_API: AuthenticationApi = {
  login: async (username, password) => {
    return BASE_API.post<LoginRequest, LoginResponse>(
      ApiRoutes.AUTHENTICATION_LOGIN,
      { username, password }
    );
  },
  register: async (username, password, email) => {
    return BASE_API.post<RegisterRequest, RegisterResponse>(
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
