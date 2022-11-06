import { UserDto } from '@accountingapp/shared';

export interface Authentication {
  authenticated: boolean;
  username: string;
  user: UserDto;
  login: (username: string, password: string) => Promise<UserDto>;
  offlineLogin: (user: UserDto) => void;
  logout: () => void;
  isLoginLoading: boolean;
}
