import { ResourceNotFound, BadRequest } from '../../shared/models/Errors';

export class CategoryNotFound extends ResourceNotFound {
    constructor() {
        super('Category not found');
    }
}

export class DuplicateCategory extends BadRequest {
    constructor() {
        super('Category already exists');
    }
}
