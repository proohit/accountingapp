import { User } from '../../users/models/User';

export interface Authentication {
  authenticated: boolean;
  username: string;
  user: User;
  login: (username: string, password: string) => Promise<User>;
  offlineLogin: (user: User) => void;
  logout: () => void;
  isLoginLoading: boolean;
}
