import { Context } from 'koa';

export interface SecuredContext extends Context {
    state: { token: { username: string; exp: number; iat: number } };
}
