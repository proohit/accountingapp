export interface Authentication {
  authenticated: boolean;
  username: string;
  login: (username: string) => void;
  logout: () => void;
  isLoginLoading: boolean;
}
