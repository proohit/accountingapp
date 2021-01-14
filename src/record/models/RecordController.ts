import { ControllerFunction } from '../../shared/models/BaseController';
import { MessageResult } from '../../shared/models/RouteResult';
import { PaginatedResult } from '../models/PaginatedResult';
import { Record } from '../../entity/Record';
export interface RecordController {
    getByCategory: ControllerFunction<Record[]>;
    createNewRecord: ControllerFunction<Record>;
    getByUser: ControllerFunction<PaginatedResult>;
    deleteById: ControllerFunction<MessageResult>;
    getById: ControllerFunction<Record>;
    getByWallet: ControllerFunction<Record[]>;
    updateById: ControllerFunction<Record>;
}
