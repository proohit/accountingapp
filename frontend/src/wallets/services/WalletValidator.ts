import { WalletDto } from '@accountingapp/shared';

export const validateWalletField = (
  field: keyof WalletDto,
  value: WalletDto[keyof WalletDto]
): string => {
  switch (field) {
    case 'name':
      if (!value) return 'Missing Name';
      break;
    case 'balance':
      if (!value && value !== 0) return 'Missing Balance';
      if (isNaN(value as number)) return 'Invalid Balance';
      break;
    default:
      return '';
  }
  return '';
};
