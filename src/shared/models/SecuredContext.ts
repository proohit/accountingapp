import { ParameterizedContext } from 'koa';
import Router from 'koa-router';

export interface SecuredContext extends ParameterizedContext<any, Router.IRouterParamContext<any>> {
    state: { token: { username: string; exp: number; iat: number } };
}
