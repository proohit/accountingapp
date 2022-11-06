import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs, { Dayjs } from 'dayjs';
import { Repository } from 'typeorm';
import { CategoryService } from '../../category/category.service';
import { User } from '../../users/entities/user.entity';
import { WalletService } from '../../wallet/wallet.service';
import { RecordService } from '../record.service';
import { RecurrentRecord } from './entities/recurrent-record.entity';
import PlannedRecurrentRecord from './models/planned-recurrent-record.model';
import { RecurrentRecordSchedulerService } from './recurrent-record-scheduler.service';

@Injectable()
export class RecurrentRecordService {
  constructor(
    @InjectRepository(RecurrentRecord)
    private readonly recurrentRecordRepository: Repository<RecurrentRecord>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly walletService: WalletService,
    private readonly recordService: RecordService,
    private readonly categoryService: CategoryService,
    @Inject(forwardRef(() => RecurrentRecordSchedulerService))
    private readonly recurrentRecordSchedulerService: RecurrentRecordSchedulerService,
  ) {
    this.configureScheduler();
  }

  private async configureScheduler() {
    const records = await this.recurrentRecordRepository.find();
    this.recurrentRecordSchedulerService.scheduleJobs(records);
  }

  async createRecurrentRecord(
    recurrentRecord: Partial<RecurrentRecord>,
    username: User['username'],
  ): Promise<RecurrentRecord> {
    const {
      walletId,
      value,
      description,
      categoryId,
      startDate,
      endDate,
      periodicity,
    } = recurrentRecord;
    const sanitizedStartDate = dayjs(startDate) || dayjs();
    const sanitizedEndDate = endDate ? dayjs(endDate) : null;

    if (sanitizedEndDate?.isBefore(dayjs())) {
      throw new BadRequestException('End date cannot be in the past!');
    }
    if (sanitizedEndDate && sanitizedStartDate.isAfter(sanitizedEndDate)) {
      throw new BadRequestException('Start date cannot be after end date!');
    }

    const recurrentRecordRepo = this.recurrentRecordRepository;
    const userRepo = this.userRepository;

    const requestedWallet = await this.walletService.getById(
      walletId,
      username,
    );
    const requestedCategory = await this.categoryService.getById(
      categoryId,
      username,
    );
    const requestedOwner = await userRepo.findOneBy({ username });
    if (!requestedOwner) throw new NotFoundException();

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

    this.recurrentRecordSchedulerService.scheduleJobs(createdRecord);
    return createdRecord;
  }

  async deleteById(
    id: RecurrentRecord['id'],
    username: User['username'],
  ): Promise<RecurrentRecord> {
    const recurrentRecordRepo = this.recurrentRecordRepository;
    const recurrentRecordToDelete = await this.getById(id, username);
    const deletion = await recurrentRecordRepo.remove(recurrentRecordToDelete);
    this.rescheduleRecords();
    return deletion;
  }

  async getById(
    id: RecurrentRecord['id'],
    username: User['username'],
  ): Promise<RecurrentRecord> {
    const recurrentRecordRepo = this.recurrentRecordRepository;
    const recurrentRecord = await recurrentRecordRepo.findOneBy({ id });
    if (!recurrentRecord || recurrentRecord.ownerUsername !== username) {
      throw new NotFoundException();
    }

    return recurrentRecord;
  }

  async updateById(
    updatedRecurrentRecord: Partial<RecurrentRecord>,
    username: User['username'],
  ): Promise<RecurrentRecord> {
    const {
      categoryId,
      walletId,
      endDate,
      startDate,
      description,
      periodicity,
      value,
      id,
    } = updatedRecurrentRecord;
    const recurrentRecordRepo = this.recurrentRecordRepository;

    const recurrentRecord = await this.getById(id, username);

    const categoryOfRecord = await this.categoryService.getById(
      categoryId,
      username,
    );

    const walletOfRecord = await this.walletService.getById(walletId, username);

    let newEndDate: Dayjs | string = dayjs(endDate);
    if (!newEndDate.isValid()) {
      newEndDate = null;
    } else {
      newEndDate = newEndDate.toISOString();
    }

    const updatedRecord = await recurrentRecordRepo.save({
      id,
      description:
        description === '' ? '' : description || recurrentRecord.description,
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

  async getByUser(
    username: User['username'],
  ): Promise<PlannedRecurrentRecord[]> {
    const records: RecurrentRecord[] =
      await this.recurrentRecordRepository.findBy({ ownerUsername: username });
    const nextInvocations =
      this.recurrentRecordSchedulerService.getNextInvocations(records);

    const plannedRecurrentRecords: PlannedRecurrentRecord[] = [];
    if (Array.isArray(nextInvocations)) {
      nextInvocations.forEach((nextInvocation) => {
        const idx = records.findIndex(
          (record) => record.id === nextInvocation.id,
        );
        if (idx >= 0) {
          plannedRecurrentRecords.push({
            ...records[idx],
            nextInvocation: nextInvocation.nextInvocation,
          });
        }
      });
    }
    return plannedRecurrentRecords;
  }

  async applyRecurrentRecord(record: RecurrentRecord) {
    await this.recordService.createRecord(
      record.description,
      record.value,
      dayjs().toISOString(),
      record.walletId,
      record.categoryId,
      record.ownerUsername,
    );
  }

  private async rescheduleRecords() {
    this.recurrentRecordSchedulerService.resetSchedule();
    const records = await this.recurrentRecordRepository.find();
    this.recurrentRecordSchedulerService.scheduleJobs(records);
  }
}
