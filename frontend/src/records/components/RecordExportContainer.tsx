import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  currentFilterState,
  currentPageState,
  currentSortState,
} from '../hooks/currentQueryState';
import { exportRecordDialogState } from '../hooks/recordsDialogsState';
import { useRecordsQuery } from '../hooks/recordsQueries';
import { RecordsApiService } from '../services/RecordsApi';

const RecordExportContainer: React.FC = (props) => {
  const [exportType, setExportType] = React.useState('csv');
  const currentSort = useRecoilValue(currentSortState);
  const currentPage = useRecoilValue(currentPageState);
  const currentFilter = useRecoilValue(currentFilterState);

  const { data: records } = useRecordsQuery({
    filterBy: currentFilter,
    itemsPerPage: currentPage.itemsPerPage,
    page: currentPage.page,
    sortBy: currentSort.sortBy,
    sortDirection: currentSort.sortDirection,
  });
  const setExportRecordDialog = useRecoilValue(exportRecordDialogState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExportType((event.target as HTMLInputElement).value);
  };

  const exportRecords = async () => {
    const api = new RecordsApiService();
    const recordsToExport = await api.getRecordsByUser({
      page: 1,
      itemsPerPage: records?.totalCount,
    });

    console.log(recordsToExport.dataCount);
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs>
        <RadioGroup
          aria-label="export-choice"
          value={exportType}
          onChange={handleChange}
        >
          <FormControlLabel value="csv" control={<Radio />} label="CSV" />
          <FormControlLabel value="json" control={<Radio />} label="JSON" />
        </RadioGroup>
      </Grid>
      <Grid item xs>
        <Button> Cancel</Button>
        <Button onClick={exportRecords}> Export</Button>
      </Grid>
    </Grid>
  );
};

export default RecordExportContainer;
