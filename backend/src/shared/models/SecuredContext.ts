import { Context, DefaultState, ParameterizedContext } from 'koa';
import Router from 'koa-router';

export interface SecuredContext
    extends ParameterizedContext<DefaultState, Context & Router.IRouterParamContext<DefaultState, Context>> {
    state: { user: { username: string } };
}
