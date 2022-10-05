import { FunctionComponent, PropsWithChildren } from 'react';
import { RecordDialogContainer } from '../../records/components/RecordDialogContainer';
import { RecurrentRecordDialogContainer } from '../../records/components/RecurrentRecordDialogContainer';
import { WalletDialogContainer } from '../../wallets/components/WalletDialogContainer';

const DialogsProvider: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <>
      <RecordDialogContainer />
      <RecurrentRecordDialogContainer />
      <WalletDialogContainer />
      {props.children}
    </>
  );
};

export default DialogsProvider;
