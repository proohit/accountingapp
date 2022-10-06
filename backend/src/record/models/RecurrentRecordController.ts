import { RecurrentRecord } from '../../entity/RecurrentRecord';
import { ControllerFunction } from '../../shared/models/BaseController';
import { MessageResult } from '../../shared/models/RouteResult';

type ManipulateRecurrentRecord = {
    description: RecurrentRecord['description'];
    value: RecurrentRecord['value'];
    startDate: string;
    endDate: string;
    periodicity: RecurrentRecord['periodicity'];
    walletId: RecurrentRecord['walletId'];
    categoryId: RecurrentRecord['categoryId'];
};
export interface RecurrentRecordController {
    createNewRecurrentRecord: ControllerFunction<RecurrentRecord, ManipulateRecurrentRecord>;
    getByUser: ControllerFunction<RecurrentRecord[]>;
    deleteById: ControllerFunction<MessageResult>;
    getById: ControllerFunction<RecurrentRecord>;
    updateById: ControllerFunction<RecurrentRecord, ManipulateRecurrentRecord>;
}
