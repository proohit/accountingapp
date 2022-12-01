import { Periodicity, PlannedRecurrentRecordDto } from '@accountingapp/shared';
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

    let newEndDate: Dayjs = dayjs(endDate);
    if (!newEndDate.isValid()) {
      newEndDate = null;
    }

    const updatedRecord = await recurrentRecordRepo.save({
      id,
      description:
        description === '' ? '' : description || recurrentRecord.description,
      value: Number.isNaN(value) ? recurrentRecord.value : value,
      endDate: newEndDate?.toISOString(),
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
  ): Promise<PlannedRecurrentRecordDto[]> {
    const records: RecurrentRecord[] =
      await this.recurrentRecordRepository.findBy({ ownerUsername: username });
    const nextInvocations =
      this.recurrentRecordSchedulerService.getNextInvocations(records);

    const plannedRecurrentRecords: PlannedRecurrentRecordDto[] = [];
    if (Array.isArray(nextInvocations)) {
      nextInvocations.forEach((nextInvocation) => {
        const idx = records.findIndex(
          (record) => record.id === nextInvocation.id,
        );
        const record = records[idx];
        if (idx >= 0) {
          plannedRecurrentRecords.push({
            ...record,
            periodicity: record.periodicity as Periodicity,
            nextInvocation: nextInvocation.nextInvocation,
          });
        }
      });
    }
    return plannedRecurrentRecords;
  }

  public async getNextInvocationsByUserForMonth(
    username: User['username'],
    month: number,
    year: number,
  ): Promise<PlannedRecurrentRecordDto[]> {
    const records: RecurrentRecord[] =
      await this.recurrentRecordRepository.findBy({ ownerUsername: username });
    const nextInvocations =
      this.recurrentRecordSchedulerService.getNextInvocations(records);
    if (Array.isArray(nextInvocations)) {
      const nextInvocationsInMonth = nextInvocations.filter((invocation) => {
        const date = dayjs(invocation.nextInvocation);
        return date.month() === month && date.year() === year;
      });
      return nextInvocationsInMonth.map((invocation) => {
        const record = records.find((record) => record.id === invocation.id);
        return {
          ...record,
          periodicity: record.periodicity as Periodicity,
          nextInvocation: invocation.nextInvocation,
        };
      });
    }
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
