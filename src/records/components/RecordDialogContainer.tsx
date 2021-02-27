import React, { Fragment, FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import {
  addRecordDialogState,
  editRecordDialogState,
  filterRecordDialogState,
} from '../hooks/recordsDialogsState';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
} from '../hooks/categoriesQueries';
import {
  useCreateRecordMutation,
  useDeleteRecordMutation,
  useEditRecordMutation,
} from '../hooks/recordsQueries';
import { Record } from '../models/Record';
import { RecordAddDialog } from './RecordAddDialog';
import { RecordEditDialog } from './RecordEditDialog';
import { Dialog, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { RecordFilterBarContainer } from './RecordFilterBarContainer';
import { getCategoryById, getCategoryByName } from '../utils/categoryUtils';
import { Category } from '../models/Category';

export const RecordDialogContainer: FunctionComponent = (props) => {
  const { username, token } = useAuthentication();
  const [editRecordsDialog, setEditRecordsDialog] = useRecoilState(
    editRecordDialogState
  );
  const [addRecordsDialog, setAddRecordsDialog] = useRecoilState(
    addRecordDialogState
  );
  const [filterRecordsDialog, setFilterRecordsDialog] = useRecoilState(
    filterRecordDialogState
  );
  const { data: categories } = useCategoriesQuery(token);
  const { data: wallets } = useWalletsQuery(token);

  const createRecordMutation = useCreateRecordMutation(token);
  const editRecordMutation = useEditRecordMutation(token);
  const deleteRecordMutation = useDeleteRecordMutation(token);

  const createCategoryMutation = useCreateCategoryMutation(token);

  const createCategoryIfNeeded = async (categoryName: Category['name']) => {
    const foundCategory =
      getCategoryByName(categories, categoryName) ||
      getCategoryById(categories, categoryName);
    if (foundCategory) {
      return foundCategory;
    } else {
      const newCategory = await createCategoryMutation.mutateAsync(
        categoryName
      );
      return newCategory;
    }
  };

  const addRecord = async (recordToAdd: Record) => {
    const updatedRecordToAdd = { ...recordToAdd };
    const category = await createCategoryIfNeeded(recordToAdd.categoryId);
    updatedRecordToAdd.categoryId = category.id;
    await createRecordMutation.mutateAsync(updatedRecordToAdd);
    setAddRecordsDialog({ open: false });
  };

  const editRecord = async (editedRecord: Record) => {
    const updatedRecordToEdit = { ...editedRecord };
    const category = await createCategoryIfNeeded(editedRecord.categoryId);
    updatedRecordToEdit.categoryId = category.id;
    await editRecordMutation.mutateAsync(updatedRecordToEdit);
    setEditRecordsDialog({ open: false, recordToEdit: null });
  };

  const deleteRecord = async (recordToDelete: Record) => {
    await deleteRecordMutation.mutateAsync(recordToDelete);
    setEditRecordsDialog({ open: false, recordToEdit: null });
  };

  if (addRecordsDialog.open) {
    return (
      <RecordAddDialog
        owner={username}
        onDialogClose={() => setAddRecordsDialog({ open: false })}
        onAddRecord={addRecord}
        wallets={wallets}
        categories={categories}
      />
    );
  }

  if (editRecordsDialog.open) {
    return (
      <RecordEditDialog
        record={editRecordsDialog.recordToEdit}
        categories={categories}
        owner={username}
        onDialogClose={() =>
          setEditRecordsDialog({ open: false, recordToEdit: null })
        }
        onEditRecord={editRecord}
        onDeleteRecord={deleteRecord}
        wallets={wallets}
      />
    );
  }

  if (filterRecordsDialog.open) {
    return (
      <Dialog
        open={true}
        onClose={() => setFilterRecordsDialog({ open: false })}
      >
        <DialogTitle>Filter Records</DialogTitle>
        <DialogContent>
          <RecordFilterBarContainer />
        </DialogContent>
      </Dialog>
    );
  }

  return <Fragment />;
};
