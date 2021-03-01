import {
  Divider,
  Hidden,
  LinearProgress,
  List,
  Paper,
  TablePagination,
  Typography,
} from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
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
  filterRecordDialogState,
  sortRecordDialogState,
} from '../hooks/recordsDialogsState';
import { useRecordsQuery } from '../hooks/recordsQueries';
import { Record } from '../models/Record';
import { MobileRecordItem } from './MobileRecordItem';
import { RecordsTable } from './RecordsTable';
import { RecordsTableToolbar } from './RecordsTableToolbar';
import { RecordTableBody } from './RecordTableBody';
import { RecordTableHeader } from './RecordTableHeader';

export const RecordListContainer: FunctionComponent = () => {
  const [, setEditRecordsDialog] = useRecoilState(editRecordDialogState);
  const [, setAddRecordsDialog] = useRecoilState(addRecordDialogState);
  const [, setFilterRecordsDialog] = useRecoilState(filterRecordDialogState);
  const [, setSortRecordsDialog] = useRecoilState(sortRecordDialogState);
  const [currentSort, setCurrentSort] = useRecoilState(currentSortState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [currentFilter] = useRecoilState(currentFilterState);

  const { data: paginatedResult, isLoading: recordsLoading } = useRecordsQuery({
    filterBy: currentFilter,
    itemsPerPage: currentPage.itemsPerPage,
    page: currentPage.page,
    sortBy: currentSort.sortBy,
    sortDirection: currentSort.sortDirection,
  });
  const {
    data: categories,
    isLoading: categoriesLoading,
  } = useCategoriesQuery();
  const { data: wallets, isLoading: walletsLoading } = useWalletsQuery();

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

  const openFilterRecordsDialog = () => {
    setFilterRecordsDialog({ open: true });
  };

  const openSortRecordsDialog = () => {
    setSortRecordsDialog({ open: true });
  };

  const recordsPagination = (
    <TablePagination
      rowsPerPageOptions={[5, 10, 20]}
      count={paginatedResult?.totalCount || 0}
      component="div"
      rowsPerPage={currentPage.itemsPerPage}
      page={currentPage.page - 1}
      onChangePage={(_event, newPage) => {
        updatePage(newPage);
      }}
      onChangeRowsPerPage={updateRowsPerPage}
    />
  );
  const noRecords = !paginatedResult?.data || paginatedResult.totalCount <= 0;
  const noRecordsText = (
    <Typography>No records yet. Start tracking by creating a record</Typography>
  );

  if (recordsLoading || walletsLoading || categoriesLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      <RecordsTableToolbar
        onAddClicked={openAddRecordsDialog}
        onFilterClicked={openFilterRecordsDialog}
        onSortClicked={openSortRecordsDialog}
      />
      <>
        <Hidden smDown>
          <RecordsTable controls={recordsPagination}>
            <RecordTableHeader
              sortBy={currentSort.sortBy}
              sortDirection={currentSort.sortDirection}
              sortClicked={handleSortClicked}
            />
            {noRecords ? (
              noRecordsText
            ) : (
              <RecordTableBody
                records={paginatedResult.data}
                onRecordClicked={openEditRecordsDialog}
                categories={categories}
                wallets={wallets}
              />
            )}
          </RecordsTable>
        </Hidden>
        <Hidden mdUp>
          <Paper variant="outlined">
            <Divider />
            <List>
              {noRecords
                ? noRecordsText
                : paginatedResult.data.map((record) => (
                    <MobileRecordItem
                      key={record.id}
                      record={record}
                      onRecordClick={openEditRecordsDialog}
                      categories={categories}
                      wallets={wallets}
                    />
                  ))}
            </List>
            {recordsPagination}
          </Paper>
        </Hidden>
      </>
    </>
  );
};
