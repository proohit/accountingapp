import { RecordDto } from '@accountingapp/shared';
import dayjs from 'dayjs';
import hash from 'object-hash';

const createDescriptionFromTransaction = (transaction: any) => {
  const { structuredDetails, details } = transaction;
  const transactionPartnerKeys = ['32', '33'];
  const transactionDescriptionKeys = [
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '60',
    '61',
    '62',
    '63',
  ];

  const keysToInclude = [
    ...transactionPartnerKeys,
    ...transactionDescriptionKeys,
  ];

  const strippedStructuredDetails = Object.keys(structuredDetails)
    .filter((key) => keysToInclude.includes(key))
    .reduce((obj, key) => {
      obj[key] = structuredDetails[key];
      return obj;
    }, {});

  const transactionPartner = Object.entries(strippedStructuredDetails)
    .filter(([key]) => transactionPartnerKeys.includes(key))
    .map(([, value]) => value)
    .join('');

  const transactionDescription = Object.entries(strippedStructuredDetails)
    .filter(([key]) => transactionDescriptionKeys.includes(key))
    .map(([, value]) => value)
    .join('');

  return transactionPartner || transactionDescription
    ? `${transactionPartner}\n${transactionDescription}`
    : details;
};

export const createNewRecordsFromMt940File = async (
  file: File,
  defaultWalletId: RecordDto['walletId'],
  defaultCategoryId: RecordDto['categoryId']
) => {
  const mt940 = await import('mt940js');
  const parser = new mt940.Parser();
  const fileContent = await file.text();
  const statements = parser.parse(fileContent);
  const transactions = statements
    ?.map?.((statement) => statement.transactions)
    ?.flat();
  const newRecords: RecordDto[] = transactions?.map?.((transaction) => ({
    description:
      createDescriptionFromTransaction(transaction) || 'No description',
    timestamp: dayjs(transaction.date).toISOString(),
    value: transaction.amount,
    categoryId: defaultCategoryId,
    walletId: defaultWalletId,
    externalReference: hash(transaction),
  }));

  return newRecords;
};
