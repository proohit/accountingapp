import { RouteResult } from './RouteResult';
import { SecuredContext } from './SecuredContext';

export type ControllerFunction<R> = (ctx: SecuredContext) => Promise<RouteResult<R>>;
