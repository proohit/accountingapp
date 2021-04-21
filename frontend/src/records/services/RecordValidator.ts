import { Record } from '../models/Record';

export const validateRecordField = (
  field: string,
  value: Record[keyof Record]
): string => {
  switch (field) {
    case 'category':
    case 'categoryName':
      if (!value) return 'Missing category';
      break;
    case 'timestamp':
      if (!value) return 'Missing timestamp';
      break;
    case 'value':
      if (isNaN(value as number)) return 'Invalid value format';
      if (!value && value !== 0) return 'Missing value';
      break;
    case 'walletName':
      if (!value) return 'Missing Wallet';
      break;
    default:
      return '';
  }
  return '';
};
