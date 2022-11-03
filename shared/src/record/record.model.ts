export interface Record {
  id?: number;
  value: number;
  description: string;
  timestamp: string;
  externalReference?: string;
  ownerUsername: string;
  walletId: string;
  categoryId: string;
}
