import { Context, DefaultContext, DefaultState, ParameterizedContext, Request } from 'koa';
import Router from '@koa/router';

export interface SecuredContext<RequestBody = unknown>
    extends ParameterizedContext<DefaultState, Context & Router.RouterParamContext<DefaultState, Context>> {
    state: { user: { username: string } };
    request: Request & { body: RequestBody };
}
