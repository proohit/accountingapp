import { RouteResult } from './RouteResult';
import { SecuredContext } from './SecuredContext';

export type ControllerFunction<Response, RequestBody = unknown> = (
    ctx: SecuredContext<RequestBody>,
    next: () => Promise<unknown>,
) => Promise<RouteResult<Response>>;
