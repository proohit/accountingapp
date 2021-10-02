import dayjs from 'dayjs';
import { Job, scheduleJob } from 'node-schedule';
import { RecurrentRecord } from '../../entity/RecurrentRecord';
import logger from '../../shared/services/loggingService';
import { services } from '../../shared/services/services';

export default class RecurrentRecordScheduler {
    private scheduledJobs: Map<RecurrentRecord['id'], Job> = new Map();
    constructor(recurrentRecords: RecurrentRecord[]) {
        this.scheduleJobs(recurrentRecords);
    }

    private buildRule(startDate: RecurrentRecord['startDate'], periodicity: RecurrentRecord['periodicity']) {
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
        services.recurrentRecordService.applyRecurrentRecord(record);
    }

    public resetSchedule() {
        for (const job of this.scheduledJobs.values()) {
            job?.cancel();
        }
        logger.info('Reset schedule');
    }

    public scheduleJobs(records: RecurrentRecord[] | RecurrentRecord) {
        if (Array.isArray(records)) {
            for (const record of records) {
                this.scheduleJob(record);
            }
        } else {
            this.scheduleJob(records);
        }
        logger.info('Scheduled jobs', this.getNextInvocations());
    }

    private scheduleJob(record: RecurrentRecord) {
        const rule = this.buildRule(record.startDate, record.periodicity);
        const job = scheduleJob({ start: record.startDate, end: record.endDate, rule }, () =>
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

    private getNextInvocationsByRecords(records: RecurrentRecord[] | RecurrentRecord) {
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
