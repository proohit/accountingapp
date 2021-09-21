export enum Periodicity {
  DAILY = 'daily',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export interface RecurrentRecord {
  id: string;
  value: number;
  description?: string;
  periodicity: Periodicity;
  startDate: string;
  endDate?: string;
  walletId: string;
  ownerUsername: string;
  categoryId: string;
}
