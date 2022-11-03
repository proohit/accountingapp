export class ApiRoutes {
  static readonly BASE_ROUTE = `/api`;
  static readonly AUTHENTICATION = `${ApiRoutes.BASE_ROUTE}/auth`;
  static readonly AUTHENTICATION_REGISTER = `${ApiRoutes.AUTHENTICATION}/register`;
  static readonly AUTHENTICATION_LOGIN = `${ApiRoutes.AUTHENTICATION}/login`;
  static readonly AUTHENTICATION_LOGOUT = `${ApiRoutes.AUTHENTICATION}/logout`;
  static readonly AUTHENTICATION_ME = `${ApiRoutes.AUTHENTICATION}/me`;
  static readonly AUTHENTICATION_CHANGE_PASSWORD = `${ApiRoutes.AUTHENTICATION}/password-change`;
  static readonly RECORDS = `${ApiRoutes.BASE_ROUTE}/records`;
  static readonly RECORDS_CHECK_EXTERNAL_REFERENCES = `${ApiRoutes.RECORDS}/existingExternalReferences`;
  static readonly RECORDS_BULK_CREATE = `${ApiRoutes.RECORDS}/bulkCreate`;
  static readonly RECURRENT_RECORDS = `${ApiRoutes.BASE_ROUTE}/recurrent-records`;
  static readonly WALLETS = `${ApiRoutes.BASE_ROUTE}/wallets`;
  static readonly CATEGORIES = `${ApiRoutes.BASE_ROUTE}/categories`;
  static readonly STATISTICS = `${ApiRoutes.BASE_ROUTE}/statistics`;
  static readonly STATISTICS_CATEGORIES = `${ApiRoutes.STATISTICS}/categories`;
  static readonly STATISTICS_STATUS = `${ApiRoutes.STATISTICS}/month-status`;
  static readonly SETTINGS = `${ApiRoutes.BASE_ROUTE}/settings`;
}
