import { WalletDto as Wallet } from '@accountingapp/shared';
import { Fragment } from 'react';
import { useRecoilState } from 'recoil';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import {
  addWalletDialogState,
  editWalletDialogState,
} from '../hooks/walletDialogsState';
import {
  useCreateWalletMutation,
  useDeleteWalletMutation,
  useEditWalletMutation,
} from '../hooks/walletsQueries';
import { WalletAddDialog } from './WalletAddDialog';
import { WalletEditDialog } from './WalletEditDialog';

export const WalletDialogContainer = () => {
  const { username } = useAuthentication();

  const [addWalletDialog, setAddWalletDialog] =
    useRecoilState(addWalletDialogState);
  const [editWalletDialog, setEditWalletDialog] = useRecoilState(
    editWalletDialogState
  );

  const editWallletMutation = useEditWalletMutation();
  const createWalletMutation = useCreateWalletMutation();
  const deleteWalletMutation = useDeleteWalletMutation();

  const addWallet = async (walletToAdd: Wallet) => {
    await createWalletMutation.mutateAsync(walletToAdd);
    setAddWalletDialog({ open: false });
  };

  const editWallet = async (walletToEdit: Wallet) => {
    await editWallletMutation.mutateAsync(walletToEdit);
    setEditWalletDialog({ open: false, walletToEdit: null });
  };

  const deleteWallet = async (walletToDelete: Wallet) => {
    await deleteWalletMutation.mutateAsync(walletToDelete);
    setEditWalletDialog({ open: false, walletToEdit: null });
  };

  if (editWalletDialog.open) {
    return (
      <WalletEditDialog
        owner={username}
        onDialogClose={() =>
          setEditWalletDialog({ open: false, walletToEdit: null })
        }
        onEditWallet={editWallet}
        onDeleteWallet={deleteWallet}
        wallet={editWalletDialog.walletToEdit}
        isLoading={
          editWallletMutation.isLoading || deleteWalletMutation.isLoading
        }
      />
    );
  }

  if (addWalletDialog.open) {
    return (
      <WalletAddDialog
        owner={username}
        onDialogClose={() => setAddWalletDialog({ open: false })}
        onAddWallet={addWallet}
        isLoading={createWalletMutation.isLoading}
      />
    );
  }

  return <Fragment />;
};
