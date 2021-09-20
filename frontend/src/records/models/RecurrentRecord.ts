export interface RecurrentRecord {
  id: string;
  value: number;
  description?: string;
  periodicity: string;
  startDate: string;
  endDate?: string;
  walletId: string;
  ownerUsername: string;
  categoryId: string;
}
