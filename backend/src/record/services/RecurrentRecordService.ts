import dayjs, { Dayjs } from 'dayjs';
import { PlannedRecurrentRecord } from '../../entity/PlannedRecurrentRecord';
import { Record } from '../../entity/Record';
import { RecurrentRecord } from '../../entity/RecurrentRecord';
import { User } from '../../entity/User';
import { BadRequest, MissingProperty, ResourceNotAllowed } from '../../shared/models/Errors';
import { repositories } from '../../shared/repositories/database';
import { services } from '../../shared/services/services';
import { UserNotFound } from '../../user/models/Errors';
import { RecurrentRecordNotFound } from '../models/Errors';
import RecurrentRecordScheduler from './RecurrentRecordScheduler';
export class RecurrentRecordService {
    private scheduleService: RecurrentRecordScheduler;
    constructor() {
        this.configureScheduler();
    }

    private async configureScheduler() {
        const records = await repositories.recurrentRecords().find();
        this.scheduleService = new RecurrentRecordScheduler(records);
    }

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

        if (sanitizedEndDate?.isBefore(dayjs())) {
            throw new BadRequest('End date cannot be in the past!');
        }
        if (sanitizedEndDate && sanitizedStartDate.isAfter(sanitizedEndDate)) {
            throw new BadRequest('Start date cannot be after end date!');
        }
        if (!['hourly', 'daily', 'monthly', 'yearly'].includes(periodicity)) {
            throw new BadRequest('Periodicity must be one of daily, monthly, yearly');
        }
        const recurrentRecordRepo = repositories.recurrentRecords();
        const userRepo = repositories.users();

        const requestedWallet = await services().walletService.getById(walletId, username);
        const requestedCategory = await services().categoryService.getById(categoryId, username);
        const requestedOwner = await userRepo.findOneBy({ username });
        if (!requestedOwner) throw new UserNotFound();

        const createdRecord = await recurrentRecordRepo.save({
            description,
            startDate: sanitizedStartDate.toISOString(),
            endDate: sanitizedEndDate?.toISOString(),
            periodicity,
            value,
            ownerUsername: requestedOwner.username,
            categoryId: requestedCategory.id,
            walletId: requestedWallet.id,
        });

        this.scheduleService.scheduleJobs(createdRecord);
        return createdRecord;
    }

    async deleteById(id: RecurrentRecord['id'], username: User['username']): Promise<RecurrentRecord> {
        const recurrentRecordRepo = repositories.recurrentRecords();
        const recurrentRecordToDelete = await this.getById(id, username);
        const deletion = await recurrentRecordRepo.remove(recurrentRecordToDelete);
        this.rescheduleRecords();
        return deletion;
    }

    async getById(id: Record['id'], username: User['username']): Promise<RecurrentRecord> {
        const recurrentRecordRepo = repositories.recurrentRecords();
        const recurrentRecord = await recurrentRecordRepo.findOneBy({ id });
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
        const { categoryId, walletId, endDate, startDate, description, periodicity, value, id } =
            updatedRecurrentRecord;
        const recurrentRecordRepo = repositories.recurrentRecords();

        const recurrentRecord = await this.getById(id, username);

        const categoryOfRecord = await services().categoryService.getById(categoryId, username);

        const walletOfRecord = await services().walletService.getById(walletId, username);

        let newEndDate: Dayjs | string = dayjs(endDate);
        if (!newEndDate.isValid()) {
            newEndDate = null;
        } else {
            newEndDate = newEndDate.toISOString();
        }

        const updatedRecord = await recurrentRecordRepo.save({
            id,
            description: description === '' ? '' : description || recurrentRecord.description,
            value: Number.isNaN(value) ? recurrentRecord.value : value,
            endDate: newEndDate,
            startDate: dayjs(startDate).toISOString() || recurrentRecord.startDate,
            periodicity: periodicity || recurrentRecord.periodicity,
            ownerUsername: username,
            walletId: walletOfRecord.id,
            categoryId: categoryOfRecord.id,
        });
        this.rescheduleRecords();
        return updatedRecord;
    }

    async getByUser(username: User['username']): Promise<PlannedRecurrentRecord[]> {
        const records: PlannedRecurrentRecord[] = await repositories
            .recurrentRecords()
            .findBy({ ownerUsername: username });
        const nextInvocations = this.scheduleService.getNextInvocations(records);
        if (Array.isArray(nextInvocations)) {
            nextInvocations.forEach((nextInvocation) => {
                const idx = records.findIndex((record) => record.id === nextInvocation.id);
                if (idx >= 0) {
                    records[idx].nextInvocation = nextInvocation.nextInvocation;
                }
            });
        }
        return records;
    }

    async applyRecurrentRecord(record: RecurrentRecord) {
        await services().recordService.createRecord(
            record.description,
            record.value,
            dayjs().toISOString(),
            record.walletId,
            record.categoryId,
            record.ownerUsername,
        );
    }

    private async rescheduleRecords() {
        this.scheduleService.resetSchedule();
        const records = await repositories.recurrentRecords().find();
        this.scheduleService.scheduleJobs(records);
    }
}
