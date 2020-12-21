import RecordMapper from '../src/record/repositories/RecordMapper';
import { convertJSDateToMySQLDate } from '../src/shared/utils/dateUtils';

const createRecords = async () => {
    for (let i = 1; i < 1000; i++) {
        RecordMapper.createRecord(
            `Test record nr. ${i}`,
            12,
            'Konto',
            convertJSDateToMySQLDate(new Date(2020, 12, i, 11, 12, 0)),
            'direnc',
            'other',
        );
    }
    return;
};

createRecords();
