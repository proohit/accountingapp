export class API_ROUTES {
  static readonly BASE_HOST =
    process.env.NODE_ENV === 'production'
      ? 'https://accounting.timurnet.de'
      : 'http://localhost:3002';
  static readonly BASE_ROUTE = `${API_ROUTES.BASE_HOST}/api`;

  static readonly AUTHENTICATION = `${API_ROUTES.BASE_ROUTE}/auth`;
  static readonly AUTHENTICATION_REGISTER = `${API_ROUTES.AUTHENTICATION}/register`;
  static readonly AUTHENTICATION_LOGIN = `${API_ROUTES.AUTHENTICATION}/login`;
  static readonly AUTHENTICATION_LOGOUT = `${API_ROUTES.AUTHENTICATION}/logout`;
  static readonly AUTHENTICATION_ME = `${API_ROUTES.AUTHENTICATION}/me`;
  static readonly AUTHENTICATION_CHANGE_PASSWORD = `${API_ROUTES.AUTHENTICATION}/password-change`;
  static readonly RECORDS = `${API_ROUTES.BASE_ROUTE}/records`;
  static readonly RECORDS_CHECK_EXTERNAL_REFERENCES = `${API_ROUTES.RECORDS}/existingExternalReferences`;
  static readonly RECORDS_BULK_CREATE = `${API_ROUTES.RECORDS}/bulkCreate`;
  static readonly RECURRENT_RECORDS = `${API_ROUTES.RECORDS}/recurrentRecords`;
  static readonly WALLETS = `${API_ROUTES.BASE_ROUTE}/wallets`;
  static readonly CATEGORIES = `${API_ROUTES.BASE_ROUTE}/categories`;
  static readonly STATISTICS = `${API_ROUTES.BASE_ROUTE}/statistics`;
  static readonly STATISTICS_CATEGORIES = `${API_ROUTES.STATISTICS}/categories`;
  static readonly STATISTICS_STATUS = `${API_ROUTES.STATISTICS}/month-status`;
  static readonly SETTINGS = `${API_ROUTES.BASE_ROUTE}/settings`;
}
