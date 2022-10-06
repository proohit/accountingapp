import dayjs from 'dayjs';
import { RecurrentRecord } from '../../entity/RecurrentRecord';
import { services } from '../../shared/services/services';
import { RecurrentRecordController } from '../models/RecurrentRecordController';

const RecurrentRecordControllerImpl: RecurrentRecordController = {
    getByUser: async (ctx) => {
        const { username } = ctx.state.user;

        const recurrentRecordsOfUser = await services().recurrentRecordService.getByUser(username);
        return { data: recurrentRecordsOfUser, status: 200 };
    },
    createNewRecurrentRecord: async (ctx) => {
        const { username } = ctx.state.user;
        const { description, value, startDate, endDate, periodicity, walletId, categoryId } = ctx.request.body;

        const recurrentRecord = new RecurrentRecord();
        recurrentRecord.categoryId = categoryId;
        recurrentRecord.walletId = walletId;
        recurrentRecord.description = description;
        recurrentRecord.value = value;
        recurrentRecord.endDate = dayjs(endDate).toDate();
        recurrentRecord.periodicity = periodicity;
        recurrentRecord.startDate = dayjs(startDate).toDate();
        recurrentRecord.ownerUsername = username;

        const createdRecurrentRecord = await services().recurrentRecordService.createRecurrentRecord(
            recurrentRecord,
            username,
        );

        return { status: 201, data: createdRecurrentRecord };
    },

    deleteById: async (ctx) => {
        const { id } = ctx.params;
        const { username } = ctx.state.user;

        await services().recurrentRecordService.deleteById(id, username);

        return { data: { message: `Deleted recurrent record ${id}` }, status: 200 };
    },

    getById: async (ctx) => {
        const { id } = ctx.params;
        const { username } = ctx.state.user;

        const recurrentRecord = await services().recurrentRecordService.getById(id, username);

        return { data: recurrentRecord, status: 200 };
    },

    updateById: async (ctx) => {
        const { username } = ctx.state.user;
        const { id } = ctx.params;
        const {
            description: updatedDescription,
            value: updatedValue,
            startDate: updatedStartDate,
            endDate: updatedEndDate,
            walletId: updatedWalletId,
            categoryId: updatedCategoryId,
            periodicity: updatedPeriodicity,
        } = ctx.request.body;

        const recurrentRecord = new RecurrentRecord();
        recurrentRecord.id = id;
        recurrentRecord.categoryId = updatedCategoryId;
        recurrentRecord.walletId = updatedWalletId;
        recurrentRecord.description = updatedDescription;
        recurrentRecord.value = updatedValue;
        recurrentRecord.endDate = dayjs(updatedEndDate).toDate();
        recurrentRecord.startDate = dayjs(updatedStartDate).toDate();
        recurrentRecord.periodicity = updatedPeriodicity;
        recurrentRecord.ownerUsername = username;

        const updatedRecurrentRecord = await services().recurrentRecordService.updateById(recurrentRecord, username);

        return { status: 200, data: updatedRecurrentRecord };
    },
};

export default RecurrentRecordControllerImpl;
