import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';
import { useRecoilState } from 'recoil';
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
} from '../hooks/categoriesQueries';
import { useCreateRecurrentRecordMutation } from '../hooks/recurrentRecordQueries';
import { recurrentRecordsDialogsState } from '../hooks/recurrentRecordsStore';
import { RecurrentRecord } from '../models/RecurrentRecord';
import { getCategoryByIdOrName } from '../utils/categoryUtils';
import { RecurrentRecordForm } from './RecurrentRecordForm';

const RecurrentRecordAddDialog = (props) => {
  const [dialogs, setDialogs] = useRecoilState(recurrentRecordsDialogsState);

  const { mutateAsync } = useCreateRecurrentRecordMutation();
  const { data: categories } = useCategoriesQuery();

  const closeDialog = () => {
    setDialogs({ ...dialogs, ADD_RECURRENT_RECORD: { open: false } });
  };

  const { mutateAsync: createCategoryMutation } = useCreateCategoryMutation();

  const addRecurrentRecord = async (recurrentRecord: RecurrentRecord) => {
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

  return (
    <Dialog open={dialogs.ADD_RECURRENT_RECORD.open} onClose={closeDialog}>
      <DialogTitle>Add Recurrent Record</DialogTitle>
      <DialogContent>
        <RecurrentRecordForm onAddRecurrentRecord={addRecurrentRecord} />
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

export default RecurrentRecordAddDialog;
