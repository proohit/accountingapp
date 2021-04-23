export const isAuthenticationRoute = (route: string) => {
  return ['/login', '/register'].includes(route);
};
