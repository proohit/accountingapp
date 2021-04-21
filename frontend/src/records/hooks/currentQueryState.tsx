import { atom } from 'recoil';
import { SearchQuery } from '../models/SearchQuery';

export const currentPageState = atom<{
  page: SearchQuery['page'];
  itemsPerPage: SearchQuery['itemsPerPage'];
}>({
  key: 'currentQueryPage',
  default: {
    itemsPerPage: 5,
    page: 1,
  },
});

export const currentSortState = atom<{
  sortBy: SearchQuery['sortBy'];
  sortDirection: SearchQuery['sortDirection'];
}>({
  key: 'currentQuerySort',
  default: {
    sortBy: 'timestamp',
    sortDirection: 'desc',
  },
});

export const currentFilterState = atom<SearchQuery['filterBy']>({
  key: 'currentQueryFilters',
  default: {
    categoryId: undefined,
    description: undefined,
    walletId: undefined,
    timestampFrom: null,
    timestampTo: null,
  },
});
