import { ResourceNotFound } from '../../shared/models/Errors';

export class RecordNotFound extends ResourceNotFound {
    constructor() {
        super('No record with this id found');
    }
}

export class RecurrentRecordNotFound extends ResourceNotFound {
    constructor() {
        super('No recurrent record with this id found');
    }
}
