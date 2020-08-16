import { ControllerFunction } from '../../shared/models/BaseController';
import Record from './Record';
import { MessageResult } from '../../shared/models/RouteResult';

export interface RecordController {
    createNewRecord: ControllerFunction<Record>;
    getByUser: ControllerFunction<Record[]>;
    deleteById: ControllerFunction<MessageResult>;
    getById: ControllerFunction<Record>;
    getByWallet: ControllerFunction<Record[]>;
    updateById: ControllerFunction<Record>;
}
