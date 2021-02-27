import {
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Paper,
  TablePagination,
  Typography,
} from '@material-ui/core';
import dayjs from 'dayjs';
import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import { WalletUtils } from '../../wallets/utils/walletUtils';
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
} from '../hooks/recordsDialogsState';
import { useRecordsQuery } from '../hooks/recordsQueries';
import { Record } from '../models/Record';
import { getCategoryById } from '../utils/categoryUtils';
import { RecordsTable } from './RecordsTable';
import { RecordsTableToolbar } from './RecordsTableToolbar';
import { RecordTableBody } from './RecordTableBody';
import { RecordTableHeader } from './RecordTableHeader';

export const RecordListContainer: FunctionComponent = () => {
  const { token } = useAuthentication();

  const [, setEditRecordsDialog] = useRecoilState(editRecordDialogState);
  const [, setAddRecordsDialog] = useRecoilState(addRecordDialogState);
  const [, setFilterRecordsDialog] = useRecoilState(filterRecordDialogState);
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

  const openFilterRecordsDialog = () => {
    setFilterRecordsDialog({ open: true });
  };

  const shouldRender =
    paginatedResult?.data && wallets?.length && categories?.length;
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
  const recordsToolbar = (
    <RecordsTableToolbar
      onAddClicked={openAddRecordsDialog}
      onFilterClicked={openFilterRecordsDialog}
    />
  );
  return (
    <>
      {shouldRender && (
        <>
          <Hidden smDown>
            <RecordsTable toolbar={recordsToolbar} controls={recordsPagination}>
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
          </Hidden>
          <Hidden mdUp>
            <Paper variant="outlined">
              {recordsToolbar}
              <Divider />
              <List>
                {paginatedResult.data.map((record) => (
                  <ListItem
                    key={record.id}
                    button
                    divider
                    onClick={() => {
                      openEditRecordsDialog(record);
                    }}
                  >
                    <ListItemText
                      primary={record.description}
                      secondary={
                        <>
                          <Typography
                            color={record.value < 0 ? 'error' : 'primary'}
                          >
                            Value: {record.value}
                          </Typography>
                          <Typography>
                            Category:{' '}
                            {
                              getCategoryById(categories, record.categoryId)
                                ?.name
                            }
                            {', '}
                            Wallet:{' '}
                            {
                              WalletUtils.getWalletById(
                                wallets,
                                record.walletId
                              )?.name
                            }
                          </Typography>
                          <Typography>
                            Timestamp:{' '}
                            {dayjs(record.timestamp).format(
                              'YYYY-MM-DD HH:mm:ss'
                            )}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
            {recordsPagination}
          </Hidden>
        </>
      )}
    </>
  );
};
