import { SearchQueryDto } from '@accountingapp/shared';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Wallet } from '../wallet/entities/wallet.entity';
import { WalletService } from '../wallet/wallet.service';
import CreateRecordDto from './dtos/create-record.dto';
import Record from './entities/record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    private readonly userService: UsersService,
    private readonly categoryService: CategoryService,
    private readonly walletService: WalletService,
  ) {}

  getByCategory(categoryId: Category['id'], username: User['username']) {
    return this.recordRepository.findBy({
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
    const requestedWallet = await this.walletService.getById(
      walletId,
      username,
    );
    const requestedCategory = await this.categoryService.getById(
      categoryId,
      username,
    );
    const requestedOwner = await this.userService.getByUsername(username);

    const createdRecord = await this.recordRepository.save({
      description,
      timestamp,
      value,
      ownerUsername: requestedOwner.username,
      categoryId: requestedCategory.id,
      walletId: requestedWallet.id,
    });

    await this.walletService.recalculateCurrentBalance(
      requestedWallet.id,
      username,
    );

    return createdRecord;
  }

  async getByQuery(searchQuery: SearchQueryDto, username: User['username']) {
    const {
      page,
      itemsPerPage,
      sortBy,
      sortDirection,
      categoryId,
      description,
      walletId,
      timestampFrom,
      timestampTo,
    } = searchQuery;
    const from = this.calculatePaginationOffset(page || 1, itemsPerPage || 20);
    const recordsRepo = this.recordRepository;

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
      order: sortBy &&
        sortDirection && { [sortBy]: sortDirection.toUpperCase() },
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
    const filterObject: FindOptionsWhere<
      Record & { timestampFrom: string; timestampTo: string }
    > = {
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
    const recordsRepo = this.recordRepository;
    return recordsRepo.countBy({ ownerUsername: username });
  }

  getRecordsCountByQuery(
    searchQuery: SearchQueryDto,
    username: User['username'],
  ) {
    const { categoryId, description, walletId, timestampFrom, timestampTo } =
      searchQuery;
    const recordsRepo = this.recordRepository;
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
    const recordRepo = this.recordRepository;
    const recordToDelete = await this.getById(id, username);
    const deletedRecord = await recordRepo.remove(recordToDelete);

    await this.walletService.recalculateCurrentBalance(
      recordToDelete.walletId,
      username,
    );
    return deletedRecord;
  }

  async getById(id: Record['id'], username: User['username']) {
    const recordRepo = this.recordRepository;
    const record = await recordRepo.findOneBy({ id });
    if (!record || record?.ownerUsername !== username) {
      throw new NotFoundException();
    }

    return record;
  }

  async getByWallet(walletId: Wallet['id'], username: User['username']) {
    return this.recordRepository.findBy({
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
    const recordRepo = this.recordRepository;

    const originalRecord = await this.getById(id, username);

    const categoryOfRecord = await this.categoryService.getById(
      categoryId,
      username,
    );

    const walletOfRecord = await this.walletService.getById(walletId, username);

    const updatedRecord = await recordRepo.save({
      id,
      description: description ?? originalRecord.description,
      value: Number.isNaN(value) ? originalRecord.value : value,
      timestamp: timestamp ?? originalRecord.timestamp,
      ownerUsername: username,
      walletId: walletOfRecord.id,
      categoryId: categoryOfRecord.id,
    });

    if (
      originalRecord.value !== value ||
      originalRecord.walletId !== walletOfRecord.id
    ) {
      await this.walletService.recalculateCurrentBalance(
        walletOfRecord.id,
        username,
      );
      if (originalRecord.walletId !== walletOfRecord.id) {
        await this.walletService.recalculateCurrentBalance(
          originalRecord.walletId,
          username,
        );
      }
    }

    return updatedRecord;
  }

  async checkIfExternalReferencesExist(
    references: string[],
    username: User['username'],
  ) {
    const existingRecordsWithExternalReferences =
      await this.recordRepository.find({
        where: {
          externalReference: In(references),
          ownerUsername: username,
        },
      });

    const existingExternalReferences =
      existingRecordsWithExternalReferences.map(
        (record) => record.externalReference,
      );

    return existingExternalReferences;
  }

  async createManyRecords(
    records: CreateRecordDto[],
    username: User['username'],
  ) {
    const recordsRepo = this.recordRepository;

    const createdRecords = await recordsRepo.save(
      records.map((record) => ({ ...record, ownerUsername: username })),
    );

    const walletsToUpdate = createdRecords.map((record) => record.walletId);
    const uniqueWalletsToUpdate = [...new Set(walletsToUpdate)];

    for (const walletId of uniqueWalletsToUpdate) {
      await this.walletService.recalculateCurrentBalance(walletId, username);
    }

    return createdRecords;
  }

  private calculatePaginationOffset(page: number, count: number) {
    if (page - 1 < 1) return 0;
    return (page - 1) * count;
  }
}
