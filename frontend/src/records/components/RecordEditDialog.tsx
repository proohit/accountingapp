import { RecordDto } from '@accountingapp/shared';
import { Close, Delete } from '@mui/icons-material';
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
import { useRecoilState } from 'recoil';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { useWalletsQuery } from '../../wallets/hooks/walletsQueries';
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
} from '../hooks/categoriesQueries';
import { recordsDialogsState } from '../hooks/recordsDialogsState';
import {
  useDeleteRecordMutation,
  useEditRecordMutation,
} from '../hooks/recordsQueries';
import { getCategoryByIdOrName } from '../utils/categoryUtils';
import { RecordForm } from './RecordForm';

export const RecordEditDialog = () => {
  const [dialogs, setDialogs] = useRecoilState(recordsDialogsState);

  const { mutateAsync, isLoading: isEditLoading } = useEditRecordMutation();
  const { mutateAsync: deleteMutation, isLoading: isDeleteLoading } =
    useDeleteRecordMutation();
  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery();
  const {
    mutateAsync: createCategoryMutation,
    isLoading: isCreateCategoryLoading,
  } = useCreateCategoryMutation();
  const { data: wallets, isLoading: isWalletsLoading } = useWalletsQuery();
  const { username } = useAuthentication();

  const closeDialog = () => {
    setDialogs({
      ...dialogs,
      EDIT_RECORD: { open: false, recordToEdit: null },
    });
  };

  const editRecord = async (record: RecordDto) => {
    const updatedRecordToEdit = { ...record };
    let category = getCategoryByIdOrName(categories, record.categoryId);
    if (!category) {
      category = await createCategoryMutation(record.categoryId);
    }
    updatedRecordToEdit.categoryId = category.id;
    await mutateAsync(updatedRecordToEdit);
    closeDialog();
  };

  const onDeleteRecord = async (recordToDelete: RecordDto) => {
    await deleteMutation(recordToDelete);
    closeDialog();
  };

  return (
    <Dialog open={dialogs.EDIT_RECORD.open} onClose={closeDialog}>
      <DialogTitle>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            Edit Record
          </Grid>
          <Grid item xs={2}>
            <IconButton
              color="primary"
              onClick={() => onDeleteRecord(dialogs.EDIT_RECORD.recordToEdit)}
              size="large"
            >
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
          <RecordForm
            onSubmitRecord={editRecord}
            wallets={wallets}
            categories={categories}
            owner={username}
            record={dialogs.EDIT_RECORD.recordToEdit}
            withNewCategory
          />
        )}
        {isEditLoading || isDeleteLoading || isCreateCategoryLoading ? (
          <LinearProgress />
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={closeDialog} variant="outlined">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          form="record-form"
          disabled={
            isEditLoading ||
            isDeleteLoading ||
            isCategoriesLoading ||
            isWalletsLoading ||
            isCreateCategoryLoading
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
