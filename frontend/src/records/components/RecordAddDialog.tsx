import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
} from '../hooks/categoriesQueries';
import { recordsDialogsState } from '../hooks/recordsDialogsState';
import { useCreateRecordMutation } from '../hooks/recordsQueries';
import { Record } from '../models/Record';
import { getCategoryByIdOrName } from '../utils/categoryUtils';
import { RecordForm } from './RecordForm';

export const RecordAddDialog = () => {
  const [dialogs, setDialogs] = useRecoilState(recordsDialogsState);
  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery();
  const { data: wallets, isLoading: isWalletsLoading } = useWalletsQuery();
  const { username: owner } = useAuthentication();

  const closeDialog = () => {
    setDialogs({ ...dialogs, ADD_RECORD: { open: false } });
  };

  const { mutateAsync, isLoading: isAddLoading } = useCreateRecordMutation();
  const {
    mutateAsync: createCategoryMutation,
    isLoading: isCreateCategoryLoading,
  } = useCreateCategoryMutation();

  const addRecord = async (recordToAdd: Record) => {
    const updatedRecurrentRecordToAdd = { ...recordToAdd };
    let category = getCategoryByIdOrName(categories, recordToAdd.categoryId);
    if (!category) {
      category = await createCategoryMutation(recordToAdd.categoryId);
    }
    updatedRecurrentRecordToAdd.categoryId = category.id;
    await mutateAsync(updatedRecurrentRecordToAdd);
    closeDialog();
  };
  return (
    <Dialog open={dialogs.ADD_RECORD.open} onClose={closeDialog}>
      <DialogTitle>Add Record</DialogTitle>
      <DialogContent>
        {isCategoriesLoading || isWalletsLoading ? (
          <LinearProgress />
        ) : (
          <RecordForm
            onSubmitRecord={addRecord}
            wallets={wallets}
            categories={categories}
            owner={owner}
            withNewCategory
          />
        )}
        {isAddLoading || isCreateCategoryLoading ? <LinearProgress /> : null}
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={closeDialog} variant="outlined">
          Cancel
        </Button>
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          form="record-form"
          disabled={
            isCategoriesLoading ||
            isWalletsLoading ||
            isAddLoading ||
            isCreateCategoryLoading
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
