import { atom, DefaultValue, selector } from 'recoil';
import { SearchQuery } from '../models/SearchQuery';

export const currentQuery = atom<SearchQuery>({
  key: 'currentQuery',
  default: {
    itemsPerPage: 5,
    page: 1,
    sortBy: 'timestamp',
    sortDirection: 'desc',
    filterBy: {
      categoryId: undefined,
      description: undefined,
      walletId: undefined,
      timestampFrom: null,
      timestampTo: null,
    },
  },
});

export const currentPageState = selector<{
  page: SearchQuery['page'];
  itemsPerPage: SearchQuery['itemsPerPage'];
}>({
  key: 'currentQueryPage',
  get: ({ get }) => ({
    page: get(currentQuery).page,
    itemsPerPage: get(currentQuery).itemsPerPage,
  }),
  set: ({ get, set }, currentPage) => {
    const currentQueryState = get(currentQuery);
    set(
      currentQuery,
      currentPage instanceof DefaultValue
        ? currentPage
        : {
            ...currentQueryState,
            page: currentPage.page,
            itemsPerPage: currentPage.itemsPerPage,
          }
    );
  },
});

export const currentSortState = selector<{
  sortBy: SearchQuery['sortBy'];
  sortDirection: SearchQuery['sortDirection'];
}>({
  key: 'currentQuerySort',
  get: ({ get }) => ({
    sortBy: get(currentQuery).sortBy,
    sortDirection: get(currentQuery).sortDirection,
  }),
  set: ({ get, set }, currentSort) => {
    const currentQueryState = get(currentQuery);
    set(
      currentQuery,
      currentSort instanceof DefaultValue
        ? currentSort
        : {
            ...currentQueryState,
            sortBy: currentSort.sortBy,
            sortDirection: currentSort.sortDirection,
          }
    );
  },
});

export const currentFilterState = selector<SearchQuery['filterBy']>({
  key: 'currentQueryFilter',
  get: ({ get }) => ({
    ...get(currentQuery).filterBy,
  }),
  set: ({ get, set }, currentFilter) => {
    const currentQueryState = get(currentQuery);
    set(
      currentQuery,
      currentFilter instanceof DefaultValue
        ? currentFilter
        : {
            ...currentQueryState,
            filterBy: currentFilter,
          }
    );
  },
});
