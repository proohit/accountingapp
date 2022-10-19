import { ControllerFunction } from '../../shared/models/BaseController';
import { MessageResult } from '../../shared/models/RouteResult';
import { PaginatedResult } from '../models/PaginatedResult';
import { Record } from '../../entity/Record';
type ManipulateRecord = {
    description: Record['description'];
    value: Record['value'];
    timestamp: string;
    walletId: Record['walletId'];
    categoryId: Record['categoryId'];
};

export interface RecordController {
    getByCategory: ControllerFunction<Record[]>;
    createNewRecord: ControllerFunction<Record, ManipulateRecord>;
    getByUser: ControllerFunction<PaginatedResult>;
    deleteById: ControllerFunction<MessageResult>;
    getById: ControllerFunction<Record>;
    getByWallet: ControllerFunction<Record[]>;
    updateById: ControllerFunction<Record, ManipulateRecord>;
    checkIfExternalReferencesExist: ControllerFunction<Record[], Record[]>;
    createManyRecords: ControllerFunction<Record[], Record[]>;
}
