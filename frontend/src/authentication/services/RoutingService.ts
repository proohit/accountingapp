export const isAuthenticationRoute = (route: string) => {
  return ['/login', '/register'].includes(route);
};

export const isOfflineRoute = (route: string) => {
  return route === '/_offline';
};

export const isPasswordResetRoute = (route: string) => {
  return route === '/settings/reset-password';
};

export const ignoreRoute = (route: string) => {
  return (
    !isAuthenticationRoute(route) ||
    !isOfflineRoute(route) ||
    !isPasswordResetRoute(route)
  );
};
