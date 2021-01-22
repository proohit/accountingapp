import React, { Fragment, FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import { useCategoriesQuery } from '../hooks/categoriesQueries';
import {
  currentFilterState,
  currentPageState,
  currentSortState,
} from '../hooks/currentQueryState';
import {
  addRecordDialogState,
  editRecordDialogState,
} from '../hooks/recordsDialogsState';
import { useRecordsQuery } from '../hooks/recordsQueries';
import { Record } from '../models/Record';
import { RecordsTable } from './RecordsTable';
import { RecordTableBody } from './RecordTableBody';
import { RecordTableHeader } from './RecordTableHeader';

export const RecordListContainer: FunctionComponent = () => {
  const { token } = useAuthentication();

  const [, setEditRecordsDialog] = useRecoilState(editRecordDialogState);
  const [, setAddRecordsDialog] = useRecoilState(addRecordDialogState);
  const [currentSort, setCurrentSort] = useRecoilState(currentSortState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [currentFilter] = useRecoilState(currentFilterState);

  const { data: paginatedResult } = useRecordsQuery(
    {
      filterBy: currentFilter,
      itemsPerPage: currentPage.itemsPerPage,
      page: currentPage.page,
      sortBy: currentSort.sortBy,
      sortDirection: currentSort.sortDirection,
    },
    token
  );

  const { data: categories } = useCategoriesQuery(token);
  const { data: wallets } = useWalletsQuery(token);

  const handleSortClicked = (newOrderKey: keyof Record) => {
    if (currentSort.sortBy !== newOrderKey) {
      setCurrentSort({ sortDirection: 'asc', sortBy: newOrderKey });
      return;
    }

    if (currentSort.sortDirection === 'asc') {
      setCurrentSort({ sortDirection: 'desc', sortBy: currentSort.sortBy });
      return;
    }

    if (currentSort.sortDirection === 'desc') {
      setCurrentSort({ sortDirection: 'asc', sortBy: undefined });
    }
  };

  const updatePage = (newPage: number): void => {
    setCurrentPage({ ...currentPage, page: newPage + 1 });
  };

  const updateRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setCurrentPage({
      ...currentPage,
      itemsPerPage: parseInt(event.target.value, 10),
    });
  };

  const openAddRecordsDialog = () => {
    setAddRecordsDialog({ open: true });
  };

  const openEditRecordsDialog = (record: Record): void => {
    setEditRecordsDialog({ open: true, recordToEdit: record });
  };

  return paginatedResult?.data && wallets?.length && categories?.length ? (
    <RecordsTable
      addClicked={openAddRecordsDialog}
      rowsPerPage={currentPage.itemsPerPage}
      page={currentPage.page - 1}
      onChangePage={updatePage}
      onChangeRowsPerPage={updateRowsPerPage}
      rowCount={paginatedResult.totalCount || 0}
    >
      <RecordTableHeader
        sortBy={currentSort.sortBy}
        sortDirection={currentSort.sortDirection}
        sortClicked={handleSortClicked}
      />
      <RecordTableBody
        records={paginatedResult.data}
        onRecordClicked={openEditRecordsDialog}
        categories={categories}
        wallets={wallets}
      />
    </RecordsTable>
  ) : (
    <Fragment />
  );
};
