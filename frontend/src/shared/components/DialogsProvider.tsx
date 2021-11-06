import { RecordDialogContainer } from '../../records/components/RecordDialogContainer';
import { RecurrentRecordDialogContainer } from '../../records/components/RecurrentRecordDialogContainer';
import { WalletDialogContainer } from '../../wallets/components/WalletDialogContainer';

const DialogsProvider: React.FC = (props) => {
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
