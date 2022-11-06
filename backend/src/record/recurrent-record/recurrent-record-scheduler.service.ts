import { Injectable, Logger } from '@nestjs/common';
import dayjs from 'dayjs';
import { Job, scheduleJob } from 'node-schedule';
import { RecurrentRecord } from './entities/recurrent-record.entity';
import { RecurrentRecordService } from './recurrent-record.service';

@Injectable()
export class RecurrentRecordSchedulerService {
  private scheduledJobs: Map<RecurrentRecord['id'], Job> = new Map();

  constructor(
    private readonly recurrentRecordService: RecurrentRecordService,
  ) {}

  private buildRule(
    startDate: RecurrentRecord['startDate'],
    periodicity: RecurrentRecord['periodicity'],
  ) {
    const date = dayjs(startDate);
    switch (periodicity) {
      case 'hourly':
        return `${date.minute()} * * * *`;
      case 'daily':
        return `${date.minute()} ${date.hour()} * * *`;
      case 'monthly':
        return `${date.minute()} ${date.hour()} ${date.date()} * *`;
      case 'yearly':
        return `${date.minute()} ${date.hour()} ${date.date()} ${date.month()} *`;
    }
  }

  private executeUpdate(record: RecurrentRecord) {
    this.recurrentRecordService.applyRecurrentRecord(record);
  }

  public resetSchedule() {
    for (const job of this.scheduledJobs.values()) {
      job?.cancel();
    }
    Logger.log('Reset schedule');
  }

  public scheduleJobs(records: RecurrentRecord[] | RecurrentRecord) {
    if (Array.isArray(records)) {
      for (const record of records) {
        this.scheduleJob(record);
      }
    } else {
      this.scheduleJob(records);
    }
    Logger.log(`Scheduled jobs:`, this.getNextInvocations());
  }

  private scheduleJob(record: RecurrentRecord) {
    const rule = this.buildRule(record.startDate, record.periodicity);
    const job = scheduleJob({ end: record.endDate, rule }, () =>
      this.executeUpdate(record),
    );
    this.scheduledJobs.set(record.id, job);
  }

  public getNextInvocations(records?: RecurrentRecord[] | RecurrentRecord) {
    if (!records) {
      return [...this.scheduledJobs].map(([id, job]) => ({
        id,
        nextInvocation: job?.nextInvocation()?.toLocaleString(),
      }));
    } else {
      return this.getNextInvocationsByRecords(records);
    }
  }

  private getNextInvocationsByRecords(
    records: RecurrentRecord[] | RecurrentRecord,
  ) {
    if (Array.isArray(records)) {
      return [...this.scheduledJobs]
        .filter(([id]) => this.scheduledJobs.has(id))
        .map(([id, job]) => ({
          id,
          nextInvocation: job?.nextInvocation()?.toLocaleString(),
        }));
    } else {
      const job = this.scheduledJobs.get(records.id);
      return {
        id: records.id,
        nextInvocation: job?.nextInvocation()?.toLocaleString(),
      };
    }
  }
}
