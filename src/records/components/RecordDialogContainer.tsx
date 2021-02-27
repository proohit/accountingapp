import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React, { Fragment, FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
} from '../hooks/categoriesQueries';
import {
  addRecordDialogState,
  editRecordDialogState,
  filterRecordDialogState,
  sortRecordDialogState,
} from '../hooks/recordsDialogsState';
import {
  useCreateRecordMutation,
  useDeleteRecordMutation,
  useEditRecordMutation,
} from '../hooks/recordsQueries';
import { Category } from '../models/Category';
import { Record } from '../models/Record';
import { getCategoryById, getCategoryByName } from '../utils/categoryUtils';
import { RecordAddDialog } from './RecordAddDialog';
import { RecordEditDialog } from './RecordEditDialog';
import { RecordFilterBarContainer } from './RecordFilterBarContainer';
import RecordSortContainer from './RecordSortContainer';

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
  const [sortRecordDialog, setSortRecordDialog] = useRecoilState(
    sortRecordDialogState
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
        <DialogContent>
          <RecordFilterBarContainer />
        </DialogContent>
      </Dialog>
    );
  }

  if (sortRecordDialog.open) {
    return (
      <Dialog open={true} onClose={() => setSortRecordDialog({ open: false })}>
        <DialogTitle>Sort Records</DialogTitle>
        <DialogContent>
          <RecordSortContainer />
        </DialogContent>
      </Dialog>
    );
  }

  return <Fragment />;
};
