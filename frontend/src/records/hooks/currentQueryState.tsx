import { SearchQueryDto } from '@accountingapp/shared';
import { atom, DefaultValue, selector } from 'recoil';

export const currentQuery = atom<SearchQueryDto>({
  key: 'currentQuery',
  default: {
    itemsPerPage: 5,
    page: 1,
    sortBy: 'timestamp',
    sortDirection: 'desc',
    categoryId: undefined,
    description: undefined,
    walletId: undefined,
    timestampFrom: null,
    timestampTo: null,
  },
});

export const currentPageState = selector<{
  page: SearchQueryDto['page'];
  itemsPerPage: SearchQueryDto['itemsPerPage'];
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
  sortBy: SearchQueryDto['sortBy'];
  sortDirection: SearchQueryDto['sortDirection'];
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

export const currentFilterState = selector<
  Pick<
    SearchQueryDto,
    'categoryId' | 'description' | 'walletId' | 'timestampFrom' | 'timestampTo'
  >
>({
  key: 'currentQueryFilter',
  get: ({ get }) => ({
    categoryId: get(currentQuery).categoryId,
    description: get(currentQuery).description,
    walletId: get(currentQuery).walletId,
    timestampFrom: get(currentQuery).timestampFrom,
    timestampTo: get(currentQuery).timestampTo,
  }),
  set: ({ get, set }, currentFilter) => {
    const currentQueryState = get(currentQuery);
    set(
      currentQuery,
      currentFilter instanceof DefaultValue
        ? currentFilter
        : {
            ...currentQueryState,
            ...currentFilter,
          }
    );
  },
});
