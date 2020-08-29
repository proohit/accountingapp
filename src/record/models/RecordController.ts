import { ControllerFunction } from '../../shared/models/BaseController';
import Record from './Record';
import { MessageResult } from '../../shared/models/RouteResult';
import { PaginatedResult } from '../models/PaginatedResult';

export interface RecordController {
    getByCategory: ControllerFunction<Record[]>;
    createNewRecord: ControllerFunction<Record>;
    getByUser: ControllerFunction<PaginatedResult>;
    deleteById: ControllerFunction<MessageResult>;
    getById: ControllerFunction<Record>;
    getByWallet: ControllerFunction<Record[]>;
    updateById: ControllerFunction<Record>;
}
