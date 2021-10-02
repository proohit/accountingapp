export enum Periodicity {
  HOURLY = 'hourly',
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

export interface PlannedRecurrentRecord extends RecurrentRecord {
  nextInvocation: string;
}
