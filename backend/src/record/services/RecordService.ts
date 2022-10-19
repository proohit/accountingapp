import { Between, FindOptionsWhere, In, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm';
import { Category } from '../../entity/Category';
import { Record } from '../../entity/Record';
import { User } from '../../entity/User';
import { Wallet } from '../../entity/Wallet';
import { MissingProperty, ResourceNotAllowed } from '../../shared/models/Errors';
import { repositories } from '../../shared/repositories/database';
import { services } from '../../shared/services/services';
import { calculateOffset } from '../../shared/utils/paginationUtils';
import { UserNotFound } from '../../user/models/Errors';
import { RecordNotFound } from '../models/Errors';
import { SearchQuery } from '../models/SearchQuery';

export class RecordService {
    getByCategory(categoryId: Category['id'], username: User['username']) {
        return repositories.records().findBy({
            ownerUsername: username,
            categoryId: categoryId,
        });
    }

    async createRecord(
        description: Record['description'],
        value: Record['value'],
        timestamp: string,
        walletId: Wallet['id'],
        categoryId: Category['id'],
        username: User['username'],
    ) {
        const missingProperties = [];
        if (!description && description !== '') missingProperties.push('description');
        if (!value && value !== 0) missingProperties.push('value');
        if (!walletId) missingProperties.push('walletId');
        if (!categoryId) missingProperties.push('categoryId');
        if (!timestamp) missingProperties.push('timestamp');
        if (missingProperties.length) throw new MissingProperty(missingProperties);

        const recordRepo = repositories.records();
        const userRepo = repositories.users();

        const requestedWallet = await services().walletService.getById(walletId, username);
        const requestedCategory = await services().categoryService.getById(categoryId, username);
        const requestedOwner = await userRepo.findOneBy({ username });
        if (!requestedOwner) throw new UserNotFound();

        const createdRecord = await recordRepo.save({
            description,
            timestamp,
            value,
            ownerUsername: requestedOwner.username,
            categoryId: requestedCategory.id,
            walletId: requestedWallet.id,
        });

        await services().walletService.recalculateCurrentBalance(requestedWallet.id, username);

        return createdRecord;
    }

    async getByQuery(searchQuery: SearchQuery, username: User['username']) {
        const {
            page,
            itemsPerPage,
            sortBy,
            sortDirection,
            filterBy: { categoryId, description, walletId, timestampFrom, timestampTo },
        } = searchQuery;
        const from = calculateOffset(page || 1, itemsPerPage || 20);
        const recordsRepo = repositories.records();

        const filterObject: FindOptionsWhere<Record> = this.buildFilterQuery(
            username,
            description,
            walletId,
            categoryId,
            timestampFrom,
            timestampTo,
        );

        const records = await recordsRepo.find({
            where: filterObject,
            order: sortBy && sortDirection && { [sortBy]: sortDirection.toUpperCase() },
            skip: from,
            take: itemsPerPage || 20,
        });
        return records;
    }

    private buildFilterQuery(
        username: string,
        description: string,
        walletId: string,
        categoryId: string,
        timestampFrom: string,
        timestampTo: string,
    ) {
        const filterObject: FindOptionsWhere<Record & { timestampFrom: string; timestampTo: string }> = {
            ownerUsername: username,
        };

        if (description) {
            filterObject.description = Like(`%${description.replace(/\"|\'/g, '')}%`);
        }
        if (walletId) {
            filterObject.walletId = walletId;
        }
        if (categoryId) {
            filterObject.categoryId = categoryId;
        }

        if (timestampFrom && timestampTo) {
            filterObject.timestamp = Between(timestampFrom, timestampTo).value;
        } else if (timestampFrom) {
            filterObject.timestamp = MoreThanOrEqual(timestampFrom).value;
        } else if (timestampTo) {
            filterObject.timestamp = LessThanOrEqual(timestampTo).value;
        }

        return filterObject;
    }

    getAllRecordsCount(username: User['username']) {
        const recordsRepo = repositories.records();
        return recordsRepo.countBy({ ownerUsername: username });
    }

    getRecordsCountByQuery(searchQuery: SearchQuery, username: User['username']) {
        const {
            filterBy: { categoryId, description, walletId, timestampFrom, timestampTo },
        } = searchQuery;
        const recordsRepo = repositories.records();
        const filterObject: FindOptionsWhere<Record> = this.buildFilterQuery(
            username,
            description,
            walletId,
            categoryId,
            timestampFrom,
            timestampTo,
        );
        return recordsRepo.count({ where: filterObject });
    }

    async deleteById(id: Record['id'], username: User['username']) {
        const recordRepo = repositories.records();
        const recordToDelete = await this.getById(id, username);
        const deletedRecord = await recordRepo.remove(recordToDelete);

        await services().walletService.recalculateCurrentBalance(recordToDelete.walletId, username);
        return deletedRecord;
    }

    async getById(id: Record['id'], username: User['username']) {
        const recordRepo = repositories.records();
        const record = await recordRepo.findOneBy({ id });
        if (!record) {
            throw new RecordNotFound();
        }

        if (record.ownerUsername !== username) {
            throw new ResourceNotAllowed();
        }

        return record;
    }

    async getByWallet(walletId: Wallet['id'], username: User['username']) {
        return repositories.records().findBy({
            walletId: walletId,
            ownerUsername: username,
        });
    }

    async updateById(
        id: Record['id'],
        username: User['username'],
        description?: Record['description'],
        value?: Record['value'],
        timestamp?: string,
        walletId?: Wallet['id'],
        categoryId?: Category['id'],
    ) {
        const recordRepo = repositories.records();

        const originalRecord = await this.getById(id, username);

        const categoryOfRecord = await services().categoryService.getById(categoryId, username);

        const walletOfRecord = await services().walletService.getById(walletId, username);

        const updatedRecord = await recordRepo.save({
            id,
            description: description === '' ? '' : description || originalRecord.description,
            value: Number.isNaN(value) ? originalRecord.value : value,
            timestamp: timestamp || originalRecord.timestamp,
            ownerUsername: username,
            walletId: walletOfRecord.id,
            categoryId: categoryOfRecord.id,
        });

        if (originalRecord.value !== value || originalRecord.walletId !== walletOfRecord.id) {
            await services().walletService.recalculateCurrentBalance(walletOfRecord.id, username);
            if (originalRecord.walletId !== walletOfRecord.id) {
                await services().walletService.recalculateCurrentBalance(originalRecord.walletId, username);
            }
        }

        return updatedRecord;
    }

    async checkIfExternalReferencesExist(records: Record[], username: User['username']) {
        const existingRecordsWithExternalReferences = await repositories.records().find({
            where: {
                externalReference: In(records.map((record) => record.externalReference)),
                ownerUsername: username,
            },
        });

        const existingExternalReferences = existingRecordsWithExternalReferences.map(
            (record) => record.externalReference,
        );

        const recordsWithExistingExternalReferences = records.filter((record) =>
            existingExternalReferences.includes(record.externalReference),
        );

        return recordsWithExistingExternalReferences;
    }

    async createManyRecords(records: Record[], username: User['username']) {
        const recordsRepo = repositories.records();

        const createdRecords = await recordsRepo.save(
            records.map((record) => ({ ...record, ownerUsername: username })),
        );

        const walletsToUpdate = createdRecords.map((record) => record.walletId);
        const uniqueWalletsToUpdate = [...new Set(walletsToUpdate)];

        for (const walletId of uniqueWalletsToUpdate) {
            await services().walletService.recalculateCurrentBalance(walletId, username);
        }

        return createdRecords;
    }
}
