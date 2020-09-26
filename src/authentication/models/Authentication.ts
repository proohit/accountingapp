export interface Authentication {
  authenticated: boolean;
  username: string;
  login: (username: string, token: string) => void;
  logout: () => void;
}
