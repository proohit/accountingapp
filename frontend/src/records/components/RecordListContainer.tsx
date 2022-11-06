import { RecordDto as Record } from '@accountingapp/shared';
import {
  Divider,
  Hidden,
  LinearProgress,
  List,
  Paper,
  TablePagination,
  Typography,
} from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import { useCategoriesQuery } from '../hooks/categoriesQueries';
import {
  currentFilterState,
  currentPageState,
  currentSortState,
} from '../hooks/currentQueryState';
import { recordsDialogsState } from '../hooks/recordsDialogsState';
import { useRecordsQuery } from '../hooks/recordsQueries';
import { useFormatState } from '../hooks/useFormatState';
import { MobileRecordItem } from './MobileRecordItem';
import { RecordsTable } from './RecordsTable';
import { RecordsTableToolbar } from './RecordsTableToolbar';
import { RecordTableBody } from './RecordTableBody';
import { RecordTableHeader } from './RecordTableHeader';

export const RecordListContainer: FunctionComponent = () => {
  const [recordsDialog, setRecordsDialog] = useRecoilState(recordsDialogsState);
  const [currentSort, setCurrentSort] = useRecoilState(currentSortState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const currentFilter = useRecoilValue(currentFilterState);
  const { data: format, isLoading: formatLoading } = useFormatState();
  const { data: paginatedResult, isFetching: recordsLoading } = useRecordsQuery(
    {
      itemsPerPage: currentPage.itemsPerPage,
      page: currentPage.page,
      sortBy: currentSort.sortBy,
      sortDirection: currentSort.sortDirection,
      categoryId: currentFilter.categoryId,
      walletId: currentFilter.walletId,
      description: currentFilter.description,
      timestampFrom: currentFilter.timestampFrom,
      timestampTo: currentFilter.timestampTo,
    }
  );
  const { data: categories, isFetching: categoriesLoading } =
    useCategoriesQuery();
  const { data: wallets, isFetching: walletsLoading } = useWalletsQuery();

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
    setRecordsDialog({ ...recordsDialog, ADD_RECORD: { open: true } });
  };

  const openEditRecordsDialog = (record: Record): void => {
    setRecordsDialog({
      ...recordsDialog,
      EDIT_RECORD: { open: true, recordToEdit: record },
    });
  };

  const openFilterRecordsDialog = () => {
    setRecordsDialog({ ...recordsDialog, FILTER_RECORDS: { open: true } });
  };

  const openSortRecordsDialog = () => {
    setRecordsDialog({ ...recordsDialog, SORT_RECORDS: { open: true } });
  };

  const openExportRecordsDialog = () => {
    setRecordsDialog({ ...recordsDialog, EXPORT_RECORDS: { open: true } });
  };

  const openImportRecordsDialog = () => {
    setRecordsDialog({ ...recordsDialog, IMPORT_RECORDS: { open: true } });
  };

  const recordsPagination = (
    <TablePagination
      rowsPerPageOptions={[5, 10, 20]}
      count={paginatedResult?.totalCount || 0}
      component="div"
      rowsPerPage={currentPage.itemsPerPage}
      page={currentPage.page - 1}
      onPageChange={(_event, newPage) => {
        updatePage(newPage);
      }}
      onRowsPerPageChange={updateRowsPerPage}
    />
  );

  if (recordsLoading || walletsLoading || categoriesLoading || formatLoading) {
    return <LinearProgress />;
  }

  const noRecords = !paginatedResult?.data || paginatedResult.totalCount <= 0;
  const noRecordsText = 'No records yet. Start tracking by creating a record';
  return (
    <>
      <RecordsTableToolbar
        onAddClicked={openAddRecordsDialog}
        onFilterClicked={openFilterRecordsDialog}
        onSortClicked={openSortRecordsDialog}
        onExportClicked={openExportRecordsDialog}
        onImportClicked={openImportRecordsDialog}
      />
      <>
        <Hidden mdDown>
          <RecordsTable controls={recordsPagination}>
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
              noRecords={noRecords}
              noRecordsText={noRecordsText}
              format={format}
            />
          </RecordsTable>
        </Hidden>
        <Hidden mdUp>
          <Paper variant="outlined">
            <Divider />
            <List>
              {noRecords ? (
                <Typography color="primary">{noRecordsText}</Typography>
              ) : (
                paginatedResult.data.map((record) => (
                  <MobileRecordItem
                    key={record.id}
                    record={record}
                    onRecordClick={openEditRecordsDialog}
                    categories={categories}
                    wallets={wallets}
                    format={format}
                  />
                ))
              )}
            </List>
            {recordsPagination}
          </Paper>
        </Hidden>
      </>
    </>
  );
};
