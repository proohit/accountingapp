export interface SortOrder<R> {
  order: Order;
  orderBy: keyof R;
}

export enum Order {
  asc = 'asc',
  desc = 'desc',
}
