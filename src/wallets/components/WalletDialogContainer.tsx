import React, { Fragment } from 'react';
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
import { Wallet } from '../models/Wallet';
import { WalletAddDialog } from './WalletAddDialog';
import { WalletEditDialog } from './WalletEditDialog';

export const WalletDialogContainer = () => {
  const { username, token } = useAuthentication();

  const [addWalletDialog, setAddWalletDialog] = useRecoilState(
    addWalletDialogState
  );
  const [editWalletDialog, setEditWalletDialog] = useRecoilState(
    editWalletDialogState
  );

  const editWallletMutation = useEditWalletMutation(token);
  const createWalletMutation = useCreateWalletMutation(token);
  const deleteWalletMutation = useDeleteWalletMutation(token);

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
      />
    );
  }

  if (addWalletDialog.open) {
    return (
      <WalletAddDialog
        owner={username}
        onDialogClose={() => setAddWalletDialog({ open: false })}
        onAddWallet={addWallet}
      />
    );
  }

  return <Fragment />;
};
