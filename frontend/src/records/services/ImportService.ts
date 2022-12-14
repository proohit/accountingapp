import { hashRecord, RecordDto } from '@accountingapp/shared';
import dayjs from 'dayjs';
import { ParseConfig, ParseResult } from 'papaparse';
import { useState } from 'react';
import { RecordCsvMapping } from '../models/RecordCsvMapping';

const useFileImport = () => {
  const [file, setFile] = useState<File>();

  return {
    file,
    updateFile: setFile,
  };
};

export const useMt940Import = () => {
  const { file, updateFile } = useFileImport();
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

  const createRecords = async (
    defaultWalletId: RecordDto['walletId'],
    defaultCategoryId: RecordDto['categoryId'],
    currentFile?: File
  ) => {
    const mt940 = await import('mt940js');
    const parser = new mt940.Parser();
    const fileContent = await (currentFile || file)?.text();
    const statements = parser.parse(fileContent);
    const transactions = statements
      ?.map?.((statement) => statement.transactions)
      ?.flat();

    let newRecords: RecordDto[] = transactions?.map?.((transaction) => ({
      categoryId: defaultCategoryId,
      description:
        createDescriptionFromTransaction(transaction) || 'No description',
      timestamp: dayjs(transaction.date).toISOString(),
      value: transaction.amount,
      walletId: defaultWalletId,
    }));

    newRecords = newRecords.map((record) => ({
      ...record,
      externalReference: hashRecord(
        record.description,
        record.timestamp,
        record.categoryId,
        record.value,
        record.walletId
      ),
    }));

    return newRecords;
  };

  return {
    createRecords,

    file,
    updateFile,
  };
};

export const useCsvImport = () => {
  const { file, updateFile } = useFileImport();
  const [previewData, setPreviewData] = useState<any[]>();

  const parseCsvFile = async (
    file: File,
    options?: ParseConfig
  ): Promise<ParseResult<any>> => {
    const Papa = (await import('papaparse')).default;
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        error: (error) => reject(error),
        complete: (results) => resolve(results),
        ...options,
      });
    });
  };

  const loadPreviewData = async (currentFile?: File) => {
    return parseCsvFile(currentFile || file, { preview: 1 });
  };

  const sanitizeValue = (value: string) => {
    const sanitizedValue = value.replace(',', '.');
    return parseFloat(sanitizedValue);
  };

  const createRecords = async (
    defaultWalletId: RecordDto['walletId'],
    defaultCategoryId: RecordDto['categoryId'],
    fieldMapping: RecordCsvMapping,
    currentFile?: File
  ): Promise<RecordDto[]> => {
    const { data } = await parseCsvFile(currentFile || file);

    let newRecords: RecordDto[] = data.map?.((transaction) => ({
      description: transaction[fieldMapping.description] || 'No description',
      timestamp: dayjs(
        transaction[fieldMapping.timestamp],
        fieldMapping.timestampFormat
      ).toISOString(),
      value: sanitizeValue(transaction[fieldMapping.value]),
      categoryId: defaultCategoryId,
      walletId: defaultWalletId,
    })) as RecordDto[];

    newRecords = newRecords.map((record) => ({
      ...record,
      externalReference: hashRecord(
        record.description,
        record.timestamp,
        record.categoryId,
        record.value,
        record.walletId
      ),
    }));

    return newRecords;
  };

  return {
    loadPreviewData,
    createRecords,

    updateFile,

    previewData,
    setPreviewData,
  };
};
