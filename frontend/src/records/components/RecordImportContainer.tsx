import { RecordDto as Record, RecordDto } from '@accountingapp/shared';
import { Delete } from '@mui/icons-material';
import {
  Button,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  LinearProgress,
  Radio,
  RadioGroup,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
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
import {
  createNewRecordsFromCamt052File,
  createNewRecordsFromMt940File,
} from '../services/ImportService';
import { RecordsApiService } from '../services/RecordsApi';
import { getCategoryById, getCategoryByName } from '../utils/categoryUtils';
import { CategoryField } from './CategoryField';
import { DescriptionField } from './DescriptionField';
import { RecordSchema } from './RecordForm';
import { RecordsTable } from './RecordsTable';
import { RecordTableHeader } from './RecordTableHeader';
import { WalletField } from './WalletField';

const RecordImportContainer: React.FC = (props) => {
  const [importType, setImportType] = React.useState('mt940');
  const { data: categories } = useCategoriesQuery();
  const { data: wallets } = useWalletsQuery();
  const { data: format } = useFormatState();
  const [localImportLoading, setLocalImportLoading] = React.useState(false);
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
      console.log(submittedValues);
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
    const files = event.target.files;
    setLocalImportLoading(true);
    if (files?.length) {
      let recordsFromFiles: RecordDto[] = [];
      for (let fileIndex = 0; fileIndex < files.length; fileIndex += 1) {
        const file = files[fileIndex];
        if (importType === 'mt940') {
          const newRecords = await createNewRecordsFromMt940File(
            file,
            wallets[0].id,
            categories[0].id
          );
          recordsFromFiles.push(...newRecords);
        }
        if (importType === 'camt052') {
          const newRecords = await createNewRecordsFromCamt052File(
            file,
            wallets[0].id,
            categories[0].id
          );
          recordsFromFiles.push(...newRecords);
        }
      }
      if (recordsFromFiles?.length) {
        const existingReferences = await api.checkIfExternalReferencesExist(
          recordsFromFiles?.map((record) => record.externalReference)
        );
        if (existingReferences.length > 0) {
          setNotificationState({
            content: `Some records have already been imported. They will not be imported again.`,
            severity: 'info',
          });
        }
        const newRecords = recordsFromFiles.filter(
          (record) => !existingReferences.includes(record.externalReference)
        );
        setValues({ newRecords });
      }
      setLocalImportLoading(false);
      event.target.value = '';
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

  const showNewRecords = values.newRecords.length > 0 && categories && wallets;

  const removeRecord = (index: number) => {
    const updatedRecords = [...values.newRecords];
    updatedRecords.splice(index, 1);
    setValues({ newRecords: updatedRecords });
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item container direction="row" xs>
        <RadioGroup
          aria-label="import-choice"
          value={importType}
          onChange={handleImportTypeChange}
        >
          <FormControlLabel
            disabled={importLoading}
            value="mt940"
            control={<Radio />}
            label="MT940"
          />
          <FormControlLabel
            disabled={importLoading}
            value="camt052"
            control={<Radio />}
            label="Camt052"
          />
        </RadioGroup>
      </Grid>
      <Button disabled={importLoading} variant="contained" component="label">
        Upload File
        <input type="file" multiple hidden onChange={handleFileUpload} />
      </Button>
      <Grid item xs>
        <Typography variant="h6">Import editor</Typography>
        {localImportLoading && <LinearProgress />}
        {showNewRecords && (
          <form onSubmit={handleSubmit} id="import-form">
            <RecordsTable>
              <RecordTableHeader>
                <TableCell key="actions" />
              </RecordTableHeader>
              <TableBody>
                {values.newRecords.map((record, index) => (
                  <TableRow key={record.externalReference}>
                    <TableCell>
                      <DescriptionField
                        multiline
                        description={record.description}
                        onDescriptionChange={handleChange}
                        namePrefix={`newRecords[${index}].`}
                      />
                    </TableCell>
                    <TableCell>
                      <CategoryField
                        categories={categories}
                        categoryName={
                          getCategoryById(categories, record.categoryId)?.name
                        }
                        onCategoryChange={(categoryName) =>
                          updateNewRecordWithCategory(categoryName, index)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <WalletField
                        wallets={wallets}
                        walletName={
                          WalletUtils.getWalletById(wallets, record.walletId)
                            ?.name
                        }
                        onWalletChange={(event) =>
                          updateNewRecordWithWallet(event.target.value, index)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {dayjs(record.timestamp).format(format.dateTimeFormat)}
                    </TableCell>
                    <TableCell>{record.value}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => removeRecord(index)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </RecordsTable>
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
          disabled={importLoading}
          onClick={() => importRecords(values.newRecords)}
        >
          Import
        </Button>
      </Grid>
    </Grid>
  );
};

export default RecordImportContainer;
