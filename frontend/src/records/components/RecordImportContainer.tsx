import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import { WalletUtils } from '../../wallets/utils/walletUtils';
import { useCategoriesQuery } from '../hooks/categoriesQueries';
import { exportRecordDialogState } from '../hooks/recordsDialogsState';
import { Record } from '../models/Record';
import { createNewRecordsFromMt940File } from '../services/ImportService';
import { getCategoryById, getCategoryByName } from '../utils/categoryUtils';
import { CategoryField } from './CategoryField';
import { DescriptionField } from './DescriptionField';
import { RecordsTable } from './RecordsTable';
import { RecordTableHeader } from './RecordTableHeader';
import { WalletField } from './WalletField';

const RecordImportContainer: React.FC = (props) => {
  const [importType, setImportType] = React.useState('mt940');
  const [newRecords, setNewRecords] = React.useState<Record[]>([]);
  const { data: categories } = useCategoriesQuery();
  const { data: wallets } = useWalletsQuery();
  const setExportRecordDialog = useSetRecoilState(exportRecordDialogState);

  const handleImportTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImportType((event.target as HTMLInputElement).value);
  };

  const importRecords = async () => {};

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (file) {
      const recordsFromFile = await createNewRecordsFromMt940File(
        file,
        wallets[0].id,
        categories[0].id
      );
      console.log(recordsFromFile);
      setNewRecords(recordsFromFile);
    }
  };

  const updateNewRecordWithCategory = (categoryName: string, index: number) => {
    const category = getCategoryByName(categories, categoryName);
    if (category) {
      const updatedRecords = [...newRecords];
      updatedRecords[index].categoryId = category.id;
      setNewRecords(updatedRecords);
    }
  };

  const updateNewRecordWithWallet = (walletName: string, index: number) => {
    const wallet = WalletUtils.getWalletByName(wallets, walletName);
    if (wallet) {
      const updatedRecords = [...newRecords];
      updatedRecords[index].walletId = wallet.id;
      setNewRecords(updatedRecords);
    }
  };

  const showNewRecords = newRecords.length > 0 && categories && wallets;

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs>
        <RadioGroup
          aria-label="import-choice"
          value={importType}
          onChange={handleImportTypeChange}
        >
          <FormControlLabel value="mt940" control={<Radio />} label="MT940" />
        </RadioGroup>

        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden onChange={handleFileUpload} />
        </Button>
        {showNewRecords && (
          <RecordsTable>
            <RecordTableHeader />
            <TableBody>
              {newRecords.map((record, index) => (
                <TableRow key={record.description}>
                  <TableCell>
                    <DescriptionField
                      description={record.description}
                      onDescriptionChange={undefined}
                    />
                  </TableCell>
                  <TableCell>
                    <CategoryField
                      categories={categories}
                      categoryName={
                        getCategoryById(categories, record.categoryId)?.name
                      }
                      withNew
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
                  <TableCell>{record.timestamp}</TableCell>
                  <TableCell>{record.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </RecordsTable>
        )}
      </Grid>
      <Grid item xs>
        <Button onClick={() => setExportRecordDialog({ open: false })}>
          Cancel
        </Button>
        <Button onClick={importRecords}>Import</Button>
      </Grid>
    </Grid>
  );
};

export default RecordImportContainer;
