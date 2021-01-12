import React, { Fragment } from 'react';
import { WalletDialogs } from '../../../pages/wallets';
import { useAuthentication } from '../../authentication/hooks/useAuthentication';
import { UseDialogs } from '../../shared/hooks/useDialogs';
import {
  useCreateWalletMutation,
  useDeleteWalletMutation,
  useEditWalletMutation,
} from '../hooks/walletsQueries';
import { Wallet } from '../models/Wallet';
import { WalletAddDialog } from './WalletAddDialog';
import { WalletEditDialog } from './WalletEditDialog';

type WalletDialogContainerProps = {
  dialogsState: UseDialogs<WalletDialogs>;
};

export const WalletDialogContainer = (props: WalletDialogContainerProps) => {
  const { username, token } = useAuthentication();
  const {
    dialogsState: { dialogs, setSingleDialog },
  } = props;

  const editWallletMutation = useEditWalletMutation(token);
  const createWalletMutation = useCreateWalletMutation(token);
  const deleteWalletMutation = useDeleteWalletMutation(token);

  const addWallet = async (walletToAdd: Wallet) => {
    await createWalletMutation.mutateAsync(walletToAdd);
    setSingleDialog('addWallet', { open: false });
  };

  const editWallet = async (walletToEdit: Wallet) => {
    await editWallletMutation.mutateAsync(walletToEdit);
    setSingleDialog('editWallet', { open: false, walletToEdit: null });
  };

  const deleteWallet = async (walletToDelete: Wallet) => {
    await deleteWalletMutation.mutateAsync(walletToDelete);
    setSingleDialog('editWallet', { open: false, walletToEdit: null });
  };

  if (dialogs.editWallet.open) {
    return (
      <WalletEditDialog
        owner={username}
        onDialogClose={() =>
          setSingleDialog('editWallet', { open: false, walletToEdit: null })
        }
        onEditWallet={editWallet}
        onDeleteWallet={deleteWallet}
        wallet={dialogs.editWallet.walletToEdit}
      />
    );
  }

  if (dialogs.addWallet.open) {
    return (
      <WalletAddDialog
        owner={username}
        onDialogClose={() => setSingleDialog('addWallet', { open: false })}
        onAddWallet={addWallet}
      />
    );
  }

  return <Fragment />;
};
