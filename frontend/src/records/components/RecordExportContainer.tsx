import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import { WalletUtils } from '../../wallets/utils/walletUtils';
import { useCategoriesQuery } from '../hooks/categoriesQueries';
import { currentQuery } from '../hooks/currentQueryState';
import { exportRecordDialogState } from '../hooks/recordsDialogsState';
import { useRecordsQuery } from '../hooks/recordsQueries';
import { PaginatedResult } from '../models/PaginatedResult';
import { RecordsApiService } from '../services/RecordsApi';
import { getCategoryById } from '../utils/categoryUtils';

const DEFAULT_EXPORT_FIELDS = [
  'id',
  'description',
  'timestamp',
  'value',
  'category',
  'wallet',
];

const RecordExportContainer: React.FC = (props) => {
  const [exportType, setExportType] = React.useState('csv');
  const currentQueryState = useRecoilValue(currentQuery);
  const { data: records } = useRecordsQuery(currentQueryState);
  const { data: categories } = useCategoriesQuery();
  const { data: wallets } = useWalletsQuery();
  const setExportRecordDialog = useSetRecoilState(exportRecordDialogState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExportType((event.target as HTMLInputElement).value);
  };

  const prepareRecordsForExport = (recordsToExport: PaginatedResult) => {
    return recordsToExport?.data.map((record) => ({
      ...record,
      category: getCategoryById(categories, record?.categoryId)?.name,
      wallet: WalletUtils.getWalletById(wallets, record?.walletId)?.name,
    }));
  };

  const exportRecords = async () => {
    const ExportService = await import('../services/ExportService');
    const api = new RecordsApiService();
    const recordsToExport = await api.getRecordsByUser({
      page: 1,
      itemsPerPage: records?.totalCount,
    });
    const preparedRecords = prepareRecordsForExport(recordsToExport);
    if (exportType === 'csv') {
      ExportService.exportToCsv(preparedRecords, DEFAULT_EXPORT_FIELDS);
    } else if (exportType === 'json') {
      ExportService.exportToJson(preparedRecords, DEFAULT_EXPORT_FIELDS);
    }
    setExportRecordDialog({ open: false });
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
        <Button onClick={() => setExportRecordDialog({ open: false })}>
          Cancel
        </Button>
        <Button disabled={!records?.totalCount} onClick={exportRecords}>
          Export
        </Button>
      </Grid>
    </Grid>
  );
};

export default RecordExportContainer;
