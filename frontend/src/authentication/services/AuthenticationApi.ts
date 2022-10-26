import { API_ROUTES } from '../../shared/constants/ApiRoutes';
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
}

export const AUTHENTICATION_API: AuthenticationApi = {
  login: async (username, password) => {
    return BASE_API.post<LoginRequest, LoginResponse>(
      API_ROUTES.AUTHENTICATION_LOGIN,
      { username, password }
    );
  },
  register: async (username, password, email) => {
    return BASE_API.post<RegisterRequest, RegisterResponse>(
      API_ROUTES.AUTHENTICATION_REGISTER,
      { username, password, email }
    );
  },
  logout: () => {
    return BASE_API.post(API_ROUTES.AUTHENTICATION_LOGOUT, {});
  },
};
