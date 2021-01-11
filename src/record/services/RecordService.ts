import { Category } from '../../entity/Category';
import { User } from '../../entity/User';
import { Record } from '../../entity/Record';
import { repositories } from '../../shared/repositories/database';
import { Wallet } from '../../entity/Wallet';
import { MissingProperty, ResourceNotAllowed } from '../../shared/models/Errors';
import { UserNotFound } from '../../user/models/Errors';
import { SearchQuery } from '../models/SearchQuery';
import { calculateOffset } from '../../shared/utils/paginationUtils';
import { RecordNotFound } from '../models/Errors';
import { services } from '../../shared/services/services';
import { Between, FindConditions, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm';

export class RecordService {
    getByCategory(categoryId: Category['id'], username: User['username']) {
        return repositories.records().find({
            ownerUsername: username,
            categoryId: categoryId,
        });
    }

    async createRecord(
        description: Record['description'],
        value: Record['value'],
        timestamp: Record['timestamp'],
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

        const requestedWallet = await services.walletService.getById(walletId, username);
        const requestedCategory = await services.categoryService.getById(categoryId, username);
        const requestedOwner = await userRepo.findOne({ username });
        if (!requestedOwner) throw new UserNotFound();

        return recordRepo.save({
            description,
            timestamp,
            value,
            ownerUsername: requestedOwner.username,
            categoryId: requestedCategory.id,
            walletId: requestedWallet.id,
        });
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

        const filterObject: FindConditions<Record> = this.buildFilterQuery(
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
        const filterObject: FindConditions<Record & { timestampFrom: string; timestampTo: string }> = {
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
            filterObject.timestamp = Between(timestampFrom, timestampTo);
        } else if (timestampFrom) {
            filterObject.timestamp = MoreThanOrEqual(timestampFrom);
        } else if (timestampTo) {
            filterObject.timestamp = LessThanOrEqual(timestampTo);
        }

        return filterObject;
    }

    getAllRecordsCount(username: User['username']) {
        const recordsRepo = repositories.records();
        return recordsRepo.count({ ownerUsername: username });
    }

    getRecordsCountByQuery(searchQuery: SearchQuery, username: User['username']) {
        const {
            filterBy: { categoryId, description, walletId, timestampFrom, timestampTo },
        } = searchQuery;
        const recordsRepo = repositories.records();
        const filterObject: FindConditions<Record> = this.buildFilterQuery(
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
        return await recordRepo.remove(recordToDelete);
    }

    async getById(id: Record['id'], username: User['username']) {
        const recordRepo = repositories.records();
        const record = await recordRepo.findOne(id);
        if (!record) {
            throw new RecordNotFound();
        }

        if (record.ownerUsername !== username) {
            throw new ResourceNotAllowed();
        }

        return record;
    }

    async getByWallet(walletId: Wallet['id'], username: User['username']) {
        return repositories.records().find({
            walletId: walletId,
            ownerUsername: username,
        });
    }

    async updateById(
        id: Record['id'],
        description: Record['description'],
        value: Record['value'],
        timestamp: Record['timestamp'],
        walletId: Wallet['id'],
        categoryId: Category['id'],
        username: User['username'],
    ) {
        const recordRepo = repositories.records();

        await this.getById(id, username);

        const categoryOfRecord = await services.categoryService.getById(categoryId, username);

        const walletOfRecord = await services.walletService.getById(walletId, username);

        return recordRepo.save({
            id,
            description,
            value,
            timestamp,
            ownerUsername: username,
            walletId: walletOfRecord.id,
            categoryId: categoryOfRecord.id,
        });
    }
}
