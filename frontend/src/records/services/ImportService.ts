import dayjs from 'dayjs';
import { Record } from '../models/Record';
import hash from 'object-hash';

export const createNewRecordsFromMt940File = async (
  file: File,
  defaultWalletId: Record['walletId'],
  defaultCategoryId: Record['categoryId']
) => {
  const mt940 = await import('mt940js');
  const parser = new mt940.Parser();
  const fileContent = await file.text();
  const statements = parser.parse(fileContent);
  const transactions = statements
    ?.map?.((statement) => statement.transactions)
    ?.flat();
  const newRecords: Record[] = transactions?.map?.((transaction) => ({
    description: transaction.details,
    timestamp: dayjs(transaction.date).toISOString(),
    value: transaction.amount,
    categoryId: defaultCategoryId,
    walletId: defaultWalletId,
    externalReference: hash(transaction),
  }));
  console.log(transactions);
  return newRecords;
};
