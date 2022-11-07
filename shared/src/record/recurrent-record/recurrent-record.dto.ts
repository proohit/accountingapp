import { Periodicity } from './periodicity.enum';

export class RecurrentRecordDto {
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
