import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { Close, Delete } from '@mui/icons-material';
import React from 'react';
import { useRecoilState } from 'recoil';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
} from '../hooks/categoriesQueries';
import {
  useDeleteRecurrentRecordMutation,
  useEditRecurrentRecordMutation,
} from '../hooks/recurrentRecordQueries';
import { recurrentRecordsDialogsState } from '../hooks/recurrentRecordsStore';
import { RecurrentRecord } from '../models/RecurrentRecord';
import { getCategoryByIdOrName } from '../utils/categoryUtils';
import { RecurrentRecordForm } from './RecurrentRecordForm';

const RecurrentRecordEditDialog = (props) => {
  const [dialogs, setDialogs] = useRecoilState(recurrentRecordsDialogsState);

  const { mutateAsync } = useEditRecurrentRecordMutation();
  const { mutateAsync: deleteMutation } = useDeleteRecurrentRecordMutation();
  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery();
  const { data: wallets, isLoading: isWalletsLoading } = useWalletsQuery();
  const { username } = useAuthentication();

  const closeDialog = () => {
    setDialogs({
      ...dialogs,
      EDIT_RECURRENT_RECORD: { open: false, recordToEdit: null },
    });
  };

  const { mutateAsync: createCategoryMutation } = useCreateCategoryMutation();

  const editRecurrentRecord = async (recurrentRecord: RecurrentRecord) => {
    const updatedRecurrentRecordToAdd = { ...recurrentRecord };
    let category = getCategoryByIdOrName(
      categories,
      recurrentRecord.categoryId
    );
    if (!category) {
      category = await createCategoryMutation(recurrentRecord.categoryId);
    }
    updatedRecurrentRecordToAdd.categoryId = category.id;
    await mutateAsync(updatedRecurrentRecordToAdd);
    closeDialog();
  };

  const onDeleteRecord = async (recurrentRecordToDelete: RecurrentRecord) => {
    await deleteMutation(recurrentRecordToDelete);
    closeDialog();
  };

  return (
    <Dialog open={dialogs.EDIT_RECURRENT_RECORD.open} onClose={closeDialog}>
      <DialogTitle>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            Edit Recurrent Record
          </Grid>
          <Grid item xs={2}>
            <IconButton
              color="primary"
              onClick={() =>
                onDeleteRecord(dialogs.EDIT_RECURRENT_RECORD.recordToEdit)
              }
              size="large">
              <Delete />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton color="primary" onClick={closeDialog} size="large">
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        {isCategoriesLoading || isWalletsLoading ? (
          <LinearProgress />
        ) : (
          <RecurrentRecordForm
            onAddRecurrentRecord={editRecurrentRecord}
            recurrentRecord={dialogs.EDIT_RECURRENT_RECORD.recordToEdit}
            categories={categories}
            wallets={wallets}
            username={username}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={closeDialog} variant="outlined">
          Cancel
        </Button>
        <Button
          color="secondary"
          type="submit"
          form="recurrent-record-form"
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecurrentRecordEditDialog;
