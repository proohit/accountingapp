export interface Authentication {
  authenticated: boolean;
  username: string;
  token: string;
  login: (username: string, token: string) => void;
  logout: () => void;
}
