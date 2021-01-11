import { Grid, makeStyles } from '@material-ui/core';
import React, { Fragment, FunctionComponent, useState } from 'react';
import { useAuthentication } from '../../src/authentication/hooks/useAuthentication';
import { RecordDialogContainer } from '../../src/records/components/RecordDialogContainer';
import { RecordFilterBar } from '../../src/records/components/RecordFilterBar';
import { RecordHeader } from '../../src/records/components/RecordHeader';
import { RecordsTable } from '../../src/records/components/RecordsTable';
import { RecordTableBody } from '../../src/records/components/RecordTableBody';
import { RecordTableHeader } from '../../src/records/components/RecordTableHeader';
import { useCategoriesQuery } from '../../src/records/hooks/categoriesQueries';
import { useRecordsQuery } from '../../src/records/hooks/recordsQueries';
import { Record } from '../../src/records/models/Record';
import { RecordDialogs } from '../../src/records/models/RecordDialogs';
import { SearchQuery } from '../../src/records/models/SearchQuery';
import { useDialogs } from '../../src/shared/hooks/useDialogs';
import { useSort } from '../../src/shared/hooks/useSort';
import { Order } from '../../src/shared/models/SortOrder';
import { useWalletsQuery } from '../../src/wallets/hooks/walletsQueries';

const styles = makeStyles((theme) => ({
  list: {
    marginTop: theme.spacing(10),
  },
}));

const RecordPage: FunctionComponent = (props) => {
  const classes = styles();
  const { token } = useAuthentication();

  const dialogsState = useDialogs<RecordDialogs>({
    ADD_RECORD: { open: false },
    EDIT_RECORD: { open: false, recordToEdit: null },
  });

  const [sortOrder, handleSortClicked] = useSort<Record>({
    order: Order.desc,
    orderBy: 'timestamp',
  });

  const [currentQuery, setCurrentQuery] = useState<SearchQuery>({
    itemsPerPage: 5,
    page: 1,
    sortBy: sortOrder.orderBy,
    sortDirection: sortOrder.order,
    filterBy: {
      categoryId: undefined,
      description: undefined,
      walletId: undefined,
    },
  });

  const { data: paginatedResult } = useRecordsQuery({ ...currentQuery }, token);

  const { data: categories } = useCategoriesQuery(token);
  const { data: wallets } = useWalletsQuery(token);

  const updatePage = (newPage: number): void => {
    setCurrentQuery({ ...currentQuery, page: newPage + 1 });
  };

  const updateRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setCurrentQuery({
      ...currentQuery,
      itemsPerPage: parseInt(event.target.value, 10),
    });
  };

  const openAddDialog = () => {
    dialogsState.setSingleDialog('ADD_RECORD', { open: true });
  };

  const openEditDialog = (record: Record): void => {
    dialogsState.setSingleDialog('EDIT_RECORD', {
      open: true,
      recordToEdit: record,
    });
  };

  const updateFilters = (filters: SearchQuery['filterBy']) => {
    setCurrentQuery({ ...currentQuery, filterBy: filters, page: 1 });
  };

  return paginatedResult?.data && wallets?.length && categories?.length ? (
    <>
      <Grid item xs={9} className={classes.list}>
        <RecordHeader />
        <RecordDialogContainer dialogsState={dialogsState} />
        <RecordsTable
          addClicked={openAddDialog}
          rowsPerPage={currentQuery.itemsPerPage}
          page={currentQuery.page - 1}
          onChangePage={updatePage}
          onChangeRowsPerPage={updateRowsPerPage}
          rowCount={paginatedResult.totalCount || 0}
        >
          <RecordTableHeader
            sortOrder={sortOrder}
            sortClicked={handleSortClicked}
          />
          <RecordTableBody
            records={paginatedResult.data}
            onRecordClicked={openEditDialog}
            categories={categories}
            wallets={wallets}
          />
        </RecordsTable>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={2}>
        <RecordFilterBar setFilter={updateFilters} />
      </Grid>
    </>
  ) : (
    <Fragment />
  );
};

export default RecordPage;
