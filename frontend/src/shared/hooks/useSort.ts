import { useState } from 'react';
import { SortHook } from '../models/SortHook';
import { SortOrder, Order } from '../models/SortOrder';

export const useSort = <K>(initialState?: SortOrder<K>): SortHook<K> => {
  const defaultSortOrder: SortOrder<K> = {
    order: Order.asc,
    orderBy: undefined,
  };
  const [sortOrder, setSortOrder] = useState<SortOrder<K>>(
    initialState || defaultSortOrder
  );

  const handleSort = (newOrderKey: SortOrder<K>['orderBy']) => {
    if (sortOrder.orderBy !== newOrderKey) {
      setSortOrder({ ...defaultSortOrder, orderBy: newOrderKey });
      return;
    }

    if (sortOrder.order === Order.asc) {
      setSortOrder({ order: Order.desc, orderBy: sortOrder.orderBy });
      return;
    }

    if (sortOrder.order === Order.desc) {
      setSortOrder({ order: Order.asc, orderBy: undefined });
    }
  };

  return [sortOrder, handleSort, setSortOrder];
};
