import { ResourceNotFound } from '../../shared/models/Errors';

export class RecordNotFound extends ResourceNotFound {
    constructor() {
        super('No record with this id found');
    }
}
