import dayjs from 'dayjs';
import { Record } from '../../entity/Record';
import { RecurrentRecord } from '../../entity/RecurrentRecord';
import { User } from '../../entity/User';
import { BadRequest, MissingProperty, ResourceNotAllowed } from '../../shared/models/Errors';
import { repositories } from '../../shared/repositories/database';
import { services } from '../../shared/services/services';
import { UserNotFound } from '../../user/models/Errors';
import { RecurrentRecordNotFound } from '../models/Errors';

export class RecurrentRecordService {
    async createRecurrentRecord(
        recurrentRecord: Partial<RecurrentRecord>,
        username: User['username'],
    ): Promise<RecurrentRecord> {
        const { walletId, value, description, categoryId, startDate, endDate, periodicity } = recurrentRecord;
        const missingProperties = [];
        if (!recurrentRecord.description && recurrentRecord.description !== '') missingProperties.push('description');
        if (!value && value !== 0) missingProperties.push('value');
        if (!walletId) missingProperties.push('walletId');
        if (!categoryId) missingProperties.push('categoryId');
        if (!periodicity) missingProperties.push('periodicity');
        if (missingProperties.length) {
            throw new MissingProperty(missingProperties);
        }
        const sanitizedStartDate = dayjs(startDate) || dayjs();
        const sanitizedEndDate = endDate ? dayjs(endDate) : null;
        if (sanitizedStartDate.isBefore(dayjs(), 'minutes')) {
            throw new BadRequest('Start date cannot be in the past!');
        }
        if (sanitizedEndDate?.isBefore(dayjs())) {
            throw new BadRequest('End date cannot be in the past!');
        }
        if (sanitizedEndDate && sanitizedStartDate.isAfter(sanitizedEndDate)) {
            throw new BadRequest('Start date cannot be after end date!');
        }
        if (!['daily', 'monthly', 'yearly'].includes(periodicity)) {
            throw new BadRequest('Periodicity must be one of daily, monthly, yearly');
        }
        const recurrentRecordRepo = repositories.recurrentRecords();
        const userRepo = repositories.users();

        const requestedWallet = await services.walletService.getById(walletId, username);
        const requestedCategory = await services.categoryService.getById(categoryId, username);
        const requestedOwner = await userRepo.findOne({ username });
        if (!requestedOwner) throw new UserNotFound();

        return recurrentRecordRepo.save({
            description,
            startDate: sanitizedStartDate.toISOString(),
            endDate: sanitizedEndDate?.toISOString(),
            periodicity,
            value,
            ownerUsername: requestedOwner.username,
            categoryId: requestedCategory.id,
            walletId: requestedWallet.id,
        });
    }

    async deleteById(id: RecurrentRecord['id'], username: User['username']): Promise<RecurrentRecord> {
        const recurrentRecordRepo = repositories.recurrentRecords();
        const recurrentRecordToDelete = await this.getById(id, username);
        return recurrentRecordRepo.remove(recurrentRecordToDelete);
    }

    async getById(id: Record['id'], username: User['username']): Promise<RecurrentRecord> {
        const recurrentRecordRepo = repositories.recurrentRecords();
        const recurrentRecord = await recurrentRecordRepo.findOne(id);
        if (!recurrentRecord) {
            throw new RecurrentRecordNotFound();
        }

        if (recurrentRecord.ownerUsername !== username) {
            throw new ResourceNotAllowed();
        }

        return recurrentRecord;
    }

    async updateById(
        updatedRecurrentRecord: Partial<RecurrentRecord>,
        username: User['username'],
    ): Promise<RecurrentRecord> {
        const { categoryId, walletId, endDate, description, periodicity, value, id } = updatedRecurrentRecord;
        const recurrentRecordRepo = repositories.recurrentRecords();

        const recurrentRecord = await this.getById(id, username);

        const categoryOfRecord = await services.categoryService.getById(categoryId, username);

        const walletOfRecord = await services.walletService.getById(walletId, username);

        return recurrentRecordRepo.save({
            id,
            description: description === '' ? '' : description || recurrentRecord.description,
            value: Number.isNaN(value) ? recurrentRecord.value : value,
            endDate: endDate || recurrentRecord.endDate,
            periodicity: periodicity || recurrentRecord.periodicity,
            ownerUsername: username,
            walletId: walletOfRecord.id,
            categoryId: categoryOfRecord.id,
        });
    }

    getByUser(username: User['username']): Promise<RecurrentRecord[]> {
        return repositories.recurrentRecords().find({ ownerUsername: username });
    }
}
