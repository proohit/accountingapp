import { SortOrder } from './SortOrder';

export type SortHook<K> = [
  SortOrder<K>,
  (newOrderKey: SortOrder<K>['orderBy']) => void,
  (sortOrder: SortOrder<K>) => void
];
