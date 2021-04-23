import { User } from '../../users/models/User';

export interface Authentication {
  authenticated: boolean;
  username: string;
  login: (username: string, password: string) => Promise<User>;
  offlineLogin: (username: string) => void;
  logout: () => void;
  isLoginLoading: boolean;
}
