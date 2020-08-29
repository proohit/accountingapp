class HttpError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class ResourceNotFound extends HttpError {
    constructor(message?: string) {
        super(message || 'Resource not found', 404);
    }
}
export class BadRequest extends HttpError {
    constructor(message?: string) {
        super(message || 'Bad Request', 400);
    }
}

export class MissingProperty extends BadRequest {
    constructor(properties: string[]) {
        super(`Missing properties in request: ${properties.join(',')}`);
    }
}

export class ResourceNotAllowed extends HttpError {
    constructor() {
        super('You are not allowed to access this resource', 403);
    }
}

export class TokenNotProvided extends HttpError {
    constructor() {
        super('Token not provided', 401);
    }
}

export class TokenInvalid extends HttpError {
    constructor() {
        super('Token invalid', 401);
    }
}

export class InvalidCredentials extends HttpError {
    constructor() {
        super('Incorrect username or password', 400);
    }
}
