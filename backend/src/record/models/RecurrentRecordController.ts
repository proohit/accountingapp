import { RecurrentRecord } from '../../entity/RecurrentRecord';
import { ControllerFunction } from '../../shared/models/BaseController';
import { MessageResult } from '../../shared/models/RouteResult';

export interface RecurrentRecordController {
    createNewRecurrentRecord: ControllerFunction<RecurrentRecord>;
    getByUser: ControllerFunction<RecurrentRecord[]>;
    deleteById: ControllerFunction<MessageResult>;
    getById: ControllerFunction<RecurrentRecord>;
    updateById: ControllerFunction<RecurrentRecord>;
}
