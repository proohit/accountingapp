import { RecordDto as Record } from '@accountingapp/shared';
import {
  Button,
  Divider,
  FormControlLabel,
  Grid,
  LinearProgress,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '../../shared/hooks/notificationState';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import { WalletUtils } from '../../wallets/utils/walletUtils';
import { useCategoriesQuery } from '../hooks/categoriesQueries';
import { importRecordDialogState } from '../hooks/recordsDialogsState';
import { useCreateManyRecordsMutation } from '../hooks/recordsQueries';
import { useFormatState } from '../hooks/useFormatState';
import { RecordCsvMapping } from '../models/RecordCsvMapping';
import { useCsvImport, useMt940Import } from '../services/ImportService';
import { RecordsApiService } from '../services/RecordsApi';
import { getCategoryById, getCategoryByName } from '../utils/categoryUtils';
import { CategoryField } from './CategoryField';
import { DescriptionField } from './DescriptionField';
import { RecordCsvFieldListNarrow } from './RecordCsvFieldMapList';
import { RecordSchema } from './RecordForm';
import { WalletField } from './WalletField';

const RecordImportContainer: React.FC = () => {
  const [importType, setImportType] = React.useState('csv');
  const [localImportLoading, setLocalImportLoading] = React.useState(false);

  const { createRecords: createRecordsFromMt940 } = useMt940Import();

  const {
    previewData: csvPreviewData,
    setPreviewData: setCsvPreviewData,
    updateFile: updateCsvFile,
    createRecords: createRecordsFromCsv,
    loadPreviewData: loadCsvPreviewData,
  } = useCsvImport();

  const { data: categories } = useCategoriesQuery();
  const { data: wallets } = useWalletsQuery();
  const { data: format } = useFormatState();

  const { mutateAsync: createManyRecords, isLoading: importLoading } =
    useCreateManyRecordsMutation();

  const { values, handleSubmit, handleChange, setValues } = useFormik<{
    newRecords: Record[];
  }>({
    initialValues: {
      newRecords: [],
    },
    validationSchema: RecordSchema(wallets?.map((wallet) => wallet.name)),
    validateOnChange: true,
    onSubmit: (submittedValues) => {
      importRecords(submittedValues.newRecords);
    },
  });

  const setNotificationState = useSetRecoilState(notificationState);
  const setImportRecordDialog = useSetRecoilState(importRecordDialogState);

  const api = new RecordsApiService();

  const handleImportTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImportType((event.target as HTMLInputElement).value);
  };

  const importRecords = async (newRecords: Record[]) => {
    try {
      await createManyRecords(newRecords);
      setNotificationState({
        content: 'Records imported successfully',
        severity: 'success',
      });
      setImportRecordDialog({ open: false });
    } catch (error) {
      setNotificationState({
        content: 'Error while importing records',
        severity: 'error',
      });
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    let recordsFromFile: Record[];

    if (importType === 'csv') {
      updateCsvFile(file);
      await loadCsvPreviewData(file);
    }

    if (importType === 'mt940') {
      recordsFromFile = await createRecordsFromMt940(
        wallets[0].id,
        categories[0].id,
        file
      );
      handleLocalImport(recordsFromFile);
    }

    event.target.value = '';
  };

  const handleLocalImport = async (recordsFromFile: Record[]) => {
    setLocalImportLoading(true);

    const existingReferences = await api.checkIfExternalReferencesExist(
      recordsFromFile?.map((record) => record.externalReference)
    );
    const newRecords = recordsFromFile.filter(
      (record) => !existingReferences.includes(record.externalReference)
    );
    setValues({ newRecords });

    setLocalImportLoading(false);

    if (existingReferences.length > 0) {
      setNotificationState({
        content: `Some records have already been imported. They will not be imported again.`,
        severity: 'info',
      });
    }
  };

  const updateNewRecordWithCategory = (categoryName: string, index: number) => {
    const category = getCategoryByName(categories, categoryName);
    if (category) {
      const updatedRecords = [...values.newRecords];
      updatedRecords[index].categoryId = category.id;
      setValues({ newRecords: updatedRecords });
    }
  };

  const updateNewRecordWithWallet = (walletName: string, index: number) => {
    const wallet = WalletUtils.getWalletByName(wallets, walletName);
    if (wallet) {
      const updatedRecords = [...values.newRecords];
      updatedRecords[index].walletId = wallet.id;
      setValues({ newRecords: updatedRecords });
    }
  };

  const updateNewRecordWithDescription = (
    description: string,
    index: number
  ) => {
    const updatedRecords = [...values.newRecords];
    updatedRecords[index].description = description;
    setValues({ newRecords: updatedRecords });
  };

  const removeRecord = (index: number) => {
    const updatedRecords = [...values.newRecords];
    updatedRecords.splice(index, 1);
    setValues({ newRecords: updatedRecords });
  };

  const handleCsvMappingConfirm = async (mapping: RecordCsvMapping) => {
    try {
      const recordsFromFile = await createRecordsFromCsv(
        wallets[0].id,
        categories[0].id,
        mapping
      );
      handleLocalImport(recordsFromFile);
      setCsvPreviewData([]);
    } catch (error) {
      console.error(error);
      setNotificationState({
        content: 'Error while importing records.',
        severity: 'error',
      });
    }
  };

  const showNewRecords = values.newRecords.length > 0 && categories && wallets;

  return (
    <Grid container spacing={2} direction="column">
      <Grid item container direction="row" xs alignItems="center">
        <RadioGroup
          aria-label="import-choice"
          value={importType}
          onChange={handleImportTypeChange}
        >
          <FormControlLabel
            disabled={importLoading}
            value="csv"
            control={<Radio />}
            label="CSV"
          />
          <FormControlLabel
            disabled={importLoading}
            value="mt940"
            control={<Radio />}
            label="MT940"
          />
        </RadioGroup>
        <Button disabled={importLoading} variant="contained" component="label">
          Upload File
          <input type="file" hidden onChange={handleFileUpload} />
        </Button>
      </Grid>

      <Grid item xs>
        <Typography variant="h6">Import editor</Typography>
        {importType === 'csv' && csvPreviewData?.length > 0 && (
          <RecordCsvFieldListNarrow
            previewData={csvPreviewData}
            onConfirm={handleCsvMappingConfirm}
          />
        )}
        {localImportLoading && <LinearProgress />}
        {showNewRecords && (
          <form onSubmit={handleSubmit} id="import-form">
            <div style={{ height: 500, width: '100%' }}>
              <DataGrid
                disableRowSelectionOnClick
                rows={values.newRecords.map((record, index) => ({
                  ...record,
                  id: index,
                  index,
                }))}
                getRowHeight={() => 'auto'}
                sx={{
                  '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
                    py: '8px',
                  },
                  '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                    py: '15px',
                  },
                  '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
                    py: '22px',
                  },
                }}
                editMode="row"
                columns={[
                  {
                    field: 'description',
                    headerName: 'Description',
                    flex: 1,
                    editable: true,
                    renderEditCell: (params) => (
                      <DescriptionField
                        multiline
                        description={params.value}
                        onDescriptionChange={(e) =>
                          updateNewRecordWithDescription(
                            e.target.value,
                            params.row.index
                          )
                        }
                      />
                    ),
                  },
                  {
                    field: 'categoryId',
                    headerName: 'Category',
                    valueGetter: (params) => {
                      return getCategoryById(categories, params.value)?.name;
                    },
                    editable: true,
                    renderEditCell: (params) => (
                      <CategoryField
                        categories={categories}
                        categoryName={params.value}
                        onCategoryChange={(category) =>
                          updateNewRecordWithCategory(
                            category,
                            params.row.index
                          )
                        }
                      />
                    ),
                  },
                  {
                    field: 'walletId',
                    headerName: 'Wallet',
                    valueGetter: (params) => {
                      return WalletUtils.getWalletById(wallets, params.value)
                        ?.name;
                    },
                    editable: true,
                    renderEditCell: (params) => (
                      <WalletField
                        wallets={wallets}
                        walletName={params.value}
                        onWalletChange={(e) =>
                          updateNewRecordWithWallet(
                            e.target.value,
                            params.row.index
                          )
                        }
                      />
                    ),
                  },
                  {
                    field: 'value',
                    headerName: 'Value',
                  },
                  {
                    field: 'timestamp',
                    headerName: 'Timestamp',
                    flex: 1,
                  },
                ]}
              />
            </div>
          </form>
        )}
      </Grid>
      <Divider />
      <Grid item xs>
        {importLoading && <LinearProgress />}
        <Button
          disabled={importLoading}
          onClick={() => setImportRecordDialog({ open: false })}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={importLoading || !showNewRecords}
          onClick={() => importRecords(values.newRecords)}
        >
          Import
        </Button>
      </Grid>
    </Grid>
  );
};

export default RecordImportContainer;
