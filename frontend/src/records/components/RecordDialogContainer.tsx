import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React, { Fragment, FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
} from '../hooks/categoriesQueries';
import { recordsDialogsState } from '../hooks/recordsDialogsState';
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
import RecordExportContainer from './RecordExportContainer';
import { RecordFilterBarContainer } from './RecordFilterBarContainer';
import RecordSortContainer from './RecordSortContainer';

export const RecordDialogContainer: FunctionComponent = (props) => {
  const { username } = useAuthentication();
  const [recordsDialog, setRecordsDialog] = useRecoilState(recordsDialogsState);
  const { data: categories } = useCategoriesQuery();
  const { data: wallets } = useWalletsQuery();

  const createRecordMutation = useCreateRecordMutation();
  const editRecordMutation = useEditRecordMutation();
  const deleteRecordMutation = useDeleteRecordMutation();

  const createCategoryMutation = useCreateCategoryMutation();

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
    setRecordsDialog({ ...recordsDialog, ADD_RECORD: { open: false } });
  };

  const editRecord = async (editedRecord: Record) => {
    const updatedRecordToEdit = { ...editedRecord };
    const category = await createCategoryIfNeeded(editedRecord.categoryId);
    updatedRecordToEdit.categoryId = category.id;
    await editRecordMutation.mutateAsync(updatedRecordToEdit);
    setRecordsDialog({
      ...recordsDialog,
      EDIT_RECORD: { open: false, recordToEdit: null },
    });
  };

  const deleteRecord = async (recordToDelete: Record) => {
    await deleteRecordMutation.mutateAsync(recordToDelete);
    setRecordsDialog({
      ...recordsDialog,
      EDIT_RECORD: { open: false, recordToEdit: null },
    });
  };

  if (recordsDialog.ADD_RECORD.open) {
    return (
      <RecordAddDialog
        owner={username}
        onDialogClose={() =>
          setRecordsDialog({
            ...recordsDialog,
            ADD_RECORD: { open: false },
          })
        }
        onAddRecord={addRecord}
        wallets={wallets}
        categories={categories}
        isLoading={createRecordMutation.isLoading}
      />
    );
  }

  if (recordsDialog.EDIT_RECORD.open) {
    return (
      <RecordEditDialog
        record={recordsDialog.EDIT_RECORD.recordToEdit}
        categories={categories}
        owner={username}
        onDialogClose={() =>
          setRecordsDialog({
            ...recordsDialog,
            EDIT_RECORD: { open: false, recordToEdit: null },
          })
        }
        onEditRecord={editRecord}
        onDeleteRecord={deleteRecord}
        wallets={wallets}
        isLoading={
          editRecordMutation.isLoading || deleteRecordMutation.isLoading
        }
      />
    );
  }

  if (recordsDialog.FILTER_RECORDS.open) {
    return (
      <Dialog
        open={true}
        onClose={() =>
          setRecordsDialog({
            ...recordsDialog,
            FILTER_RECORDS: { open: false },
          })
        }
      >
        <DialogContent>
          <RecordFilterBarContainer />
        </DialogContent>
      </Dialog>
    );
  }

  if (recordsDialog.SORT_RECORDS.open) {
    return (
      <Dialog
        open={true}
        onClose={() =>
          setRecordsDialog({ ...recordsDialog, SORT_RECORDS: { open: false } })
        }
      >
        <DialogTitle>Sort Records</DialogTitle>
        <DialogContent>
          <RecordSortContainer />
        </DialogContent>
      </Dialog>
    );
  }

  if (recordsDialog.EXPORT_RECORDS.open) {
    return (
      <Dialog
        open={true}
        onClose={() =>
          setRecordsDialog({
            ...recordsDialog,
            EXPORT_RECORDS: { open: false },
          })
        }
      >
        <DialogTitle>Export Records</DialogTitle>
        <DialogContent>
          <RecordExportContainer />
        </DialogContent>
      </Dialog>
    );
  }

  return <Fragment />;
};
