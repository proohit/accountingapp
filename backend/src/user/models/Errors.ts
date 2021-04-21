import { ResourceNotFound } from '../../shared/models/Errors';

export class UserNotFound extends ResourceNotFound {
    constructor() {
        super('User not found');
    }
}
