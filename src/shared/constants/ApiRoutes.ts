export class API_ROUTES {
  static readonly BASE_HOST =
    process.env.NODE_ENV === 'production'
      ? 'https://accounting.timurnet.de'
      : 'http://localhost:3002';
  static readonly BASE_ROUTE = `${API_ROUTES.BASE_HOST}/api`;

  static readonly AUTHENTICATION = `${API_ROUTES.BASE_ROUTE}/auth`;
  static readonly AUTHENTICATION_REGISTER = `${API_ROUTES.AUTHENTICATION}/register`;
  static readonly AUTHENTICATION_LOGIN = `${API_ROUTES.AUTHENTICATION}/login`;
  static readonly USERS = `${API_ROUTES.BASE_ROUTE}/users`;
  static readonly USERS_ME = `${API_ROUTES.USERS}/me`;
  static readonly RECORDS = `${API_ROUTES.BASE_ROUTE}/records`;
}
