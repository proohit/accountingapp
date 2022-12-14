import hash from 'object-hash';

export const hashRecord = (
  description: string,
  timestamp: string,
  categoryId: string,
  value: number,
  walletId: string,
): string => {
  const objectToHash = {
    description,
    timestamp,
    categoryId,
    value,
    walletId,
  };
  return hash(objectToHash);
};
