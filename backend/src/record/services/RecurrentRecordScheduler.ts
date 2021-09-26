import dayjs from 'dayjs';
import { scheduledJobs, scheduleJob } from 'node-schedule';
import { RecurrentRecord } from '../../entity/RecurrentRecord';
import { services } from '../../shared/services/services';

export default class RecurrentRecordScheduler {
    constructor(recurrentRecords: RecurrentRecord[]) {
        this.scheduleJobs(recurrentRecords);
        for (const job of Object.values(scheduledJobs)) {
            console.log(job?.nextInvocation()?.toLocaleString());
        }
    }

    private buildRule(startDate: RecurrentRecord['startDate'], periodicity: RecurrentRecord['periodicity']) {
        const date = dayjs(startDate.toISOString());
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
        for (const job of Object.values(scheduledJobs)) {
            job.cancel();
        }
    }

    public scheduleJobs(records: RecurrentRecord[]) {
        for (const record of records) {
            this.scheduleJob(record);
        }
    }

    public scheduleJob(record: RecurrentRecord) {
        const rule = this.buildRule(record.startDate, record.periodicity);
        scheduleJob({ start: record.startDate, end: record.endDate, rule }, () => this.executeUpdate(record));
    }
}
