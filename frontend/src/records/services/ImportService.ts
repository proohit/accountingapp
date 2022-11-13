import { RecordDto } from '@accountingapp/shared';
import { Entry } from 'camtjs';
import dayjs from 'dayjs';

export class MT940ImportService {
  private static createDescriptionFromTransaction = (transaction: any) => {
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

  public static createRecordsFromFile = async (
    file: File,
    defaultWalletId: RecordDto['walletId'],
    defaultCategoryId: RecordDto['categoryId']
  ) => {
    const mt940 = await import('mt940js');
    const hash = await import('object-hash');

    const parser = new mt940.Parser();
    const fileContent = await file.text();
    const statements = parser.parse(fileContent);
    const transactions = statements
      ?.map?.((statement) => statement.transactions)
      ?.flat();
    const newRecords: RecordDto[] = transactions?.map?.((transaction) => ({
      description:
        MT940ImportService.createDescriptionFromTransaction(transaction) ||
        'No description',
      timestamp: dayjs(transaction.date).toISOString(),
      value: transaction.amount,
      categoryId: defaultCategoryId,
      walletId: defaultWalletId,
      externalReference: hash(transaction),
    }));

    return newRecords;
  };
}

export class Camt052ImportService {
  private static createDescriptionFromCamtEntry = (entry: Entry) => {
    const creditor =
      entry.entryDetails.transactionDetails.relatedParties.creditor.party.name;
    const details =
      entry.entryDetails.transactionDetails.remittanceInformation.unstructured;

    return `${creditor}\n${details}`;
  };

  public static createRecordsFromFile = async (
    file: File,
    defaultWalletId: RecordDto['walletId'],
    defaultCategoryId: RecordDto['categoryId']
  ) => {
    const { Camt052 } = await import('camtjs');
    const fileContent = await file.text();
    const camt052 = await Camt052.parseCamt(fileContent);
    const entries = camt052.document.messageRoot.report.entry;
    console.log(camt052.document);
    console.log(entries);
    const newRecords: RecordDto[] = entries?.map?.((entry) => ({
      description:
        Camt052ImportService.createDescriptionFromCamtEntry(entry) ||
        'No description',
      timestamp: dayjs(entry.bookingDate.date).toISOString(),
      value:
        entry.creditDebitIndicator === 'DBIT'
          ? -entry.amount.value
          : entry.amount.value,
      categoryId: defaultCategoryId,
      walletId: defaultWalletId,
      externalReference: entry.accountServicerReference,
      ownerUsername: undefined,
    }));

    return newRecords;
  };
}
